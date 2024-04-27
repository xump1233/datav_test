<template>
  <div ref="pie1">

  </div>
</template>

<script>
export default {
    name:"PieRoundedCorner",
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
                        // textStyle:this.isTop?{color:'black'}:{fontSize:16,color:'white'}
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter:(params) =>{
                            return ''+params.name + ' : '+params.value+'%';
                        }
                    },
                    legend: {
                        show:this.formatData.length<=6 || this.isTop?true:false,
                        top: '5%',
                        left: this.isTop?'50':'75%',
                        orient: 'vertical',
                        // textStyle:this.isTop?{}:{color:'white'}
                    },
                    series: [
                        {
                        name: this.title,
                        type: 'pie',
                        radius: ['40%', '80%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
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