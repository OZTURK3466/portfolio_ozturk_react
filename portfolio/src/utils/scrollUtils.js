// src/utils/scrollUtils.js
export const scrollToSection = (elementId, event) => {
    const element = document.getElementById(elementId);
    if (element) {
      // Empêcher le comportement par défaut du lien
      if (event) event.preventDefault();
      
      // Calculer la position de défilement
      const offset = 80; // Ajustez si vous avez un header fixe
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
  
      // Animation de défilement
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };