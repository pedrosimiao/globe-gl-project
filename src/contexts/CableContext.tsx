// src/contexts/CableContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface CableFeature {
    geometry: {
        type: string;
        coordinates: number[][][];
    };
    properties: {
        id: string;
        name: string;
        color: string;
        feature_id: string;
        coordinates: number[];
    };
}

interface CableContextType {
    cablePaths: any[];
    fetchCableData: () => void;
}

const CableContext = createContext<CableContextType>({
    cablePaths: [],
    fetchCableData: () => { }
});

interface CableProviderProps {
    children: ReactNode;
}

export const CableProvider = ({ children }: CableProviderProps) => {
    const [cablePaths, setCablePaths] = useState<any[]>([]);

    // Função para fazer o fetch dos dados dos cabos
    const fetchCableData = async () => {
        try {
            const response = await fetch('/data/cable-geo.json');
            const cablesGeo: { features: CableFeature[] } = await response.json();

            const processedCablePaths = cablesGeo.features.map(feature => {
                const { geometry, properties } = feature;
                return geometry.coordinates.map(coords => ({
                    coords,
                    color: properties.color,
                    name: properties.name,
                }));
            }).flat();

            setCablePaths(processedCablePaths);
        } catch (error) {
            console.error('Erro ao carregar dados dos cabos:', error);
        }
    };

    // Carregar os dados uma vez na inicialização do provider
    useEffect(() => {
        if (cablePaths.length === 0) {
            fetchCableData();
        }
    }, [cablePaths]);

    return (
        <CableContext.Provider value={{ cablePaths, fetchCableData }}>
            {children}
        </CableContext.Provider>
    );
};

export default CableContext;
