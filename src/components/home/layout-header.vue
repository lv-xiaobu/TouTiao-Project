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
       <img class="head-img" :src="userInfo.photo ? userInfo.photo : defaultImg" >
       <!-- 下拉菜单组件 el-dropdown -->
      <el-dropdown @command='commonClick' trigger="click">
        <!-- 匿名插槽 -->
        <span class="el-dropdown-link">{{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 具名插槽 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='account'>个人信息</el-dropdown-item>
          <el-dropdown-item command='git'>git地址</el-dropdown-item>
          <el-dropdown-item command='lgout'>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
     </el-col>
  </el-row>
</template>

<script>
// 导入公共vue实例
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      userInfo: {}, // 个人信息对象
      defaultImg: require('../../assets/img/avatar.jpg') // 转成base64
    }
  },
  methods: {
    // =====获取用户个人信息======
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        // 在 axios.config.js 中做了响应拦截器，使result.data.data => result.data
        this.userInfo = result.data // 接收对象
      })
    },
    // 公共点击事件
    commonClick (key) {
      if (key === 'account') {
        // 账户信息
        this.$router.push('/home/account')
      } else if (key === 'git') {
        // 去项目git地址
        window.location.href = 'https://github.com/lv-xiaobu/TouTiao-Project.git'
      } else {
        // 退出
        window.localStorage.clear() // 只能清除本项目的所有前端缓存
        this.$router.push('/login') // 跳转到登录页
      }
    }

  },
  created () {
    this.getUserInfo()
    // 一旦监听到事件 就会执行后面的函数
    eventBus.$on('uploadUserInfo', () => {
      // 当监听到，账户信息发生改变时，重新获取数据
      this.getUserInfo()
    })
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
