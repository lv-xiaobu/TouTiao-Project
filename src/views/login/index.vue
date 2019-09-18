<template>
  <div class="login">
     <!-- 使用elementUI组件 el-card -->
     <el-card class="box-card">
        <div class="title">
           <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 表单====>  el-form包裹 -->
        <!-- 数据校验 => el-form 1、绑定表单数据 model 2、绑定数据校验规则 rules-->
        <el-form :model='loginForm' :rules='loginRules' style="margin-top='20px'" ref="">
           <!-- form-item 下面有一个prop属性 绑定下面表单组件 loginForm 下的对应的属性，才可以完成校验  -->
           <el-form-item prop='mobile'>
              <!-- 手机号 绑定 v-model-->
              <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
           </el-form-item>

           <el-form-item prop='code'>
              <!-- 验证码 -->
              <el-input v-model="loginForm.code" style="width:65%" placeholder="验证码"></el-input>
              <!-- 发送验证码 -->
              <el-button style="float:right">发送验证码</el-button>
           </el-form-item>

           <el-form-item prop='agree'>
            <!-- 同意选项 -->
              <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
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
      loginForm: { // 表单数据
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意协议
      },
      loginRules: { // 表单规则对象集合

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
