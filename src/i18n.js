// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importation des traductions
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';

// Configuration simplifiée et robuste
const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'fr', // Langue par défaut
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false // Important pour éviter des problèmes avec Suspense
    }
  });

// Fonction pour changer la langue de manière fiable
export const changeLanguage = (lng) => {
  localStorage.setItem('language', lng);
  window.location.reload(); // Force le rechargement pour appliquer la nouvelle langue
};

export default i18n;