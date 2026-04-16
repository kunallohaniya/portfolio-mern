import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Footer = () => {
  const { getPersonalInfo, getSocialLinks } = usePortfolioData();
  const personalInfo = getPersonalInfo();
  const socialLinks = getSocialLinks();

  const currentYear = new Date().getFullYear();

  const socialLinksData = [
    { icon: FaLinkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
    { icon: FaTwitter, href: socialLinks.twitter, label: 'Twitter' },
    { icon: FaEnvelope, href: socialLinks.email, label: 'Email' },
  ];

  return (
    <footer className="bg-gradient-to-br from-dark-800 to-dark-900 dark:from-dark-900 dark:to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-48 h-48 bg-secondary-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="container-premium relative z-10">
        <div className="py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold gradient-text-premium mb-4 font-heading">
                  {personalInfo.name}
                </h3>
                <p className="text-dark-300 dark:text-dark-400 leading-relaxed">
                  {personalInfo.bio}
                </p>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h4 className="text-lg font-semibold text-dark-100 dark:text-white mb-4 font-heading">
                Quick Links
              </h4>
              <div className="space-y-3">
                {['About', 'Skills', 'Projects', 'Contact'].map((link, index) => (
                  <motion.button
                    key={link}
                    onClick={() => {
                      const element = document.getElementById(link.toLowerCase());
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="block text-dark-300 dark:text-dark-400 hover:text-primary-400 transition-colors duration-300 text-left"
                  >
                    {link}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <h4 className="text-lg font-semibold text-dark-100 dark:text-white mb-4 font-heading">
                Connect With Me
              </h4>
              <div className="flex space-x-4">
                {socialLinksData.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full glass-premium border border-white/20 dark:border-white/10 text-dark-300 dark:text-dark-400 hover:text-primary-400 hover:bg-primary-500/20 transition-all duration-300 interactive-glow"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 dark:border-white/10 mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-dark-300 dark:text-dark-400 text-center md:text-left"
            >
              <p className="flex items-center justify-center md:justify-start">
                © {currentYear} {personalInfo.name}. Made with{' '}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="mx-1 text-red-500"
                >
                  <FaHeart />
                </motion.span>{' '}
                and modern web technologies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-dark-300 dark:text-dark-400 text-center md:text-right"
            >
              <p>Built with React, Three.js & Framer Motion</p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
