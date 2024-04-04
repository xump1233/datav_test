<template>
  <div ref="bar" class="container"></div>
</template>

<script>
export default {
    name:'FunnelChart',
    data(){
        return {
            myChart:'',
        }
    },
    props:['title','chartData'],
    computed:{
        formatData(){
            const result = [[],[]]
            for(let key in this.chartData){
                result[0].push(key)
                result[1].push({
                    name:key,
                    value:this.chartData[key]
                })
            }
            return result
        }
    },
    methods:{
        setChart(){
            this.myChart = this.$echarts.init(this.$refs.bar)
            let option = {
                title: {
                    text: this.title,
                    left:'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c}%'
                },
                toolbox: {
                    feature: {
                    dataView: { readOnly: false },
                    restore: {},
                    saveAsImage: {}
                    }
                },
                legend: {
                    top:50,
                    data: this.formatData[0]
                },
                series: [
                    {
                    name: 'Funnel',
                    type: 'funnel',
                    // left: '10%',
                    // top: 100,
                    // bottom: 60,
                    // width: '80%',
                    min: 0,
                    max: 100,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'descending',
                    gap: 2,
                    label: {
                        show: true,
                        position: 'inside'
                    },
                    labelLine: {
                        length: 10,
                        lineStyle: {
                        width: 1,
                        type: 'solid'
                        }
                    },
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                        fontSize: 20
                        }
                    },
                    data: this.formatData[1]
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
    height: 400px;
}
</style>