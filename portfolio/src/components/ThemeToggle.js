import React, { useEffect, useState } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (currentTheme === null && prefersDarkScheme.matches)) {
      setIsDarkMode(true);
      document.body.classList.add('dark-theme');
    } else {
      setIsDarkMode(false);
      document.body.classList.remove('dark-theme');
    }
  }, []);
  
  const toggleTheme = () => {
    document.body.classList.add('theme-transition');
    
    if (isDarkMode) {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    }
    
    setIsDarkMode(!isDarkMode);
    
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 1000);
  };
  
  return (
    <button className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`} onClick={toggleTheme} aria-label="Toggle Dark Mode">
      <div className="toggle-track">
        <div className="toggle-indicator">
          <div className="indicator-inner">
            {isDarkMode ? (
              <span className="moon-icon">🌙</span>
            ) : (
              <span className="sun-icon">☀️</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;