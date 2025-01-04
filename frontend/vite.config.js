import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Replace with your backend server URL and port
        changeOrigin: true,
        //secure: false, // Set this to false if you're working with HTTPS locally without proper certificates
      },
    },
  },
})
