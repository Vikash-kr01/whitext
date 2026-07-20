import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {       
      "/app": "http://127.0.0.1:4000"
    }
  },
  plugins: [react()],
})
