import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        auth: 'http://localhost:5176/assets/remoteEntry.js',
        ticket: 'http://localhost:5174/assets/remoteEntry.js',
        notification: 'http://localhost:5175/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@reduxjs/toolkit', 'react-redux']
    })
  ],
  build: {
    target: 'esnext',
    modulePreload: false,
    cssCodeSplit: false,
    minify: false
  },
  server: {
    port: 5173,
    strictPort: true,
    cors: true
  }
});
