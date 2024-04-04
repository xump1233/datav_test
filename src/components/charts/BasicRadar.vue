<template>
  <div ref="radar" class="container"></div>
</template>

<script>
export default {
    name:'BasicRadar',
    data(){
        return {
            myChart:'',
        }
    },
    props:['title','chartData','max'],
    computed:{
        formatData(){
            const result = [[],[]]
            for(let key in this.chartData){
                result[0].push(key)
                result[1].push(this.chartData[key])
            }
            return result
        },
        getChart(){
            let result = []
            for(let key in this.chartData){
                result.push({
                    name:key,
                    max:this.max
                })
            }
            return result
        }
    },
    methods:{
        setChart(){
            this.myChart = this.$echarts.init(this.$refs.radar)
            let option = {
                title: {
                    text: this.title,
                    left:'center'
                },
                tooltip:{
                    trigger:'item'
                },
                radar: {
                    // shape: 'circle',
                    indicator: this.getChart,
                    axisName: {
                        color: 'black',
                        fontWeight:'bold'
                    },
                },
                grid:{

                },
                series: [
                    {
                    name: this.title,
                    type: 'radar',
                    center:['50%','50%'],
                    data: [
                        {
                        value:this.formatData[1],
                        name: this.title
                        },
                    ]
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
    width: 420px;
    height: 400px;
    margin:30px
}
</style>