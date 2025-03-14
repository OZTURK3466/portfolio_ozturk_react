import React, { useEffect, useRef } from 'react';
import './StorytellingSection.css';

const StorytellingSection = () => {
  const storyRef = useRef(null);
  
  useEffect(() => {
    const storyElements = document.querySelectorAll('.story-segment');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
      }
    );
    
    storyElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      storyElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);
  
  return (
    <section id="story" className="story-section section" ref={storyRef}>
      <div className="container">
        <h2 className="creative-title" data-text="Mon parcours">Mon parcours</h2>
        
        <div className="story-timeline">
          <div className="story-segment left">
            <div className="segment-content">
              <h3>La découverte</h3>
              <p className="large-letter">
                Tout a commencé par une simple curiosité. Quand j'ai écrit ma première ligne de code,
                j'ai immédiatement été captivé par le pouvoir de création que cela me donnait.
                La capacité de transformer des idées en expériences interactives est devenue ma passion.
              </p>
              <div className="story-year">2016</div>
            </div>
          </div>
          
          <div className="story-segment right">
            <div className="segment-content">
              <h3>L'apprentissage</h3>
              <p className="large-letter">
                J'ai plongé profondément dans l'apprentissage des technologies web modernes.
                À travers des projets personnels et académiques, j'ai développé une solide compréhension
                des principes fondamentaux qui font un bon produit numérique.
              </p>
              <div className="story-year">2018</div>
            </div>
          </div>
          
          <div className="story-segment left">
            <div className="segment-content">
              <h3>Les premiers succès</h3>
              <p className="large-letter">
                Après avoir acquis une base technique solide, j'ai commencé à travailler sur des projets clients.
                Chaque défi relevé a renforcé ma confiance et affiné ma vision de ce que signifie créer des
                expériences web exceptionnelles.
              </p>
              <div className="story-year">2020</div>
            </div>
          </div>
          
          <div className="story-segment right">
            <div className="segment-content">
              <h3>Aujourd'hui</h3>
              <p className="large-letter">
                Je continue d'explorer de nouvelles frontières dans le développement web, toujours à la recherche
                d'innovations qui permettent de créer des expériences plus riches et plus accessibles.
                <span className="accent-text"> Ma mission est de transformer vos idées en réalités digitales captivantes.</span>
              </p>
              <div className="story-year">2023</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorytellingSection;