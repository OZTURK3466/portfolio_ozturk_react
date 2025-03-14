import React, { useEffect, useRef, useState } from 'react';
import './MetricsSection.css';

const MetricsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Métrique avec animation de comptage
  const Metric = ({ value, symbol, label, duration }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!isVisible) return;
      
      let start = 0;
      const end = parseInt(value);
      const incrementTime = Math.floor(duration / end) || 1;
      
      // Ne pas dépasser 50 ms d'intervalle pour éviter les animations trop lentes
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, Math.max(incrementTime, 20));
      
      return () => {
        clearInterval(timer);
      };
    }, [value, duration, isVisible]);
    
    return (
      <div className="metric-item">
        <div className="metric-value">
          <span className="counter">{count}</span>
          <span className="symbol">{symbol}</span>
        </div>
        <div className="metric-label">{label}</div>
      </div>
    );
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section className="metrics-section section" ref={sectionRef}>
      <div className="container">
        <div className="metrics-container">
          <Metric 
            value="15" 
            symbol="+" 
            label="Projets réalisés" 
            duration={1500} 
          />
          <Metric 
            value="98" 
            symbol="%" 
            label="Satisfaction client" 
            duration={2000} 
          />
          <Metric 
            value="42" 
            symbol="%" 
            label="Taux de conversion moyen" 
            duration={1800} 
          />
          <Metric 
            value="3" 
            symbol="ans" 
            label="Expérience professionnelle" 
            duration={1000} 
          />
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;

