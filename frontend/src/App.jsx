import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import CustomCursor from './components/CustomCursor';
import ReadingProgress from './components/ReadingProgress';
import CommandPalette from './components/CommandPalette';

// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Styles
import './index.css';

function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  // Global Ctrl+K listener for command palette
  const handleKeyDown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      setCmdOpen(prev => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <HelmetProvider>
      <Router>
        {/* Reading progress bar DOM element */}
        <div id="reading-progress" />

        {/* Page loader — shown until GSAP animation completes */}
        {!loaderDone && (
          <PageLoader onComplete={() => setLoaderDone(true)} />
        )}

        {/* Custom cursor (desktop only, hidden on touch via CSS) */}
        <CustomCursor />

        {/* Reading progress tracker */}
        <ReadingProgress />

        {/* Command Palette (Ctrl+K) */}
        <CommandPalette
          isOpen={cmdOpen}
          onClose={() => setCmdOpen(false)}
        />

        {/* Main app shell */}
        <div className="App" style={{ background: 'var(--base)', minHeight: '100vh' }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar onOpenCommand={() => setCmdOpen(true)} />
                  <main>
                    <Home />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Toast notifications */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--surface)',
                color: 'var(--offwhite)',
                border: '1px solid var(--border-std)',
                borderRadius: '0',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
              },
            }}
          />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;