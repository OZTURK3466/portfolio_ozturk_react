import React, { useEffect, useRef } from 'react';
import './About.css';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const aboutRef = useRef(null);

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

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="about section">
      <div className="container">
        <h2 className="section-title">{t('about.title')}</h2>
        <div className="about-content" ref={aboutRef}>
          <div className="about-image">
            <div className="image-wrapper">
              <img 
                src="https://via.placeholder.com/400" 
                alt="Portrait" 
                className="distort-image"
                data-effect="wave"
              />
            </div>
          </div>
          <div className="about-text">
            <h3>{t('about.subtitle')}</h3>
            <p>
              {t('about.para1')}
            </p>
            <p>
              {t('about.para2')}
            </p>
            <div className="about-details">
              <div className="about-detail">
                <span>{t('about.details.name')}:</span> Votre Nom
              </div>
              <div className="about-detail">
                <span>{t('about.details.email')}:</span> votre.email@exemple.com
              </div>
              <div className="about-detail">
                <span>{t('about.details.availability')}:</span> Freelance
              </div>
              <div className="about-detail">
                <span>{t('about.details.location')}:</span> Votre Ville, Pays
              </div>
            </div>
            <div className="about-cta">
              <a href="#contact" className="btn btn-primary">{t('about.cta.contact')}</a>
              <a href="#" className="btn btn-secondary">{t('about.cta.download')}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;