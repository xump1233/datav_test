<template>
  <div ref="pie" class="container"></div>
</template>

<script>
export default {
    name:'NightingaleChart',
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
                result.push({name:key,value:this.chartData[key]})
            }
            return result
        }
    },
    methods:{
        setChart(){
            this.myChart = this.$echarts.init(this.$refs.pie)
            let option = {
                title: {
                    text: this.title,

                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    top: 'bottom',
                    data: this.formatData.map(item=>item.name)
                },
                toolbox: {
                    show: true,
                    feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                    name: this.title,
                    type: 'pie',
                    roma:true,
                    radius: [20, 140],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 5
                    },
                    data: this.formatData
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
    width:400px;
    height:400px
}
</style>