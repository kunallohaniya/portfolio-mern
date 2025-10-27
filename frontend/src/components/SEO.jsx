import React from 'react';
import { Helmet } from 'react-helmet-async';
import { usePortfolioData } from '../hooks/usePortfolioData';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  const { getPersonalInfo, getSEOData } = usePortfolioData();
  const personalInfo = getPersonalInfo();
  const seoData = getSEOData();

  // Use provided values or fallback to defaults
  const seoTitle = title || seoData.title || `${personalInfo.name} - ${personalInfo.title}`;
  const seoDescription = description || seoData.description || personalInfo.bio;
  const seoKeywords = keywords || seoData.keywords || [
    'full stack developer',
    'MERN stack',
    'React',
    'Node.js',
    'MongoDB',
    'JavaScript',
    'portfolio',
    personalInfo.name.toLowerCase()
  ];
  const seoImage = image || seoData.ogImage || '/og-image.jpg';
  const seoUrl = url || seoData.canonicalUrl || window.location.href;
  const seoAuthor = author || personalInfo.name;

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personalInfo.name,
    "jobTitle": personalInfo.title,
    "description": personalInfo.bio,
    "url": seoUrl,
    "image": seoImage,
    "sameAs": [
      personalInfo.socialLinks?.github,
      personalInfo.socialLinks?.linkedin,
      personalInfo.socialLinks?.twitter
    ].filter(Boolean),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": personalInfo.location
    },
    "email": personalInfo.email,
    "telephone": personalInfo.phone,
    "knowsAbout": seoKeywords,
    "alumniOf": personalInfo.education?.map(edu => ({
      "@type": "EducationalOrganization",
      "name": edu.institution
    })),
    "worksFor": personalInfo.experience?.map(exp => ({
      "@type": "Organization",
      "name": exp.company
    }))
  };

  // Add article-specific structured data if type is article
  if (type === 'article') {
    structuredData["@type"] = "Article";
    structuredData.headline = seoTitle;
    structuredData.description = seoDescription;
    structuredData.author = {
      "@type": "Person",
      "name": seoAuthor
    };
    structuredData.publisher = {
      "@type": "Person",
      "name": seoAuthor
    };
    structuredData.datePublished = publishedTime;
    structuredData.dateModified = modifiedTime || publishedTime;
    structuredData.image = seoImage;
    structuredData.url = seoUrl;
    if (tags.length > 0) {
      structuredData.keywords = tags.join(', ');
    }
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={Array.isArray(seoKeywords) ? seoKeywords.join(', ') : seoKeywords} />
      <meta name="author" content={seoAuthor} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3b82f6" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seoUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={`${personalInfo.name} - Portfolio`} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={seoData.twitterCard || "summary_large_image"} />
      <meta name="twitter:url" content={seoUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:creator" content={personalInfo.socialLinks?.twitter} />
      <meta name="twitter:site" content={personalInfo.socialLinks?.twitter} />
      
      {/* Additional Meta Tags */}
      <meta name="application-name" content={`${personalInfo.name} Portfolio`} />
      <meta name="apple-mobile-web-app-title" content={`${personalInfo.name} Portfolio`} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Article-specific meta tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={seoAuthor} />
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:modified_time" content={modifiedTime || publishedTime} />
          <meta property="article:section" content={section} />
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
};

export default SEO;
