import { useEffect } from 'react';

const useMicroInteractions = () => {
  useEffect(() => {
    // Effet de hover sur les boutons
    const handleButtonsInteraction = () => {
      const buttons = document.querySelectorAll('.btn, button:not(.chat-toggle):not(.theme-toggle)');
      
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          if (button.querySelector('.btn-background')) return;
          
          const background = document.createElement('span');
          background.classList.add('btn-background');
          button.appendChild(background);
          
          // Animation de l'effet de vague
          setTimeout(() => {
            background.style.transform = 'scale(1.5)';
            background.style.opacity = '0';
          }, 10);
          
          // Nettoyage après l'animation
          setTimeout(() => {
            if (button.contains(background)) {
              button.removeChild(background);
            }
          }, 500);
        });
      });
    };

    // Effet de focus sur les champs de formulaire
    const handleInputsInteraction = () => {
      const inputs = document.querySelectorAll('input, textarea');
      
      inputs.forEach(input => {
        // Animation lorsque l'input reçoit le focus
        input.addEventListener('focus', () => {
          if (input.parentElement) {
            input.parentElement.classList.add('input-focused');
          }
        });
        
        // Animation lorsque l'input perd le focus
        input.addEventListener('blur', () => {
          if (!input.value && input.parentElement) {
            input.parentElement.classList.remove('input-focused');
          }
        });
        
        // Vérifier l'état initial
        if (input.value && input.parentElement) {
          input.parentElement.classList.add('input-focused');
        }
      });
    };
    
    // Effet de suivi de la souris pour les cartes
    const handleCardsInteraction = () => {
      const cards = document.querySelectorAll('.project-card, .skill-card, .education-card, .testimonial-card');
      
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left; // position x relative à la carte
          const y = e.clientY - rect.top; // position y relative à la carte
          
          // Calcul de l'angle de rotation basé sur la position de la souris
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const angleX = (y - centerY) / 20; // divisé par un facteur pour réduire l'effet
          const angleY = (centerX - x) / 20;
          
          // Appliquer la transformation
          card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
          
          // Effet de brillance
          const shine = card.querySelector('.card-shine');
          if (!shine) {
            const newShine = document.createElement('div');
            newShine.classList.add('card-shine');
            card.appendChild(newShine);
          }
          
          const shineElement = card.querySelector('.card-shine');
          if (shineElement) {
            // Positionner l'effet de brillance là où se trouve la souris
            const shineX = (x / rect.width) * 100;
            const shineY = (y / rect.height) * 100;
            shineElement.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`;
          }
        });
        
        // Réinitialiser lors de la sortie
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
          const shine = card.querySelector('.card-shine');
          if (shine) {
            card.removeChild(shine);
          }
        });
      });
    };
    
    // Effet de texte qui suit la souris
    const handleHeroTextInteraction = () => {
      const heroTexts = document.querySelectorAll('.hero-content h1, .hero-content h3');
      
      const handleMouseMove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        heroTexts.forEach(text => {
          const rect = text.getBoundingClientRect();
          const textX = rect.left + rect.width / 2;
          const textY = rect.top + rect.height / 2;
          
          // Calculer la distance entre la souris et le texte
          const deltaX = (mouseX - textX) / 30; // divisé par un facteur pour réduire l'effet
          const deltaY = (mouseY - textY) / 30;
          
          // Limiter le déplacement
          const maxMove = 10;
          const moveX = Math.max(-maxMove, Math.min(maxMove, deltaX));
          const moveY = Math.max(-maxMove, Math.min(maxMove, deltaY));
          
          // Appliquer la transformation
          text.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    };

    // Initialiser toutes les interactions
    handleButtonsInteraction();
    handleInputsInteraction();
    handleCardsInteraction();
    const cleanupHeroText = handleHeroTextInteraction();
    
    // Nettoyage lors du démontage du composant
    return () => {
      cleanupHeroText();
      
      // Nettoyage des éléments de brillance sur les cartes
      const cards = document.querySelectorAll('.project-card, .skill-card, .education-card, .testimonial-card');
      cards.forEach(card => {
        card.style.transform = '';
        const shine = card.querySelector('.card-shine');
        if (shine) {
          card.removeChild(shine);
        }
      });
      
      // Nettoyage des effets de texte
      const heroTexts = document.querySelectorAll('.hero-content h1, .hero-content h3');
      heroTexts.forEach(text => {
        text.style.transform = '';
      });
    };
  }, []);

  return null;
};

export default useMicroInteractions;