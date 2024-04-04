<template>
  <div ref="pie1" class="container">

  </div>
</template>

<script>
export default {
    name:"PiePadAngle",
    data(){
        return {
            myChart:'',
        }
    },
    props:['title','chartData'],
    computed:{
        formatData(){
            const result = []
            for(let key in this.chartData){
                const obj = {
                    name:key,
                    value:this.chartData[key]
                }
                result.push(obj)
            }
            return result
        }
    },
    methods:{
        setChart(){
            this.myChart = this.$echarts.init(this.$refs.pie1)
            let option = {
                title:{
                    text:this.title,
                    left:'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                    name: this.title,
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    padAngle: 5,
                    itemStyle: {
                        borderRadius: 10
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                        show: true,
                        fontSize: 24,
                        fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: this.formatData
                    }
                ]
            }
            option && this.myChart.setOption(option);
        }
    },
    mounted(){
        this.setChart()
    }
}
</script>

<style scoped>
.container{
    width:400px;
    height:400px
}
</style>