import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({command}) => {

  return {
    plugins: [vue()],
    base: command === 'build' ? '/ghosting/' : '/',
    build: {
      outDir: 'docs'
    }
  }

})
