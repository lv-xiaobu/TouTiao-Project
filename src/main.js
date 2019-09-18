import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入element-ui和element-ui的样式
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入样式
import './styles/index.less'

// // 引入axios 配置baseUrl
// import axios from 'axios'
// Vue.proyotype.$http = axios // axios赋值给全局属性
// axios.defaults.bsesURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

Vue.config.productionTip = false
Vue.use(Element)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
