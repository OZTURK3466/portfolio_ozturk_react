import React, { useEffect, useRef } from 'react';
import './VisualElements.css';
import { usePerformance } from '../context/PerformanceContext';

const VisualElements = () => {
  const elementsRef = useRef(null);
  const { highPerformanceMode } = usePerformance();
  
  useEffect(() => {
    if (!elementsRef.current || !highPerformanceMode) return;
    
    // Animer les formes aléatoirement
    const elements = elementsRef.current.querySelectorAll('.floating-element');
    
    elements.forEach(element => {
      // Position aléatoire
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      element.style.left = `${randomX}%`;
      element.style.top = `${randomY}%`;
      
      // Animation aléatoire
      const randomDuration = 15 + Math.random() * 30;
      const randomDelay = Math.random() * 5;
      element.style.animationDuration = `${randomDuration}s`;
      element.style.animationDelay = `${randomDelay}s`;
    });
  }, [highPerformanceMode]);
  
  // Ne pas afficher les éléments visuels en mode basse performance
  if (!highPerformanceMode) return null;
  
  return (
    <div className="visual-elements-container" ref={elementsRef}>
      <div className="floating-element element-circle"></div>
      <div className="floating-element element-square"></div>
      <div className="floating-element element-triangle"></div>
      <div className="floating-element element-donut"></div>
      <div className="floating-element element-plus"></div>
      <div className="floating-element element-zigzag"></div>
      <div className="floating-element element-wave"></div>
    </div>
  );
};

export default VisualElements;