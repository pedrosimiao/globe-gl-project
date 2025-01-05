// src/App.tsx

//react-router-dom
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// style
import GlobalStyle from './GlobalStyle';

// contexts
import { CountryProvider } from './contexts/CountryContext';
import { CableProvider } from './contexts/CableContext';

// components
import GlobesNav from './components/GlobesNav';

// pages
import ChoroplethCountriesGlobe from './pages/ChoroplethCountriesGlobe';
import SubmarineCablesGlobe from './pages/SubmarineCablesGlobe';
import HexCountriesGlobe from './pages/HexCountriesGlobe';
import CountriesPopulationGlobe from './pages/CountriesPopulationGlobe';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <div style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <Router>
          <GlobesNav />
          <Routes>
            <Route
              path="/choropleth-countries"
              element={
                <CountryProvider>
                  <ChoroplethCountriesGlobe />
                </CountryProvider>
              }
            />
            <Route
              path="/hex-countries"
              element={
                <CountryProvider>
                  <HexCountriesGlobe />
                </CountryProvider>
              }
            />
            <Route
              path="/countries-population"
              element={
                <CountryProvider>
                  <CountriesPopulationGlobe />
                </CountryProvider>
              }
            />
            <Route
              path="/"
              element={
                <CableProvider>
                  <SubmarineCablesGlobe />
                </CableProvider>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;


















// // react-router-dom
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// // estilo global
// import GlobalStyle from './GlobalStyle';

// // contexts (estudar tema)
// import { CountryProvider } from './contexts/CountryContext';
// import { CableProvider } from './contexts/CableContext';

// // components
// import GlobesNav from './components/GlobesNav';

// // pages
// import ChoroplethCountriesGlobe from './pages/ChoroplethCountriesGlobe';
// import SubmarineCablesGlobe from './pages/SubmarineCablesGlobe';
// import HexCountriesGlobe from './pages/HexCountriesGlobe';
// import CountriesPopulationGlobe from './pages/CountriesPopulationGlobe';

// const App = () => {
//   return (
//     <>
//       <GlobalStyle />
//       <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
//         <Router>
//           <GlobesNav />
//           <Routes>
//             <Route path="/" element={
//               <CountryProvider>
//                 <ChoroplethCountriesGlobe />
//               </CountryProvider>
//             } />
//             <Route path="/hex-countries" element={
//               <CountryProvider>
//                 <HexCountriesGlobe />
//               </CountryProvider>
//             } />
//             <Route path="/countries-population" element={
//               <CountryProvider>
//                 <CountriesPopulationGlobe />
//               </CountryProvider>
//             } />
//             <Route path="/submarine-cables" element={
//               <CableProvider>
//                 <SubmarineCablesGlobe />
//               </CableProvider>
//             } />
//           </Routes>
//         </Router>
//       </div>
//     </>
//   );
// };

// export default App;



