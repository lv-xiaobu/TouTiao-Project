// 负责对axios进行处理
import axios from 'axios'

// 将地址的常态值设置给bsesURL
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

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
export default axios
