import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue' // 路由级组件
import Home from './views/home/'
import Login from './views/login/'
import Main from './views/home/main' // 引入 默认的二级路由

Vue.use(Router)

export default new Router({
  routes: [
    // ===========一级路由============
    {
      path: '/',
      redirect: '/home' // 重定向
    }, {
      path: '*', // 匹配任何地址，但是其他的可以匹配，优先匹配其他
      component: () => import('./views/404')
    }, {
      // 一级路由:主页页面
      path: '/home',
      component: Home,
      // ==========二级路由==========
      children: [
        {
          path: '', // 什么都不写，默认的就是二级路由的地址
          component: Main // 默认的二级路由
        }, {
          // path: '/home/comment' 完整写法
          path: 'comment', // 评论列表路径
          component: () => import('./views/comment')
        }, {
          path: 'material', // 素材列表路径
          component: () => import('./views/material')
        }, {
          path: 'articles', // 内容列表路径
          component: () => import('./views/articles')
        }, {
          path: 'publish', // 发表文章路径
          component: () => import('./views/publish')
        }, {
          path: 'publish/:articleId', // 修改文章路径 动态路由传参
          component: () => import('./views/publish')
        }, {
          path: 'account', // 账户信息路径
          component: () => import('./views/account')
        }, {
          path: 'gradata', // 图文数据路径
          component: () => import('./views/fans')
        }, {
          path: 'async', // 图文数据路径
          component: () => import('./views/async')
        }]
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
