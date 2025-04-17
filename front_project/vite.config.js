import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: [
      'e6ef-89-42-61-193.ngrok-free.app', // ← Впиши сюда свой текущий ngrok-домен
    ]
  }
})