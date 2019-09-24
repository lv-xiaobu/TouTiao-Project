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
         <!-- 如果有图片的话，用图片，没有图片的话，用默认图片 -->
        <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg">
        <div class="info">
          <span class="title">{{item.title}}</span>
          <!-- statusStyle:控制颜色   statusText：控制显示文本-->
          <el-tag :type='item.status | statusStyle' class="stauts">{{item.status | statusText}}</el-tag>
          <span class="date">{{item.pubdate}}</span>
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
      list: [],
      defaultImg: require('../../assets/img/ch.jpg') // 将默认图片能转成base64
    }
  },
  methods: {
    // ===== 获取文章 =====
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getArticles()
  },
  // ===== 过滤器 =====
  // 处理 发表状态item.stauts 的显示
  // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
  filters: {
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusStyle (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'danger'
      }
    }
  }
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
            width: 70px;
            margin: 5px 0;
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
