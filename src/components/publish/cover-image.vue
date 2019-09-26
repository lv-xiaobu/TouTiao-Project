<template>
  <div class="cover-image">
  <!-- v-for生成 封面图片 -->
  <!-- index 图片的索引 openLayer(index)：获取索引 -->
    <div @click="openLayer(index)" class="cover-item" v-for="(item,index) in images" :key="index">
      <img :src="item ? item : defaultImg">
    </div>
    <!-- 弹层组件 -->
    <!-- visible: true 弹出  false 关闭 -->
    <el-dialog @close='dialogVisible=false' :visible='dialogVisible'>
      <!-- 监听谁的事件，就在谁的标签上写监听 -->
      <select-image @selectOneImg='receiveImg'></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // 接收父组件传递过来的值
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/cover.jpg'),
      dialogVisible: false,
      // 定义一个当前选中的索引 先给一个数组不可能出现的值
      selectIndex: -1
    }
  },
  methods: {
    // ===== 打开/关闭层 =====
    openLayer (index) {
      this.dialogVisible = true
      // 将当前点击的图片的索引值给data中的一个自定义属性
      this.selectIndex = index
    },
    // 接收子组件传递过来的值
    receiveImg (url) {
      // 自定义事件，继续往单签组件的父组件传递 url，因为当前组件下的url不可被改变，是用prop得到的
      this.$emit('selectImg', url, this.selectIndex) // 可以在当前vue实例下，获取索引值
      // 选择图片之后，可以自动关闭弹窗
      this.dialogVisible = false
    }
  },
  components: {}
}
</script>

<style lang='less' scoped>
.cover-image {
  display: flex;
  margin: 10px 0 30px 0;
  margin-left: 100px;
    .cover-item {
      border:1px solid #ccc;
      padding: 10px;
      width: 200px;
        height: 200px;
      img {
        width: 100%;
        height: 100%;
      }
    }
}
</style>
