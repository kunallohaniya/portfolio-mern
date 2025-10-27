import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react'
    })
  ],
  server: {
    port: 5175,
    host: true,
    open: true
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
    target: 'es2020'
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      target: 'es2020'
    }
  }
});