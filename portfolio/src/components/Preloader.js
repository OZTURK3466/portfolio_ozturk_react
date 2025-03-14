import React, { useState, useEffect } from 'react';
import './Preloader.css';

const Preloader = ({ onFinishLoading }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  
  const loadingTexts = [
    "Préparation de l'environnement...",
    "Chargement des projets...",
    "Polissage des animations...",
    "Presque prêt...",
    "Bienvenue dans mon univers !"
  ];
  
  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setProgress(prev => {
        // Calculer la nouvelle valeur de progression
        const next = prev + Math.random() * 2;
        
        // Mettre à jour le texte en fonction de la progression
        const textProgress = Math.floor(next / 20); // Changer le texte toutes les 20%
        if (textProgress !== Math.floor(prev / 20) && textProgress < loadingTexts.length) {
          setTextIndex(textProgress);
        }
        
        // Si nous avons atteint 100%, finir le chargement
        if (next >= 100) {
          clearInterval(loadingInterval);
          // Attendre un peu pour que l'utilisateur voie 100% et le dernier message
          setTimeout(() => {
            onFinishLoading();
          }, 500);
          return 100;
        }
        
        return next;
      });
    }, 100);
    
    return () => clearInterval(loadingInterval);
  }, [onFinishLoading, loadingTexts.length]);
  
  return (
    <div className="preloader">
      <div className="preloader-content">
        <div className="preloader-logo">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#6c63ff" strokeWidth="2" />
            <path 
              d="M50 10 A40 40 0 0 1 90 50" 
              fill="none" 
              stroke="#6c63ff" 
              strokeWidth="5" 
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset={100 - progress}
            />
            <path 
              d="M90 50 A40 40 0 0 1 50 90" 
              fill="none" 
              stroke="#6c63ff" 
              strokeWidth="5" 
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset={Math.max(0, 100 - (progress - 33))}
            />
            <path 
              d="M50 90 A40 40 0 0 1 10 50" 
              fill="none" 
              stroke="#6c63ff" 
              strokeWidth="5" 
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset={Math.max(0, 100 - (progress - 66))}
            />
            <text x="50" y="55" textAnchor="middle" fill="#6c63ff" fontSize="16">{Math.round(progress)}%</text>
          </svg>
        </div>
        <div className="preloader-text">{loadingTexts[textIndex]}</div>
      </div>
    </div>
  );
};

export default Preloader;