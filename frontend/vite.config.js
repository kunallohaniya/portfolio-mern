import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Kunal Lohaniya Portfolio',
        short_name: 'Kunal Portfolio',
        description: 'Full Stack Developer Portfolio',
        theme_color: '#4A00E0',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    port: 5174,
    host: true,
    open: true,
    strictPort: false
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'animations': ['framer-motion', 'gsap'],
          'icons': ['react-icons'],
          'ui': ['react-hot-toast', 'react-helmet-async']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});