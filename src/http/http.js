import axios from 'axios'
import { Message } from 'element-ui'
const WEB_TOKEN = '4EC45E0F6BB0435E586BC369FABDBAA2'

// axios 配置
let config = {
  url: '',
  baseURL: '/api',
  timeout: 15000
}

// http response 拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  Message('请求出错')
  console.error(error)
  return Promise.reject(error)
})

export function getData (url, params) {
  config.url = url
  var keyparam = {key: WEB_TOKEN}
  config.params = keyparam
  if (params) {
    config.params = Object.assign(keyparam, params)
  }
  return new Promise((resolve, reject) => {
    axios(config)
      .then(response => {
        if (response.data.result && response.data.result.status === 15) {
          Message('此用户关闭信息共享')
          resolve(null)
        }
        if (params.isString) { // 需要纯字符串结果
          var str = response.request.response
          resolve(str)
        } else { // 普通json结果
          resolve(response.data)
        }
      })
      .catch(error => {
        Message('请求出错')
        reject(error)
      })
  })
}
