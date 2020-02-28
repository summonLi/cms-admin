import request from '@/utils/request'
import {getToken, setToken, setStorge} from '@/utils/auth'

const auth = {
  state: {
    userInfo: {},
    token:getToken()
  },
  mutations: {
    SET_USERINFO: (state, data) => {
      state.userInfo = data
    },
    SET_TOKEN: (state, data) => {
      state.token = data
    }
  },
  actions: {
    Login({ commit },userInfo) {
      const userName = userInfo.userNum.trim()
      return new Promise((resolve, reject) => {
        setToken('xhshshl')
        setStorge('user')
        commit('SET_USERINFO',{name:'张三',sex: '男'})
        commit('SET_TOKEN','xhshshl')
        resolve()
        // request({
        //   method:'post',
        //   url:'/api/sys/userLogin',
        //   data:userInfo,
        // }).then(response => {
        //   setToken(response.data.token)
        //   setStorge('user')
        //   commit('SET_USERINFO',response.data)
        //   commit('SET_TOKEN',response.data.token)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    }
  }
}

export default auth
