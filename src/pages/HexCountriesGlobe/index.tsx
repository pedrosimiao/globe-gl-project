//src/pages/HexCountriesGlobe/index.tsx

import { useState, useEffect, useRef, useCallback } from 'react';

import Globe from 'react-globe.gl';
import type { GlobeMethods } from 'react-globe.gl';

import { useCountryContext } from '../../contexts/CountryContext';

import { colors } from '../../utils/rgbaStaticColors'

import TopLabel from '../../components/TopLabel';
import Loader from '../../components/Loader';
import CountryCard from '../../components/CountryCard';


const HexCountriesGlobe = () => {
    const { countries, jsonData, loading, error } = useCountryContext();

    const [selectedCountry, setSelectedCountry] = useState<Record<string, any> | null>(null);
    const [countryData, setCountryData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const globeRef = useRef<GlobeMethods | undefined>(undefined);

    // Estado para a largura da janela
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Atualiza a largura da janela
    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    // Função para determinar o ponto de vista baseado na largura da tela
    const getPointOfView = useCallback(() => {
        if (windowWidth < 758) {
            return { lat: 0, lng: 0, altitude: 4 }; // Para dispositivos móveis
        } else if (windowWidth < 1024) {
            return { lat: 10, lng: 20, altitude: 2.5 }; // Para tablets
        } else {
            return { lat: 30, lng: 40, altitude: 2.5 }; // Para desktops
        }
    }, [windowWidth]);

    useEffect(() => {
        window.addEventListener('resize', updateWindowWidth);
        return () => {
            window.removeEventListener('resize', updateWindowWidth);
        };
    }, []);


    const getCountryCenter = (geometry: any) => {
        if (geometry.type === 'Polygon') {
            return geometry.coordinates[0][0];
        } else if (geometry.type === 'MultiPolygon') {
            return geometry.coordinates[0][0][0];
        }
        return null;
    };

    const handlePolygonClick = (polygon: any) => {
        const isSelected = selectedCountry?.properties?.ADMIN === polygon.properties.ADMIN;
        const newSelectedCountry = isSelected ? null : polygon;
        setSelectedCountry(newSelectedCountry);

        if (!newSelectedCountry) return;

        if (newSelectedCountry && jsonData) {
            const countryName = newSelectedCountry.properties.ADMIN;
            setCountryData(jsonData[countryName] || null);
        };

        const coordinates = getCountryCenter(newSelectedCountry.geometry);

        if (coordinates) {
            const [lng, lat] = coordinates;

            setTimeout(() => {
                globeRef.current?.pointOfView(
                    { lat, lng, altitude: 2 },
                    1000
                );
            }, 100);
        }
    };

    const getHexColorForCountry = (country: any) => {
        const index = country.properties.ISO_A3.charCodeAt(0) % colors.length;
        return colors[index];
    };


    useEffect(() => {
        if (selectedCountry) {
            const coordinates = getCountryCenter(selectedCountry.geometry);
            if (coordinates) {
                const [lng, lat] = coordinates;
                globeRef.current?.pointOfView(
                    { lat, lng, altitude: 2 },
                    1000
                );
            }
        } else {
            globeRef.current?.pointOfView(getPointOfView(), 1000);
        }
    }, [selectedCountry, getPointOfView]);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <TopLabel>
                Carregando...
            </TopLabel>
        )
    }

    if (error) {
        return (
            <TopLabel>
                Erro ao carregar países. {error}
            </TopLabel>
        )
    }

    if (isLoading) return <Loader />

    return (
        <>
            {selectedCountry && (
                <CountryCard
                    countryName={selectedCountry.properties.ADMIN}
                    countryData={countryData}
                    onClose={() => setSelectedCountry(null)}
                />
            )}
            <Globe
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                hexPolygonsData={countries}
                hexPolygonResolution={3}
                hexPolygonMargin={0.1}
                hexPolygonColor={getHexColorForCountry}
                hexPolygonAltitude={(d) => (d === selectedCountry ? 0.12 : 0.001)}
                hexPolygonLabel={(d: any) => ` 
                <b>${d.properties.ADMIN}</b><br />
                ISO_A3: ${d.properties.ISO_A3}<br />
                ISO_A2: ${d.properties.ISO_A2}
            `}
                onHexPolygonClick={handlePolygonClick}
                showAtmosphere={true}
            />
        </>
    )
};

export default HexCountriesGlobe