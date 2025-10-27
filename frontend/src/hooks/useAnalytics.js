import { useEffect } from 'react';
import { usePortfolioData } from './usePortfolioData';

// Google Analytics 4 integration
const initializeGoogleAnalytics = (trackingId) => {
  if (!trackingId || typeof window === 'undefined') return;

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', trackingId, {
    page_title: document.title,
    page_location: window.location.href,
  });

  return gtag;
};

// PostHog integration
const initializePostHog = (apiKey, host) => {
  if (!apiKey || typeof window === 'undefined') return;

  // Load PostHog script
  const script = document.createElement('script');
  script.async = true;
  script.src = `${host}/static/array.js`;
  document.head.appendChild(script);

  script.onload = () => {
    window.posthog.init(apiKey, {
      api_host: host,
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          posthog.debug();
        }
      }
    });
  };

  return window.posthog;
};

// Custom analytics hook
export const useAnalytics = () => {
  const { getAnalyticsConfig } = usePortfolioData();
  const analyticsConfig = getAnalyticsConfig();

  useEffect(() => {
    // Initialize Google Analytics
    if (analyticsConfig.googleAnalytics?.enabled && analyticsConfig.googleAnalytics.trackingId) {
      initializeGoogleAnalytics(analyticsConfig.googleAnalytics.trackingId);
    }

    // Initialize PostHog
    if (analyticsConfig.posthog?.enabled && analyticsConfig.posthog.apiKey) {
      initializePostHog(analyticsConfig.posthog.apiKey, analyticsConfig.posthog.host);
    }
  }, [analyticsConfig]);

  // Track page view
  const trackPageView = (pageName, pagePath) => {
    if (typeof window === 'undefined') return;

    // Google Analytics
    if (window.gtag) {
      window.gtag('config', analyticsConfig.googleAnalytics?.trackingId, {
        page_title: pageName,
        page_location: window.location.origin + pagePath,
      });
    }

    // PostHog
    if (window.posthog) {
      window.posthog.capture('$pageview', {
        $current_url: window.location.href,
        page_name: pageName,
        page_path: pagePath,
      });
    }
  };

  // Track custom event
  const trackEvent = (eventName, properties = {}) => {
    if (typeof window === 'undefined') return;

    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, {
        event_category: properties.category || 'engagement',
        event_label: properties.label,
        value: properties.value,
        ...properties,
      });
    }

    // PostHog
    if (window.posthog) {
      window.posthog.capture(eventName, properties);
    }
  };

  // Track user interaction
  const trackInteraction = (element, action, details = {}) => {
    trackEvent('user_interaction', {
      element,
      action,
      ...details,
    });
  };

  // Track project view
  const trackProjectView = (projectId, projectTitle) => {
    trackEvent('project_view', {
      project_id: projectId,
      project_title: projectTitle,
      category: 'projects',
    });
  };

  // Track contact form submission
  const trackContactSubmission = (formType) => {
    trackEvent('contact_form_submission', {
      form_type: formType,
      category: 'contact',
    });
  };

  // Track download
  const trackDownload = (fileName, fileType) => {
    trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
      category: 'downloads',
    });
  };

  // Track social media click
  const trackSocialClick = (platform, url) => {
    trackEvent('social_media_click', {
      platform,
      url,
      category: 'social',
    });
  };

  // Track blog post view
  const trackBlogView = (postId, postTitle) => {
    trackEvent('blog_post_view', {
      post_id: postId,
      post_title: postTitle,
      category: 'blog',
    });
  };

  // Track skill hover
  const trackSkillHover = (skillName, skillCategory) => {
    trackEvent('skill_hover', {
      skill_name: skillName,
      skill_category: skillCategory,
      category: 'skills',
    });
  };

  // Track achievement view
  const trackAchievementView = (achievementId, achievementTitle) => {
    trackEvent('achievement_view', {
      achievement_id: achievementId,
      achievement_title: achievementTitle,
      category: 'achievements',
    });
  };

  // Track theme toggle
  const trackThemeToggle = (newTheme) => {
    trackEvent('theme_toggle', {
      theme: newTheme,
      category: 'preferences',
    });
  };

  // Track search
  const trackSearch = (query, resultsCount) => {
    trackEvent('search', {
      query,
      results_count: resultsCount,
      category: 'search',
    });
  };

  // Track error
  const trackError = (errorMessage, errorType, errorLocation) => {
    trackEvent('error', {
      error_message: errorMessage,
      error_type: errorType,
      error_location: errorLocation,
      category: 'errors',
    });
  };

  // Track performance
  const trackPerformance = (metricName, value, unit = 'ms') => {
    trackEvent('performance_metric', {
      metric_name: metricName,
      value,
      unit,
      category: 'performance',
    });
  };

  return {
    trackPageView,
    trackEvent,
    trackInteraction,
    trackProjectView,
    trackContactSubmission,
    trackDownload,
    trackSocialClick,
    trackBlogView,
    trackSkillHover,
    trackAchievementView,
    trackThemeToggle,
    trackSearch,
    trackError,
    trackPerformance,
  };
};

// Higher-order component for automatic page tracking
export const withAnalytics = (WrappedComponent, pageName) => {
  return function AnalyticsWrapper(props) {
    const { trackPageView } = useAnalytics();

    useEffect(() => {
      trackPageView(pageName, window.location.pathname);
    }, [trackPageView]);

    return <WrappedComponent {...props} />;
  };
};

export default useAnalytics;
