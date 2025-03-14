export const initParallaxEffect = () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    const handleMouseMove = (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.1;
        const depth = element.getAttribute('data-depth') || 1;
        const isReverse = element.hasAttribute('data-reverse');
        const offsetX = isReverse ? -mouseX * 100 * speed : mouseX * 100 * speed;
        const offsetY = isReverse ? -mouseY * 100 * speed : mouseY * 100 * speed;
        const scale = 1 + (depth * 0.03);
        
        element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${scale})`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Parallaxe au scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      document.querySelectorAll('.parallax-scroll').forEach(element => {
        const speed = element.getAttribute('data-scroll-speed') || 0.1;
        const direction = element.getAttribute('data-direction') || 'up';
        const factor = direction === 'up' ? -1 : 1;
        
        element.style.transform = `translateY(${scrollY * speed * factor}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  };
  
  // Fonction pour les transitions de page
  export const initPageTransitions = () => {
    const transitionElement = document.createElement('div');
    transitionElement.className = 'page-transition';
    document.body.appendChild(transitionElement);
    
    const transitionLinks = document.querySelectorAll('a[data-transition]');
    
    transitionLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const transitionType = link.getAttribute('data-transition') || 'fade';
        
        // Activer la transition
        transitionElement.classList.add('active', transitionType);
        
        // Rediriger après la transition
        setTimeout(() => {
          window.location.href = href;
        }, 600);
      });
    });
  };
  
  // Effet de distorsion sur les images
  export const initImageDistortion = () => {
    const distortImages = document.querySelectorAll('.distort-image');
    
    distortImages.forEach(img => {
      img.addEventListener('mousemove', (e) => {
        const bounds = img.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const relativeX = mouseX / bounds.width;
        const relativeY = mouseY / bounds.height;
        
        const effect = img.getAttribute('data-effect') || 'wave';
        
        if (effect === 'wave') {
          img.style.transform = `perspective(500px) rotateX(${(relativeY - 0.5) * 10}deg) rotateY(${(relativeX - 0.5) * -10}deg)`;
        } else if (effect === 'glitch') {
          // Effet glitch temporaire au survol
          img.classList.add('glitch-effect');
          setTimeout(() => {
            img.classList.remove('glitch-effect');
          }, 200);
        } else if (effect === 'liquid') {
          // L'effet liquide nécessiterait WebGL, on utilise une approximation CSS
          img.style.borderRadius = `${relativeX * 30}% ${(1-relativeX) * 30}% ${(1-relativeY) * 30}% ${relativeY * 30}%`;
        }
      });
      
      img.addEventListener('mouseleave', () => {
        img.style.transform = '';
        img.style.borderRadius = '';
      });
    });
  };
  
  // Basculer entre mode sombre et clair
  export const initDarkModeToggle = () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    // Appliquer le thème initial
    if (currentTheme === 'dark' || (currentTheme === null && prefersDarkScheme.matches)) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
          document.body.classList.replace('dark-theme', 'light-theme');
          document.body.classList.add('theme-transition');
          localStorage.setItem('theme', 'light');
        } else {
          document.body.classList.replace('light-theme', 'dark-theme');
          document.body.classList.add('theme-transition');
          localStorage.setItem('theme', 'dark');
        }
        
        setTimeout(() => {
          document.body.classList.remove('theme-transition');
        }, 1000);
      });
    }
  };
  
  // Animations physiques (avec simulation de ressort)
  export const initPhysicsAnimations = () => {
    const physicsElements = document.querySelectorAll('.physics-animation');
    
    physicsElements.forEach(element => {
      let velocity = 0;
      let targetPosition = 0;
      let currentPosition = 0;
      const springStrength = 0.1;
      const dampening = 0.8;
      
      element.addEventListener('mouseover', () => {
        targetPosition = 20; // En pixels
      });
      
      element.addEventListener('mouseout', () => {
        targetPosition = 0;
      });
      
      function updatePhysics() {
        // Calcul de la physique de base du ressort
        const distance = targetPosition - currentPosition;
        const acceleration = distance * springStrength;
        velocity += acceleration;
        velocity *= dampening;
        currentPosition += velocity;
        
        element.style.transform = `translateY(${currentPosition}px)`;
        
        requestAnimationFrame(updatePhysics);
      }
      
      updatePhysics();
    });
  };