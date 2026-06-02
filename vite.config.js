import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  publicDir: '../static',
  build: {
    outDir: '../dist',      // keeps the build output OUT of src/
    emptyOutDir: true,
    rolldownOptions: {
      input: {
        main: resolve(process.cwd(), "src/index.html"),
        about: resolve(process.cwd(), "src/about.html"),
        contact: resolve(process.cwd(), "src/contact.html"),
      }
    }
  },
})