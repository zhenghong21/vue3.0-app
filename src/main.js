import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import http from './request'
import axios from 'axios'
// import formTemplateUI from './form-template-plugin/form-template-plugin.common'
// import formTemplateUI from './form-template-plugin/form-template-plugin.umd'
import formTemplateUI from './libs/form-template-plugin.common'
// require('./libs/form-template-plugin.common')

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.config.globalProperties.$axios = http
const globals = app.config.globalProperties
export { globals }
import * as api from './api'
app.config.globalProperties.$Api = api
const startFun = () => {
  axios.get(`/static/window.config.js`).then(result => {
    app.mount('#app')
  })
}
startFun()
