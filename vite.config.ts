import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    watch: {
      usePolling: true,
      interval: 1000,
      binaryInterval: 1000,
    },
    proxy: {
      "/api": {
        target: "http://strapi:1337",
        hostRewrite: "strapi:1337", // This is needed for POST requests to work properly
      },
    },
  },
})
