import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 7000,
    host: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: process.env.DOCKER_ENV ? 'http://backend:8888' : 'http://localhost:8888',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
