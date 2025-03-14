import React from 'react';
import './TechStack.css';

const TechStack = () => {
  const technologies = [
    {
      name: "HTML5",
      icon: "fab fa-html5",
      category: "Frontend",
      level: 95
    },
    {
      name: "CSS3",
      icon: "fab fa-css3-alt",
      category: "Frontend",
      level: 90
    },
    {
      name: "JavaScript",
      icon: "fab fa-js",
      category: "Frontend",
      level: 90
    },
    {
      name: "React",
      icon: "fab fa-react",
      category: "Frontend",
      level: 85
    },
    {
      name: "Node.js",
      icon: "fab fa-node-js",
      category: "Backend",
      level: 80
    },
    {
      name: "Python",
      icon: "fab fa-python",
      category: "Backend",
      level: 75
    },
    {
      name: "MongoDB",
      icon: "fas fa-database",
      category: "Database",
      level: 75
    },
    {
      name: "Git",
      icon: "fab fa-git-alt",
      category: "Tools",
      level: 85
    },
    {
      name: "Docker",
      icon: "fab fa-docker",
      category: "DevOps",
      level: 70
    },
    {
      name: "AWS",
      icon: "fab fa-aws",
      category: "Cloud",
      level: 65
    },
    {
      name: "Figma",
      icon: "fab fa-figma",
      category: "Design",
      level: 80
    },
    {
      name: "SASS",
      icon: "fab fa-sass",
      category: "Frontend",
      level: 85
    }
  ];
  
  // Groupe les technologies par catégorie
  const categorizedTech = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {});
  
  // Obtenir les catégories uniques
  const categories = Object.keys(categorizedTech);
  
  return (
    <section id="tech-stack" className="tech-stack-section section">
      <div className="container">
        <h2 className="section-title">Mes technologies</h2>
        <p className="section-description">
          Les langages, frameworks et outils que j'utilise au quotidien pour créer des expériences web modernes et performantes.
        </p>
        
        <div className="tech-categories">
          {categories.map((category) => (
            <div key={category} className="tech-category">
              <h3 className="category-title">{category}</h3>
              <div className="tech-list">
                {categorizedTech[category].map((tech) => (
                  <div key={tech.name} className="tech-item">
                    <div className="tech-icon">
                      <i className={tech.icon}></i>
                    </div>
                    <div className="tech-details">
                      <div className="tech-name">{tech.name}</div>
                      <div className="tech-level">
                        <div className="level-bar">
                          <div 
                            className="level-fill" 
                            style={{ width: `${tech.level}%` }}
                          ></div>
                        </div>
                        <div className="level-text">{tech.level}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;