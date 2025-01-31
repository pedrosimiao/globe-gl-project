// src/pages/ChoroplethCountriesGlobe/index.tsx
import { useCallback, useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { useCountryContext } from '../../contexts/CountryContext'
import type { GlobeMethods } from 'react-globe.gl';
import TopLabel from '../../components/TopLabel';
import Loader from '../../components/Loader';
import CountryCard from '../../components/CountryCard';

const ChoroplethCountriesGlobe = () => {
    const { countries, jsonData, loading, error } = useCountryContext()
    const [selectedCountry, setSelectedCountry] = useState<Record<string, any> | null>(null);
    const [countryData, setCountryData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const globeRef = useRef<GlobeMethods | undefined>(undefined);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    // Função para determinar o ponto de vista baseado na largura da tela
    const getPointOfView = useCallback(() => {
        if (windowWidth < 426) {
            return { lat: 0, lng: 0, altitude: 4.5 }; // Para dispositivos móveis
        } else if (windowWidth < 758) {
            return { lat: 10, lng: 20, altitude: 3.5 }; // Para tablets
        } else {
            return { lat: 30, lng: 40, altitude: 2.5 }; // Para desktops
        }
    }, [windowWidth]);


    // Atualiza a largura da janela ao redimensionar
    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };


    // Função pós montagem
    const onGlobeReady = () => {
        if (globeRef.current) {
            const controls = globeRef.current.controls();

            controls.autoRotate = true;
            controls.autoRotateSpeed = 1;

            if (countries) {
                globeRef.current.resumeAnimation();
            } else {
                globeRef.current.pauseAnimation();
            }

            // Ajusta o ponto de vista na inicialização
            const pointOfView = getPointOfView();
            globeRef.current.pointOfView(pointOfView, 1000);
        }
    };


    // Listener para redimensionamento da janela
    useEffect(() => {
        window.addEventListener('resize', updateWindowWidth);
        return () => {
            window.removeEventListener('resize', updateWindowWidth);
        };
    }, []);


    // Atualiza o ponto de vista sempre que getPointOfView rodar
    useEffect(() => {
        if (globeRef.current) {
            const pointOfView = getPointOfView();
            globeRef.current.pointOfView(pointOfView);
        }
    }, [getPointOfView]);



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
                    { lat, lng, altitude: getPointOfView().altitude - 0.5 },
                    1000
                );
            }, 100);
        }
    };


    useEffect(() => {
        if (selectedCountry) {
            const coordinates = getCountryCenter(selectedCountry.geometry);
            if (coordinates) {
                const [lng, lat] = coordinates;
                globeRef.current?.pointOfView(
                    { lat, lng, altitude: getPointOfView().altitude - 0.5 },
                    1000
                );
            }
        } else {
            globeRef.current?.pointOfView(getPointOfView(), 1000);
        }
    }, [selectedCountry, getPointOfView]);


    useEffect(() => {
        // Simula o carregamento do globe
        const timer = setTimeout(() => setIsLoading(false), 5000); // Ajuste o tempo para o carregamento real
        return () => clearTimeout(timer); // Limpeza do timeout
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
                Erro ao carregar países {error}
            </TopLabel>
        )
    }

    if (isLoading) {
        return <Loader />
    }

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
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                polygonsData={countries}
                polygonAltitude={(d) => (d === selectedCountry ? 0.36 : 0.06)}
                polygonCapColor={(d) => (d === selectedCountry ? 'rgba(247, 215, 148,1.0)' : 'rgba(255, 107, 107,1.0)')}
                polygonSideColor={() => 'rgba(0, 100, 0, 0.2)'}
                polygonStrokeColor={() => 'rgba(255, 255, 255, 1)'}
                polygonLabel={(d: any) => `<b>${d.properties.ADMIN} (${d.properties.ISO_A3})</b>`}
                onPolygonClick={handlePolygonClick}
                polygonsTransitionDuration={100}
                onGlobeReady={onGlobeReady}
            />
        </>
    );
};

export default ChoroplethCountriesGlobe;