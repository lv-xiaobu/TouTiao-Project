// 引入自定义组件，让他们可以全局使用
import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'
// 富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import coverImg from './publish/cover-image'
import selectImg from './publish/select-image'
// 实现整体组件的统一注册
// 在main.ls的文件中，Vue实例 之前引入
export default {
  // 调用 install方法 的时候，相当于引入了Vue对象
  install (Vue) {
    // 可以在实例化之前注册组件 参考全局组件
    Vue.component('layout-aside', layoutAside) // 全局注册左侧导航
    Vue.component('layout-header', layoutHeader) // 全局注册头部导航
    Vue.component('bread-crumb', breadCrumb) // 全局注册面包屑
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑
    Vue.component('cover-image', coverImg) // 全局注册封面组件
    Vue.component('select-image', selectImg) // 迁居注册封面组件的弹窗
  }
}
