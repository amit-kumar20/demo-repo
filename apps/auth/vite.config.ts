import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'auth', // unique name for the MFE
      filename: 'remoteEntry.js', // the file that will be loaded by the host
      exposes: {
        './AuthApp': './src/App', // exposed module(s) to be consumed by the host
        './MockAuthComponent': './src/MockAuthComponent'
      },
      shared: [
        'react',
        'react-dom',
        'react-router-dom',
        '@reduxjs/toolkit',
        'react-redux'
      ]
    })
  ],
  build: {
    target: 'esnext',
    modulePreload: false,
    cssCodeSplit: false,
    minify: false
  },
  server: {
    port: 5176,
    strictPort: true,
    cors: true,
    origin: 'http://localhost:5176' // optional, used for CORS headers
  }
});
