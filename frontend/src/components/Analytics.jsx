import React, { useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Analytics = () => {
  const { getAnalyticsConfig } = usePortfolioData();
  const analyticsConfig = getAnalyticsConfig();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    // Track initial page view
    trackPageView('Portfolio Home', '/');
  }, [trackPageView]);

  // Don't render anything visible
  return null;
};

export default Analytics;
