import { createApp } from 'vue'
import './style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'animate.css';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger);

import App from './App.vue'

const app = createApp(App)

// element-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.provide('gsap', gsap)

app.mount('#app')

/**
 * modules required
 * 1. vue
 * 2. gsap&scrolltrigger
 * 3. three
 * 4. three-orbitcontrols
 * 5. scss
 * 6. events
 * 7.element-ui按需引入插件，在vite.config.js中配置
 **  unplugin-vue-components
 **  unplugin-auto-import
 **  element-plus/icons-vue
 **  assroll: 界面平滑滚动
 **  animate.css
*/