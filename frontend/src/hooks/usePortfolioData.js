import { useState, useEffect, useCallback, useMemo } from 'react';
import portfolioData from '../data/portfolio.json';

// Custom hook for managing portfolio data
export const usePortfolioData = () => {
  const [data, setData] = useState(portfolioData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to update portfolio data
  const updateData = useCallback((newData) => {
    setData(prevData => ({
      ...prevData,
      ...newData
    }));
  }, []);

  // Function to get specific section data
  const getSectionData = useCallback((section) => {
    return data[section] || null;
  }, [data]);

  // Function to get filtered projects
  const getFilteredProjects = useCallback((category = 'all', featured = false) => {
    let projects = data.projects || [];
    
    if (category !== 'all') {
      projects = projects.filter(project => project.category === category);
    }
    
    if (featured) {
      projects = projects.filter(project => project.featured === true);
    }
    
    return projects;
  }, [data.projects]);

  // Function to get filtered blog posts
  const getFilteredBlogPosts = useCallback((featured = false, limit = null) => {
    let posts = data.blogPosts || [];
    
    if (featured) {
      posts = posts.filter(post => post.featured === true);
    }
    
    if (limit) {
      posts = posts.slice(0, limit);
    }
    
    return posts;
  }, [data.blogPosts]);

  // Function to get skills by category
  const getSkillsByCategory = useCallback((category) => {
    return data.skills?.[category] || [];
  }, [data.skills]);

  // Function to get all skills
  const getAllSkills = useCallback(() => {
    const allSkills = [];
    Object.values(data.skills || {}).forEach(categorySkills => {
      allSkills.push(...categorySkills);
    });
    return allSkills;
  }, [data.skills]);

  // Helper function to calculate relevance score
  const calculateRelevanceScore = useCallback((item, searchTerm) => {
    let score = 0;
    const title = item.title?.toLowerCase() || '';
    const description = item.description?.toLowerCase() || '';
    const tags = (item.tags || []).join(' ').toLowerCase();
    
    if (title.includes(searchTerm)) score += 10;
    if (description.includes(searchTerm)) score += 5;
    if (tags.includes(searchTerm)) score += 3;
    
    return score;
  }, []);

  // Function to search content
  const searchContent = useCallback((query, sections = ['projects', 'blogPosts']) => {
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
  }, [data, calculateRelevanceScore]);

  // Function to get experience timeline
  const getExperienceTimeline = useCallback(() => {
    const experiences = data.experience || [];
    return experiences.sort((a, b) => new Date(b.period) - new Date(a.period));
  }, [data.experience]);

  // Function to get education timeline
  const getEducationTimeline = useCallback(() => {
    const education = data.education || [];
    return education.sort((a, b) => new Date(b.period) - new Date(a.period));
  }, [data.education]);


  // Function to get social links
  const getSocialLinks = useCallback(() => {
    return data.socialLinks || {};
  }, [data.socialLinks]);

  // Function to get personal info
  const getPersonalInfo = useCallback(() => {
    return data.personalInfo || {};
  }, [data.personalInfo]);

  // Function to get SEO data
  const getSEOData = useCallback(() => {
    return data.seo || {};
  }, [data.seo]);

  // Function to get analytics config
  const getAnalyticsConfig = useCallback(() => {
    return data.analytics || {};
  }, [data.analytics]);

  // Function to get terminal commands
  const getTerminalCommands = useCallback(() => {
    return data.terminalCommands || {};
  }, [data.terminalCommands]);

  // Function to get contact form config
  const getContactFormConfig = useCallback(() => {
    return data.contactForm || {};
  }, [data.contactForm]);

  // Function to get navigation items
  const getNavItems = useCallback(() => {
    return [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' },
      { id: 'blog', label: 'Blog' },
      { id: 'contact', label: 'Contact' }
    ];
  }, []);

  // Function to get skills data organized by category
  const getSkillsData = useCallback(() => {
    return {
      frontend: data.skills?.frontend || [],
      backend: data.skills?.backend || [],
      tools: data.skills?.tools || []
    };
  }, [data.skills]);

  // Function to get contact data
  const getContactData = useCallback(() => {
    return data.contact || {
      email: data.personalInfo?.email || '',
      phone: data.personalInfo?.phone || '',
      location: data.personalInfo?.location || '',
      availability: 'Available for freelance work'
    };
  }, [data.contact, data.personalInfo]);

  // Function to get about data
  const getAboutData = useCallback(() => {
    return {
      subtitle: data.personalInfo?.tagline || 'Full Stack Developer',
      description: [
        data.personalInfo?.bio || 'Passionate developer building amazing web applications.',
        data.personalInfo?.fullBio || 'With expertise in the MERN stack, I create modern, scalable, and user-friendly applications.'
      ],
      values: [
        { icon: '💡', title: 'Innovation', description: 'Always exploring new technologies and creative solutions' },
        { icon: '🎯', title: 'Quality', description: 'Committed to writing clean, maintainable code' },
        { icon: '🤝', title: 'Collaboration', description: 'Thriving in team environments and open-source communities' },
        { icon: '📚', title: 'Learning', description: 'Continuously improving skills and staying updated' }
      ],
      stats: [
        { label: 'Years Experience', value: '1', icon: '⏱️' },
        { label: 'Projects Completed', value: '10', icon: '🚀' },
        { label: 'Technologies', value: '15', icon: '⚡' },
        { label: 'Happy Clients', value: '10', icon: '😊' }
      ],
      funFacts: [
        { emoji: '☕', text: 'Coffee consumed daily', value: '2+ cups' },
        { emoji: '🎵', text: 'Coding playlist songs', value: '300+' },
        { emoji: '🌙', text: 'Favorite coding time', value: 'Late night' },
        { emoji: '🎮', text: 'Favorite hobby', value: 'gaming' }
      ],
      bio: data.personalInfo?.bio || '',
      fullBio: data.personalInfo?.fullBio || data.personalInfo?.bio || '',
      experience: data.experience || [],
      education: data.education || [],
      interests: data.personalInfo?.interests || [],
      languages: data.personalInfo?.languages || [],
      certifications: data.certifications || []
    };
  }, [data]);


  // Function to get projects data (returns array directly)
  const getProjectsData = useCallback(() => {
    // Return projects array directly as component expects it
    return data.projects || [];
  }, [data.projects]);

  // Function to get blog data
  const getBlogData = useCallback(() => {
    return {
      posts: data.blogPosts || [],
      featured: data.blogPosts?.filter(p => p.featured) || [],
      categories: [...new Set(data.blogPosts?.map(p => p.category) || [])]
    };
  }, [data.blogPosts]);

  return useMemo(() => ({
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
    getSocialLinks,
    getPersonalInfo,
    getSEOData,
    getAnalyticsConfig,
    getTerminalCommands,
    getContactFormConfig,
    getNavItems,
    getSkillsData,
    getContactData,
    getAboutData,
    getProjectsData,
    getBlogData
  }), [
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
    getSocialLinks,
    getPersonalInfo,
    getSEOData,
    getAnalyticsConfig,
    getTerminalCommands,
    getContactFormConfig,
    getNavItems,
    getSkillsData,
    getContactData,
    getAboutData,
    getProjectsData,
    getBlogData
  ]);
};

// Export individual data getters for direct access
export const getPortfolioData = () => portfolioData;
export const getPersonalInfo = () => portfolioData.personalInfo;
export const getSocialLinks = () => portfolioData.socialLinks;
export const getSkills = () => portfolioData.skills;
export const getProjects = () => portfolioData.projects;
export const getBlogPosts = () => portfolioData.blogPosts;
export const getExperience = () => portfolioData.experience;
export const getEducation = () => portfolioData.education;
export const getSEOData = () => portfolioData.seo;
export const getAnalyticsConfig = () => portfolioData.analytics;
export const getTerminalCommands = () => portfolioData.terminalCommands;
export const getContactFormConfig = () => portfolioData.contactForm;
