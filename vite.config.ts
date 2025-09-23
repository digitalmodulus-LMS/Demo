import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Rend la variable d'environnement accessible dans le code client
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
})
