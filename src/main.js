import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import * as http from './request'
import axios from 'axios'
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.config.globalProperties.$axios = http
import * as api from './api'
app.config.globalProperties.$Api = api
const globals = app.config.globalProperties
export { globals }
app.mount('#app')
