import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/number-clicker/',
  plugins: [vue()],
  server: {
    port: 13000
  },
  build: {
    outDir: 'dist',
  }
})
