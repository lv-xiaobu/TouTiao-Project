import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入element-ui和element-ui的样式
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入基础样式
import './styles/index.less'

// 在main.js中引入axios 配置baseUrl
import axios from 'axios'
Vue.proyotype.$http = axios // axios赋值给全局属性
// 将地址的常态值设置给bsesURL
axios.defaults.bsesURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

Vue.config.productionTip = false
Vue.use(Element) // 相当于全局注册Element
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
