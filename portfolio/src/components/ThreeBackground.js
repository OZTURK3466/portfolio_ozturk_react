import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeBackground.css';
import { usePerformance } from '../context/PerformanceContext';

const ThreeBackground = () => {
  const { highPerformanceMode } = usePerformance();
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);
  const isInitializedRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // Configuration
  const config = {
    particleCount: highPerformanceMode ? 500 : 200,
    particleSize: 2,
    particleColor: 0x6c63ff,
    connectionDistance: 100,
    connectionOpacity: 0.15,
    speed: 0.2,
    mouseInfluence: 100,
    mouseStrength: 10,
    depthFactor: 50,
  };

  // Initialisation de Three.js
  useEffect(() => {
    if (!window.THREE) {
      console.error("Three.js n'est pas chargé");
      return;
    }
    
    // Éviter d'initialiser plusieurs fois
    if (isInitializedRef.current) return;
    
    try {
      // Vérifier que le conteneur est disponible
      if (!containerRef.current) return;
      
      // Créer la scène
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      // Créer la caméra
      const camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
      );
      camera.position.z = 250;
      cameraRef.current = camera;
      
      // Créer le renderer
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
      
      // Créer les particules
      createParticles();
      
      // Gérer les événements de souris
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
      
      // Démarrer la boucle d'animation
      animate();
      
      isInitializedRef.current = true;
    } catch (error) {
      console.error("Erreur d'initialisation de Three.js:", error);
    }
    
    // Nettoyage lors du démontage du composant
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Arrêter l'animation
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Libérer les ressources
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        particlesRef.current.material.dispose();
        if (sceneRef.current) {
          sceneRef.current.remove(particlesRef.current);
        }
      }
      
      if (rendererRef.current && containerRef.current) {
        try {
          containerRef.current.removeChild(rendererRef.current.domElement);
          rendererRef.current.dispose();
        } catch (error) {
          console.error("Erreur lors du nettoyage:", error);
        }
      }
    };
  }, [highPerformanceMode]);
  
  // Création des particules
  const createParticles = () => {
    try {
      // Créer la géométrie pour les particules
      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = config.particleCount;
      
      // Positions et vitesses des particules
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      
      // Remplir les tableaux avec des valeurs aléatoires
      for (let i = 0; i < particleCount; i++) {
        // Position
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * window.innerWidth; // x
        positions[i3 + 1] = (Math.random() - 0.5) * window.innerHeight; // y
        positions[i3 + 2] = (Math.random() - 0.5) * config.depthFactor; // z
        
        // Vitesse
        velocities[i3] = (Math.random() - 0.5) * config.speed; // vx
        velocities[i3 + 1] = (Math.random() - 0.5) * config.speed; // vy
        velocities[i3 + 2] = (Math.random() - 0.5) * config.speed; // vz
      }
      
      // Ajouter les positions à la géométrie
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
      
      // Matériel des particules
      const particleMaterial = new THREE.PointsMaterial({
        color: config.particleColor,
        size: config.particleSize,
        transparent: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });
      
      // Créer le système de particules
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      sceneRef.current.add(particles);
      particlesRef.current = particles;
    } catch (error) {
      console.error("Erreur lors de la création des particules:", error);
    }
  };
  
  // Gérer le mouvement de la souris
  const handleMouseMove = (event) => {
    // Normaliser les coordonnées de la souris [-1, 1]
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };
  
  // Gérer le redimensionnement de la fenêtre
  const handleResize = () => {
    if (!cameraRef.current || !rendererRef.current) return;
    
    // Mettre à jour la caméra
    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    
    // Mettre à jour le renderer
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  };
  
  // Boucle d'animation
  const animate = () => {
    rafRef.current = requestAnimationFrame(animate);
    
    try {
      if (!particlesRef.current || !sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      // Récupérer les positions et les vitesses
      const positions = particlesRef.current.geometry.attributes.position;
      const velocities = particlesRef.current.geometry.attributes.velocity;
      
      // Mettre à jour chaque particule
      for (let i = 0; i < config.particleCount; i++) {
        const i3 = i * 3;
        
        // Mettre à jour les positions
        positions.array[i3] += velocities.array[i3];
        positions.array[i3 + 1] += velocities.array[i3 + 1];
        positions.array[i3 + 2] += velocities.array[i3 + 2];
        
        // Limites x
        if (positions.array[i3] < -window.innerWidth / 2 || positions.array[i3] > window.innerWidth / 2) {
          velocities.array[i3] = -velocities.array[i3];
        }
        
        // Limites y
        if (positions.array[i3 + 1] < -window.innerHeight / 2 || positions.array[i3 + 1] > window.innerHeight / 2) {
          velocities.array[i3 + 1] = -velocities.array[i3 + 1];
        }
        
        // Limites z
        if (positions.array[i3 + 2] < -config.depthFactor / 2 || positions.array[i3 + 2] > config.depthFactor / 2) {
          velocities.array[i3 + 2] = -velocities.array[i3 + 2];
        }
        
        // Influence de la souris
        const dx = mouseRef.current.x * window.innerWidth / 2 - positions.array[i3];
        const dy = mouseRef.current.y * window.innerHeight / 2 - positions.array[i3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < config.mouseInfluence) {
          const force = (config.mouseInfluence - dist) / config.mouseInfluence;
          velocities.array[i3] += (dx / dist) * force * config.mouseStrength * 0.01;
          velocities.array[i3 + 1] += (dy / dist) * force * config.mouseStrength * 0.01;
        }
      }
      
      // Marquer les positions comme modifiées
      positions.needsUpdate = true;
      
      // Effets de parallaxe avec la souris
      particlesRef.current.rotation.x = mouseRef.current.y * 0.1;
      particlesRef.current.rotation.y = mouseRef.current.x * 0.1;
      
      // Rendu
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      
      // Dessiner les connexions si en mode haute performance
      if (highPerformanceMode) {
        // Limiter le nombre d'appels à drawConnections
        if (Math.random() < 0.05) {
          drawConnections();
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'animation:", error);
      cancelAnimationFrame(rafRef.current);
    }
  };

  const drawConnections = () => {
    try {
      if (!highPerformanceMode || !sceneRef.current || !particlesRef.current) return;

      // Supprimer les anciennes lignes
      const linesToRemove = [];
      sceneRef.current.traverse((object) => {
        if (object.type === 'Line') {
          linesToRemove.push(object);
        }
      });
      
      linesToRemove.forEach((line) => {
        sceneRef.current.remove(line);
        line.geometry.dispose();
        line.material.dispose();
      });
      
      // Récupérer les positions des particules
      const positions = particlesRef.current.geometry.attributes.position;
      
      // Limiter le nombre de connexions pour des raisons de performance
      const maxConnections = 50;
      let connectionCount = 0;
      
      // Pour chaque particule, vérifier les connexions possibles
      for (let i = 0; i < config.particleCount && connectionCount < maxConnections; i++) {
        // Échantillonnage pour réduire le nombre de tests
        if (Math.random() > 0.01) continue;
        
        const i3 = i * 3;
        const x1 = positions.array[i3];
        const y1 = positions.array[i3 + 1];
        const z1 = positions.array[i3 + 2];
        
        for (let j = i + 1; j < config.particleCount && connectionCount < maxConnections; j++) {
          // Échantillonnage pour réduire le nombre de tests
          if (Math.random() > 0.1) continue;
          
          const j3 = j * 3;
          const x2 = positions.array[j3];
          const y2 = positions.array[j3 + 1];
          const z2 = positions.array[j3 + 2];
          
          // Calculer la distance entre les deux particules
          const dx = x2 - x1;
          const dy = y2 - y1;
          const dz = z2 - z1;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          // Si la distance est inférieure à la distance maximale, dessiner une connexion
          if (distance < config.connectionDistance) {
            // L'opacité de la ligne est inversement proportionnelle à la distance
            const opacity = (1 - distance / config.connectionDistance) * config.connectionOpacity;
            
            // Créer la géométrie de la ligne
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.Float32BufferAttribute([
              x1, y1, z1,
              x2, y2, z2
            ], 3));
            
            // Créer le matériel de la ligne
            const material = new THREE.LineBasicMaterial({
              color: config.particleColor,
              opacity: opacity,
              transparent: true
            });
            
            // Créer la ligne et l'ajouter à la scène
            const line = new THREE.Line(geometry, material);
            sceneRef.current.add(line);
            connectionCount++;
          }
        }
      }
    } catch (error) {
      console.error("Erreur lors du dessin des connexions:", error);
    }
  };
  
  return (
    <div className="three-background" ref={containerRef}></div>
  );
};

export default ThreeBackground;