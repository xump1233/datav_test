<template>
  <div ref="bar"></div>
</template>

<script>
export default {
    name:'SimpleEncode',
    data(){
        return {
            myChart:'',
        }
    },
    props:['title','chartData','other','isTop'],
    watch:{
        chartData(){
            this.setChart()
        }
    },
    computed:{
        formatData(){
            let result = []
            for(let key in this.chartData){
                result.push([this.chartData[key],Math.round(this.other[0]*this.chartData[key]/100),key])
            }
            result = this.shuffleArray(result)
            result.unshift(['score', '总计', 'product'])
            return result
        }
    },
    methods:{
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        setChart(){
            this.myChart = this.$echarts.init(this.$refs.bar)
            if(!this.title){
                this.myChart.showLoading();
            }
            else{
                this.myChart.hideLoading();
                let option = {
                    title:{
                        text:this.title,
                        left:'center',
                        // textStyle:this.isTop?{}:{color:'white'}
                    },
                    dataset: {
                        source: this.formatData
                    },
                    grid: { 
                        containLabel: true,
                        left:'0'
                    },

                    xAxis: { name: '总计',/*axisLabel:{color:'white'} */},
                    yAxis: { type: 'category',/*axisLabel:{color:'white'}*/ },
                    visualMap: {
                        orient: 'horizontal',
                        left: 'center',
                        min: 0,
                        max: 50,
                        text: ['较多', '较少'],
                        textStyle:{color:'white'},
                        // Map the score column to color
                        dimension: 0,
                        inRange: {
                        color: ['#65B581', '#FFCE34', '#FD665F']
                        }
                    },
                    series: [
                        {
                        type: 'bar',
                        barWidth:20,
                        encode: {
                            // Map the "amount" column to X axis.
                            x: '总计',
                            // Map the "product" column to Y axis
                            y: 'product'
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
        },
    },
    mounted(){
        this.setChart()
    }
}
</script>

<style scoped>

</style>