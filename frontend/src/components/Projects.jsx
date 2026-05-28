import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';

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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-[var(--surface)] border border-[var(--border-std)] max-w-4xl w-full max-h-[90vh] overflow-y-auto relative p-8 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 border border-[var(--border-std)] text-[var(--muted)] hover:text-[var(--offwhite)] hover:border-[var(--amber)] transition-colors duration-250 cursor-none"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <span className="label-caps-amber mb-2 block">{project.category}</span>
              <h2 className="text-display mb-4">{project.title}</h2>
              <div className="flex gap-4 text-xs text-[var(--muted)] font-mono">
                <span>DATE: {project.date || project.startDate}</span>
                <span>STATUS: {project.status}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-[var(--offwhite)] leading-relaxed text-sm font-mono whitespace-pre-line mb-6">
                {project.longDescription || project.description}
              </p>
              {project.highlights && (
                <ul className="list-none space-y-2 text-sm text-[var(--muted)] font-mono">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[var(--amber)]">➔</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <span className="label-caps block mb-4">Technologies & Stack</span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-[var(--border-dim)]">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary cursor-none"
                >
                  <FaExternalLinkAlt className="w-3.5 h-3.5" />
                  Live Website
                </a>
              )}
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
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <>
      <div
        className="project-card"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Large background number */}
        <span className="project-number">{formattedIndex}</span>

        {/* Category & Status */}
        <div className="flex justify-between items-center mb-6 relative z-10">
          <span className="label-caps-amber">{project.category}</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
            <span className="text-[0.65rem] tracking-widest uppercase text-[var(--muted)] font-mono">
              {project.status}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-section-heading mb-4 relative z-10 hover:text-[var(--amber)] transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[var(--muted)] mb-8 line-clamp-3 text-xs leading-relaxed font-mono relative z-10">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-8 relative z-10">
          {project.technologies.slice(0, 3).map((tech, idx) => (
            <span key={idx} className="tech-tag">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="tech-tag text-[var(--amber)]">
              +{project.technologies.length - 3} MORE
            </span>
          )}
        </div>

        {/* Details link */}
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--offwhite)] hover:text-[var(--amber)] transition-colors duration-250 relative z-10">
          <span>VIEW CASE STUDY</span>
          <span className="text-[var(--amber)]">➔</span>
        </div>
      </div>

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
    <section id="projects" className="section-gap relative overflow-hidden bg-[var(--base)]">
      {/* Editorial section number texture */}
      <span className="section-number-bg" style={{ top: '-60px', right: '40px' }}>04</span>

      <div className="container-editorial relative z-10">
        {/* Header */}
        <div className="mb-20">
          <p className="label-caps-amber mb-4">SELECTED WORK</p>
          <h2 className="text-display mb-6">
            DIGITAL CREATIONS &<br />
            TECHNICAL SOLUTIONS
          </h2>
          <p className="text-sm text-[var(--muted)] max-w-xl font-mono leading-relaxed">
            A curated index of full-stack projects, fintech systems, compliance tools, and B2B platforms built with robust architectures.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 items-center mb-16 border-b border-[var(--border-dim)] pb-6">
          <span className="text-xs text-[var(--muted)] font-mono uppercase tracking-wider">Filter /</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Asymmetric Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={index % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1'}
            >
              <ProjectCard
                project={project}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      <hr className="hr-editorial" />
    </section>
  );
};

export default Projects;