import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import UploadResource from './pages/UploadResource';
import PriceConfiguration from './pages/PriceConfiguration';
import APIResources from './pages/APIResources';
import ContextResources from './pages/ContextResources';
import Analytics from './pages/Analytics';
import Wallet from './pages/Wallet';
import Settings from './pages/Settings';
import LandingPage from './pages/LandingPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/lp" element={<LandingPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<UploadResource />} />
          <Route path="pricing" element={<PriceConfiguration />} />
          <Route path="resources/api" element={<APIResources />} />
          <Route path="resources/context" element={<ContextResources />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);