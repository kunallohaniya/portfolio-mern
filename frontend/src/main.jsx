import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { registerSW } from 'virtual:pwa-register';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

// Register PWA Service Worker for offline support and auto-updates
registerSW({
  onNeedRefresh() {
    // Optionally trigger a refresh UI
  },
  onOfflineReady() {
    // Optionally show an "Offline Ready" notification
  },
});