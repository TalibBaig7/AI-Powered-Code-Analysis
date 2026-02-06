import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      // Proxy API requests in development to the local backend
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // Strip the `/api` prefix so `/api/ai/get-review` -> `/ai/get-review`
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
