// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import ChatBot from './components/ChatBot';
import Testimonials from './components/Testimonials';
import GestureNavigation from './components/GestureNavigation';
import StorytellingSection from './components/StorytellingSection';
import WorkProcess from './components/WorkProcess';
import CaseStudy from './components/CaseStudy';
import MetricsSection from './components/MetricsSection';
import WorkDesk from './components/WorkDesk';
import MantraSection from './components/MantraSection';
import EasterEgg from './components/EasterEgg';
import Availability from './components/Availability';
import FAQ from './components/FAQ';
import TechStack from './components/TechStack';
import useMicroInteractions from './hooks/MicroInteractions';
import LanguageSwitcher from './components/LanguageSwitcher';
import PerformanceToggle from './components/PerformanceToggle';
import { PerformanceProvider } from './context/PerformanceContext';
import { LanguageProvider } from './context/LanguageContext';
import ThreeBackground from './components/ThreeBackground';
import VisualElements from './components/VisualElements';

import { 
  initParallaxEffect, 
  initImageDistortion, 
  initPhysicsAnimations 
} from './utils/animationUtils';

function App() {
  // Utilisez useMicroInteractions pour activer les micro-interactions
  useMicroInteractions();
  
  const [loading, setLoading] = useState(true);

  // Handler pour le préloader
  const handleFinishLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    // Initialiser les effets d'animation
    const cleanupParallax = initParallaxEffect();
    initImageDistortion();
    initPhysicsAnimations();
    
    return () => {
      cleanupParallax();
    };
  }, []);

  useEffect(() => {
    // Gestion de l'animation de défilement
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 300;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          section.classList.add('active-section');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Appliquer au chargement initial
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LanguageProvider>
      <PerformanceProvider>
        <div className="app">
          {!loading && <ThreeBackground />}
          {!loading && <VisualElements />}
          <ThemeToggle />
          <LanguageSwitcher />
          <CustomCursor />
          {loading ? (
            <Preloader onFinishLoading={handleFinishLoading} />
          ) : (
            <>
              <Header />
              <main>
                <Hero />
                <StorytellingSection />
                <About />
                <MetricsSection />
                <TechStack />
                <Skills />
                <WorkProcess />
                <Experience />
                <Education />
                <MantraSection />
                <WorkDesk />
                <CaseStudy />
                <Projects />
                <Testimonials />
                <FAQ />
                <Contact />
                <PerformanceToggle />
              </main>
              <Footer />
              <ChatBot />
              <GestureNavigation />
              <Availability />
              <EasterEgg />
            </>
          )}
        </div>
      </PerformanceProvider>
    </LanguageProvider>
  );
}

export default App;