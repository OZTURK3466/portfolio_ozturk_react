import React, { useState } from 'react';
import './CaseStudy.css';

const CaseStudy = () => {
  const [activeCase, setActiveCase] = useState(1);
  
  const cases = [
    {
      id: 1,
      title: "Refonte du site e-commerce Premium",
      client: "Boutique Luxury",
      description: "Transformation complète d'une plateforme e-commerce pour améliorer l'expérience utilisateur, augmenter les conversions et moderniser l'identité visuelle.",
      challenge: "La plateforme existante souffrait d'une interface dépassée, de temps de chargement lents et d'un parcours d'achat complexe qui nuisait aux conversions.",
      solution: "Conception d'une nouvelle architecture technique basée sur React et Node.js, avec un design centré sur l'utilisateur et une optimisation complète des performances.",
      result: "Augmentation de 42% du taux de conversion, réduction de 65% du taux de rebond et croissance de 35% du panier moyen.",
      image: "https://via.placeholder.com/800x500",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      link: "#"
    },
    {
      id: 2,
      title: "Application mobile de fitness",
      client: "HealthTracker",
      description: "Développement d'une application mobile innovante permettant aux utilisateurs de suivre leurs activités sportives, gérer leur nutrition et analyser leurs progrès.",
      challenge: "Créer une interface intuitive capable de présenter des données complexes de manière simple, tout en assurant une synchronisation parfaite entre différents appareils.",
      solution: "Application React Native avec synchronisation en temps réel via Firebase, intégration de visualisations de données avancées et système de notifications personnalisées.",
      result: "Plus de 50 000 téléchargements dans les 3 premiers mois, note moyenne de 4.8/5 sur les stores, et 72% de rétention après 30 jours.",
      image: "https://via.placeholder.com/800x500",
      technologies: ["React Native", "Firebase", "Redux", "D3.js", "Google Fit API"],
      link: "#"
    },
    {
      id: 3,
      title: "Dashboard analytique pour entreprise",
      client: "DataInsight Corp",
      description: "Création d'un tableau de bord analytique complet permettant de visualiser et analyser les données commerciales en temps réel.",
      challenge: "Intégrer des sources de données hétérogènes et permettre une visualisation claire de millions d'enregistrements sans compromettre les performances.",
      solution: "Architecture évolutive avec traitement côté serveur, mise en cache intelligente et rendu optimisé des visualisations avec des techniques de chargement progressif.",
      result: "Réduction de 85% du temps d'analyse pour les équipes, identification de tendances qui ont généré 1.2M€ de revenus supplémentaires, 100% d'adoption par les équipes cibles.",
      image: "https://via.placeholder.com/800x500",
      technologies: ["Vue.js", "Express", "PostgreSQL", "Cube.js", "Docker"],
      link: "#"
    }
  ];
  
  const handleCaseClick = (id) => {
    setActiveCase(id);
  };
  
  const activeProject = cases.find(c => c.id === activeCase);
  
  return (
    <section id="case-studies" className="case-studies-section section">
      <div className="container">
        <h2 className="section-title">Études de cas</h2>
        <p className="section-description">
          Découvrez en détail comment j'ai aidé mes clients à résoudre leurs problèmes et à atteindre leurs objectifs.
        </p>
        
        <div className="cases-navigation">
          {cases.map((caseItem) => (
            <div 
              key={caseItem.id}
              className={`case-nav-item ${activeCase === caseItem.id ? 'active' : ''}`}
              onClick={() => handleCaseClick(caseItem.id)}
            >
              <span className="case-number">0{caseItem.id}</span>
              <h3 className="case-title">{caseItem.title}</h3>
              <p className="case-client">{caseItem.client}</p>
            </div>
          ))}
        </div>
        
        <div className="case-content">
          <div className="case-image">
            <img src={activeProject.image} alt={activeProject.title} />
            <div className="case-overlay">
              <div className="case-client-logo">
                {/* Client logo would go here */}
                <div className="placeholder-logo">{activeProject.client.charAt(0)}</div>
              </div>
            </div>
          </div>
          
          <div className="case-details">
            <div className="case-section">
              <h4>Le défi</h4>
              <p>{activeProject.challenge}</p>
            </div>
            
            <div className="case-section">
              <h4>La solution</h4>
              <p>{activeProject.solution}</p>
            </div>
            
            <div className="case-section">
              <h4>Les résultats</h4>
              <p>{activeProject.result}</p>
            </div>
            
            <div className="case-techs">
              <h4>Technologies utilisées</h4>
              <div className="tech-tags">
                {activeProject.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="case-cta">
              <a href={activeProject.link} className="btn gradient-button" data-cursor-text="Voir">
                Voir le projet complet
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;