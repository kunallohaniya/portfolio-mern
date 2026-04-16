import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import LazySection from '../components/LazySection';
import SEO from '../components/SEO';
import { usePortfolioData } from '../hooks/usePortfolioData';

// Lazy load components below the fold
const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Projects = lazy(() => import('../components/Projects'));
const Blog = lazy(() => import('../components/Blog'));
const EasterEggTerminal = lazy(() => import('../components/EasterEggTerminal'));
import Contact from '../components/Contact';

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
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Hero />
        
        <Suspense fallback={<div className="h-96" />}>
          <LazySection id="about" height="600px">
            <About />
          </LazySection>
          
          <LazySection id="skills" height="600px">
            <Skills />
          </LazySection>
          
          <LazySection id="projects" height="800px">
            <Projects />
          </LazySection>
          
          <LazySection id="blog" height="600px">
            <Blog />
          </LazySection>
          
          <Contact />
        </Suspense>
      </motion.main>
      
      <Suspense fallback={null}>
        <EasterEggTerminal />
      </Suspense>
    </>
  );
};

export default Home;
