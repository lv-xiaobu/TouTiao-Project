<template>
  <!-- 头部布局 -->
  <el-row class="layout-header" align='middle' type='flex' justify='space-between'>
     <!-- 左侧 -->
     <el-col :span='7'>
        <i class="el-icon-s-unfold"></i>
        <span class='title'>江苏传智播客教育科技股份有限公司</span>
     </el-col>
     <!-- 右侧 -->
     <el-col :span='4'>
       <!-- 用户头像 -->
       <img class="head-img" :src="userInfo.photo ? userInfo.photo : defaultImg" alt="" srcset="">
       <!-- 下拉菜单组件 el-dropdown -->
      <el-dropdown trigger="click">
        <!-- 匿名插槽 -->
        <span class="el-dropdown-link">{{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 具名插槽 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
     </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}, // 个人信息对对象
      defaultImg: require('../../assets/img/avatar.jpg') // 转成base64
    }
  },
  methods: {
    // =====获取用户个人信息======
    getUserInfo () {
      let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile',
        // 接口要求:添加令牌
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(result => {
        this.userInfo = result.data.data // 接收对象
      })
    }
  },
  created () {
    this.getUserInfo()
  },
  components: {

  }
}
</script>

<style lang='less' scoped>
.layout-header {
     height:50px;
     .el-icon-s-unfold {
         font-size: 22px;
     }
     .title {
         vertical-align: top;
         margin-left: 4px;
     }
     .head-img {
         width:40px;
         height:40px;
         border-radius: 50%;
         vertical-align: middle;
         margin-right:4px;
     }
}
</style>
