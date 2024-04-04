<template>
  <div ref="bar" class="container"></div>
</template>

<script>
export default {
    name:'SimpleEncode',
    data(){
        return {
            myChart:'',
        }
    },
    props:['title','chartData','total'],
    computed:{
        formatData(){
            let result = []
            for(let key in this.chartData){
                result.push([this.chartData[key],Math.round(this.total*this.chartData[key]/100),key])
            }
            result = this.shuffleArray(result)
            result.unshift(['score', 'amount', 'product'])
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
            let option = {
                title:{
                    text:this.title,
                    left:'center'
                },
                dataset: {
                    source: this.formatData
                },
                grid: { containLabel: true },
                xAxis: { name: 'amount' },
                yAxis: { type: 'category' },
                visualMap: {
                    orient: 'horizontal',
                    left: 'center',
                    min: 0,
                    max: 50,
                    text: ['选择较多', '选择较少'],
                    // Map the score column to color
                    dimension: 0,
                    inRange: {
                    color: ['#65B581', '#FFCE34', '#FD665F']
                    }
                },
                series: [
                    {
                    type: 'bar',
                    encode: {
                        // Map the "amount" column to X axis.
                        x: 'amount',
                        // Map the "product" column to Y axis
                        y: 'product'
                    }
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