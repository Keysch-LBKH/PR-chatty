import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import LBKHLiaison from './components/LBKHLiaison';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import ResidentPortal from './components/ResidentPortal';
import MunicipalSolutions from './components/MunicipalSolutions';
import IndustrialInfrastructure from './components/IndustrialInfrastructure';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/liaison" element={<LBKHLiaison />} />
        <Route path="/executive" element={<ExecutiveDashboard />} />
        <Route path="/legacy-portal" element={<ResidentPortal />} />
        <Route path="/municipal" element={<MunicipalSolutions />} />
        <Route path="/industrial" element={<IndustrialInfrastructure />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
