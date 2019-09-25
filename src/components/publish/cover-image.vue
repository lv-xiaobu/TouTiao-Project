<template>
  <div class="cover-image">
  <!-- v-for生成 封面图片 -->
    <div class="cover-item" v-for="(item,index) in images" :key="index">
      <img :src="item ? item : defaultImg">
    </div>
  </div>
</template>

<script>
export default {
  // 接收父组件传递过来的值
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/cover.jpg')
    }
  },
  methods: {

  },
  components: {}
}
</script>

<style lang='less' scoped>
.cover-image {
  display: flex;
  margin-top: 10px 0;
  margin-left: 100px;
    .cover-item {
      border:1px solid #ccc;
      padding: 10px;
      img {
        width: 200px;
        height: 200px;
      }
    }
}
</style>
