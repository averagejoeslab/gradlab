import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Set base path for GitHub Pages deployment
  // The repo name becomes the base path: https://averagejoeslab.github.io/gradlab/
  base: '/gradlab/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})

