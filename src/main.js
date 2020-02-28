// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'font-awesome/css/font-awesome.min.css'
import 'normalize.css/normalize.css'

import NProgress from 'nprogress' //进度条
import 'nprogress/nprogress.css' //进度条样式

import { getToken } from "@/utils/auth";//验权

//  工具类
import wtUtil from '@/utils/wtUtil'
Vue.prototype.$wtUtil = wtUtil

//  验证器
import wtValidator from '@/utils/wtValidator'
Vue.prototype.$wtValidator = wtValidator

Vue.use(ElementUI,{ locale })
Vue.use(Router)

Vue.config.productionTip = false

/** vue router连续点击多次路由报错解决方法 **/
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
/**
 * 判断当前是否登录，未登录不能跳转路由
 * 防止未登录状态下直接输入路由跳转
 */
const whiteList = ['/login']//不重定向白名单
//beforeEach 全局前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  if(getToken()){
    if(to.path === '/login') {
      next({ path:'/'})
      NProgress.done()
    }else{
      next()
    }
  }else{
    if (whiteList.indexOf(to.path) !== -1) {
      next()
      NProgress.done()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

//afterEach 全局后置钩子
router.afterEach(() => {
  NProgress.done() // 结束Progress
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
