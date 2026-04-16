import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCode, FaRocket, FaLightbulb, FaUsers, FaAward, FaHeart, FaGraduationCap, FaBriefcase, FaTrophy, FaGlobe } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';
import SectionBackground from './SectionBackground';
import { ANIMATION_VARIANTS } from '../utils/constants';

// Premium Timeline Component
const Timeline = React.memo(({ items }) => {
  const [activeItem, setActiveItem] = useState(0);
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div ref={timelineRef} className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-primary-500" />
      
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="relative flex items-start mb-12"
          style={{ y: y }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
        >
          {/* Timeline Dot */}
          <motion.div
            className="absolute left-6 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-dark-900 z-10"
            whileHover={{ scale: 1.5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          
          {/* Content Card */}
          <motion.div
            className="ml-16 glass-premium rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => setActiveItem(index)}
            animate={activeItem === index ? { scale: 1.02 } : { scale: 1 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900">
                <item.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-800 dark:text-white font-heading">
                  {item.title}
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                  {item.period}
                </p>
              </div>
            </div>
            <p className="text-dark-600 dark:text-dark-300 text-sm leading-relaxed">
              {item.description}
            </p>
            {item.achievements && (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.achievements.map((achievement, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
});

Timeline.displayName = 'Timeline';

// Premium Stats Component with Counter Animation
const AnimatedStats = React.memo(({ stats }) => {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          stats.forEach((stat, index) => {
            const duration = 2000;
            const increment = stat.value / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                current = stat.value;
                clearInterval(timer);
              }
              setCounts(prev => {
                const newCounts = [...prev];
                newCounts[index] = Math.floor(current);
                return newCounts;
              });
            }, 16);
          });
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [stats, hasAnimated]);

  return (
    <div id="stats-section" className="grid grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="text-center p-6 rounded-2xl glass-premium border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 group"
        >
          <motion.div
            className="text-4xl font-bold gradient-text-premium mb-2"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {counts[index]}+
          </motion.div>
          <div className="text-sm text-dark-600 dark:text-dark-300 font-medium">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
});

AnimatedStats.displayName = 'AnimatedStats';

// Premium Values Grid Component
const ValuesGrid = React.memo(({ values }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {values.map((value, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="p-6 rounded-2xl glass-premium border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 group"
        >
          <div className="flex items-start space-x-4">
            <motion.div
              className="p-3 rounded-full bg-primary-100 dark:bg-primary-900 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors duration-300"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {value.icon === 'code' && <FaCode className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
              {value.icon === 'rocket' && <FaRocket className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
              {value.icon === 'lightbulb' && <FaLightbulb className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
              {value.icon === 'users' && <FaUsers className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
              {value.icon === 'award' && <FaAward className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
              {value.icon === 'heart' && <FaHeart className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
            </motion.div>
            <div className="flex-1">
              <h3 className="font-semibold text-dark-800 dark:text-white mb-2 font-heading">
                {value.title}
              </h3>
              <p className="text-sm text-dark-600 dark:text-dark-300 leading-relaxed">
                {value.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
});

ValuesGrid.displayName = 'ValuesGrid';

// Premium Fun Facts Component
const FunFacts = React.memo(({ facts }) => {
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [facts.length]);

  return (
    <div className="p-8 rounded-2xl glass-premium border border-white/20 dark:border-white/10 shadow-xl">
      <h3 className="text-xl font-semibold text-dark-800 dark:text-white mb-6 font-heading">
        Fun Facts About Me
      </h3>
      <div className="space-y-4">
        {facts.map((fact, index) => (
          <motion.div
            key={index}
            className={`flex items-center p-3 rounded-xl transition-all duration-500 ${
              currentFact === index
                ? 'bg-primary-100 dark:bg-primary-900/30 scale-105'
                : 'bg-transparent'
            }`}
            animate={currentFact === index ? { scale: 1.05 } : { scale: 1 }}
          >
            <motion.span
              className="text-2xl mr-3"
              animate={currentFact === index ? { scale: 1.2 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {fact.emoji}
            </motion.span>
            <span className="text-dark-600 dark:text-dark-300 text-sm flex-1">
              <strong>{fact.text}:</strong> {fact.value}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

FunFacts.displayName = 'FunFacts';

const About = () => {
  const { getAboutData } = usePortfolioData();
  const aboutData = getAboutData();

  // Enhanced timeline data
  const timelineData = [
    {
      title: "Software Developer",
      period: "2025 - present",
      description: "Currently working as a full-stack developer, specializing in MERN stack development and creating scalable web applications.",
      icon: FaCode,
      achievements: ["MERN Stack", "React Native"]
    },
    {
      title: "Master of Computer Applications",
      period: "2024 - 2026",
      description: "Completed Masters's degree in Computer applications with focus on software engineering and web development.",
      icon: FaGraduationCap,
      achievements: ["React", "JavaScript", "CSS3"]
    },
    {
      title: "Bachelor of Computer Applications",
      period: "2021 - 2024",
      description: "Graduated with a Bachelor's degree in Computer Applications, gaining a solid foundation in programming and software development.",
      icon: FaBriefcase,
      achievements: ["MERN Stack", "MongoDB", "Express.js"]
    },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/30 dark:from-dark-900 dark:via-dark-800/30 dark:to-dark-700/30 relative overflow-hidden">
      {/* Optimized Performance Background */}
      <SectionBackground primaryColor="primary" secondaryColor="secondary" />

      <div className="container-premium relative z-10">
        {/* Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 rounded-full glass-premium border border-white/20 dark:border-white/10 shadow-xl mb-6"
          >
            <span className="text-sm font-medium text-dark-700 dark:text-dark-300 font-heading">
              🚀 About Me
            </span>
          </motion.div>
          
          <h2 className="heading-xl mb-6">
            <span className="gradient-text-premium">
              Crafting Digital Experiences
            </span>
          </h2>
          
          <p className="text-body-lg text-dark-600 dark:text-dark-300 max-w-3xl mx-auto leading-relaxed">
            {aboutData.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Premium About Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {aboutData.description.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-body-base text-dark-600 dark:text-dark-300 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Premium Values Grid */}
            <ValuesGrid values={aboutData.values} />
          </motion.div>

          {/* Premium Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Premium Animated Stats */}
            <AnimatedStats stats={aboutData.stats} />

            {/* Premium Fun Facts */}
            <FunFacts facts={aboutData.funFacts} />
          </motion.div>
        </div>

        {/* Premium Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="heading-lg mb-4">
              <span className="gradient-text-premium">My Journey</span>
            </h3>
            <p className="text-body-base text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
              A timeline of my professional growth and key milestones
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Timeline items={timelineData} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;