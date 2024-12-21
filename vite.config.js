import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure output directory is "dist"
    assetsDir: "assets", // Optional: Customize the assets directory
  },
  server: {
    port: 3000, // Local dev server port
  },
  preview: {
    port: 5000, // Preview build on this port
  },
  base: "/", // Ensure the base path is correct (adjust if hosted under a subpath)
});
