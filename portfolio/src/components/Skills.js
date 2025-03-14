import React, { useEffect, useRef } from 'react';
import './Skills.css';

const Skills = () => {
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.skill-progress');
          bars.forEach((bar) => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
          });
        }
      },
      { threshold: 0.3 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <h2 className="section-title">Mes compétences</h2>
        <div className="skills-container">
          <div className="skills-category">
            <h3>Développement Frontend</h3>
            <div className="skills-grid" ref={skillsRef}>
              <div className="skill-item">
                <div className="skill-info">
                  <h4>HTML5 & CSS3</h4>
                  <span>95%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="95%"></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-info">
                  <h4>JavaScript</h4>
                  <span>90%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="90%"></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-info">
                  <h4>React</h4>
                  <span>85%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="85%"></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-info">
                  <h4>SASS/SCSS</h4>
                  <span>80%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="80%"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="skills-category">
            <h3>Autres compétences</h3>
            <div className="skills-cards">
              <div className="skill-card">
                <div className="skill-card-icon">
                  <i className="fas fa-database"></i>
                </div>
                <h4>Backend</h4>
                <p>Node.js, Express, MongoDB</p>
              </div>
              <div className="skill-card">
                <div className="skill-card-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h4>Design responsive</h4>
                <p>Mobile-first, Design adaptatif</p>
              </div>
              <div className="skill-card">
                <div className="skill-card-icon">
                  <i className="fas fa-code-branch"></i>
                </div>
                <h4>Contrôle de version</h4>
                <p>Git, GitHub, GitLab</p>
              </div>
              <div className="skill-card">
                <div className="skill-card-icon">
                  <i className="fas fa-tools"></i>
                </div>
                <h4>Outils</h4>
                <p>Webpack, NPM, VS Code</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;