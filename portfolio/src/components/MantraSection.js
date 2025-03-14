import React from 'react';
import './MantraSection.css';

const MantraSection = () => {
  return (
    <section className="mantra-section section">
      <div className="container">
        <div className="mantra-container">
          <div className="mantra-icon">
            <i className="fas fa-quote-left"></i>
          </div>
          <h2 className="mantra-text">
            La <span className="mantra-accent">simplicité</span> est la sophistication suprême
          </h2>
          <p className="mantra-author">Léonard de Vinci</p>
          <p className="mantra-description">
            Cette philosophie guide mon approche du développement web : 
            créer des solutions qui semblent simples et intuitives pour l'utilisateur, 
            tout en maîtrisant la complexité technique sous-jacente.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MantraSection;
