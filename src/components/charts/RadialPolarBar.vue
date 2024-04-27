<template>
  <div ref="bar"></div>
</template>

<script>
export default {
    name:'RadialPolarBar',
    data(){
        return {
            myChart:'',
        }
    },
    props:['title','chartData','isTop'],
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
                        left:this.isTop?'50':'30',
                        top:this.isTop?'50':'20',
                        // textStyle:this.isTop?{fontSize:30}:{color:'white'}
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
                this.myChart.on('click',(e)=>{
                    e.event.cancelBubble = true
                    this.$bus.$emit('getChart',{name:this.$options.name,title:this.title,chartData:this.chartData,other:this.other || ''})
                })
            }
        },
    },
    mounted(){
        this.setChart()
    }
}
</script>

<style scoped>

</style>

