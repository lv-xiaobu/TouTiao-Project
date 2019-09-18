<template>
  <div class="login">
     <!-- 使用elementUI组件 el-card -->
     <el-card class="box-card">
        <div class="title">
           <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 表单====>  el-form包裹 -->
        <el-form style="margin-top='20px'">
           <el-form-item>
              <!-- 手机号 绑定 v-model-->
              <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
           </el-form-item>

           <el-form-item>
              <!-- 验证码 -->
              <el-input style="width:65%" placeholder="验证码"></el-input>
              <!-- 发送验证码 -->
              <el-button style="float:right">发送验证码</el-button>
           </el-form-item>

           <el-form-item>
            <!-- 同意选型 -->
              <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
           </el-form-item>

           <el-form-item>
              <!-- 登录按钮 -->
              <el-button type='primary' style="width:100%">登录</el-button>
           </el-form-item>
        </el-form>
     </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginFrom: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 选项
      }
    }
  },
  methods: {

  },
  components: {

  }
}
</script>

// 1、如果要在组件的样式只能写less，就要在style标签上，给一个 lang='less'
// 2、vue单文件组件默认情况下，style样式是全局的，
// 如果加了 scoped属性 表示当前组件的样式 **`只对当前自己的html`**起作用
<style lang='less' scoped>
.login {
   background-image: url('../../assets/img/login_bg.jpg');
   /* 当前可视区域高度的百分百 */
   height: 100vh;
   /* 图片大小，自适应屏幕 */
   background-size: cover;
   display: flex;
   justify-content: center;
   align-items: center;
   .box-card {
      width: 440px;
      height: 340px;
      .title {
         text-align: center;
         img {
               height:45px;
           }
      }
   }
}
</style>
