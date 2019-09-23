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
        <el-date-picker v-model="value2" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 主体内容：没有具体模板，自己定制 -->
    <div class="total">共找到535113条符合条件的内容</div>
    <!-- ===== 循环主体数据 ===== -->
    <div class="article-item" v-for="(item,index) in list" :key="index">
      <!-- 左侧 -->
      <div class="left">
        <img src="../../assets/img/ch.jpg">
        <div class="info">
          <span class="title">f发男方女方年份</span>
          <el-tag class="stauts">以发表</el-tag>
          <span class="date">2019-09-23 11：23：21</span>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <span><i class="el-icon-edit"></i>修改</span>
        <span><i class="el-icon-delete"></i>删除</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [1, 2]
    }
  },
  methods: {},
  components: {}
}
</script>

<style lang='less' scoped>
.total {
   height: 50px;
   line-height: 50px;
   border-bottom: 1px dashed #ccc;
}
.article-item {
   display: flex;
   justify-content: space-between;
   padding: 20px 10px;
   border-bottom:  1px solid #f2f3f5;
   .left {
      display: flex;
      img {
         width: 180px;
         height: 100px;
         border-radius: 4px;
      }
      .info {
         display: flex;
         height: 10px;
         flex-direction: column;
         justify-content: space-arount;
         margin-left: 10px;
         .title {
            font-size:14px;
         }
         .stauts {
            width: 60px;
            text-align: center;
         }
         .date {
            color: #999;
            font-size: 12px;
         }
      }
   }
   .right {
      font-size: 12px;
      span {
         margin-right: 10px;
         cursor:pointer
      }
   }
}
</style>
