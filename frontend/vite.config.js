import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true,
    open: true,
    strictPort: false
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-hot-toast',
      'react-helmet-async',
      'framer-motion',
      'axios',
      'react-icons'
    ]
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: false
  }
});