<template>
  <el-card>
    <!-- 面包屑组件 -->
    <bread-crumb slot='header'>
      <template slot='title'>内容列表
      </template>
    </bread-crumb>
    <!-- {{formData}} -->
    <!-- ===== 表单 ===== -->
    <el-form style="margin-left:50px">
      <el-form-item label="文章状态：">
        <!-- 单选框组 -->
        <!-- v-model + :label="6" 给单选框组的每一个绑定变量 -->
        <!-- @change事件：单选框的监听事件 -->
        <el-radio-group @change='changeCondition' v-model="formData.status">
          <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 -->
          <!-- :label中给一个不存在的值，代表默认选中 -->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表：">
        <el-select @change='changeCondition' v-model="formData.channel_id" placeholder="请选择">
          <!-- select选择器  label（显示值）value(存储值) -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择：">
        <!-- el-date-picker :日期选择 -->
        <!-- value-format指定绑定值的格式 -->
        <el-date-picker @change='changeCondition' v-model="formData.date" value-format='yyyy-MM-dd' type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 主体内容：没有具体模板，自己定制 -->
    <div class="total">共找到{{page.total}}条符合条件的内容</div>
    <!-- ===== 循环主体数据 ===== -->
    <div class="article-item" v-for="(item,index) in list" :key="index">
      <!-- 左侧 -->
      <div class="left">
        <!-- 如果有图片的话，用图片，没有图片的话，用默认图片 -->
        <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg">
        <div class="info">
          <span class="title">{{item.title}}</span>
          <!-- statusStyle:控制颜色   statusText：控制显示文本-->
          <el-tag :type='item.status | statusStyle' class="status">{{item.status | statusText}}</el-tag>
          <span class="date">{{item.pubdate}}</span>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <span @click="goEdit(item.id)"><i class="el-icon-edit"></i>修改</span>
        <span @click="delArticles(item.id)"><i class="el-icon-delete"></i>删除</span>
      </div>
    </div>
    <!-- ===== 分页组件 ===== -->
    <el-row type='flex' justify='center' style="margin-top:10px 0">
      <el-pagination @current-change='changePage' background layout="prev, pager, next" :total="page.total" :current-page="page.currentPage" :page-size='page.pageSize'></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 提交表单时需要的参数，参考接口文档，定义属性
      formData: {
        status: 5, // 文章状态
        channel_id: null, // 频道id
        date: [] // 时间
      },
      channels: [], // 保存频道列表选项
      list: [], // 保存文章列表
      defaultImg: require('../../assets/img/ch.jpg'), // 将默认图片能转成base64
      page: {
        total: 0, // 总页数
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    // ===== 组装请求参数 =====
    queryArticles () {
      // 三个条件不是一个个进行的，而是组合在一块儿搜索的
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status, // 状态  如果为5时，就是全部，但是接口要求全部不传内容 null就相当于什么都没传
        channel_id: this.formData.channel_id, // 频道id
        begin_pubdate: this.formData.date.length ? this.formData.date[0] : null,
        end_pubdate: this.formData.date.length > 1 ? this.formData.date[1] : null, // 结束时间
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.getArticles(params)
    },
    // ===== 搜索条件状态变化 监听事件 =====
    changeCondition () {
      // alert(this.formData.status)
      // 以上 alert 得知：值改变时，formData 已经是最新的值，所以直接用 formData 的值请求
      this.page.currentPage = 1 // 条件改变 默认会第一页
      this.queryArticles()
    },
    // ===== 监听 页码改变 事件 =====
    changePage (newPage) {
      this.page.currentPage = newPage // 赋值最新页码
      // 分页时要携带条件
      this.queryArticles()
    },
    // ===== 获取文章 =====
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results // 获取文章列表
        this.page.total = result.data.total_count // 赋值记录总数
      })
    },
    // ===== 获取频道列表 =====
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // ===== 编辑文章 =====
    goEdit (id) {
      // 使用动态路由传参，
      // id超过了安全数字限制 被jsonbigint转成了bigNUmber类型 要想变成字符串
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    // ===== 删除文章 =====
    delArticles (id) {
      this.$confirm('您确定要删除此文章吗').then(() => {
      // id超过了安全数字限制 被jsonbigint转成了bigNUmber类型 要想变成字符串
      // id.toString()
        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(() => {
          this.queryArticles() // 带条件的查询
        })
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  },
  // ===== 过滤器 =====
  // 处理 发表状态item.status 的显示
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
  border-bottom: 1px solid #f2f3f5;
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
        font-size: 14px;
      }
      .status {
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
      cursor: pointer;
    }
  }
}
</style>
