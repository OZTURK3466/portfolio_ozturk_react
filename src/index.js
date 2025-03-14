// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { PerformanceProvider } from './context/PerformanceContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PerformanceProvider>
      <App />
    </PerformanceProvider>
  </React.StrictMode>,
  document.getElementById('root')
);