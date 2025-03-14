import React, { useState, useEffect, useRef } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonialRef = useRef(null);
  
  const testimonials = [
    {
      id: 1,
      text: "C'est un plaisir de travailler avec ce développeur. Son expertise technique et sa capacité à transformer nos idées en solutions fonctionnelles ont été essentielles à la réussite de notre projet.",
      author: "Marie Dupont",
      role: "Directrice Marketing, Entreprise ABC",
      image: "https://via.placeholder.com/80"
    },
    {
      id: 2,
      text: "Un développeur exceptionnel qui a compris nos besoins dès le début. Le code livré était propre, bien documenté et exactement ce que nous recherchions. Hautement recommandé !",
      author: "Jean Martin",
      role: "CEO, Startup XYZ",
      image: "https://via.placeholder.com/80"
    },
    {
      id: 3,
      text: "La qualité du travail et l'attention aux détails sont vraiment impressionnantes. Toujours disponible pour répondre à nos questions et apporter des solutions créatives à nos problèmes.",
      author: "Sophie Lefebvre",
      role: "Chef de Projet, Agence Digitale",
      image: "https://via.placeholder.com/80"
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      },
      { threshold: 0.3 }
    );

    if (testimonialRef.current) {
      observer.observe(testimonialRef.current);
    }

    // Rotation automatique des témoignages
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextTestimonial();
      }
    }, 8000);

    return () => {
      if (testimonialRef.current) {
        observer.unobserve(testimonialRef.current);
      }
      clearInterval(interval);
    };
  }, [currentTestimonial, isAnimating]);
  
  const nextTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 500);
  };
  
  const prevTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 500);
  };
  
  const goToTestimonial = (index) => {
    if (isAnimating || index === currentTestimonial) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial(index);
      setIsAnimating(false);
    }, 500);
  };
  
  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <h2 className="section-title">Ce que disent mes clients</h2>
        
        <div className="testimonials-container" ref={testimonialRef}>
          <div className={`testimonials-wrapper ${isAnimating ? 'animating' : ''}`}>
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}
              >
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="author-image">
                    <img src={testimonial.image} alt={testimonial.author} />
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.author}</h4>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="testimonial-navigation">
            <button 
              className="nav-arrow prev" 
              onClick={prevTestimonial}
              aria-label="Témoignage précédent"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  className={`testimonial-dot ${index === currentTestimonial ? 'active' : ''}`} 
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Témoignage ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <button 
              className="nav-arrow next" 
              onClick={nextTestimonial}
              aria-label="Témoignage suivant"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;