import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaCertificate, FaMedal, FaAward, FaDownload, FaExternalLinkAlt, FaTimes, FaStar, FaRocket, FaGraduationCap, FaHeart } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { ANIMATION_VARIANTS } from '../utils/constants';

// Premium Achievement Modal Component
const AchievementModal = ({ achievement, isOpen, onClose }) => {
  if (!achievement) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="glass-premium rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/20 dark:border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Premium Modal Header */}
            <div className="relative p-8 border-b border-white/20 dark:border-white/10">
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-6 p-3 rounded-full glass-premium border border-white/20 dark:border-white/10 text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 interactive-glow"
              >
                <FaTimes className="w-5 h-5" />
              </motion.button>
              
              <div className="flex items-center gap-6">
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-3xl">{achievement.icon}</span>
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold text-dark-800 dark:text-white font-heading">
                    {achievement.title}
                  </h2>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold text-lg">
                    {achievement.organization}
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Modal Content */}
            <div className="p-8 space-y-8">
              {/* Premium Achievement Image */}
              <motion.div 
                className="aspect-video bg-gradient-to-br from-accent-100 to-primary-100 dark:from-accent-900/20 dark:to-primary-900/20 rounded-2xl flex items-center justify-center relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="text-8xl">{achievement.icon}</span>
                  </motion.div>
                  <p className="text-dark-600 dark:text-dark-300 font-medium mt-4">
                    Certificate Preview
                  </p>
                </div>
                
                {/* Premium Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Premium Description */}
              <div>
                <h3 className="text-xl font-semibold text-dark-800 dark:text-white mb-4 font-heading">
                  Achievement Details
                </h3>
                <p className="text-dark-600 dark:text-dark-300 leading-relaxed text-body-base">
                  {achievement.description}
                </p>
              </div>

              {/* Premium Date */}
              <div>
                <h3 className="text-xl font-semibold text-dark-800 dark:text-white mb-4 font-heading">
                  Achievement Date
                </h3>
                <div className="p-4 rounded-xl glass-premium border border-white/20 dark:border-white/10">
                  <p className="text-dark-600 dark:text-dark-300 font-medium">
                    {achievement.date}
                  </p>
                </div>
              </div>

              {/* Premium Action Buttons */}
              {achievement.certificateUrl && (
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <motion.a
                    href={achievement.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-glow flex items-center justify-center gap-3 flex-1 py-4 text-lg font-semibold"
                  >
                    <FaExternalLinkAlt className="w-5 h-5" />
                    View Certificate
                  </motion.a>
                  
                  <motion.a
                    href={achievement.certificateUrl}
                    download
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-outline flex items-center justify-center gap-3 flex-1 py-4 text-lg font-semibold"
                  >
                    <FaDownload className="w-5 h-5" />
                    Download
                  </motion.a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Premium Achievement Badge Component
const AchievementBadge = React.memo(({ achievement, index, isActive }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = (type) => {
    switch (type) {
      case 'certification':
        return FaCertificate;
      case 'award':
        return FaAward;
      case 'medal':
        return FaMedal;
      default:
        return FaTrophy;
    }
  };

  const Icon = getIcon(achievement.type);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.05, y: -10 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`relative cursor-pointer group ${isActive ? 'z-10' : ''}`}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Premium Badge */}
        <motion.div
          className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-300 relative overflow-hidden ${
            isActive ? 'scale-110' : ''
          }`}
          style={{ 
            background: `linear-gradient(135deg, ${achievement.color || '#3b82f6'}, ${achievement.secondaryColor || '#8b5cf6'})`
          }}
          animate={{
            scale: isHovered ? 1.1 : isActive ? 1.05 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Badge Icon */}
          <motion.div
            className="text-4xl mb-2"
            animate={{ 
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.2 : 1
            }}
            transition={{ duration: 0.5 }}
          >
            {achievement.icon}
          </motion.div>

          {/* Badge Title */}
          <div className="text-xs font-bold text-center px-2 leading-tight">
            {achievement.title.split(' ').slice(0, 2).join(' ')}
          </div>

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '100%' : '-100%' }}
            transition={{ duration: 0.6 }}
          />

          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full blur-xl opacity-0"
            style={{ backgroundColor: achievement.color || '#3b82f6' }}
            animate={{
              opacity: isHovered ? 0.4 : 0,
              scale: isHovered ? 1.5 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Achievement Details */}
        <motion.div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered || isActive ? 1 : 0, y: isHovered || isActive ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="glass-premium px-4 py-2 rounded-full border border-white/20 dark:border-white/10 shadow-lg">
            <div className="text-xs font-semibold text-dark-800 dark:text-white">
              {achievement.organization}
            </div>
            <div className="text-xs text-dark-600 dark:text-dark-300">
              {achievement.date}
            </div>
          </div>
        </motion.div>

        {/* Certificate Link */}
        {achievement.certificateUrl && (
          <motion.button
            className="absolute -top-2 -right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(achievement.certificateUrl, '_blank');
            }}
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            aria-label={`View ${achievement.title} certificate`}
            title={`View ${achievement.title} certificate`}
          >
            <FaExternalLinkAlt className="w-3 h-3" />
          </motion.button>
        )}
      </motion.div>

      <AchievementModal
        achievement={achievement}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
});

AchievementBadge.displayName = 'AchievementBadge';

// Premium Stats Component
const AchievementStats = React.memo(() => {
  const stats = [
    { label: 'Certifications', value: '6+', icon: '🏆', color: 'text-yellow-500' },
    { label: 'Awards Won', value: '3+', icon: '🥇', color: 'text-orange-500' },
    { label: 'Years Learning', value: '5+', icon: '📚', color: 'text-blue-500' },
    { label: 'Skills Mastered', value: '25+', icon: '⚡', color: 'text-purple-500' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="text-center p-6 rounded-2xl glass-premium border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 group"
        >
          <motion.div
            className="text-4xl mb-3"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {stat.icon}
          </motion.div>
          <div className={`text-3xl font-bold ${stat.color} mb-2 font-heading`}>
            {stat.value}
          </div>
          <div className="text-sm text-dark-600 dark:text-dark-300 font-medium">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
});

AchievementStats.displayName = 'AchievementStats';

// Premium Learning Journey Component
const LearningJourney = React.memo(() => {
  const milestones = [
    {
      year: '2023',
      title: 'Advanced Certifications',
      description: 'Completed AWS Developer and React certifications',
      icon: '☁️',
      color: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      year: '2022',
      title: 'Open Source Contributions',
      description: 'Started contributing to major open source projects',
      icon: '🌟',
      color: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      year: '2021',
      title: 'Full Stack Mastery',
      description: 'Mastered the complete MERN stack development',
      icon: '⚡',
      color: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      year: '2020',
      title: 'First Professional Role',
      description: 'Started my career as a frontend developer',
      icon: '🚀',
      color: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      year: '2019',
      title: 'Bootcamp Graduate',
      description: 'Completed intensive full-stack development bootcamp',
      icon: '🎓',
      color: 'bg-pink-50 dark:bg-pink-900/20',
    },
    {
      year: '2018',
      title: 'First Code',
      description: 'Wrote my first "Hello World" program',
      icon: '💻',
      color: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="heading-lg mb-4">
          <span className="gradient-text-premium">My Learning Journey</span>
        </h3>
        <p className="text-body-base text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
          A timeline of my professional growth and key milestones in my development career
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`glass-premium p-6 rounded-2xl border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 ${milestone.color}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                className="text-3xl"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {milestone.icon}
              </motion.div>
              <div>
                <h4 className="font-bold text-dark-800 dark:text-white text-lg">
                  {milestone.year}
                </h4>
                <h5 className="font-semibold text-dark-700 dark:text-dark-200">
                  {milestone.title}
                </h5>
              </div>
            </div>
            <p className="text-sm text-dark-600 dark:text-dark-300 leading-relaxed">
              {milestone.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

LearningJourney.displayName = 'LearningJourney';

const Achievements = () => {
  const { getAchievementsData, getPersonalInfo } = usePortfolioData();
  const achievementsData = getAchievementsData();
  const personalInfo = getPersonalInfo();

  return (
    <section id="achievements" className="py-24 bg-gradient-to-br from-white via-accent-50/30 to-primary-50/30 dark:from-dark-900 dark:via-dark-800/30 dark:to-dark-700/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 glass-premium rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 glass-premium rounded-full blur-3xl opacity-20"
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
              🏆 Achievements & Certifications
            </span>
          </motion.div>
          
          <h2 className="heading-xl mb-6">
            <span className="gradient-text-premium">
              Recognition & Excellence
            </span>
          </h2>
          
          <p className="text-body-lg text-dark-600 dark:text-dark-300 max-w-3xl mx-auto leading-relaxed">
            Recognition of my professional growth and commitment to continuous learning and excellence.
          </p>
        </motion.div>

        {/* Premium Achievements Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 mb-20"
        >
          {achievementsData.map((achievement, index) => (
            <AchievementBadge
              key={achievement.id}
              achievement={achievement}
              index={index}
              isActive={index === 0}
            />
          ))}
        </motion.div>

        {/* Premium Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <AchievementStats />
        </motion.div>

        {/* Premium Resume Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mb-20"
        >
          <div className="glass-premium p-12 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl max-w-4xl mx-auto">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-8"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaDownload className="w-10 h-10 text-white" />
            </motion.div>
            
            <h3 className="heading-lg mb-6">
              <span className="gradient-text-premium">Download My Resume</span>
            </h3>
            <p className="text-body-lg text-dark-600 dark:text-dark-300 mb-8 max-w-2xl mx-auto">
              Get a comprehensive overview of my experience, skills, and achievements in a downloadable format.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                href={personalInfo.resumeUrl}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glow flex items-center gap-3 px-8 py-4 text-lg font-semibold"
              >
                <FaDownload className="w-5 h-5" />
                Download PDF
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-outline flex items-center gap-3 px-8 py-4 text-lg font-semibold"
              >
                <FaHeart className="w-5 h-5" />
                Contact Me
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Premium Learning Journey */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <LearningJourney />
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;