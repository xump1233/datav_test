<template>
  <div ref="pie1" class="container">

  </div>
</template>

<script>
export default {
    name:"PieFull",
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
                    left:"center"
                },
                tooltip:{
                    trigger:'item'
                },
                legend:{
                    orient:'vertical',
                    left:'left'
                },
                series:[
                    {
                        name:this.title,
                        type:'pie',
                        redius:'50%',
                        center:['50%','50%'],
                        data:this.formatData,
                        emphasis:{
                            itemStyle:{
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
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