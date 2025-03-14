import React, { useState } from 'react';
import './WorkProcess.css';

const WorkProcess = () => {
  const [activeStep, setActiveStep] = useState(1);
  
  const steps = [
    {
      id: 1,
      title: "Découverte",
      description: "Je commence par comprendre vos besoins, vos objectifs et votre vision. Cette phase inclut des entretiens, une analyse concurrentielle et la définition des critères de réussite.",
      icon: "fas fa-search"
    },
    {
      id: 2,
      title: "Stratégie",
      description: "Je définis une stratégie claire en élaborant les spécifications techniques, l'architecture de l'information et la planification des fonctionnalités.",
      icon: "fas fa-chess"
    },
    {
      id: 3,
      title: "Conception",
      description: "La phase de création visuelle et d'expérience utilisateur, où les wireframes et prototypes prennent forme en harmonie avec votre identité visuelle.",
      icon: "fas fa-pencil-ruler"
    },
    {
      id: 4,
      title: "Développement",
      description: "Transformation des concepts en code, en utilisant les technologies les plus adaptées à votre projet tout en maintenant une qualité technique optimale.",
      icon: "fas fa-code"
    },
    {
      id: 5,
      title: "Tests",
      description: "Chaque fonctionnalité est rigoureusement testée pour assurer la qualité, la performance et la compatibilité sur tous les appareils et navigateurs.",
      icon: "fas fa-vial"
    },
    {
      id: 6,
      title: "Livraison",
      description: "Déploiement du projet avec documentation et formation pour vous permettre de prendre le contrôle de votre nouvelle solution numérique.",
      icon: "fas fa-rocket"
    }
  ];
  
  const handleStepClick = (id) => {
    setActiveStep(id);
  };
  
  return (
    <section id="process" className="process-section section">
      <div className="container">
        <h2 className="section-title">Mon processus de travail</h2>
        <p className="section-description">
          Une méthodologie éprouvée pour transformer vos idées en solutions digitales exceptionnelles.
        </p>
        
        <div className="process-container">
          <div className="steps-indicators">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`step-indicator ${activeStep === step.id ? 'active' : ''}`}
                onClick={() => handleStepClick(step.id)}
              >
                <div className="step-icon">
                  <i className={step.icon}></i>
                </div>
                <div className="step-title">{step.title}</div>
                <div className="step-number">{step.id}</div>
              </div>
            ))}
          </div>
          
          <div className="step-details">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`step-detail ${activeStep === step.id ? 'active' : ''}`}
              >
                <div className="step-detail-icon">
                  <i className={step.icon}></i>
                </div>
                <h3 className="step-detail-title">Phase {step.id}: {step.title}</h3>
                <p className="step-detail-description">{step.description}</p>
                
                {step.id === 1 && (
                  <div className="step-features">
                    <div className="step-feature">
                      <i className="fas fa-comments"></i>
                      <span>Entretiens approfondis</span>
                    </div>
                    <div className="step-feature">
                      <i className="fas fa-chart-line"></i>
                      <span>Analyse de marché</span>
                    </div>
                    <div className="step-feature">
                      <i className="fas fa-users"></i>
                      <span>Définition des personas</span>
                    </div>
                  </div>
                )}
                
                {step.id === 2 && (
                  <div className="step-features">
                    <div className="step-feature">
                      <i className="fas fa-sitemap"></i>
                      <span>Architecture d'information</span>
                    </div>
                    <div className="step-feature">
                      <i className="fas fa-tasks"></i>
                      <span>Spécifications fonctionnelles</span>
                    </div>
                    <div className="step-feature">
                      <i className="fas fa-file-alt"></i>
                      <span>Documentation technique</span>
                    </div>
                  </div>
                )}
                
                {step.id === 3 && (
                  <div className="step-features">
                    <div className="step-feature">
                      <i className="fas fa-pencil-alt"></i>
                      <span>Wireframes</span>
                    </div>
                    <div className="step-feature">
                      <i className="fas fa-palette"></i>
                      <span>Design UI/UX</span>
                    </div>
                    <div className="step-feature">
                      <i className="fas fa-tablet-alt"></i>
                      <span>Prototypes interactifs</span>
                    </div>
                  </div>
                )}
                
                {step.id === 4 && (
                  <div className="step-features">
                    <div className="step-feature">
                      <i className="fas fa-code-branch"></i>
                      <span>Développement itératif</span>
                    </div>
                    <div className="step-feature">
                      <i className="fas fa-mobile-alt"></i>
                      <span>Approche mobile-first</span>
                    </div>
                    <div className="step-feature">
                      <i className="fas fa-universal-access"></i>
                      <span>Accessibilité intégrée</span>
                    </div>
                  </div>
                )}
                
                {step.id === 5 && (
                  <div className="step-features">
                    <div className="step-feature">
                      <i className="fas fa-bug"></i>
                      <span>Tests fonctionnels</span>
                    </div>
                    <div className="step-feature">
                      <i className="fas fa-tachometer-alt"></i>
                      <span>Optimisation des performances</span>
                    </div>
                    <div className="step-feature">
                      <i className="fas fa-browser"></i>
                      <span>Compatibilité cross-browser</span>
                    </div>
                  </div>
                )}
                
                {step.id === 6 && (
                  <div className="step-features">
                    <div className="step-feature">
                      <i className="fas fa-server"></i>
                      <span>Déploiement sécurisé</span>
                    </div>
                    <div className="step-feature">
                      <i className="fas fa-book"></i>
                      <span>Documentation utilisateur</span>
                    </div>
                    <div className="step-feature">
                      <i className="fas fa-hands-helping"></i>
                      <span>Support post-lancement</span>
                    </div>
                  </div>
                )}
                
                <div className="step-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(step.id / steps.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    <span>Progrès</span>
                    <span>{Math.round((step.id / steps.length) * 100)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;