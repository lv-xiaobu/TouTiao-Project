<template>
  <el-card v-loading='loading'
  element-loading-text="丫的，等一会儿"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- 面包屑组件 -->
    <bread-crumb slot='header'>
      <template slot='title'>发表文章</template>
    </bread-crumb>
    <!-- {{channels}} -->
    <el-form ref="publishForm" :model="formData" :rules='rules' style='margin-left:100px' label-width="100px">
           <el-form-item prop='title' label="标题">
               <el-input v-model="formData.title" style='width:400px'></el-input>
           </el-form-item>
           <el-form-item prop='content' label="内容">
               <quill-editor v-model="formData.content" style="height:300px" placeholder="请输入内容"></quill-editor>
           </el-form-item>
           <el-form-item prop='cover' style="margin-top:130px" label="封面">
               <el-radio-group @change="changeType" v-model="formData.cover.type">
                   <el-radio :label='1'>单选</el-radio>
                   <el-radio :label='3'>三图</el-radio>
                   <el-radio :label='0'>无图</el-radio>
                   <el-radio :label='-1'>自动</el-radio>
               </el-radio-group>
           </el-form-item>
           <!-- 封面组件 -->
           <!-- 封面组件写在publish组件里面，是父子关系，获取image长度的话，用 props -->
           <!-- 传递父组件 formData.cover.images 的值 给子组件 :images  -->
           <cover-image @selectImg='changeImg' :images='formData.cover.images'></cover-image>
           <el-form-item prop='channel_id' label="频道">
               <el-select v-model="formData.channel_id">
                  <!-- select选择器  label（显示值）value(存储值) -->
                  <el-option v-for='item in channels' :key='item.id' :label="item.name" :value="item.id"></el-option>
               </el-select>
           </el-form-item>
           <el-form-item>
               <el-button type='primary' @click='publish(false)'>发布文章</el-button>
               <el-button @click='publish(true)'>存入草稿</el-button>
           </el-form-item>

      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false, // 加载进程
      channels: [],
      formData: {
        title: '', // 标题
        content: '', // 内容
        channel_id: null, // 频道id
        cover: {
          type: 0,
          images: [] // 按字符串形式储存封面地址（不是对象）
        } // 封面
      },
      // ===== 校验规则 =====
      rules: {
        title: [{ required: true, message: '标题不为空' }, {
          // 最小长度 min  最大长度 max
          min: 5, max: 30, message: '标题长度要控制在5到30个字符之间'
        }],
        content: [{ required: true, message: '内容不为空' }],
        channel_id: [{ required: true, message: '频道不为空' }]
      }
    }
  },
  methods: {
    // ===== 接收子组件传递过来的值 =====
    // 更改 images [""] ["",""] ["","",""] []
    changeImg (url, index) {
      // alert(url)
      // ！！！错误的写法！！！
      // this.formData.cover.images[index] = url

      // 由于 JavaScript 的限制，Vue **不能**检测以下数组的变动：
      // 1. 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
      // 2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

      // 解法：把当前数组。赋值给一个新的数组
      // 会改变调用了这些方法的原始数组：push()  pop()  shift()  unshift()  splice()  sort()  reverse()
      // 替换数组：filter()、concat() 和 slice() 不会改变原始数组，而总是返回一个新数组

      // 第一种方法：
      // i === index 说明找到了要修改的值
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)

      // 第二种方法：把当前得到的索引值，直接用url替换 只适用于 数组、字符串
      // this.formData.cover.images.splice(index, 1, url)
    },
    // ===== 封面类型改变事件 =====
    changeType () {
      // alert(this.formData.cover.type) // 在change事件改变时，已经获取最新的值
      // 根据type进行images长度的变化
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // images长度1
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // images长度
      } else {
        this.formData.cover.images = []
      }
    },
    // ===== 获取频道数据 =====
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取channels频道
      })
    },
    // 根据文章id获取文章详情
    getArticleByid (articleId) {
      this.loading = true
      this.$axios({
        // id 在内容列表传出的时候，已经把 id 从大数字类型转换成字符串类型了
        url: `articles/${articleId}`
      }).then((result) => {
        this.formData = result.data
        this.loading = false
      })
    },
    // ===== 判断是修改文章还是发表文章 =====
    publish (draft) {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          // article_id  有=>编辑文章 没有=>发表文章
          let { articleId } = this.$route.params
          // ===== 根据条件接口切换两种模式：编辑/发布文章 =====
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft: draft }, // 是否存为草稿（true 为草稿,false 为正常）
            data: this.formData
          }).then(() => {
            // 发布成功 => 回到内容列表
            this.$router.push('/home/articles')
          })
        }
      })
    }
  },
  created () {
    this.getChannels() // 获取频道
    // 修改文章：在页面初始化时，拿到文章的id
    let { articleId } = this.$route.params // article_id  有=>编辑文章 没有=>发表文章
    articleId && this.getArticleByid(articleId) // 短路表达式，表示判断意思
  }
}

</script>

<style lang='less' scoped>

</style>
