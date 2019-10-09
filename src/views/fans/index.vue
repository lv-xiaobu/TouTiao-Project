<template>
  <el-card>
     <bread-crumb slot="header">
      <template slot='title'>图文数据</template>
      </bread-crumb>
      <!-- echarts 需要dom元素，需要给一个有长宽的盒子 -->
      <!-- ref 获取dom对象 -->
      <el-row type="flex" justify="space-between">
        <!-- 工作图表 -->
         <div ref="workChart" class="echarts"></div>
         <!-- 生活图表 -->
         <div ref="liftChart" class="echarts"></div>
      </el-row>

  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      workData: [820, 932, 901, 934, 1290, 1330, 1320],
      liftData: [10, 52, 200, 334, 390, 330, 220]
    }
  },
  methods: {
    // 更新数据
    updateData () {
      this.liftData = this.liftData.map(item => {
        return item * (Math.random() + 0.7)
      })
      this.workData = this.workData.map(item => {
        return item * (Math.random() + 0.7)
      })
    },
    // 调用setOption() 图表的方法
    setWorkOption () {
      this.workChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.workData,
          type: 'line',
          smooth: true
        }]
      })
    },
    // 调用setOption() 图表的方法
    setLiftOption () {
      this.liftChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: this.liftData
          }
        ]
      })
    }
  },
  // 每次数据更新都要调用 setOption ，所以监听两个事件
  watch: {
    workData () {
      this.setWorkOption()
    },
    liftData () {
      this.setLiftOption()
    }
  },
  // 钩子函数 页面渲染完成之前
  created () {
    setInterval(() => {
      this.updateData() // 一秒钟调用一次数据更新
    }, 1000)
  },
  // 钩子函数 页面渲染完成之后
  mounted () {
    // 图表的初始化 init() 图表的方法
    // 把两个Chart属性，绑定在vue的data上，供 watch事件 监听
    this.workChart = echarts.init(this.$refs.workChart) // 得到图表的实例
    this.liftChart = echarts.init(this.$refs.liftChart) // 得到图表的实例
    this.setWorkOption()
    this.setLiftOption()
  }
}
</script>

<style lang='less' scoped>
.echarts {
   width: 600px;
   height: 400px;
}
</style>
