// src/pages/SubmarineCablesGlobe.tsx
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import Globe, { GlobeMethods } from "react-globe.gl";

import CableContext from "../../contexts/CableContext";

import Loader from "../../components/Loader";

const SubmarineCablesGlobe = () => {
    const [isLoading, setIsLoading] = useState(true); // Estado para gerenciar carregamento
    const { cablePaths } = useContext(CableContext); // Dados dos cabos, obtidos do contexto
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

            if (cablePaths) {
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
            globeRef.current.pointOfView(pointOfView); // Atualiza a visão do globo em 3 segundos
        }
    }, [getPointOfView]);


    // Listener para redimensionamento da janela
    useEffect(() => {
        window.addEventListener("resize", updateWindowWidth); // Adiciona o listener
        return () => window.removeEventListener("resize", updateWindowWidth); // Remove o listener ao desmontar
    }, []);


    // Define o estado de carregamento com base nos dados de cabos
    useEffect(() => {
        if (cablePaths && cablePaths.length > 0) {
            setIsLoading(false); // Para o carregamento quando os dados estão disponíveis
        }
    }, [cablePaths]);


    if (isLoading) return <Loader />; // Exibe o loader enquanto carrega

    return (
        <Globe
            ref={globeRef} // Define a referência do globo
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg" // Imagem do globo
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png" // Mapa de topologia
            pathsData={cablePaths} // Dados dos cabos submarinos
            pathPoints="coords"
            pathPointLat={(p: any) => p[1]} // Latitude de cada ponto
            pathPointLng={(p: any) => p[0]} // Longitude de cada ponto
            pathResolution={1} // Resolução dos caminhos
            pathColor={(path: any) => path.color} // Cor dos cabos
            pathLabel={(path: any) => path.name} // Nome dos cabos
            pathDashLength={0.1} // Comprimento dos traços
            pathDashGap={0.008} // Espaço entre os traços
            pathDashAnimateTime={12000} // Tempo de animação dos traços
            showAtmosphere={true} // Exibe a atmosfera ao redor do globo
            onGlobeReady={onGlobeReady}
        />
    );
};

export default SubmarineCablesGlobe;

