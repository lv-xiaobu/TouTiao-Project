<template>
<!-- separator：分隔符 -->
  <el-breadcrumb separator=">">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">
  <slot name="title"></slot>
  </a></el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  components: {

  }
}
</script>

<style scoped>

</style>
