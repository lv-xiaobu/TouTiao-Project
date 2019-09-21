import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入element-ui和element-ui的样式
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入基础样式
import './styles/index.less'

// 引入插件对象 => 在Component文件夹里面有index.js 文件里注册了全局会用到的组件
import Component from './components'

// 在main.js中引入axios
import axios from 'axios'
// 将地址的常态值设置给bsesURL
axios.defaults.bsesURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios // axios赋值给全局属性

Vue.config.productionTip = false
Vue.use(Element) // 相当于全局注册Element
// Vue.use() => 干了什么
// Vue.use({
//   install (Vue) {
//   }
// })
// 会调用 对象中的 install 方法，并且传入Vue对象

// 注册插件 => Component文件夹里面有index.js 文件，里面注册了各个全局可能用到的组件
Vue.use(Component)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
