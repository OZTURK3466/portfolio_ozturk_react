import React, { useState, useEffect } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [cursorType, setCursorType] = useState('default'); // 'default', 'link', 'button', 'text', 'image'
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  
  useEffect(() => {
    // Petit délai pour éviter l'apparition du curseur au chargement
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 1000);
    
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    // Détection d'éléments interactifs pour changer le type de curseur
    const handleElementDetection = () => {
      const elements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card, .distort-image');
      
      elements.forEach(el => {
        // Gestion de l'entrée de l'élément
        el.addEventListener('mouseenter', () => {
          // Détecter le type d'élément
          if (el.tagName === 'A' || el.tagName === 'BUTTON') {
            setCursorType('link');
            
            // Obtenir l'attribut data-cursor-text s'il existe
            const text = el.getAttribute('data-cursor-text');
            if (text) setCursorText(text);
          } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            setCursorType('text');
            setCursorText('');
          } else if (el.classList.contains('project-card')) {
            setCursorType('view');
            setCursorText('Voir');
          } else if (el.classList.contains('skill-card')) {
            setCursorType('button');
            setCursorText('');
          } else if (el.classList.contains('distort-image')) {
            setCursorType('image');
            setCursorText('');
          }
        });
        
        // Gestion de la sortie de l'élément
        el.addEventListener('mouseleave', () => {
          setCursorType('default');
          setCursorText('');
        });
      });
    };
    
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    
    // Initialiser la détection d'éléments
    handleElementDetection();
    
    // Observer les changements dans le DOM pour mettre à jour les éléments détectés
    const observer = new MutationObserver(handleElementDetection);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [isVisible]);
  
  if (!hasEntered) return null;
  
  return (
    <>
      <div 
        className={`cursor-dot ${clicked ? 'clicked' : ''} ${cursorType} ${isVisible ? 'visible' : 'hidden'}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`cursor-outline ${clicked ? 'clicked' : ''} ${cursorType} ${isVisible ? 'visible' : 'hidden'}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      >
        {cursorText && <span className="cursor-text">{cursorText}</span>}
      </div>
    </>
  );
};

export default CustomCursor;