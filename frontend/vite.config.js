import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 6667,
    host: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: process.env.DOCKER_ENV ? 'http://backend:6666' : 'http://localhost:6666',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
