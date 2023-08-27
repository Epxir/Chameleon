import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
import 'element-plus/dist/index.css'
import vueI18n from './components/i18n'

createApp(App)
  .use(vueI18n)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
