import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/page/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/page/login'),
      name:'',
      hidden: true
    },
    {
      path:'/',
      hidden:true,
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('@/page/home'),
        }
      ]
    },
    {
      path:'/test',
      component:Layout,
      name:'测试模块',
      childName:'二级菜单类目',
      icon:'el-icon-s-cooperation',
      children:[{
        name:'增删改查演示',
        path:'test',
        component:() => import('@/page/test/test')
      }]
    },
    {
      isSingle: true,//该参数设置为true,为单页面
      path: '/single',
      name: '单页面菜单',
      component: Layout,
      childName: '二订货管理',
      icon: 'el-icon-s-management',
      children: [{
        path: 'sub1',
        name: '单页面',
        component: () => import('@/page/menu2/sub1')
      }]
    },
    {
      path:'/system',
      name:'系统管理',
      component:Layout,
      childName:'',
      icon:'el-icon-s-order',
      children:[{
        path:'user',
        name:'用户管理',
        component: () => import('@/page/system/user/userList')
      },{
        path:'roles',
        name:'角色管理',
        component: () => import('@/page/system/roles/rolesList')
      },{
        path:'authority',
        name:'权限管理',
        component: () => import('@/page/system/authority/authorityList')
      },{
        path:'menu',
        name:'菜单管理',
        component: () => import('@/page/system/menu/menuList')
      }]
    }
  ]
})
