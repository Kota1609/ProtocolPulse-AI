import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    port: 5174,
    strictPort: true,
    host: true,
    proxy: {
      // During development, proxy API requests
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  // Define environment variables for different modes (dev vs prod)
  define: {
    // In production (combined deployment), API calls will be relative to the current host
    'import.meta.env.VITE_API_URL': process.env.NODE_ENV === 'production' 
      ? '""' // Empty string means use relative URLs
      : '"http://localhost:8000"',
    'import.meta.env.VITE_WS_URL': process.env.NODE_ENV === 'production'
      ? '"ws:" + (window.location.protocol === "https:" ? "s" : "") + "//" + window.location.host'
      : '"ws://localhost:8000"',
  }
});
