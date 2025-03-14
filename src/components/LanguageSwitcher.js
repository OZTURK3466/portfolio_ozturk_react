// components/LanguageSwitcher.js
import React, { useState } from 'react';
import './LanguageSwitcher.css';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { language, changeLanguage } = useLanguage();
  
  const handleLanguageChange = (lng) => {
    changeLanguage(lng);
    setDropdownOpen(false);
  };

  return (
    <div className="language-switcher">
      <div 
        className="current-language" 
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span className="language-icon">
          <i className="fas fa-globe"></i>
        </span>
        <span className="language-name">{language.toUpperCase()}</span>
        <span className="language-arrow">
          <i className={`fas fa-chevron-${dropdownOpen ? 'up' : 'down'}`}></i>
        </span>
      </div>

      {dropdownOpen && (
        <div className="language-options">
          <button 
            className={language === 'fr' ? 'active' : ''} 
            onClick={() => handleLanguageChange('fr')}
          >
            <span className="language-flag">🇫🇷</span>
            <span>Français</span>
          </button>

          <button 
            className={language === 'en' ? 'active' : ''} 
            onClick={() => handleLanguageChange('en')}
          >
            <span className="language-flag">🇬🇧</span>
            <span>English</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;