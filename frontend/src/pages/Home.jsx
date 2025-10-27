import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Achievements from '../components/Achievements';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import EasterEggTerminal from '../components/EasterEggTerminal';
import Navigation from '../components/Navigation';
import SEO from '../components/SEO';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Home = () => {
  const { getPersonalInfo, getSEOData } = usePortfolioData();
  const personalInfo = getPersonalInfo();
  const seoData = getSEOData();

  return (
    <>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        image={seoData.ogImage}
        url={seoData.canonicalUrl}
        author={personalInfo.name}
      />
      
      <Navigation />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Blog />
        <Contact />
      </motion.main>
      
      <EasterEggTerminal />
    </>
  );
};

export default Home;
