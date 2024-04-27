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
            if(!this.title){
                this.myChart.showLoading();
            }
            else{
                let option = {
                    title: {
                        text: this.title,
                        left:'center',
                        // textStyle:this.isTop?{fontSize:20,color:'#000'}:{color:'#fff'}
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c}%'
                    },
                    // toolbox: {
                    //     feature: {
                    //     dataView: { readOnly: false },
                    //     restore: {},
                    //     saveAsImage: {}
                    //     }
                    // },
                    legend: {
                        show:true,
                        left:'left',
                        orient: 'vertical',
                        data: this.formatData[0],
                        // textStyle:this.isTop?{}:{color:'#fff'}
                    },
                    series: [
                        {
                        name: this.title,
                        type: 'funnel',
                        left: '0%',
                        // top: 100,
                        // bottom: 60,
                        width: '100%',
                        height:'60%',
                        min:0,
                        max: 100,
                        minSize: '3%',
                        maxSize: '100%',
                        sort: 'descending',
                        gap: 3,
                        label: {
                            show: this.isTop,
                            position: 'inside',
                            itemStyle:{
                                
                            }
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
                            fontSize: 12
                            }
                        },
                        data: this.formatData[1]
                        }
                    ]
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