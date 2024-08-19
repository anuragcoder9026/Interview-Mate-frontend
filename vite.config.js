import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base :'/Interview-Mate-frontend/',
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
})
