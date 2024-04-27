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
                let option = {
                    title:{
                        text:this.title,
                        left:'center',
                        // textStyle:this.isTop?{}:{color:'#fff'}
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        top: '20%',
                        left: 'center',
                        // textStyle:this.isTop?{color:'#000'}:{color:'#fff'}
                    },
                    series: [
                        {
                        name: this.title,
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['50%', '90%'],
                        // adjust the start and end angle
                        startAngle: 180,
                        endAngle: 360,
                        data: this.formatData
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