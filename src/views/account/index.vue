<template>
  <el-card>
    <!-- header具名是给卡片的 -->
    <bread-crumb slot="header">
      <!-- title具名 是面包屑组件的具名 -->
      <template slot="title">账户信息</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form ref="accountformDate" :rules='accountRules' :model="formData" style="margin-left:60px" label-width='100px'>
       <el-form-item prop='name' label='用户名'>
          <el-input v-model="formData.name" style='width:300px'></el-input>
       </el-form-item>
       <el-form-item label='简介'>
          <el-input v-model="formData.intro" style='width:300px'></el-input>
       </el-form-item>
       <el-form-item prop='email' label='邮箱'>
          <el-input v-model="formData.email" style='width:300px'></el-input>
       </el-form-item>
       <el-form-item label='手机号'>
          <el-input placeholder='我是你爸爸' disabled v-model="formData.mobile" style='width:300px'></el-input>
       </el-form-item>
       <el-form-item lable=''>
          <el-button @click="saveUser" type='primary'>保存信息</el-button>
       </el-form-item>
    </el-form>
    <img class="head-img" :src="formData.photo ? formData.photo : defaultImg" alt="" srcset="">
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {},
      defaultImg: require('../../assets/img/cai.gif'),
      accountRules: {
        name: [{ required: true, message: '用户名不能为空' }, { min: 1, max: 7, message: '1~7个字符' }],
        email: [{ required: true, message: '邮箱不能为空' }, { pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '邮箱格式不正确' }]
      } // 校验规则
    }
  },
  methods: {
    // ===== 保存账户信息 =====
    saveUser () {
      this.$refs.accountformDate.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(() => {
            //   成功提示消息
            this.$message({ message: '保存成功', type: 'success' })
          })
        }
      })
    },
    // ===== 获取账户信息 =====
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.head-img {
   width: 200px;
   height: 200px;
   border-radius: 50%;
   position: absolute;
   top: 150px;
   left:900px;
}
</style>
