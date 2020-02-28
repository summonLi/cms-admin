import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import auth from './modules/auth'
import app from './modules/app'

/*  业务 STORE 开始 */
const modulePlugins = []
const modulePluginsStores = require.context('./modules', true, /.js$/)
modulePluginsStores.keys().forEach(key => {
  const module = modulePluginsStores(key).default
  if (module && module.name) {
    modulePlugins[module.name] = module
  }
})
/*  业务 STORE 结束 */

/*  插件 STORE 开始 */
// const plugins = []
// const pluginsStores = require.context('@/plugins', true, /store\/index\.js$/)
// pluginsStores.keys().forEach(key => {
//   const objs = pluginsStores(key).default
//   if (objs && objs.length > 0) {
//     objs.forEach(obj => {
//       if (obj && obj.name) {
//         plugins[obj.name] = obj
//       }
//     })
//   }
// })
/*  插件 STORE 结束 */

Vue.use(Vuex)
const  store = new Vuex.Store({
  modules:{
    auth,
    app,
    ...modulePlugins
  },
  getters
})

export default store
