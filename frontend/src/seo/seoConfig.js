/**
 * SEO Configuration for Portfolio
 * Provides meta tags and structured data for better search engine optimization
 */

export const seoConfig = {
  // Default SEO settings
  default: {
    title: 'Portfolio | Full Stack MERN Developer',
    description: 'Professional portfolio showcasing modern web applications built with MERN stack (MongoDB, Express, React, Node.js). Explore my projects and get in touch for collaboration.',
    keywords: 'full stack developer, MERN stack, React, Node.js, MongoDB, Express, web development, portfolio, JavaScript, TypeScript',
    author: 'Your Name', // Replace with your name
    siteUrl: 'https://yourportfolio.com', // Replace with your actual URL
    image: '/og-image.jpg', // Default Open Graph image
    type: 'website',
    locale: 'en_US',
    twitterHandle: '@yourhandle' // Replace with your Twitter handle
  },

  // Page-specific SEO
  pages: {
    home: {
      title: 'Home | Full Stack MERN Developer',
      description: 'Welcome to my portfolio. I\'m a passionate full-stack developer specializing in MERN stack development, creating beautiful and functional web applications.',
      keywords: 'full stack developer, MERN developer, React developer, Node.js developer, portfolio',
      path: '/'
    },
    about: {
      title: 'About Me | Full Stack Developer',
      description: 'Learn more about my journey as a full-stack developer, my skills, experience, and passion for building modern web applications.',
      keywords: 'about, developer bio, skills, experience, full stack developer',
      path: '/about'
    },
    projects: {
      title: 'Projects | My Work Portfolio',
      description: 'Explore my portfolio of web applications and projects built with modern technologies like React, Node.js, MongoDB, and more.',
      keywords: 'projects, portfolio, web applications, React projects, MERN projects',
      path: '/projects'
    },
    contact: {
      title: 'Contact Me | Get In Touch',
      description: 'Have a project in mind? Let\'s collaborate! Reach out to me for web development projects, consultations, or just to say hi.',
      keywords: 'contact, hire developer, web development services, collaboration',
      path: '/contact'
    },
    admin: {
      title: 'Admin Dashboard | Portfolio CMS',
      description: 'Admin dashboard for managing portfolio content',
      robots: 'noindex, nofollow', // Don't index admin pages
      path: '/admin/dashboard'
    }
  },

  // Structured Data (JSON-LD)
  structuredData: {
    person: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Your Name', // Replace
      url: 'https://yourportfolio.com', // Replace
      image: 'https://yourportfolio.com/profile.jpg', // Replace
      sameAs: [
        'https://github.com/yourusername', // Replace
        'https://linkedin.com/in/yourprofile', // Replace
        'https://twitter.com/yourhandle' // Replace
      ],
      jobTitle: 'Full Stack Developer',
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance'
      },
      description: 'Full Stack MERN Developer specializing in building modern web applications',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Your City', // Replace
        addressCountry: 'Your Country' // Replace
      }
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Portfolio',
      url: 'https://yourportfolio.com', // Replace
      description: 'Professional portfolio of a Full Stack MERN Developer',
      author: {
        '@type': 'Person',
        name: 'Your Name' // Replace
      }
    },
    webPage: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Portfolio',
      description: 'Professional portfolio showcasing web development projects',
      url: 'https://yourportfolio.com' // Replace
    }
  }
};

/**
 * Generate SEO meta tags for a specific page
 * @param {string} pageName - Name of the page (home, about, projects, etc.)
 * @param {object} customData - Custom data to override defaults
 * @returns {object} SEO data object
 */
export const getPageSEO = (pageName = 'default', customData = {}) => {
  const pageConfig = seoConfig.pages[pageName] || seoConfig.default;
  const defaultConfig = seoConfig.default;

  return {
    title: customData.title || pageConfig.title || defaultConfig.title,
    description: customData.description || pageConfig.description || defaultConfig.description,
    keywords: customData.keywords || pageConfig.keywords || defaultConfig.keywords,
    image: customData.image || defaultConfig.image,
    url: defaultConfig.siteUrl + (pageConfig.path || '/'),
    type: customData.type || defaultConfig.type,
    robots: pageConfig.robots || 'index, follow',
    author: defaultConfig.author,
    locale: defaultConfig.locale,
    twitterHandle: defaultConfig.twitterHandle
  };
};

/**
 * Generate JSON-LD structured data
 * @param {string} type - Type of structured data (person, website, webPage)
 * @returns {string} JSON-LD string
 */
export const getStructuredData = (type = 'person') => {
  const data = seoConfig.structuredData[type];
  return data ? JSON.stringify(data) : null;
};

/**
 * Generate Open Graph meta tags
 * @param {object} seoData - SEO data object
 * @returns {array} Array of Open Graph meta tags
 */
export const getOpenGraphTags = (seoData) => {
  return [
    { property: 'og:type', content: seoData.type },
    { property: 'og:title', content: seoData.title },
    { property: 'og:description', content: seoData.description },
    { property: 'og:url', content: seoData.url },
    { property: 'og:image', content: seoData.image },
    { property: 'og:locale', content: seoData.locale },
    { property: 'og:site_name', content: 'Portfolio' }
  ];
};

/**
 * Generate Twitter Card meta tags
 * @param {object} seoData - SEO data object
 * @returns {array} Array of Twitter Card meta tags
 */
export const getTwitterCardTags = (seoData) => {
  return [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: seoData.twitterHandle },
    { name: 'twitter:creator', content: seoData.twitterHandle },
    { name: 'twitter:title', content: seoData.title },
    { name: 'twitter:description', content: seoData.description },
    { name: 'twitter:image', content: seoData.image }
  ];
};

export default seoConfig;

