import { post } from '@/request/index'
import axios from 'axios'
// const $axios = http
let $ApiUrl = window.config.$ApiUrl
let esUrl = '/esUrl'
export const SubmitOrGetDetailFn = (params, config) => {
  return post(`${$ApiUrl}/rhm-gateway/api/v2/agent/remote`, params, {
    needForm: false,
    loading: ture
  })
}

export const postFormDetailsSearch = (params = {}) => {
  return post(`${esUrl}/formdetails/_doc/_search`, params, {
    loading: false,
    needForm: false,
    headers: {
      Authorization: 'Basic ZWxhc3RpYzp3YWRhdGE='
    }
  })
}
