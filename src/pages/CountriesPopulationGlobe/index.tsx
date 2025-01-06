import { useCallback, useEffect, useRef, useState } from 'react';

import Globe from 'react-globe.gl';
import type { GlobeMethods } from 'react-globe.gl';

import { useCountryContext } from '../../contexts/CountryContext';

import TopLabel from '../../components/TopLabel';
import Loader from '../../components/Loader';

const CountriesPopulationGlobe = () => {
    const [isLoading, setIsLoading] = useState(true); // Estado para gerenciar carregamento
    const { countries, loading, error } = useCountryContext() // Dados dos cabos, obtidos do contexto
    const globeRef = useRef<GlobeMethods | undefined>(undefined); // Referência para o componente Globe
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Estado para largura da janela


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
            globeRef.current.pointOfView(pointOfView);
        }
    };


    // Atualiza o ponto de vista sempre que getPointOfView rodar
    useEffect(() => {
        if (globeRef.current) {
            const pointOfView = getPointOfView();
            globeRef.current.pointOfView(pointOfView, 3000);
        }
    }, [getPointOfView]);


    // Listener para redimensionamento da janela
    useEffect(() => {
        window.addEventListener("resize", updateWindowWidth);
        return () => window.removeEventListener("resize", updateWindowWidth);
    }, [windowWidth]);


    // Define o estado de carregamento com base nos dados de países
    useEffect(() => {
        if (countries && countries.length > 0) {
            setIsLoading(false); // Para o carregamento quando os dados estão disponíveis
        }
    }, [countries]);


    if (loading) {
        return (
            <TopLabel>
                Carregando...
            </TopLabel>
        )
    }

    if (error) {
        <TopLabel>
            Erro ao carregar países {error}
        </TopLabel>
    }

    if (isLoading) return <Loader />

    return (
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
            onGlobeReady={onGlobeReady}
        />
    );
};

export default CountriesPopulationGlobe;