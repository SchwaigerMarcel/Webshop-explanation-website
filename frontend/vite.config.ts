import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- Neu importieren

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- Hier als Plugin hinzufügen
  ],
})