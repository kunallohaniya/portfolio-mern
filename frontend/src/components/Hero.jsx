import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDownload, FaArrowDown, FaCode, FaRocket, FaLightbulb } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { ANIMATION_VARIANTS } from '../utils/constants';

// Premium Animated Gradient Background
const AnimatedBackground = React.memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full filter blur-3xl opacity-30"
        style={{ top: '10%', right: '10%', willChange: 'transform, opacity' }}
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full filter blur-3xl opacity-20"
        style={{ bottom: '10%', left: '10%', willChange: 'transform, opacity' }}
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
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
                <span className="text-sm font-medium text-gray-800 dark:text-slate-100 font-heading">
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
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-slate-50 min-h-[3rem] flex items-center justify-center font-heading"
              >
                <TypewriterText texts={typewriterTexts} speed={150} />
              </motion.div>

              {/* Premium Bio */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-body-lg text-gray-700 dark:text-slate-200 max-w-3xl mx-auto leading-relaxed"
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
                    className="p-4 rounded-full glass-premium border border-white/20 dark:border-white/20 text-gray-800 dark:text-slate-100 hover:text-primary-600 dark:hover:text-violet-400 hover:bg-primary-50 dark:hover:bg-violet-500/20 transition-all duration-300 relative overflow-hidden group interactive-glow"
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
          className="p-3 rounded-full glass-premium border border-white/20 dark:border-white/20 text-gray-800 dark:text-slate-100 hover:text-primary-600 dark:hover:text-violet-400 transition-colors duration-300 relative overflow-hidden group interactive-glow"
          aria-label="Scroll down"
        >
          <FaArrowDown className="w-5 h-5 relative z-10" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;