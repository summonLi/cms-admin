import request from "@/utils/request"

const test = {
  name: 'test',
  state: {
    isTestDetailLoading: false,
    TestDetailData: {}
  },
  mutations: {
    SET_IS_MODULE_TEST_DETAIL_LOADING: (state, data) => {
      state.isTestDetailLoading = data
    },
    SET_MODULE_TEST_DETAIL_DATA: (state, data) => {
      state.TestDetailData = data
    }
  },
  actions: {
    //获取账号编辑页面数据
    queryTestDetailData({ commit }, id) {
      commit('SET_IS_MODULE_TEST_DETAIL_LOADING', true)
      commit('SET_MODULE_TEST_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/',
          method: 'post',
          data: { id : id}
        }).then(res => {
          commit('SET_IS_MODULE_TEST_DETAIL_LOADING', false)
          commit('SET_MODULE_TEST_DETAIL_DATA', res.data)
          resolve()
        }).catch(error => {
          commit('SET_IS_MODULE_TEST_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    resetTestDetailData({ commit }) {
      commit('SET_MODULE_TEST_DETAIL_DATA', { isPublish: 1, radio: '1', checkbox: []})
    }
  }
}

export default test
