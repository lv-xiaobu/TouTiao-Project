// 负责对axios进行处理
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../permission'
import jsonBig from 'json-bigint'

// ===== 将地址的常态值设置给bsesURL
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// ===== 统一处理大数字类型
axios.defaults.transformResponse = [function (data) {
  // data 是响应回来的字符串
  // return jsonBig.parse(data) // 换了一个转换方法 使得 使得更准确 保证id不会失真
  return data ? jsonBig.parse(data) : {} // 因为删除接口不返回数据，大数字不接受空字符串的转换 所以在这里做处理
}]

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

// 响应拦截 响应数据 回来 到达then方法之前
axios.interceptors.response.use(function (response) {
  // 对响应数据做处理 执行成功时进入
  return response.data ? response.data : {}
}, function (error) {
  // 执行失败时执行
  let status = error.response.status // 获取失败的状态码
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.clear() // 清空缓存
      router.push('/login') // this.$router.push()
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ message, type: 'warning' })
  //   希望 在异常处理函数中将所有的错误都处理完毕 不再进入catch  终止错误
  return new Promise(function () {}) // 终止当前的错误
  // return Promise.rejected('error')
})

// export default axios // 注册axios的第一种方式
// 注册axios的第二种方式
export default {
  install (Vue) {
    Vue.prototype.$axios = axios // axios赋值给全局属性
  }
}
