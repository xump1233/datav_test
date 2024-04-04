<template>
  <div ref="bar" class="container"></div>
</template>

<script>
export default {
    name:'RadialPolarBar',
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
                title: [
                    {
                    text: this.title,
                    left:'center'
                    }
                ],
                polar: {
                    radius: [30, '80%']
                },
                radiusAxis: {
                    max: 40
                },
                angleAxis: {
                    type: 'category',
                    data: this.formatData[0],
                    startAngle: 75
                },
                tooltip: {},
                series: {
                    type: 'bar',
                    data: this.formatData[1],
                    coordinateSystem: 'polar',
                    label: {
                        show: true,
                        position: 'outside',
                        formatter: '{b}: {c}',
                    }
                },
                animation: false
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
    height:400px
 }
</style>

