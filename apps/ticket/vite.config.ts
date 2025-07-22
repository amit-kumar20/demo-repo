import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react() as any,
    federation({
      name: 'ticket',
      filename: 'remoteEntry.js',
      exposes: {
        './TicketApp': './src/App',
        './MockTicketComponent': './src/MockTicketComponent'
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@reduxjs/toolkit', 'react-redux']
    }) as any
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5174,
    strictPort: true,
    cors: true
  }
});
