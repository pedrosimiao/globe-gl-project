// src/pages/SubmarineCablesGlobe.tsx
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import Globe, { GlobeMethods } from "react-globe.gl";

import CableContext from "../../contexts/CableContext"; // Importando o contexto

import Loader from "../../components/Loader";

const SubmarineCablesGlobe = () => {
    const [isLoading, setIsLoading] = useState(true); // Estado para gerenciar carregamento
    const { cablePaths } = useContext(CableContext); // Dados dos cabos, obtidos do contexto
    const globeRef = useRef<GlobeMethods | undefined>(undefined); // Referência para o componente Globe
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Estado para largura da janela


    // Atualiza a largura da janela ao redimensionar
    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };


    // Determina o ponto de vista (lat, lng, altitude) baseado na largura da janela
    const getPointOfView = useCallback(() => {
        if (windowWidth < 758) {
            return { lat: 0, lng: 0, altitude: 4 }; // Ponto de vista para dispositivos móveis
        } else if (windowWidth < 1024) {
            return { lat: 0, lng: 0, altitude: 2.5 }; // Ponto de vista para tablets
        } else {
            return { lat: 0, lng: 0, altitude: 2.5 }; // Ponto de vista para desktops
        }
    }, [windowWidth]); // Depende da largura da janela

    useEffect(() => {
        if (globeRef.current && globeRef.current.controls()) {
            globeRef.current.controls().autoRotate = true;
            globeRef.current.controls().autoRotateSpeed = 1;
        }
    }, []);


    // Atualiza o ponto de vista e ativa autoRotate sempre que windowWidth mudar
    useEffect(() => {
        if (globeRef.current) {
            const pointOfView = getPointOfView();
            globeRef.current.pointOfView(pointOfView, 3000); // Atualiza a visão do globo em 3 segundos
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


    // Simula um tempo de carregamento adicional para o globo
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 5000);
        return () => clearTimeout(timer); // Limpa o timeout ao desmontar
    }, []);


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
        />
    );
};

export default SubmarineCablesGlobe;

