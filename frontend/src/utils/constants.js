// This file now only contains animation variants and utility constants
// All portfolio data is managed through the dynamic JSON system in src/data/portfolio.json
// Use the usePortfolioData hook to access portfolio data

// Terminal Commands for EasterEggTerminal
export const TERMINAL_COMMANDS = {
  help: 'Display available commands',
  about: 'About me',
  skills: 'My technical skills',
  projects: 'View my projects',
  contact: 'Get in touch',
  clear: 'Clear terminal',
  social: 'Social media links'
};

// Personal Info
export const PERSONAL_INFO = {
  name: 'Your Name',
  title: 'Full Stack Developer',
  email: 'your.email@example.com',
  location: 'Your Location'
};

// Social Links
export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourprofile',
  twitter: 'https://twitter.com/yourhandle',
  portfolio: 'https://yourportfolio.com'
};

// Skills
export const SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'MongoDB',
  'Express', 'Tailwind CSS', 'Git', 'REST APIs', 'GraphQL'
];

// Projects placeholder (use API instead)
export const PROJECTS = [
  {
    name: 'Portfolio Project',
    description: 'Personal portfolio website',
    tech: ['React', 'Node.js', 'MongoDB']
  }
];

// Utility constants
export const BREAKPOINTS = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1600px',
};

export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

export const TRANSITIONS = {
  fast: '0.15s ease-out',
  normal: '0.3s ease-out',
  slow: '0.5s ease-out',
  spring: '0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
};

// Animation Variants - Enhanced for Framer Motion 11+
export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  // Enhanced animations for world-class experience
  slideInFromBottom: {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  slideInFromTop: {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  rotateIn: {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  bounceIn: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { opacity: 1, scale: 1 },
    transition: { 
      duration: 0.6, 
      ease: [0.68, -0.55, 0.265, 1.55],
      type: 'spring',
      stiffness: 200,
      damping: 20
    },
  },
  // Micro-interactions
  hoverScale: {
    hover: { scale: 1.05 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  hoverRotate: {
    hover: { rotate: 5 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  hoverGlow: {
    hover: { 
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
      scale: 1.02
    },
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  // Page transitions
  pageTransition: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  // Loading animations
  loadingPulse: {
    animate: { 
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.05, 1]
    },
    transition: { 
      duration: 1.5, 
      repeat: Infinity,
      ease: 'easeInOut'
    },
  },
};
