// src/contexts/CountryContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface CountryContextType {
    countries: any[];
    jsonData: Record<string, any> | null;
    loading: boolean;
    error: string | null;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const useCountryContext = () => {
    const context = useContext(CountryContext);
    if (!context) {
        throw new Error("useCountryContext must be used within a CountryProvider");
    }
    return context;
};

interface CountryProviderProps {
    children: ReactNode;
}

export const CountryProvider = ({ children }: CountryProviderProps) => {
    const [countries, setCountries] = useState<any[]>([]);
    const [jsonData, setJsonData] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch GeoJSON data
                const geoResponse = await fetch('/data/ne_110m_admin_0_countries.geojson');
                if (!geoResponse.ok) throw new Error('Erro ao carregar GeoJSON');
                const geoData = await geoResponse.json();
                setCountries(geoData.features);

                // Fetch hosted JSON data
                const jsonResponse = await fetch('https://globe-study-json.vercel.app/GeoPolTrumpElection.json');
                if (!jsonResponse.ok) throw new Error('Erro ao carregar JSON hospedado');
                const jsonData = await jsonResponse.json();
                setJsonData(jsonData);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <CountryContext.Provider value={{ countries, jsonData, loading, error }}>
            {children}
        </CountryContext.Provider>
    );
};


















// import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

// interface CountryContextType {
//     countries: any[];
//     loading: boolean;
//     error: string | null;
// }

// const CountryContext = createContext<CountryContextType | undefined>(undefined);

// export const useCountryContext = () => {
//     const context = useContext(CountryContext);
//     if (!context) {
//         throw new Error("useCountryContext must be used within a CountryProvider");
//     }
//     return context;
// };

// interface CountryProviderProps {
//     children: ReactNode;
// }

// export const CountryProvider = ({ children }: CountryProviderProps) => {
//     const [countries, setCountries] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchCountries = async () => {
//             try {
//                 const response = await fetch('/data/ne_110m_admin_0_countries.geojson');
//                 if (!response.ok) {
//                     throw new Error('Falha ao carregar os dados');
//                 }
//                 const data = await response.json();
//                 setCountries(data.features);
//             } catch (err) {
//                 setError('Erro ao carregar dados dos países');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCountries();
//     }, []);

//     return (
//         <CountryContext.Provider value={{ countries, loading, error }}>
//             {children}
//         </CountryContext.Provider>
//     );
// };
