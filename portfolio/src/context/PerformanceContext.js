import React, { createContext, useState, useContext, useEffect } from 'react';

const PerformanceContext = createContext();

export const PerformanceProvider = ({ children }) => {
  const [highPerformanceMode, setHighPerformanceMode] = useState(true);
  
  // Vérifier les préférences de l'utilisateur
  useEffect(() => {
    const savedPreference = localStorage.getItem('highPerformanceMode');
    if (savedPreference !== null) {
      setHighPerformanceMode(savedPreference === 'true');
    } else {
      // Détection automatique basée sur les capacités de l'appareil
      const isLowEndDevice = 
        !window.devicePixelRatio || 
        window.devicePixelRatio === 1 || 
        navigator.hardwareConcurrency <= 4;
      
      if (isLowEndDevice) {
        setHighPerformanceMode(false);
      }
    }
  }, []);
  
  // Sauvegarder la préférence
  const togglePerformanceMode = () => {
    const newValue = !highPerformanceMode;
    setHighPerformanceMode(newValue);
    localStorage.setItem('highPerformanceMode', newValue.toString());
  };
  
  return (
    <PerformanceContext.Provider value={{ highPerformanceMode, togglePerformanceMode }}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => useContext(PerformanceContext);