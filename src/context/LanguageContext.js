// src/context/LanguageContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import i18n from '../i18n';

// Créer le contexte
const LanguageContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useLanguage = () => {
  return useContext(LanguageContext);
};

// Provider du contexte
export const LanguageProvider = ({ children }) => {
  // État pour stocker la langue actuelle
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'fr';
  });

  // Mettre à jour i18n et localStorage quand la langue change
  useEffect(() => {
    console.log("Changement de langue dans le contexte:", language);
    localStorage.setItem('language', language);
    i18n.changeLanguage(language);
  }, [language]);

  // Fonction pour changer la langue
  const changeLanguage = (lang) => {
    console.log("Changement de langue demandé:", lang);
    if (lang !== language) {
      setLanguage(lang);
      // Force le rechargement de la page pour s'assurer que tout est mis à jour
      window.location.reload();
    }
  };

  // Valeur fournie par le contexte
  const value = {
    language,
    changeLanguage,
    t: (key) => i18n.t(key) // Raccourci pour la fonction de traduction
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};