import React, { useEffect, useState, useRef } from 'react';
import './GestureNavigation.css';
import { scrollToSection } from '../utils/scrollUtils';

const GestureNavigation = () => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [direction, setDirection] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Liste des sections dans l'ordre
  const sections = [
    'home',
    'about',
    'skills',
    'experience',
    'education',
    'projects',
    'testimonials',
    'contact'
  ];
  
  // Détecter si c'est mobile au montage du composant
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Détecter la section actuelle au défilement
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      let currentSectionIndex = 0;
      
      document.querySelectorAll('section').forEach((section, index) => {
        const sectionTop = section.offsetTop - windowHeight / 3;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSectionIndex = index;
        }
      });
      
      setCurrentSection(currentSectionIndex);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Gestion des gestes tactiles
  useEffect(() => {
    // Seuil minimal de glissement pour détecter le geste (en pixels)
    const minSwipeDistance = 50;
    
    const onTouchStart = (e) => {
      setTouchEnd(null);
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      });
    };
    
    const onTouchMove = (e) => {
      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      });
    };
    
    const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      
      const distanceX = touchStart.x - touchEnd.x;
      const distanceY = touchStart.y - touchEnd.y;
      const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
      
      // Si c'est un glissement vertical et assez long
      if (!isHorizontalSwipe && Math.abs(distanceY) > minSwipeDistance) {
        if (distanceY > 0) {
          // Glissement vers le haut (section suivante)
          setDirection('up');
          const nextSection = currentSection + 1;
          if (nextSection < sections.length) {
            scrollToSection(sections[nextSection]);
          }
        } else {
          // Glissement vers le bas (section précédente)
          setDirection('down');
          const prevSection = currentSection - 1;
          if (prevSection >= 0) {
            scrollToSection(sections[prevSection]);
          }
        }
        
        // Montrer l'indicateur de direction
        setShowIndicator(true);
        setTimeout(() => {
          setShowIndicator(false);
        }, 1000);
      }
    };
    
    // Ajouter les écouteurs d'événements tactiles
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [touchStart, touchEnd, currentSection, sections]);
  
  // Si ce n'est pas un appareil mobile, ne pas afficher le composant
  if (!isMobile) return null;
  
  return (
    <div className="gesture-navigation">
      {showIndicator && (
        <div className={`direction-indicator ${direction}`}>
          <i className={`fas fa-chevron-${direction === 'up' ? 'up' : 'down'}`}></i>
        </div>
      )}
      
      <div className="section-indicator">
        {sections.map((section, index) => (
          <div 
            key={section}
            className={`indicator-dot ${index === currentSection ? 'active' : ''}`}
            onClick={() => scrollToSection(section)}
          />
        ))}
      </div>
    </div>
  );
};

export default GestureNavigation;