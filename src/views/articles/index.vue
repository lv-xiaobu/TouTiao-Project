<template>
  <el-card>
    <!-- 面包屑组件 -->
    <bread-crumb slot='header'>
      <template slot='title'>内容列表
      </template>
    </bread-crumb>
    <el-form>
      <el-form-item label="文章状态：">
        <!-- 单选框组 -->
        <el-radio-group v-model="radio">
          <el-radio :label="3">全部</el-radio>
          <el-radio :label="6">草稿</el-radio>
          <el-radio :label="9">待审核</el-radio>
          <el-radio :label="9">审核通过</el-radio>
          <el-radio :label="9">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- select选择器  label（显示值）value(存储值) -->
      <el-form-item label="频道列表：">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择：">
        <el-date-picker
        v-model="value2"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {},
  components: {}
}
</script>

<style lang='less' scoped>
</style>
