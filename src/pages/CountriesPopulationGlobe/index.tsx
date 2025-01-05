import { useCallback, useEffect, useRef, useState } from 'react';

import { useCountryContext } from '../../contexts/CountryContext';

import Globe from 'react-globe.gl';
import type { GlobeMethods } from 'react-globe.gl';

import TopLabel from '../../components/TopLabel';
import Loader from '../../components/Loader';

const CountriesPopulationGlobe = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { countries, loading, error } = useCountryContext()
    const globeRef = useRef<GlobeMethods | undefined>(undefined);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    const getPointOfView = useCallback(() => {
        if (windowWidth < 758) {
            return { lat: 0, lng: 0, altitude: 4 }; // Para dispositivos móveis
        } else if (windowWidth < 1024) {
            return { lat: 0, lng: 0, altitude: 2.5 }; // Para tablets
        } else {
            return { lat: 0, lng: 0, altitude: 2.5 }; // Para desktops
        }
    }, [windowWidth]);

    useEffect(() => {
        if (globeRef.current && globeRef.current.controls()) {
            globeRef.current.controls().autoRotate = true;
            globeRef.current.controls().autoRotateSpeed = 1;
        }
    }, []);

    // Configuração de pointOfView
    useEffect(() => {
        if (globeRef.current) {
            const pointOfView = getPointOfView();
            globeRef.current.pointOfView(pointOfView, 3000);
        }
    }, [getPointOfView]);


    useEffect(() => {
        window.addEventListener("resize", updateWindowWidth);
        return () => window.removeEventListener("resize", updateWindowWidth);
    }, [windowWidth]);


    // Simula o carregamento do globe
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 5000); // Ajuste o tempo para o carregamento real
        return () => clearTimeout(timer); // Limpeza do timeout
    }, []);


    if (loading) {
        return (
            <TopLabel>
                Carregando países...
            </TopLabel>
        )
    }

    if (error) {
        <TopLabel>
            Erro ao carregar países {error}
        </TopLabel>
    }

    return isLoading ? <Loader /> : (
        <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
            polygonsData={countries}
            polygonCapColor={() => 'rgba(0, 0, 190, 0.6)'}
            polygonSideColor={() => 'rgba(0, 190, 0, 0.05)'}
            polygonsTransitionDuration={4000}
            polygonAltitude={(feat: any) => {
                const pop = +feat.properties.POP_EST; // População estimada
                const normalizedAltitude = Math.sqrt(pop) * 2e-5; // Fator de normalização reduzido
                return Math.min(10, Math.max(0.1, normalizedAltitude)); // Teto máximo de 10
            }}

            polygonLabel={({ properties: d }: any) => `
            <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
            Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i>
        `}
        />
    );
};

export default CountriesPopulationGlobe;