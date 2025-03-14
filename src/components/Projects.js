// components/Projects.js
import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';
import ProjectsFilter from './ProjectsFilter';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const projectsRef = useRef(null);
  const [animatedItems, setAnimatedItems] = useState([]);
  
  // Définir les catégories comme constante
  const categories = [
    { value: 'web', label: 'Web' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'design', label: 'Design' }
  ];
  
  const projects = [
    {
      id: 1,
      title: "Site web e-commerce",
      category: "web",
      image: "https://via.placeholder.com/400x300",
      description: "Site e-commerce responsive avec panier, paiement et gestion de compte utilisateur.",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "#",
      github: "#"
    },
    {
      id: 2,
      title: "Application mobile fitness",
      category: "mobile",
      image: "https://via.placeholder.com/400x300",
      description: "Application mobile pour suivre les activités physiques et établir des routines d'entraînement.",
      technologies: ["React Native", "Firebase"],
      link: "#",
      github: "#"
    },
    {
      id: 3,
      title: "Tableau de bord analytics",
      category: "web",
      image: "https://via.placeholder.com/400x300",
      description: "Interface d'administration avec visualisation de données complexes et rapports en temps réel.",
      technologies: ["React", "D3.js", "Express"],
      link: "#",
      github: "#"
    },
    {
      id: 4,
      title: "Application de gestion de tâches",
      category: "web",
      image: "https://via.placeholder.com/400x300",
      description: "Application web de gestion de tâches avec fonctionnalités de collaboration et notifications.",
      technologies: ["React", "Redux", "Firebase"],
      link: "#",
      github: "#"
    },
    {
      id: 5,
      title: "Site portfolio photographe",
      category: "design",
      image: "https://via.placeholder.com/400x300",
      description: "Portfolio élégant pour un photographe professionnel avec galerie d'images optimisée.",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      link: "#",
      github: "#"
    },
    {
      id: 6,
      title: "Application de réservation",
      category: "mobile",
      image: "https://via.placeholder.com/400x300",
      description: "Application permettant aux utilisateurs de réserver des services avec paiement intégré.",
      technologies: ["React Native", "Node.js", "Stripe"],
      link: "#",
      github: "#"
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedItems(prev => [...prev, entry.target.dataset.id]);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (projectsRef.current) {
      const projectItems = projectsRef.current.querySelectorAll('.project-card');
      projectItems.forEach(item => {
        observer.observe(item);
      });
    }

    return () => {
      if (projectsRef.current) {
        const projectItems = projectsRef.current.querySelectorAll('.project-card');
        projectItems.forEach(item => {
          observer.unobserve(item);
        });
      }
    };
  }, [filter]);

  const handleFilterClick = (category) => {
    setFilter(category);
    setAnimatedItems([]);
  };
  
  return (
    <section id="projects" className="projects section">
      <div className="container">
        <h2 className="section-title">Mes projets</h2>
        
        <ProjectsFilter 
          onFilterChange={handleFilterClick} 
          categories={categories} 
        />
        
        <div className="projects-grid" ref={projectsRef}>
          {projects
            .filter(project => filter === 'all' || project.category === filter)
            .map(project => (
              <div 
                key={project.id} 
                className={`project-card physics-animation ${animatedItems.includes(project.id.toString()) ? 'animate' : ''}`}
                data-id={project.id}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} className="distort-image" data-effect="wave" />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href={project.link} className="project-link" title="Voir le projet" data-cursor-text="Voir">
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                      <a href={project.github} className="project-link" title="Voir sur GitHub" data-cursor-text="Code">
                        <i className="fab fa-github"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
        
        <div className="projects-cta">
          <a href="#" className="btn gradient-button" data-cursor-text="Tous">
            Voir plus de projets
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;