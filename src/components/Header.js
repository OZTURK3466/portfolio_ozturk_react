// components/Header.js
import React, { useState, useEffect } from 'react';
import './Header.css';
import { scrollToSection } from '../utils/scrollUtils';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const { t } = useLanguage(); // Utilisez le hook de contexte
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [navHovered, setNavHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId, e);
    setMenuOpen(false);
  };

  return (
    <header 
      className={`header ${scrolled ? 'side-nav' : ''} ${navHovered ? 'hovered' : ''} ${menuOpen ? 'menu-open' : ''}`}
      onMouseEnter={() => scrolled && setNavHovered(true)}
      onMouseLeave={() => scrolled && setNavHovered(false)}
    >
      <div className="container header-container">
        <div className="logo">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Portfolio</a>
        </div>
        
        <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <ul>
            <li className={activeSection === 'home' ? 'active' : ''}>
              <a 
                href="#home" 
                onClick={(e) => handleNavClick(e, 'home')}
                className={activeSection === 'home' ? 'active' : ''}
              >
                <span className="nav-dot"></span>
                <span className="nav-text">{t('header.home')}</span>
              </a>
            </li>
            <li className={activeSection === 'about' ? 'active' : ''}>
              <a 
                href="#about" 
                onClick={(e) => handleNavClick(e, 'about')}
                className={activeSection === 'about' ? 'active' : ''}
              >
                <span className="nav-dot"></span>
                <span className="nav-text">{t('header.about')}</span>
              </a>
            </li>
            <li className={activeSection === 'skills' ? 'active' : ''}>
              <a 
                href="#skills" 
                onClick={(e) => handleNavClick(e, 'skills')}
                className={activeSection === 'skills' ? 'active' : ''}
              >
                <span className="nav-dot"></span>
                <span className="nav-text">{t('header.skills')}</span>
              </a>
            </li>
            <li className={activeSection === 'projects' ? 'active' : ''}>
              <a 
                href="#projects" 
                onClick={(e) => handleNavClick(e, 'projects')}
                className={activeSection === 'projects' ? 'active' : ''}
              >
                <span className="nav-dot"></span>
                <span className="nav-text">{t('header.projects')}</span>
              </a>
            </li>
            <li className={activeSection === 'contact' ? 'active' : ''}>
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')}
                className={activeSection === 'contact' ? 'active' : ''}
              >
                <span className="nav-dot"></span>
                <span className="nav-text">{t('header.contact')}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;