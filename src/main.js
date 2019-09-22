import Vue from 'vue'
import App from './App.vue'

// 在此位置导入 permission ,因为 permission 中已经导出了 router对象 所以直接 导入 permission文件
import router from './permission'

// 引入element-ui和element-ui的样式
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入基础样式
import './styles/index.less'

// 引入插件对象 => 在Component文件夹里面有index.js 文件里注册了全局会用到的组件
// vue.cli会自动识别文件夹下的以index为名的文件，所以只写component就行
import Component from './components'

// 在main.js中引入axios
import axios from './utils/axios.config'
// 注册axios的第一种方式
// Vue.prototype.$axios = axios // axios赋值给全局属性

Vue.config.productionTip = false
Vue.use(Element) // 相当于全局注册Element
// Vue.use() => 干了什么
// Vue.use({
//   install (Vue) {
//   }
// })
// 会调用 对象中的 install 方法，并且传入Vue对象
Vue.use(Component)

// 注册axios的第二种方式
Vue.use(axios)
// 注册插件 => Component文件夹里面有index.js 文件，里面注册了各个全局可能用到的组件
// 5、vue.cli会自动识别文件夹下的以index为名的文件，所以只写component就行

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
