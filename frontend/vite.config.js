import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: process.env.DOCKER_ENV ? 'http://backend:5001' : 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
