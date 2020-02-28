import axios from 'axios'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const wtDownloadRequest = axios.create({
  headers: { 'Content-Type': 'application/json', responseType: 'blob' },
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 300000 // 请求超时时间
})

// request拦截器
wtDownloadRequest.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['x-access-token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

export default wtDownloadRequest
