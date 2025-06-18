import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react'],
          
          // Feature chunks
          'markdown': ['react-markdown', 'remark-gfm'],
          'pdf': ['html2pdf.js', 'jspdf', 'html2canvas'],
          
          // Component chunks
          'brochure': ['./src/components/Brochure.tsx'],
          'assessment': ['./src/components/Assessment.tsx']
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase warning limit to 1MB
  }
})
