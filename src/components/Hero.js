import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';
import { scrollToSection } from '../utils/scrollUtils';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const titleRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    const handleLoad = () => {
      setIsLoaded(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('load', handleLoad);

    // Si la page est déjà chargée
    if (document.readyState === 'complete') {
      setIsLoaded(true);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId, e);
  };

  return (
    <section id="home" className={`hero section ${isLoaded ? 'loaded' : ''}`}>
      <div className="hero-background" style={{
        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
      }}></div>
      <div className="container hero-container">
        <div className="hero-content">
          <h4 className="subtitle slide-in-left">{t('hero.greeting')}</h4>
          <h1 className="title" ref={titleRef}>Votre Nom</h1>
          <h3 className="profession slide-in-right">{t('hero.profession')}</h3>
          <p className="description fade-in">
            {t('hero.description')}
          </p>
          <div className="hero-buttons slide-up">
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, 'projects')}
              className="btn btn-primary"
              data-cursor-text={t('hero.cta.projects')}
            >
              {t('hero.cta.projects')}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="btn btn-secondary"
              data-cursor-text={t('hero.cta.contact')}
            >
              {t('hero.cta.contact')}
            </a>
          </div>
        </div>
        <div className="hero-shape float-animation"></div>
        <div className="hero-socials fade-in">
          <a href="#" className="social-link"><i className="fab fa-github"></i></a>
          <a href="#" className="social-link"><i className="fab fa-linkedin"></i></a>
          <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
        </div>
      </div>
      <div className="scroll-down">
        <span></span>
        <span></span>
      </div>
    </section>
  );
};

export default Hero;