import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCode, FaServer, FaTools, FaChartLine, FaRocket, FaStar, FaHeart } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { ANIMATION_VARIANTS } from '../utils/constants';

// Simplified Skills Display (No 3D)
const SkillsDisplay = React.memo(() => {
  const skills = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Node.js', color: '#68A063' },
    { name: 'MongoDB', color: '#47A248' },
    { name: 'JavaScript', color: '#F7DF1E' },
    { name: 'Python', color: '#3776AB' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'CSS3', color: '#1572B6' },
    { name: 'Express', color: '#000000' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
          style={{ borderLeft: `4px solid ${skill.color}` }}
        >
          <p className="font-semibold text-center">{skill.name}</p>
        </motion.div>
      ))}
    </div>
  );
});

SkillsDisplay.displayName = 'SkillsDisplay';

// Premium Skill Bubble Component
const SkillBubble = React.memo(({ skill, index, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.1, y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative cursor-pointer group ${isActive ? 'z-10' : ''}`}
    >
      {/* Skill Bubble */}
      <motion.div
        className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-xl transition-all duration-300 ${
          isActive ? 'scale-110 shadow-2xl' : ''
        }`}
        style={{ backgroundColor: skill.color }}
        animate={{
          scale: isHovered ? 1.2 : isActive ? 1.1 : 1,
          rotate: isHovered ? 360 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {skill.icon}
      </motion.div>

      {/* Skill Name */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered || isActive ? 1 : 0, y: isHovered || isActive ? 0 : 10 }}
        transition={{ duration: 0.2 }}
      >
        <span className="px-3 py-1 bg-dark-800 dark:bg-dark-200 text-white dark:text-dark-800 text-xs font-medium rounded-full shadow-lg">
          {skill.name}
        </span>
      </motion.div>

      {/* Skill Level Indicator */}
      <motion.div
        className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
        initial={{ scale: 0 }}
        animate={{ scale: isHovered || isActive ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {skill.level}%
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl opacity-0"
        style={{ backgroundColor: skill.color }}
        animate={{
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
});

SkillBubble.displayName = 'SkillBubble';

// Premium Skill Category Component
const SkillCategory = React.memo(({ title, icon: Icon, skills, color, bgColor, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`glass-premium rounded-2xl p-8 border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 ${
        isActive ? 'ring-2 ring-primary-500' : ''
      }`}
    >
      <div className="flex items-center mb-8">
        <motion.div
          className={`w-16 h-16 rounded-2xl ${bgColor} flex items-center justify-center mr-6`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className={`w-8 h-8 ${color}`} />
        </motion.div>
        <h3 className="text-2xl font-bold text-dark-800 dark:text-white font-heading">
          {title}
        </h3>
      </div>

      <div className="space-y-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{skill.icon}</span>
                <span className="font-semibold text-dark-700 dark:text-dark-300 text-lg">
                  {skill.name}
                </span>
              </div>
              <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                {skill.level}%
              </span>
            </div>
            
            <div className="w-full bg-dark-200 dark:bg-dark-700 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: "easeOut" }}
                className={`h-3 rounded-full bg-gradient-to-r ${
                  color.includes('blue') ? 'from-blue-500 to-blue-600' : 
                  color.includes('green') ? 'from-green-500 to-green-600' : 
                  'from-purple-500 to-purple-600'
                } shadow-lg`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

SkillCategory.displayName = 'SkillCategory';

// Premium Skills Overview Component
const SkillsOverview = React.memo(() => {
  const overviewRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: overviewRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const skills = [
    { name: 'React', level: 95, color: '#61DAFB', icon: '⚛️' },
    { name: 'Node.js', level: 90, color: '#68A063', icon: '🟢' },
    { name: 'MongoDB', level: 88, color: '#47A248', icon: '🍃' },
    { name: 'JavaScript', level: 95, color: '#F7DF1E', icon: '🟡' },
    { name: 'TypeScript', level: 85, color: '#3178C6', icon: '🔷' },
    { name: 'Python', level: 75, color: '#3776AB', icon: '🐍' },
  ];

  return (
    <div ref={overviewRef} className="glass-premium rounded-3xl p-12 border border-white/20 dark:border-white/10 shadow-2xl">
      <div className="text-center mb-12">
        <motion.div
          className="flex items-center justify-center mb-6"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaChartLine className="w-10 h-10 text-primary-600 mr-4" />
          <h3 className="text-3xl font-bold text-dark-800 dark:text-white font-heading">
            Skills Overview
          </h3>
        </motion.div>
        <p className="text-body-lg text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
          Interactive visualization of my technical proficiency across key technologies
        </p>
      </div>

      {/* 3D Skills Orbit */}
      {/* Simplified Skills Display */}
      <SkillsDisplay />

      {/* Skill Bubbles Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-8 mb-12">
        {skills.map((skill, index) => (
          <SkillBubble
            key={skill.name}
            skill={skill}
            index={index}
            isActive={index === 0}
          />
        ))}
      </div>

      {/* Skills Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { label: 'Frontend', value: '95%', color: 'text-blue-500', icon: '🎨' },
          { label: 'Backend', value: '90%', color: 'text-green-500', icon: '⚙️' },
          { label: 'Database', value: '88%', color: 'text-purple-500', icon: '🗄️' },
          { label: 'DevOps', value: '75%', color: 'text-orange-500', icon: '🚀' },
          { label: 'Mobile', value: '70%', color: 'text-pink-500', icon: '📱' },
          { label: 'AI/ML', value: '65%', color: 'text-indigo-500', icon: '🤖' },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-6 rounded-2xl glass-premium border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 group"
            style={{ y: y }}
          >
            <motion.div
              className="text-4xl mb-3"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.icon}
            </motion.div>
            <div className={`text-3xl font-bold ${item.color} mb-2 font-heading`}>
              {item.value}
            </div>
            <div className="text-sm text-dark-600 dark:text-dark-300 font-medium">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

SkillsOverview.displayName = 'SkillsOverview';

const Skills = () => {
  const { getSkillsData } = usePortfolioData();
  const skillsData = getSkillsData();
  
  const [selectedCategory, setSelectedCategory] = useState('frontend');

  const categories = [
    {
      key: 'frontend',
      title: 'Frontend Development',
      icon: FaCode,
      skills: skillsData.frontend,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      key: 'backend',
      title: 'Backend Development',
      icon: FaServer,
      skills: skillsData.backend,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      key: 'tools',
      title: 'Tools & Others',
      icon: FaTools,
      skills: skillsData.tools,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  return (
    <section id="skills" className="py-24 bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/30 dark:from-dark-900 dark:via-dark-800/30 dark:to-dark-700/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 glass-premium rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-48 h-48 glass-premium rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

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
              ⚡ Skills & Expertise
            </span>
          </motion.div>
          
          <h2 className="heading-xl mb-6">
            <span className="gradient-text-premium">
              Technical Mastery
            </span>
          </h2>
          
          <p className="text-body-lg text-dark-600 dark:text-dark-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical skills and expertise across different domains of modern web development.
          </p>
        </motion.div>

        {/* Premium Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-3 ${
                selectedCategory === category.key
                  ? 'btn-glow text-white shadow-xl'
                  : 'glass-premium text-dark-700 dark:text-dark-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-white/20 dark:border-white/10'
              }`}
            >
              <category.icon className="w-5 h-5" />
              {category.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Premium Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
        >
          {categories.map((category) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, x: selectedCategory === category.key ? 0 : -50 }}
              animate={{ 
                opacity: selectedCategory === category.key ? 1 : 0,
                x: selectedCategory === category.key ? 0 : -50
              }}
              transition={{ duration: 0.5 }}
              className={selectedCategory === category.key ? 'block' : 'hidden lg:block'}
            >
              <SkillCategory 
                title={category.title}
                icon={category.icon}
                skills={category.skills}
                color={category.color}
                bgColor={category.bgColor}
                isActive={selectedCategory === category.key}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Skills Overview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <SkillsOverview />
        </motion.div>

        {/* Premium Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <h3 className="heading-lg mb-8">
            <span className="gradient-text-premium">Additional Skills & Interests</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Agile Development', 'Scrum Master', 'Code Review', 'Mentoring',
              'Technical Writing', 'Open Source', 'UI/UX Design', 'Accessibility',
              'Performance Optimization', 'Security Best Practices', 'API Design',
              'Microservices', 'Cloud Architecture', 'DevOps', 'CI/CD'
            ].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 glass-premium text-dark-700 dark:text-dark-300 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-white/10"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;