import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element-ui和element-ui的样式
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'

Vue.config.productionTip = false
Vue.use(Element)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
