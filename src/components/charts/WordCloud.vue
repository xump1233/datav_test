<template>
  <div ref="cloud" class="container"></div>
</template>

<script>
import 'echarts-wordcloud'
export default {
    name:'WordCloud',
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
                result.push({
                    name:key,
                    value:this.chartData[key]
                })
            }
            return result
        },
    },
    methods:{
        setChart(){
            this.myChart = this.$echarts.init(this.$refs.cloud)
            // this.myChart = this.$echarts.init(this.$refs.cloud, 'dark');
            if(!this.title){
                this.myChart.showLoading();
            }
            else{
                this.myChart.hideLoading();
                let option = {
                    title:{
                        text:this.title,
                        subtext:'xxhh',
                    },
                    tooltip:{
                        trigger:'item',
                        formatter:(params) =>{
                            return ''+params.name + ' : '+params.value+'人';
                        }
                    },
                    series: [{
                        type: 'wordCloud',
                        // 设置词云图的大小范围
                        gridSize: 20,
                        rotationRange: [0, 0],
                        sizeRange: [12, 36],
                        // 设置词云图的形状
                        shape: 'circle',
                        // 设置词云图的样式
                        textStyle: {
                            normal: {
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                // 设置词云图中文字的颜色
                                color: function () {
                                    return 'rgb(' + [
                                        Math.round(Math.random() * 255),
                                        Math.round(Math.random() * 255),
                                        Math.round(Math.random() * 255)
                                    ].join(',') + ')';
                                }
                            }
                        },
                        // 设置词云图的数据
                        data: this.formatData
                    }]
                }
                option && this.myChart.setOption(option);
            }
        },
    },
    mounted(){
        this.setChart()
    }
}
</script>

<style scoped>
.container{
    width:500px;
    height: 300px;
}
</style>