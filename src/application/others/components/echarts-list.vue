<template>
    <div class="echarts-list">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>图表管理s</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-row :gutter="20">
              <i-col :span="12" :offset="6" id="echarts" style="height: 400px">
              </i-col>
            </i-row>
          </div>
        </div>
      </i-card>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {
      option: {
        title: {
          text: 'ECharts 入asa门dd示例sadasd zczc'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [52, 20, 26, 10, 10, 20]
          }
        ]
      }
    }
  },
  mounted () {
    console.log(1)
    this.$nextTick(() => {
      let echart = echarts.init(document.getElementById('echarts'))
      window.onresize = function () {
        echart.resize()
      }
      echart.setOption(this.option)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
