import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Wallets from './pages/Wallets';
import Transfer from './pages/Transfer';
import LegacySetup from './pages/LegacySetup';
import ClaimPortal from './pages/ClaimPortal';
import AdminVault from './pages/AdminVault';
import TechStack from './pages/TechStack';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
      <Route path="/claim" element={<ClaimPortal />} />
      <Route path="/admin" element={<AdminVault />} />

      {/* Protected Routes inside Layout */}
      <Route 
        path="/" 
        element={isAuthenticated ? <Layout onLogout={() => setIsAuthenticated(false)} /> : <Navigate to="/login" />}
      >
        <Route index element={<Dashboard />} />
        <Route path="wallets" element={<Wallets />} />
        <Route path="transfer" element={<Transfer />} />
        <Route path="legacy" element={<LegacySetup />} />
        <Route path="tech" element={<TechStack />} />
      </Route>
    </Routes>
  );
}

export default App;
