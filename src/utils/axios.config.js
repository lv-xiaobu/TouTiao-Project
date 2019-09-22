// 负责对axios进行处理
import axios from 'axios'

// ===== 将地址的常态值设置给bsesURL
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// ===== 请求拦截 请求到达后台之前
axios.interceptors.request.use(function (config) {
  // 在发送请求之前，做一些业务处理
  // config：要发送请求的业务处理
  let token = window.localStorage.getItem('user-token') // 获取token
  config.headers['Authorization'] = `Bearer ${token}` // 统一注入token
  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})

// ===== 响应拦截 响应数据 回来 到达 then方法 之前
axios.interceptors.response.use(function (response) {
  // 对响应数据做处理 执行成功时进入
  return response.data ? response.data : {}
}, function () {
})

// export default axios // 注册axios的第一种方式
// 注册axios的第二种方式
export default {
  install (Vue) {
    Vue.prototype.$axios = axios // axios赋值给全局属性
  }
}
