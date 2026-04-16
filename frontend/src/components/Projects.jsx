import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaFilter, FaCode, FaEye, FaRocket, FaStar, FaHeart, FaCalendarAlt, FaTag } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { ANIMATION_VARIANTS } from '../utils/constants';

// Premium Project Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

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
            className="glass-premium rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-white/20 dark:border-white/10 shadow-2xl"
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
              
              <div className="flex items-start gap-6">
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaCode className="w-10 h-10 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-dark-800 dark:text-white mb-3 font-heading">
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-4 py-2 bg-primary-100 dark:bg-accent-900 text-primary-700 dark:text-accent-300 text-sm font-medium rounded-full flex items-center gap-2">
                        <FaStar className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-dark-500 dark:text-dark-400">
                    <span className="flex items-center gap-2">
                      <FaCalendarAlt className="w-4 h-4" />
                      {project.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaTag className="w-4 h-4" />
                      {project.technologies.length} Technologies
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Modal Content */}
            <div className="p-8 space-y-8">
              {/* Premium Project Image */}
              <motion.div 
                className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl flex items-center justify-center relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <FaRocket className="w-20 h-20 text-primary-500 mx-auto mb-4" />
                  </motion.div>
                  <p className="text-dark-600 dark:text-dark-300 font-medium">
                    Interactive Project Preview
                  </p>
                </div>
                
                {/* Premium Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Premium Description */}
              <div>
                <h3 className="text-xl font-semibold text-dark-800 dark:text-white mb-4 font-heading">
                  Project Overview
                </h3>
                <p className="text-dark-600 dark:text-dark-300 leading-relaxed text-body-base">
                  {project.description}
                </p>
              </div>

              {/* Premium Technologies */}
              <div>
                <h3 className="text-xl font-semibold text-dark-800 dark:text-white mb-4 font-heading">
                  Technologies & Tools
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 glass-premium border border-white/20 dark:border-white/10 text-dark-700 dark:text-dark-300 text-sm font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Premium Features */}
              <div>
                <h3 className="text-xl font-semibold text-dark-800 dark:text-white mb-4 font-heading">
                  Key Features & Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features?.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start p-4 rounded-xl glass-premium border border-white/20 dark:border-white/10"
                    >
                      <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-dark-600 dark:text-dark-300 text-sm">
                        {feature}
                      </span>
                    </motion.div>
                  )) || [
                    "Responsive design with modern UI/UX",
                    "Scalable architecture and performance optimization",
                    "Secure authentication and data management",
                    "Cross-platform compatibility"
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start p-4 rounded-xl glass-premium border border-white/20 dark:border-white/10"
                    >
                      <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-dark-600 dark:text-dark-300 text-sm">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Premium Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-outline flex items-center justify-center gap-3 flex-1 py-4 text-lg font-semibold"
                  >
                    <FaExternalLinkAlt className="w-5 h-5" />
                    Live Demo
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Premium Project Card Component
const ProjectCard = ({ project, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -10, scale: 1.02 }}
        className="glass-premium rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Premium Project Image */}
        <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 flex items-center justify-center relative overflow-hidden">
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <FaCode className="w-16 h-16 text-primary-500 mx-auto mb-4" />
            <p className="text-dark-600 dark:text-dark-300 font-medium">
              {project.title}
            </p>
          </motion.div>
          
          {/* Premium Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 glass-premium rounded-full text-white hover:bg-white/20 transition-colors duration-300"
            >
              <FaEye className="w-6 h-6" />
            </motion.div>
          </div>

          {/* Premium Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-primary-600 dark:bg-purple-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                <FaStar className="w-3 h-3" />
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Premium Project Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-dark-800 dark:text-white font-heading">
              {project.title}
            </h3>
            <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full">
              {project.category}
            </span>
          </div>

          <p className="text-dark-600 dark:text-dark-300 mb-4 line-clamp-3 text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Premium Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 glass-premium text-dark-700 dark:text-dark-300 text-xs font-medium rounded-full border border-white/20 dark:border-white/10"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 glass-premium text-dark-700 dark:text-dark-300 text-xs font-medium rounded-full border border-white/20 dark:border-white/10">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          {/* Premium Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 btn-glow text-sm py-3 font-semibold"
            >
              View Details
            </motion.button>
            
            
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 glass-premium text-dark-700 dark:text-dark-300 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 interactive-glow"
                onClick={(e) => e.stopPropagation()}
              >
                <FaExternalLinkAlt className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>

      <ProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

const Projects = () => {
  const { getProjectsData } = usePortfolioData();
  const projectsData = getProjectsData();
  
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  const categories = ['all', ...new Set(projectsData.map(project => project.category))];

  React.useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(projectsData.filter(project => project.category === filter));
    }
  }, [filter, projectsData]);

  return (
    <section id="projects" className="py-24 bg-gradient-to-br from-white via-secondary-50/30 to-primary-50/30 dark:from-dark-900 dark:via-dark-800/30 dark:to-dark-700/30 relative overflow-hidden">
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
              🚀 Featured Projects
            </span>
          </motion.div>
          
          <h2 className="heading-xl mb-6">
            <span className="gradient-text-premium">
              Creative Digital Solutions
            </span>
          </h2>
          
          <p className="text-body-lg text-dark-600 dark:text-dark-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work and projects that demonstrate my skills and expertise in modern web development.
          </p>
        </motion.div>

        {/* Premium Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <div className="flex items-center gap-2 text-dark-600 dark:text-dark-300 font-medium">
            <FaFilter className="w-4 h-4" />
            <span>Filter by:</span>
          </div>
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize ${
                filter === category
                  ? 'btn-glow text-white shadow-xl'
                  : 'glass-premium text-dark-700 dark:text-dark-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-white/20 dark:border-white/10'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Premium Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Premium Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { label: 'Projects Completed', value: '50+', icon: '🚀' },
            { label: 'Technologies Used', value: '25+', icon: '⚡' },
            { label: 'Happy Clients', value: '30+', icon: '😊' },
            { label: 'Years Experience', value: '5+', icon: '📈' },
          ].map((stat, index) => (
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
              <div className="text-3xl font-bold gradient-text-premium mb-2 font-heading">
                {stat.value}
              </div>
              <div className="text-sm text-dark-600 dark:text-dark-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <div className="glass-premium p-12 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block mb-6"
            >
              <FaHeart className="w-16 h-16 text-primary-500" />
            </motion.div>
            <h3 className="heading-lg mb-4">
              <span className="gradient-text-premium">Ready to Create Something Amazing?</span>
            </h3>
            <p className="text-body-lg text-dark-600 dark:text-dark-300 mb-8 max-w-2xl mx-auto">
              I'm always excited to take on new challenges and create amazing digital experiences. 
              Let's discuss your project and bring your ideas to life!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-glow px-8 py-4 text-lg font-semibold"
            >
              Let's Work Together
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;