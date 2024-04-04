<template>
  <div ref="pie1" class="container">

  </div>
</template>

<script>
export default {
    name:"HalfPie",
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
                    left: 'center',
                },
                series: [
                    {
                    name: this.title,
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['50%', '50%'],
                    // adjust the start and end angle
                    startAngle: 180,
                    endAngle: 360,
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
    width: 400px;
    height:400px
}
</style>