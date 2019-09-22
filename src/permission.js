// ==========权限==========
// 引入router.js文件，得到 router对象
import router from './router'

// 全局前置守卫
// 往返都是路由对象。必须调用`next`
router.beforeEach((to, from, next) => {
  // 判断 拦截范围
  // startsWith：以。。。。为开头
  if (to.path.startsWith('/home')) {
    // 以 /home 为判断条件 进入到拦截范围
    // 判断是否登录：token
    let token = window.localStorage.getItem('user-token') // 获取token
    if (token) {
      next()// 有 放行
    } else {
      next('/login') // 没有 跳转到登录页
    }
  } else {
    next() // 没有被 /home 约束 => 放行
  }
})

// 导出 router
export default router
