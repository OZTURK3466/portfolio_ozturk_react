import React from 'react';
import './WorkDesk.css';

const WorkDesk = () => {
  const tools = [
    {
      name: "Visual Studio Code",
      icon: "fas fa-code",
      category: "Éditeur",
      description: "Mon éditeur de code préféré avec une configuration personnalisée pour maximiser ma productivité."
    },
    {
      name: "Figma",
      icon: "fab fa-figma",
      category: "Design",
      description: "Pour concevoir des interfaces avant de les coder et collaborer efficacement avec les designers."
    },
    {
      name: "Chrome DevTools",
      icon: "fab fa-chrome",
      category: "Développement",
      description: "Indispensable pour déboguer et optimiser les performances des applications web."
    },
    {
      name: "Terminal & Git",
      icon: "fas fa-terminal",
      category: "Développement",
      description: "Configuration personnalisée avec Oh My Zsh pour une expérience de ligne de commande optimale."
    },
    {
      name: "Notion",
      icon: "fas fa-book",
      category: "Organisation",
      description: "Pour la documentation, les notes de projet et la gestion des tâches au quotidien."
    },
    {
      name: "Spotify",
      icon: "fab fa-spotify",
      category: "Productivité",
      description: "Ma playlist de concentration pour rester dans le flux pendant les sessions de codage."
    }
  ];
  
  return (
    <section id="work-desk" className="work-desk-section section">
      <div className="container">
        <h2 className="section-title">Sur mon bureau</h2>
        <p className="section-description">
          Découvrez les outils qui m'accompagnent au quotidien et me permettent de créer des expériences web exceptionnelles.
        </p>
        
        <div className="desk-container">
          <div className="desk-illustration">
            <div className="desk-workspace">
              <div className="desk-laptop">
                <div className="laptop-screen">
                  <div className="laptop-content">
                    <div className="code-lines">
                      <div className="code-line"></div>
                      <div className="code-line"></div>
                      <div className="code-line"></div>
                      <div className="code-line"></div>
                      <div className="code-line"></div>
                    </div>
                  </div>
                </div>
                <div className="laptop-keyboard"></div>
              </div>
              
              <div className="desk-accessories">
                <div className="accessory coffee-mug"></div>
                <div className="accessory notebook"></div>
                <div className="accessory plant"></div>
              </div>
            </div>
          </div>
          
          <div className="tools-grid">
            {tools.map((tool, index) => (
              <div key={index} className="tool-card" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="tool-icon">
                  <i className={tool.icon}></i>
                </div>
                <div className="tool-content">
                  <div className="tool-category">{tool.category}</div>
                  <h3 className="tool-name">{tool.name}</h3>
                  <p className="tool-description">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkDesk;