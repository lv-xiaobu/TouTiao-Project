<template>
   <!-- v-loading:加载特效 -->
  <el-card
     v-loading='loading'
     element-loading-text="丫的，等一会儿"
     element-loading-spinner="el-icon-loading"
     element-loading-background="rgba(0, 0, 0, 0.8)">
     <!-- ===== 面包屑组件 -->
     <!-- el-card的插槽 -->
     <bread-crumb slot="header">
     <!-- 面包屑的插槽 -->
     <template slot="title">评论列表</template>
     </bread-crumb>
     <!-- el-table：表格 -->
     <el-table :data='list'>
        <!-- 列  属性 prop => 字段名 label => 表头-->
        <el-table-column width='600px' label='标题' prop='title'></el-table-column>
        <el-table-column :formatter='stateFormatter' align='center' label='评论状态' prop='comment_status'></el-table-column>
        <el-table-column align='center' label='总评论数' prop='total_comment_count'></el-table-column>
        <el-table-column align='center' label='粉丝评论数' prop='fans_comment_count'></el-table-column>
        <el-table-column align='center' label='操作'>
           <!-- 作用域插槽 => 接收 el-table-column row/column/$index/store -->
         <template slot-scope="obj">
           <el-button size='small' type='text'>修改</el-button>
           <el-button :style="{color: obj.row.comment_status ? '#E6A23C' : '#409EFF' }" @click="closeOrOpen(obj.row)" size='small' type='text'>{{
             obj.row.comment_status ? "关闭评论" : '打开评论'
           }}</el-button>
        </template>
        </el-table-column>
     </el-table>
     <!-- 分页 -->
     <el-row type='flex' justify='center' style="margin:20px 0">
        <el-pagination
        @current-change="changePage"
        :current-page='page.currentPage'
        :page-size='page.pageSize'
        background
        layout="prev, pager, next"
        :total="page.total">
        </el-pagination>
     </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0, // 总条数
        currentPage: 1, // 默认第一页
        pageSize: 10 // 每页多少条
      },
      loading: false // 定义一个变量loading
    }
  },
  methods: {
    // ===== 获取评论列表
    getComment () {
      //  发送请求前 显示进度特效
      this.loading = true
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize } // 路径参数 也是query参数
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 把总条数给 分页组件的总条数
        // 请求结束时，关闭进度特效
        this.loading = false
      })
    },
    stateFormatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },

    // ===== 分页：@自定义事件
    // this.$emit("事件名",newpage1,newpage2)
    changePage (newPage) {
      this.page.currentPage = newPage // 更新最新页码给 currernpage
      this.getComment()
    },

    // ===== 打开或者关闭  row 当前行数据
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开' // 得到打开或者关闭
      this.$confirm(`您确定要${mess}评论?`).then(() => {
        // 确定调用接口
        this.$axios({
          url: 'comments/status', // 地址
          method: 'put',
          params: { article_id: row.id.toString() }, // 路径参数
          data: { allow_comment: !row.comment_status } // body参数  调用状态和当前状态是反着的 所以取反
        }).then(() => {
          // 成功之后一定会进入then
          this.getComment() // 重新拉取数据
        })
      })
    }
  },

  created () {
    this.getComment()
  },
  components: {

  }
}
</script>

<style scoped>

</style>
