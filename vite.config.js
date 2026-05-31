import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  publicDir: '../static',
  build: {
    outDir: '../dist',      // keeps the build output OUT of src/
    emptyOutDir: true,
  },
})