import React from 'react';
import { usePerformance } from '../context/PerformanceContext';
import './PerformanceToggle.css';

const PerformanceToggle = () => {
  const { highPerformanceMode, togglePerformanceMode } = usePerformance();
  
  return (
    <div className="performance-toggle">
      <button onClick={togglePerformanceMode} title={highPerformanceMode ? "Désactiver les animations avancées" : "Activer les animations avancées"}>
        <i className={`fas fa-${highPerformanceMode ? 'tachometer-alt' : 'battery-half'}`}></i>
        <span className="toggle-text">{highPerformanceMode ? 'Mode haute performance' : 'Mode économie de données'}</span>
      </button>
    </div>
  );
};

export default PerformanceToggle;