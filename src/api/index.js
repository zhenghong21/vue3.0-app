import http from '@/request'
const $axios = http
let $ApiUrl = window.config.$ApiUrl
//表单接口,提交保存接口和获取详情的接口
/**
 *
 * @param {接口请求入参} params
 * @param {入参是不是需要formData格式} needForm
 * @param {接口是否需要loading格式} loading
 * @returns
 */
export const SubmitOrGetDetailFn = (params, config) => {
  return $axios.post(
    `${$ApiUrl}/rhm-gateway/api/v2/agent/remote`,
    params,
    config
  )
}
