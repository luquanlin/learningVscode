import Vue from 'vue'
import Router from 'vue-router'
import CopClass from '@/components/EnterPage'
import Login from '@/components/login/login'
import Register from '@/components/login/register'
import Five from '@/components/five'
import Home from '@/components/home/home'
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home
    },
    {
      path: '/enter',
      name: 'CopName',
      component: CopClass
    },
    {
      path: '/login',
      name: '登陆',
      component: Login
    },
    {
      path: '/register',
      name: '注册',
      component: Register
    },
      {
      path: '/five',
      name: '五子棋',
      component: Five
    },
  ]
})
