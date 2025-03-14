import React, { createContext, useState, useContext } from 'react';

// Créer le contexte
const PerformanceContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance doit être utilisé à l\'intérieur d\'un PerformanceProvider');
  }
  return context;
};

// Provider du contexte
export const PerformanceProvider = ({ children }) => {
  // État pour le mode haute performance
  const [highPerformanceMode, setHighPerformanceMode] = useState(() => {
    // Récupérer la préférence de l'utilisateur du localStorage
    const savedPreference = localStorage.getItem('highPerformanceMode');
    return savedPreference === 'true';
  });

  // Fonction pour basculer le mode de performance
  const togglePerformanceMode = () => {
    setHighPerformanceMode(prev => {
      const newValue = !prev;
      // Stocker la préférence dans localStorage
      localStorage.setItem('highPerformanceMode', newValue);
      return newValue;
    });
  };

  // Valeurs à fournir via le contexte
  const value = {
    highPerformanceMode,
    togglePerformanceMode
  };

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
};