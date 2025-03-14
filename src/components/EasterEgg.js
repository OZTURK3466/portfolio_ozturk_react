import React, { useEffect } from 'react';
import './EasterEgg.css';

const EasterEgg = () => {
  useEffect(() => {
    // Séquence à détecter
    const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let currentIndex = 0;
    
    const handleKeyDown = (e) => {
      // Vérifier si la touche pressée correspond à la séquence
      if (e.key === sequence[currentIndex]) {
        currentIndex++;
        
        // Si toute la séquence est entrée correctement
        if (currentIndex === sequence.length) {
          // Réinitialiser l'index
          currentIndex = 0;
          
          // Activer l'easter egg
          triggerEasterEgg();
        }
      } else {
        // Réinitialiser si la séquence est interrompue
        currentIndex = 0;
      }
    };
    
    const triggerEasterEgg = () => {
      // Créer l'élément d'easter egg
      const easterEggEl = document.createElement('div');
      easterEggEl.classList.add('easter-egg');
      document.body.appendChild(easterEggEl);
      
      // Animation
      setTimeout(() => {
        easterEggEl.classList.add('active');
        
        // Message
        const messageEl = document.createElement('div');
        messageEl.classList.add('easter-egg-message');
        messageEl.innerHTML = `
          <h3>Vous avez découvert un easter egg !</h3>
          <p>Bravo pour avoir trouvé ce message caché. Cela montre votre curiosité et votre attention aux détails, des qualités que j'apprécie beaucoup chez mes clients et collaborateurs.</p>
          <p>N'hésitez pas à me contacter pour discuter de votre projet.</p>
          <button class="easter-egg-close">Fermer</button>
        `;
        easterEggEl.appendChild(messageEl);
        
        // Bouton de fermeture
        const closeButton = easterEggEl.querySelector('.easter-egg-close');
        closeButton.addEventListener('click', () => {
          easterEggEl.classList.remove('active');
          setTimeout(() => {
            document.body.removeChild(easterEggEl);
          }, 500);
        });
      }, 100);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return null; // Ce composant n'affiche rien directement
};

export default EasterEgg;