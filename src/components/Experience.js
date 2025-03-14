import React, { useEffect, useRef } from 'react';
import './Experience.css';

const Experience = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      timelineItems.forEach(item => {
        observer.observe(item);
      });
    }

    return () => {
      if (timelineRef.current) {
        const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
          observer.unobserve(item);
        });
      }
    };
  }, []);

  const experiences = [
    {
      id: 1,
      title: "Développeur Full Stack",
      company: "Entreprise Innovante",
      period: "Janvier 2023 - Présent",
      description: "Développement d'applications web modernes en utilisant React, Node.js et MongoDB. Mise en œuvre d'interfaces utilisateur réactives et maintenance des API REST.",
      skills: ["React", "Node.js", "MongoDB", "REST API", "GraphQL"]
    },
    {
      id: 2,
      title: "Développeur Front-end",
      company: "Startup Technologique",
      period: "Mai 2021 - Décembre 2022",
      description: "Création d'interfaces utilisateur responsives et conversion de maquettes en code HTML/CSS/JS. Optimisation des performances et implémentation des meilleures pratiques d'accessibilité.",
      skills: ["JavaScript", "HTML5", "CSS3", "Sass", "Webpack"]
    },
    {
      id: 3,
      title: "Développeur Web Junior",
      company: "Agence Web Créative",
      period: "Février 2020 - Avril 2021",
      description: "Participation au développement de sites web pour divers clients. Travail en équipe pour livrer des projets dans les délais et assistance à la maintenance de sites existants.",
      skills: ["WordPress", "PHP", "jQuery", "Bootstrap", "UI/UX"]
    },
    {
      id: 4,
      title: "Stage en Développement Web",
      company: "Studio Digital",
      period: "Septembre 2019 - Janvier 2020",
      description: "Stage de fin d'études axé sur l'apprentissage des technologies web modernes. Contribution à des projets clients sous supervision.",
      skills: ["HTML", "CSS", "JavaScript", "Responsive Design"]
    }
  ];

  return (
    <section id="experience" className="experience section">
      <div className="container">
        <h2 className="section-title">Mon Expérience</h2>
        
        <div className="timeline" ref={timelineRef}>
          {experiences.map((exp, index) => (
            <div key={exp.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-content">
                <div className="timeline-date">{exp.period}</div>
                <h3 className="timeline-title">{exp.title}</h3>
                <h4 className="timeline-company">{exp.company}</h4>
                <p className="timeline-description">{exp.description}</p>
                <div className="timeline-skills">
                  {exp.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;