<template>
  <div ref="pie1" class="container">

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
    props:['title','chartData'],
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
                        textStyle:{
                            fontSize:16
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter:(params) =>{
                            return ''+params.name + ' : '+params.value+'%';
                        }
                    },
                    legend: {
                        show:this.formatData.length>6?false:true,
                        top: '5%',
                        left: 'right',
                        orient: 'vertical',
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
                            fontSize: 16,
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
            }
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