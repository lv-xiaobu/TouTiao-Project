// ==========权限==========
// 引入router.js文件，得到 router对象
import router from './router'

// ========== 页面进度条 ==========
import nprogress from 'nprogress'// 进度条
import 'nprogress/nprogress.css' // 这个样式必须引入
// 简单配置
nprogress.inc(0.2)
nprogress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// ========== 全局前置守卫 ==========
// 往返都是路由对象。必须调用`next`
router.beforeEach((to, from, next) => {
  nprogress.start()// 开启页面进度条

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

// ========== 全局后置守卫 ==========
router.afterEach(function () {
  nprogress.done()// 关闭进度条
})
// 导出 router
export default router
