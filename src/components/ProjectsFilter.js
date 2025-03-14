import React, { useState, useEffect, useRef } from 'react';
import './ProjectsFilter.css';

const ProjectsFilter = ({ onFilterChange, categories }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const filterRef = useRef(null);
  
  // Détection de clic en dehors du filtre pour le fermer sur mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFiltersVisible(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
    
    // Fermer le filtre sur mobile après sélection
    if (window.innerWidth < 768) {
      setFiltersVisible(false);
    }
  };
  
  return (
    <div className="projects-filter-wrapper" ref={filterRef}>
      <button className="filter-toggle" onClick={() => setFiltersVisible(!filtersVisible)}>
        <span>Filtrer</span>
        <span className="filter-count">{activeFilter !== 'all' ? '1' : '0'}</span>
        <i className={`fas fa-chevron-${filtersVisible ? 'up' : 'down'}`}></i>
      </button>
      
      <div className={`projects-filter ${filtersVisible ? 'visible' : ''}`}>
        <button 
          className={activeFilter === 'all' ? 'active' : ''} 
          onClick={() => handleFilterClick('all')}
        >
          <span className="filter-dot"></span>
          <span className="filter-text">Tous les projets</span>
        </button>
        
        {categories.map((category) => (
          <button 
            key={category.value}
            className={activeFilter === category.value ? 'active' : ''} 
            onClick={() => handleFilterClick(category.value)}
          >
            <span className="filter-dot"></span>
            <span className="filter-text">{category.label}</span>
          </button>
        ))}
        
        {activeFilter !== 'all' && (
          <button className="reset-filter" onClick={() => handleFilterClick('all')}>
            <i className="fas fa-times"></i>
            <span>Réinitialiser</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectsFilter;