import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this matches your deployment output directory
  },
  resolve: {
    alias: {
      '@': '/src', // Optional aliasing
    },
  },
  base: '/', // Ensure the base URL matches your deployment
  // Removed the custom server port, so it defaults to 5173
  preview: {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
