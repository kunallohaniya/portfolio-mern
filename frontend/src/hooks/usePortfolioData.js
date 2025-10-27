import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolio.json';

// Custom hook for managing portfolio data
export const usePortfolioData = () => {
  const [data, setData] = useState(portfolioData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to update portfolio data
  const updateData = (newData) => {
    setData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

  // Function to get specific section data
  const getSectionData = (section) => {
    return data[section] || null;
  };

  // Function to get filtered projects
  const getFilteredProjects = (category = 'all', featured = false) => {
    let projects = data.projects || [];
    
    if (category !== 'all') {
      projects = projects.filter(project => project.category === category);
    }
    
    if (featured) {
      projects = projects.filter(project => project.featured === true);
    }
    
    return projects;
  };

  // Function to get filtered blog posts
  const getFilteredBlogPosts = (featured = false, limit = null) => {
    let posts = data.blogPosts || [];
    
    if (featured) {
      posts = posts.filter(post => post.featured === true);
    }
    
    if (limit) {
      posts = posts.slice(0, limit);
    }
    
    return posts;
  };

  // Function to get skills by category
  const getSkillsByCategory = (category) => {
    return data.skills?.[category] || [];
  };

  // Function to get all skills
  const getAllSkills = () => {
    const allSkills = [];
    Object.values(data.skills || {}).forEach(categorySkills => {
      allSkills.push(...categorySkills);
    });
    return allSkills;
  };

  // Function to search content
  const searchContent = (query, sections = ['projects', 'blogPosts']) => {
    const results = [];
    const searchTerm = query.toLowerCase();
    
    sections.forEach(section => {
      const items = data[section] || [];
      items.forEach(item => {
        const searchableText = [
          item.title,
          item.description,
          item.excerpt,
          ...(item.tags || []),
          ...(item.technologies || [])
        ].join(' ').toLowerCase();
        
        if (searchableText.includes(searchTerm)) {
          results.push({
            ...item,
            section,
            relevanceScore: calculateRelevanceScore(item, searchTerm)
          });
        }
      });
    });
    
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  };

  // Helper function to calculate relevance score
  const calculateRelevanceScore = (item, searchTerm) => {
    let score = 0;
    const title = item.title?.toLowerCase() || '';
    const description = item.description?.toLowerCase() || '';
    const tags = (item.tags || []).join(' ').toLowerCase();
    
    if (title.includes(searchTerm)) score += 10;
    if (description.includes(searchTerm)) score += 5;
    if (tags.includes(searchTerm)) score += 3;
    
    return score;
  };

  // Function to get experience timeline
  const getExperienceTimeline = () => {
    const experiences = data.experience || [];
    return experiences.sort((a, b) => new Date(b.period) - new Date(a.period));
  };

  // Function to get education timeline
  const getEducationTimeline = () => {
    const education = data.education || [];
    return education.sort((a, b) => new Date(b.period) - new Date(a.period));
  };

  // Function to get achievements by type
  const getAchievementsByType = (type = 'all') => {
    const achievements = data.achievements || [];
    if (type === 'all') return achievements;
    return achievements.filter(achievement => achievement.type === type);
  };

  // Function to get social links
  const getSocialLinks = () => {
    return data.socialLinks || {};
  };

  // Function to get personal info
  const getPersonalInfo = () => {
    return data.personalInfo || {};
  };

  // Function to get SEO data
  const getSEOData = () => {
    return data.seo || {};
  };

  // Function to get analytics config
  const getAnalyticsConfig = () => {
    return data.analytics || {};
  };

  // Function to get terminal commands
  const getTerminalCommands = () => {
    return data.terminalCommands || {};
  };

  // Function to get contact form config
  const getContactFormConfig = () => {
    return data.contactForm || {};
  };

  return {
    data,
    loading,
    error,
    updateData,
    getSectionData,
    getFilteredProjects,
    getFilteredBlogPosts,
    getSkillsByCategory,
    getAllSkills,
    searchContent,
    getExperienceTimeline,
    getEducationTimeline,
    getAchievementsByType,
    getSocialLinks,
    getPersonalInfo,
    getSEOData,
    getAnalyticsConfig,
    getTerminalCommands,
    getContactFormConfig
  };
};

// Export individual data getters for direct access
export const getPortfolioData = () => portfolioData;
export const getPersonalInfo = () => portfolioData.personalInfo;
export const getSocialLinks = () => portfolioData.socialLinks;
export const getSkills = () => portfolioData.skills;
export const getProjects = () => portfolioData.projects;
export const getBlogPosts = () => portfolioData.blogPosts;
export const getAchievements = () => portfolioData.achievements;
export const getExperience = () => portfolioData.experience;
export const getEducation = () => portfolioData.education;
export const getSEOData = () => portfolioData.seo;
export const getAnalyticsConfig = () => portfolioData.analytics;
export const getTerminalCommands = () => portfolioData.terminalCommands;
export const getContactFormConfig = () => portfolioData.contactForm;
