// evenBus 一个公共实例
// 在账户信息页面中，更改信息，想实时的更新表头账户信息，
// 但是这是两个独立的组件，之间没有存在联系，但是都用到了vue当前实例(this),
// 所以把当前实例换成公共的实例，再用监听事件 $on 在代码中监听事件
import Vue from 'vue'
export default new Vue()
