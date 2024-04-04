<template>
  <div ref="bar" class="container"></div>
</template>

<script>
export default {
    name:'BasicBar',
    data(){
        return {
            myChart:'',
        }
    },
    props:['title','chartData'],
    computed:{
        formatData(){
            const result = [[],[]]
            for(let key in this.chartData){
                result[0].push(key)
                result[1].push(this.chartData[key])
            }
            return result
        },
        yAxisLength(){
            if(Object.values(this.chartData).length > 5){
                return 30
            }
            else{
                return 0
            }
        }
    },
    methods:{
        setChart(){
            this.myChart = this.$echarts.init(this.$refs.bar)
            let option = {
                title:{
                    text:this.title,
                    left:"center"
                },
                grid: {
                     // 设置左边偏移量为容器宽度的 20%
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
                yAxis:{
                    type:'value'
                },
                xAxis:{
                    type:'category',
                    data:this.formatData[0],
                    axisLabel: { 
                        interval: 0, rotate: this.yAxisLength ,
                        textStyle:{
                            fontSize:10
                        }
                    }
                },
                series:[
                    {
                        data:this.formatData[1],
                        type:'bar'
                    }
                ]
            }
            option && this.myChart.setOption(option);
        },
    },
    mounted(){

        this.setChart()
    }
}
</script>

<style scoped>
.container{
    width:400px;
    height: 400px;
}
</style>