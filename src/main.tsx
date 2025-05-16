import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UploadResource from './pages/UploadResource';
import ApiDetailPage from './pages/ApiDetailPage';
import AppKitProvider from './AppKitProvider';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppKitProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadResource />} />
          <Route path="/api/:id" element={<ApiDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppKitProvider>
  </StrictMode>
);