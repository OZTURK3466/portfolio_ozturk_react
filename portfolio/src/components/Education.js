import React, { useEffect, useRef } from 'react';
import './Education.css';

const Education = () => {
  const educationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.3 }
    );

    if (educationRef.current) {
      observer.observe(educationRef.current);
    }

    return () => {
      if (educationRef.current) {
        observer.unobserve(educationRef.current);
      }
    };
  }, []);

  const educations = [
    {
      id: 1,
      degree: "Master en Développement Web",
      institution: "Université Numérique",
      period: "2017 - 2019",
      description: "Formation approfondie en développement web full stack avec spécialisation en technologies JavaScript modernes et architecture de systèmes distribués.",
      achievements: ["Major de promotion", "Projet de fin d'études primé"]
    },
    {
      id: 2,
      degree: "Licence en Informatique",
      institution: "Institut Technologique",
      period: "2014 - 2017",
      description: "Formation couvrant les fondamentaux de l'informatique, les algorithmes, les structures de données et l'initiation au développement web et mobile.",
      achievements: ["Mention Bien", "Stage de 6 mois en entreprise"]
    },
    {
      id: 3,
      degree: "Baccalauréat Scientifique",
      institution: "Lycée Innovation",
      period: "2011 - 2014",
      description: "Parcours scientifique avec option Mathématiques et Informatique.",
      achievements: ["Mention Très Bien"]
    }
  ];

  return (
    <section id="education" className="education section">
      <div className="container">
        <h2 className="section-title">Ma Formation</h2>
        
        <div className="education-container" ref={educationRef}>
          {educations.map((edu) => (
            <div key={edu.id} className="education-card">
              <div className="education-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className="education-content">
                <div className="education-period">{edu.period}</div>
                <h3 className="education-degree">{edu.degree}</h3>
                <h4 className="education-institution">{edu.institution}</h4>
                <p className="education-description">{edu.description}</p>
                {edu.achievements.length > 0 && (
                  <div className="education-achievements">
                    <h5>Réalisations :</h5>
                    <ul>
                      {edu.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;