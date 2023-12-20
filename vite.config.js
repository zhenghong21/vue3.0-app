import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8011,
    open: true,
    host: '127.0.0.1',
    proxy: {
      '/esUrl': {
        target: 'http://172.16.7.161:9200',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/esUrl/, '')
      }
    }
  },
  resolve: {
    alias: {
      // 如果报错__dirname找不到，需要安装node,执行npm install @types/node --save-dev 然后重启编辑器
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  }
})
