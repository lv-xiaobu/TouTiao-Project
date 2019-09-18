import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue' // 路由级组件
import Home from './views/home/'
import Login from './views/login/'

Vue.use(Router)

export default new Router({
  routes: [
    // ===========一级路由============
    {
      path: '/',
      redirect: '/home'
    }, {
      // 一级路由:主页页面
      path: '/home',
      component: Home
    }, {
      // 一级路由：登录页面
      path: '/login',
      component: Login
    }
    // ===========一级路由===========
    // 按需加载
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
