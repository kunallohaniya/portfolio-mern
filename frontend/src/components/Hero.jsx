import React, { useRef, useEffect, Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, OrbitControls, Float, Environment, Stars } from '@react-three/drei';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDownload, FaArrowDown, FaCode, FaRocket, FaLightbulb } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { ANIMATION_VARIANTS } from '../utils/constants';

// Premium 3D Animated Sphere Component
const AnimatedSphere = React.memo(() => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
      
      if (hovered) {
        meshRef.current.scale.setScalar(1.15);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere 
        ref={meshRef} 
        args={[1, 100, 200]} 
        scale={2.4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={hovered ? "#8b5cf6" : "#3b82f6"}
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0}
          metalness={0.5}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
});

AnimatedSphere.displayName = 'AnimatedSphere';

// Premium Floating Particles Component
const FloatingParticles = React.memo(() => {
  const particlesRef = useRef();
  const particleCount = 40;

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.children.forEach((particle, index) => {
        particle.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5;
        particle.position.x = Math.cos(state.clock.elapsedTime + index) * 0.3;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {Array.from({ length: particleCount }).map((_, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={1}>
          <mesh
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#8b5cf6" transparent opacity={0.6} />
          </mesh>
        </Float>
      ))}
    </group>
  );
});

FloatingParticles.displayName = 'FloatingParticles';

// Premium Typewriter Effect Component
const TypewriterText = React.memo(({ texts, speed = 100 }) => {
  const [currentText, setCurrentText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts, speed]);

  return (
    <span className="inline-block">
      {currentText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-primary-500 ml-1"
      >
        |
      </motion.span>
    </span>
  );
});

TypewriterText.displayName = 'TypewriterText';

// Floating Developer Tags Component
const FloatingTags = React.memo(() => {
  const tags = [
    { text: 'React', icon: FaCode, delay: 0 },
    { text: 'Node.js', icon: FaRocket, delay: 0.5 },
    { text: 'Innovation', icon: FaLightbulb, delay: 1 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {tags.map((tag, index) => (
        <motion.div
          key={tag.text}
          className="absolute glass-premium rounded-full px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400"
          style={{
            left: `${20 + index * 25}%`,
            top: `${30 + index * 15}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: tag.delay, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
        >
          <tag.icon className="inline-block mr-2" />
          {tag.text}
        </motion.div>
      ))}
    </div>
  );
});

FloatingTags.displayName = 'FloatingTags';

// Premium Cursor Glow Effect
const CursorGlow = React.memo(() => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: mousePosition.x - 20,
        y: mousePosition.y - 20,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      <div className="w-10 h-10 bg-white rounded-full opacity-20 blur-sm" />
    </motion.div>
  );
});

CursorGlow.displayName = 'CursorGlow';

// Loading fallback for 3D scene
const SceneFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-transparent to-secondary-50 dark:from-dark-900 dark:via-transparent dark:to-dark-800 flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full"
    />
  </div>
);

const Hero = () => {
  const { getPersonalInfo, getSocialLinks } = usePortfolioData();
  const personalInfo = getPersonalInfo();
  const socialLinks = getSocialLinks();
  const [isLoaded, setIsLoaded] = useState(false);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const typewriterTexts = [
    'Full Stack Developer',
    'MERN Stack Specialist',
    'React Enthusiast',
    'Problem Solver',
    'Tech Innovator',
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Premium 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<SceneFallback />}>
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <directionalLight position={[0, 10, 5]} intensity={1} />
            <Environment preset="night" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <AnimatedSphere />
            <FloatingParticles />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
          </Canvas>
        </Suspense>
      </div>

      {/* Premium Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/90 via-transparent to-secondary-50/90 dark:from-dark-900/90 dark:via-transparent dark:to-dark-800/90 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />

      {/* Floating Glassmorphism Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 glass-premium rounded-full blur-xl z-10"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-48 h-48 glass-premium rounded-full blur-xl z-10"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Floating Developer Tags */}
      <FloatingTags />

      {/* Premium Cursor Glow */}
      <CursorGlow />

      {/* Premium Content */}
      <div className="relative z-20 container-premium text-center">
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Premium Greeting */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center px-6 py-3 rounded-full glass-premium border border-white/20 dark:border-white/10 shadow-xl"
              >
                <span className="text-sm font-medium text-dark-700 dark:text-dark-300 font-heading">
                  👋 Hello, I'm
                </span>
              </motion.div>

              {/* Premium Name with Glow Effect */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="heading-xl"
              >
                <span className="gradient-text-premium text-shadow-premium relative">
                  {personalInfo.name}
                  <motion.div
                    className="absolute inset-0 gradient-text-premium blur-sm opacity-50"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </span>
              </motion.h1>

              {/* Premium Typewriter Title */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-dark-800 dark:text-white min-h-[3rem] flex items-center justify-center font-heading"
              >
                <TypewriterText texts={typewriterTexts} speed={150} />
              </motion.div>

              {/* Premium Bio */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-body-lg text-dark-600 dark:text-dark-300 max-w-3xl mx-auto leading-relaxed"
              >
                {personalInfo.bio}
              </motion.p>

              {/* Premium Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.a
                  href={personalInfo.resumeUrl}
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-glow inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold group"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <FaDownload className="w-5 h-5" />
                    Download Resume
                  </span>
                </motion.a>

                <motion.button
                  onClick={scrollToAbout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold group"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Learn More
                    <FaArrowDown className="w-4 h-4" />
                  </span>
                </motion.button>
              </motion.div>

              {/* Premium Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="flex justify-center space-x-6 pt-8"
              >
                {[
                  { icon: FaGithub, href: socialLinks.github, label: 'GitHub' },
                  { icon: FaLinkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
                  { icon: FaTwitter, href: socialLinks.twitter, label: 'Twitter' },
                  { icon: FaEnvelope, href: socialLinks.email, label: 'Email' },
                ].map(({ icon: Icon, href, label }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 rounded-full glass-premium border border-white/20 dark:border-white/10 text-dark-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 relative overflow-hidden group interactive-glow"
                    aria-label={label}
                  >
                    <Icon className="w-6 h-6 relative z-10" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Premium Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="p-3 rounded-full glass-premium border border-white/20 dark:border-white/10 text-dark-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 relative overflow-hidden group interactive-glow"
          aria-label="Scroll down"
        >
          <FaArrowDown className="w-5 h-5 relative z-10" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;