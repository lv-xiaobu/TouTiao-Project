<template>
  <el-card>
     <bread-crumb slot="header">
      <template slot='title'>异步数据</template>
      </bread-crumb>
      <p>{{ count }}</p>
      <el-button type="primary" @click="updateCountPromise">更新数据</el-button>
      <el-button type="success" @click="updateCountPromise">async更新数据</el-button>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      count: 1
    }
  },
  methods: {
    // 模拟Axios异步请求
    updateAxios () {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve(2)
        }, 3000)
      })
    },
    // ===== 传统 Promise 更新
    updateCountPromise () {
      this.updateAxios().then(result => {
        this.count = result
      })
    },
    // ===== (async await)
    async newUpdate () {
      // await 会造成强制等待 强制性的把异步函数变为同步 后面 Promis的结果可以直接在前面接收
      let result = await this.updateAxios()
      this.count = result
    }
  },
  components: {}
}
</script>

<style lang='less' scoped>

</style>
