import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const faqs = [
    {
      question: "Quel est votre processus de travail avec les clients ?",
      answer: "Mon processus démarre par une phase de découverte pour comprendre vos besoins et objectifs. Ensuite, je définis une stratégie claire, crée les maquettes, développe la solution et effectue des tests rigoureux avant la livraison. À chaque étape, je maintiens une communication transparente et vous implique dans les décisions clés."
    },
    {
      question: "Quels types de projets acceptez-vous ?",
      answer: "Je me spécialise dans le développement de sites web modernes, d'applications web, et d'interfaces utilisateur interactives. Je travaille aussi bien sur des projets de création complète que sur l'amélioration de solutions existantes. Ma préférence va aux projets qui présentent des défis créatifs ou techniques intéressants."
    },
    {
      question: "Combien coûte un projet web typique ?",
      answer: "Chaque projet étant unique, les tarifs varient en fonction de sa complexité, de son envergure et du calendrier. Je propose des devis personnalisés après notre discussion initiale. Mes tarifs reflètent la qualité premium et le souci du détail que j'apporte à chaque projet."
    },
    {
      question: "Combien de temps faut-il pour réaliser un projet ?",
      answer: "La durée d'un projet dépend de sa complexité et de son envergure. Un site vitrine peut prendre 4-6 semaines, tandis qu'une application web plus complexe peut nécessiter 2-4 mois. Je fournis toujours un calendrier détaillé lors de la phase de planification."
    },
    {
      question: "Proposez-vous des services de maintenance après la livraison ?",
      answer: "Oui, je propose des forfaits de maintenance pour assurer le bon fonctionnement, la sécurité et la mise à jour de votre site ou application. Ces forfaits incluent généralement des mises à jour régulières, une surveillance de la sécurité et un support technique."
    },
    {
      question: "Comment gérez-vous les retours et les révisions ?",
      answer: "Les retours font partie intégrante du processus créatif. Je prévois généralement deux cycles de révision dans mes projets. Au-delà, nous discutons ensemble pour déterminer si les changements constituent des ajustements ou une extension du projet initial."
    }
  ];
  
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <section id="faq" className="faq-section section">
      <div className="container">
        <h2 className="section-title">Questions fréquentes</h2>
        <p className="section-description">
          Vous avez des questions sur ma façon de travailler ? Voici les réponses aux questions les plus fréquemment posées.
        </p>
        
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <div className="faq-icon">
                  <i className={`fas fa-${activeIndex === index ? 'minus' : 'plus'}`}></i>
                </div>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="faq-more">
          <p>Vous avez d'autres questions ? N'hésitez pas à me contacter directement.</p>
          <a href="#contact" className="btn gradient-button">
            Me contacter
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;