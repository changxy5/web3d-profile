import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// element-ui按需引入插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // element-ui按需引入插件
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  // js,css等静态资源的路径，默认为public,需要在根目录下自行创建
  // publicDir:"public",
  // 所有路径的根路径，默认为/,之后需要改成服务器的地址
  base:"./"
})
