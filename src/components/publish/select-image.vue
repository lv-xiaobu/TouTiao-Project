<template>
   <!-- 页签组件 -->
  <el-tabs>
     <el-tab-pane label='素材库'>
        <!-- 全部素材 -->
        <div class="imgs-list">
           <!-- item.id:没有超过安全范围,不用考虑大数字 -->
           <el-card class="imgs-item" v-for="item in list" :key="item.id">
              <img @click="clickImg(item)" :src="item.url">
           </el-card>
        </div>
        <!-- 分页：用layout布局组件的 el-row 包裹 -->
         <el-row type='flex' justify='center'>
            <el-pagination
               background
               layout="prev, pager, next"
               :total="page.total"
               :current-page='page.currentPage'
               :page-size='page.pageSize'
               @current-change='changePage'>
            </el-pagination>
         </el-row>
     </el-tab-pane>
     <el-tab-pane label='上传图片'>
        <!-- 自定义上传 -->
         <el-upload :show-file-list="false" action="" :http-request="uploadImg">
            <i class="el-icon-plus avatar-uploader-icon"></i>
         </el-upload>
     </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      list: [], // 全部素材
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 12
      }
    }
  },
  methods: {
    // ===== 上传用户素材 =====
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        //   得到一个线上地址
        this.$emit('selectOneImg', result.data.url)
      })
    },
    // ===== 点击素材图片，获取图片的id =====
    clickImg (item) {
      // 利用自定义事件，把 url 传递给父组件 cover-images 在组件实例中接收
      this.$emit('selectOneImg', item.url)
    },
    // ===== 页码改变事件 =====
    changePage (newPage) {
      this.page.currentPage = newPage // 赋值最新页码
      this.getAllImg() // 重新调用方法
    },
    // ===== 获取图片素材 =====
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.page.currentPage, per_page: this.page.pageSize }
      }).then((result) => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getAllImg()
  },
  components: {}
}
</script>

<style lang='less' scoped>
.imgs-list {
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   .imgs-item {
      width: 120px;
      height: 120px;
      margin:10px;
      line-height: 120px;
      img {
         width: 100%;
         height: 100%;
      }
   }
}
.avatar-uploader .el-upload {
   border: 1px dashed #d9d9d9;
   border-radius: 6px;
   cursor: pointer;
   position: relative;
   overflow: hidden;
}
.avatar-uploader .el-upload:hover {
   border-color: #409EFF;
}
.avatar-uploader-icon {
   font-size: 28px;
   color: #8c939d;
   width: 178px;
   height: 178px;
   line-height: 178px;
   text-align: center;
}
.avatar {
   width: 178px;
   height: 178px;
   display: block;
}
</style>
