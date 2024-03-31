<template>
  <div ref="bar"></div>
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
                    left: '30%' // 设置左边偏移量为容器宽度的 20%
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
                xAxis:{
                    type:'value'
                },
                yAxis:{
                    type:'category',
                    data:this.formatData[0],
                    // axisLabel: {
                    //     interval: 0, // 强制显示所有标签
                    //     // rotate: 45 // 旋转角度，可以根据需要调整
                    // }
                },
                series:[
                    {
                        data:this.formatData[1],
                        type:'bar'
                    }
                ]
            }
            option && this.myChart.setOption(option);
        }
    },
    mounted(){
        this.$refs.bar.style.width = "700px"
        this.$refs.bar.style.height = "500px"
        this.setChart()
    }
}
</script>

<style>

</style>