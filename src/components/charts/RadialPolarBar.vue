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
    watch:{
        chartData(){
            this.setChart()
        }
    },
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
            if(!this.title){
                this.myChart.showLoading();
            }
            else{
                this.myChart.hideLoading();
                let option = {
                    title: [
                        {
                        text: this.title,
                        left:'left'
                        }
                    ],
                    polar: {
                        radius: [20, '75%']
                    },
                    radiusAxis: {
                        max: 40
                    },
                    angleAxis: {
                        show:false,
                        type: 'category',
                        data: this.formatData[0],
                        startAngle: 75
                    },
                    tooltip: {},
                    grid:{
                        left: '10%',    // 图表距离容器左侧的距离
                    },
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
            }
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

