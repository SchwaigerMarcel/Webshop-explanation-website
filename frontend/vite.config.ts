import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- Neu importieren

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- Hier als Plugin hinzufügen
  ],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'messerschmiede-schwaiger.at',
      'www.messerschmiede-schwaiger.at'
    ],
    proxy: {
      '/api': {
        target: 'http://backend:5000',
        changeOrigin: true,
      },
    },
  },
})