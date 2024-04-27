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
    props:['title','chartData','isTop'],
    watch:{
        chartData(){
            this.setChart()
        }
    },
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
            if(!this.title){
                this.myChart.showLoading();
            }
            else{
                this.myChart.hideLoading();
                let option = {
                    title:{
                        text:this.title,
                        left:"center",
                        // textStyle:this.isTop?{color:'#000',fontSize:20}:{color:'#fff'}
                    },
                    tooltip:{
                        trigger:'item'
                    },
                    legend:{
                        show:this.isTop,
                        orient:'vertical',
                        left:'left'
                    },
                    series:[
                        {
                            name:this.title,
                            type:'pie',
                            redius:'50%',
                            center:['50%','52%'],
                            data:this.formatData,
                            label:{
                                show:this.isTop
                            },
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
                this.myChart.on('click',(e)=>{
                    e.event.cancelBubble = true
                    this.$bus.$emit('getChart',{name:this.$options.name,title:this.title,chartData:this.chartData,other:this.other || ''})
                })
            }
        }
    },
    mounted(){
        this.setChart()
    }
}
</script>

<style scoped>

</style>