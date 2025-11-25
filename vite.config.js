import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// THis is the base name 
// https://vite.dev/config/
export default defineConfig({
  base: '/cms/',
  plugins: [react()],
  resolve: {
    alias: {
      'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom'),
    },
  },
  server: {
    port: 5175,   // ← change to any port you want
    host: true    // optional, allows LAN access
  }
})
