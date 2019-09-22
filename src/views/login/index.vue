<template>
  <div class="login">
     <!-- 使用elementUI组件 el-card -->
     <el-card class="box-card">
        <div class="title">
           <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 表单====>  el-form包裹 -->
        <!-- 数据校验 => el-form 1、绑定表单数据 model 2、绑定数据校验规则 rules-->
        <!-- ref="myForm"：把整个表单 el-form 通过 ref 的形式传入 Vue.$refs 中 -->
        <el-form :model='loginForm' :rules='loginRules' status-icon style="margin-top='20px'" ref="myForm">
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
              <!-- 添加点击事件 在点击的时候，校验转整个表单的数据 -->
              <!-- type='primary':给按钮一个颜色（elementUI中自带） -->
              <el-button @click="login" type='primary' style="width:100%">登录</el-button>
           </el-form-item>
        </el-form>
     </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 自定义校验函数 validator  在 loginRules 中的 agree 使用
    let validator = function (rule, value, callback) {
      // =====第一种写法=====
      // if (value) { // 正确 勾选协议
      //   callback() // 一切OK继续执行
      // } else { // 不正确 不勾选协议
      //   callback(new Error('你必须选'))
      // }
      // =====第二种写法=====
      value ? callback() : callback(new Error('你必须选'))
    }
    return {
      loginForm: { // 表单数据
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意协议
      },
      loginRules: { // 表单规则对象集合
        // key(表单各个组件的字段名):[{},{},{}]
      // form-item中参数  required 为true 表示该字段必填 如果不填，就会提示信息
        mobile: [{ required: true, message: '请输入你的手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }],
        code: [{ required: true, message: '请输入验证码' }, { pattern: /^\d{6}$/, message: '请输入6位数的验证码' }],
        // 因为 agree 判断的是布尔值，
        // 如果数据校验不满足，还可以自定义校验函数 validator
        // validator：一个自定义函数 validator:funtion (rule(当前规则),value(当前值),callback(回调函数){})
        agree: [{ validator }]
      }
    }
  },
  methods: {
    // 添加点击事件 校验整个表单
    login () {
      //  this.$refs:获取（对象实例）DOM对象
      // 只有一切的校验通过之后 才会进行请求
      // validate 是一个方法 => 方法中传入的一个函数 两个校验参数  是否校验成功(有用)/未校验成功的字段(鸡肋)
      this.$refs.myForm.validate((isOK) => {
      //   isOK ? console.log('校验成功') : console.log('校验失败')
        if (isOK) {
          // 校验成功以后，根据接口文件，请求接口
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.loginForm // loginForm中包括 mobile code
            // 成功在 then 中输出========失败在 catch 中输出
            // 在 axios.config.js 中做了响应拦截器，使result.data.data => result.data
          }).then(result => {
            // 将后台返回的token令牌存储到前端缓存中
            // localStorage.setItem(键,值（只能存储字符串）)；
            // -----键：可以放入任何数据类型
            // -----值：只能存储字符串
            // 注意： 如果存储的是对象之类的复杂类型，要先把复杂类型转换为JSON格式的字符串，再存进去，
            window.localStorage.setItem('user-token', result.data.token)
            this.$router.push('/home') // 跳转到主页
          }).catch(() => {
            // 提示消息：用elementUI提示模板设置
            this.$message({
              type: 'warning',
              message: '您的手机号或者验证码错误'
            })
          })
        }
      })
    }
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
