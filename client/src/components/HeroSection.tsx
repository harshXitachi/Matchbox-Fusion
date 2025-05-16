import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import FloatingElement from "./FloatingElement";

const HeroSection = () => {
  const portalRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!portalRef.current) return;
    
    // Setup Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    portalRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create a portal effect
    const geometry = new THREE.TorusGeometry(3, 0.6, 16, 100);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xa94fff,
      transparent: true,
      opacity: 0.8
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);
    
    // Add particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;
      
      particlesMesh.rotation.x += 0.002;
      particlesMesh.rotation.y += 0.002;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Responsive handling
    const handleResize = () => {
      if (portalRef.current) {
        const size = Math.min(portalRef.current.clientWidth, 300);
        renderer.setSize(size, size);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (portalRef.current && renderer.domElement) {
        portalRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <img 
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Cosmic nebula background" 
          className="absolute w-full h-full object-cover opacity-50"
        />
        
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[hsl(var(--darker-purple))]/80 to-[hsl(var(--deep-purple))]/70"></div>
        
        {/* Animated 3D objects */}
        <FloatingElement 
          className="absolute top-1/4 left-1/5 w-20 h-20 rounded-full bg-[hsl(var(--accent-purple))]/20 blur-xl"
          animationDuration={6}
        />
        <FloatingElement 
          className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-[hsl(var(--accent-blue))]/20 blur-xl"
          animationDuration={8}
        />
        <FloatingElement 
          className="absolute top-1/3 right-1/5 w-24 h-24 rounded-full bg-[hsl(var(--accent-teal))]/20 blur-xl"
          animationDuration={10}
        />
      </div>
      
      <div className="container mx-auto px-6 z-10 text-center">
        <motion.h1 
          className="font-display font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="gradient-text">Matchbox~Fusion</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Creating unforgettable experiences through premium event management services that exceed expectations.
        </motion.p>
        
        <motion.a 
          href="#contact" 
          className="btn-glow inline-block bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))] px-8 py-4 rounded-lg text-lg font-medium hover:shadow-lg transition-all transform hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Free Consultation
        </motion.a>
        
        {/* 3D portal effect */}
        <motion.div 
          className="relative mt-16 mb-20 w-80 h-80 mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[hsl(var(--accent-purple))]/60 to-[hsl(var(--accent-blue))]/60 blur-2xl animate-pulse-glow"></div>
          <div className="relative glass rounded-full w-full h-full flex items-center justify-center overflow-hidden">
            {/* Three.js portal effect container */}
            <div ref={portalRef} className="absolute inset-0 flex items-center justify-center"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--darker-purple))]/40 to-transparent"></div>
            <span className="text-4xl font-display font-bold relative z-10 gradient-text animate-pulse-glow">Elevate</span>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <a href="#services" className="text-white/80 hover:text-white animate-bounce block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
