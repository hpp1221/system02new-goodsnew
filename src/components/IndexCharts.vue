<template>
  <div style="margin-top: 20px">
    <el-select v-model="timeRange" style="float: right;margin-right: 10px">
      <el-option value="week" label="最近一周"></el-option>
    </el-select>
    <div id="main" style="width: 100%;height:400px;margin-top: 40px;clear: both"></div>
  </div>

</template>
<script>
  const echarts = require('echarts');
  const moment = require('moment');

  export default{
    data(){
      return {
        timeRange: '',
      }
    },
    methods: {
      getSalesSummary(){//品类销售汇总
        const myChart = echarts.init(document.getElementById('main'));
        const time = new Date().getTime();
        let timeArr = [];
        let yearTimeArr = [];
        for (let i = 0; i < 7; i++) {
          let day = time - i * 86400 * 1000;
          timeArr.push(moment(day).format('MM-DD'));
          yearTimeArr.push(moment(day).format('YYYY-MM-DD'));
        }
        timeArr = Array.reverse(timeArr);
        yearTimeArr = Array.reverse(yearTimeArr);
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          startTime: yearTimeArr[0],
          endTime: yearTimeArr[yearTimeArr.length - 1]
        };
//        self.httpApi.order.salesSummary(requestData, function (data) {
//          console.log('summary', data);
//          // self.pendingTaskList = data.data;
//        })
        // 指定图表的配置项和数据
        const option = {
          title: {
            text: '品类销售汇总TOP3'
          },
          tooltip: {},
          legend: {
            data: ['品类A', '品类B', '品类C']
          },
          xAxis: {
            data: timeArr,

          },
          yAxis: {
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
          },
          series: [
            {
              name: '品类A',
              type: 'bar',
              data: [5, 90, 36, 10, 10, 20, 60]
            },
//          {
//            name: '品类A',
//            type: 'line',
//            data: [5, 90, 36, 10, 10, 20, 60]
//          },
            {
              name: '品类B',
              type: 'bar',
              data: [26, 41, 40, 20, 30, 40, 30]
            },
//          {
//            name: '品类B',
//            type: 'line',
//            data: [26, 41, 40, 20, 30, 40, 30]
//          },
            {
              name: '品类C',
              type: 'bar',
              data: [51, 21, 49, 15, 19, 27, 100]
            },
//          {
//            name: '品类C',
//            type: 'line',
//            data: [51, 21, 49, 15, 19, 27, 100]
//          }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize = myChart.resize;


      },
    },
    mounted(){
      this.getSalesSummary();
    }
  }
</script>
