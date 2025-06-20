import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/conversorMoedas/', // 👈 isso aqui é essencial
  plugins: [react()],
})
