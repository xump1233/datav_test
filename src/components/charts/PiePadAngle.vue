<template>
  <div ref="pie1" class="container">

  </div>
</template>

<script>
export default {
    name:"PiePadAngle",
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
                        left:'center',
                        top:this.isTop?'2%':'-1%',
                        // textStyle:this.isTop?{color:'#000'}:{color:'#fff'}
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter:(params) =>{
                            return ''+params.name + ' : '+params.value+'%';
                        }
                    },
                    legend: {
                        top: '10%',
                        left: this.isTop?50:60,
                        orient: 'vertical',
                        // textStyle:this.isTop?{color:'black'}:{color:'white'}
                    },
                    series: [
                        {
                        name: this.title,
                        type: 'pie',
                        radius: ['40%', '80%'],
                        avoidLabelOverlap: false,
                        padAngle: 5,
                        itemStyle: {
                            borderRadius: 10
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                            show: true,
                            fontSize: this.isTop?30:16,
                            fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
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