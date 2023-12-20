import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
let needLoadingRequestCount = 0 //当前正在请求的接口数量
let loadingInstance
let http = axios.create({
  baseURL: '',
  // 请求超时
  timeout: 15000
})
// 请求拦截器
http.interceptors.request.use(
  config => {
    config.headers['token'] =
      'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyOTBmNjJhYy04ZThkLTQ2ZTMtOTVhYS01OTI4NDczY2I2MDAiLCJzdWIiOiIxIiwiaXNzIjoi5Y2r5a6B5YGl5bq3IiwiaWF0IjoxNzAyNjE3NDAyfQ.TCcHsAFpq9Xp7kVk8lESutM8WJm_GzE7U310SN1n_Bc'

    if (config.needForm) {
      // multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式
      config.headers['Content-Type'] =
        'multipart/form-data; boundary=<calculated when request is sent>'
    } else {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    }
    config.headers['Version'] = '00'
    if (config.loading) {
      needLoadingRequestCount++ //每次发送一个请求就进行++
      loadingInstance = ElLoading.service({
        lock: true,
        text: '加载中...',
        spinner: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
http.interceptors.response.use(
  res => {
    return res
  },
  error => {
    if (error.message.includes('timeout')) {
      // 判断请求异常信息中是否含有超时timeout字符串
      ElMessage.error('接口请求超时,请检查网络')
    }
    return Promise.reject(error)
  }
)

function get (url, config = { loading: false }) {
  return new Promise((resolve, reject) => {
    http
      .get(url, config)
      .then(
        response => {
          if (config.loading) {
            needLoadingRequestCount--
            //当接口都调用完时
            if (needLoadingRequestCount == 0) {
              loadingInstance.close()
            }
          }

          resolve(response)
        },
        err => {
          if (config.loading) {
            needLoadingRequestCount--
            //当接口都调用完时
            if (needLoadingRequestCount == 0) {
              loadingInstance.close()
            }
          }
          reject(err)
        }
      )
      .catch(error => {
        if (config.loading) {
          needLoadingRequestCount--
          //当接口都调用完时
          if (needLoadingRequestCount == 0) {
            loadingInstance.close()
          }
        }
        reject(error)
      })
  })
}

function post (url, data, config = { needForm: false, loading: false }) {
  return new Promise((resolve, reject) => {
    let formData
    if (config.needForm) {
      //如果是需要表单格式的数据就进行表单处理
      var fd = new FormData()
      for (let [key, value] of Object.entries(data)) {
        fd.append(key, value)
      }
      // 解决系统兼容性中FormData对象包含appendData和realFormData属性
      formData = fd
    } else {
      formData = data
    }
    http
      .post(url, formData, config)
      .then(
        response => {
          if (config.loading) {
            needLoadingRequestCount--
            //当接口都调用完时
            if (needLoadingRequestCount == 0) {
              loadingInstance.close()
            }
          }
          resolve(response)
        },
        err => {
          if (config.loading) {
            needLoadingRequestCount--
            //当接口都调用完时
            if (needLoadingRequestCount == 0) {
              loadingInstance.close()
            }
          }
          reject(err)
        }
      )
      .catch(error => {
        if (config.loading) {
          needLoadingRequestCount--
          //当接口都调用完时
          if (needLoadingRequestCount == 0) {
            loadingInstance.close()
          }
        }
        reject(error)
      })
  })
}

export { get, post }
