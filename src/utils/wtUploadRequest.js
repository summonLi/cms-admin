import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'

// 创建axios实例
const wtUploadRequest = axios.create({
  headers: { 'Content-Type': 'multipart/form-data' },
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000 // 请求超时时间
})

// respone拦截器
wtUploadRequest.interceptors.response.use(
  response => {
    //  code为非0是抛错 可结合自己业务进行修改
    const res = response.data
    console.log('HTTP >>>>> ', response.request.responseURL, response.request.status, response.data)
    if (res.code !== '0') {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })

      // 2001:登陆超时
      if (res.code === '2000' || res.code === '2001') {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default wtUploadRequest
