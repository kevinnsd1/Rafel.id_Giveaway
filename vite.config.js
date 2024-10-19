import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext', // atau sesuai kebutuhan
    outDir: 'dist',
    rollupOptions: {
      output: {
        format: 'esm', // Pastikan ini diatur ke esm
      },
    },
  },
})
