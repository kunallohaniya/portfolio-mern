import { getPortfolioData } from '../hooks/usePortfolioData';

// Generate sitemap.xml content
export const generateSitemap = (baseUrl = 'https://kunalportfolio.in') => {
  const portfolioData = getPortfolioData();
  const currentDate = new Date().toISOString();
  
  const staticPages = [
    {
      url: '',
      priority: '1.0',
      changefreq: 'monthly'
    },
    {
      url: '/about',
      priority: '0.8',
      changefreq: 'monthly'
    },
    {
      url: '/skills',
      priority: '0.7',
      changefreq: 'monthly'
    },
    {
      url: '/projects',
      priority: '0.9',
      changefreq: 'weekly'
    },
    {
      url: '/blog',
      priority: '0.8',
      changefreq: 'weekly'
    },
    {
      url: '/contact',
      priority: '0.7',
      changefreq: 'monthly'
    }
  ];

  const blogPages = portfolioData.blogPosts?.map(post => ({
    url: `/blog/${post.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: post.date
  })) || [];

  const projectPages = portfolioData.projects?.map(project => ({
    url: `/projects/${project.id}`,
    priority: '0.6',
    changefreq: 'monthly'
  })) || [];

  const allPages = [...staticPages, ...blogPages, ...projectPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

// Generate robots.txt content
export const generateRobotsTxt = (baseUrl = 'https://kunalportfolio.in') => {
  return `# Robots.txt base configuration
User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Allow all other content
Allow: /css/
Allow: /js/
Allow: /images/
Allow: /fonts/`;
};

// Generate manifest.json for PWA
export const generateManifest = () => {
  const portfolioData = getPortfolioData();
  const personalInfo = portfolioData.personalInfo;

  return {
    name: `${personalInfo.name} - Full Stack Developer`,
    short_name: `${personalInfo.name} Portfolio`,
    description: personalInfo.bio,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'portrait',
    scope: '/',
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ],
    categories: ['portfolio', 'developer', 'technology'],
    lang: 'en',
    dir: 'ltr'
  };
};
