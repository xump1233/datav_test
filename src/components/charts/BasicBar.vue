<template>
  <div ref="bar" class="container"></div>
</template>

<script>
export default {
    name:'BasicBar',
    data(){
        return {
            myChart:'',
            // isTop:false
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
            if(this.chartData){
                for(let key in this.chartData){
                    if(this.isTop){
                        result[0].push(key)
                    }
                    else{
                        result[0].push(key.length>5?key.substring(0,4)+'...':key)
                    }
                    
                    result[1].push(this.chartData[key])
                }
            }
            return result
        },
        yAxisLength(){
            if(!this.chartData) return 30
            if(Object.values(this.chartData).length > 5){
                return 30
            }
            else{
                return 0
            }
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
                    title:{
                        text:this.title,
                        left:"center",
                        // textStyle:this.isTop?{fontSize:30,color:'#000'}:{fontSize:16,color:'#fff'}
                    },
                    grid: {
                        // 设置左边偏移量为容器宽度的 20%
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    yAxis:{
                        type:'value'
                    },
                    xAxis:{
                        type:'category',
                        data:this.formatData[0],
                        axisLabel: { 
                            interval: 0, rotate: this.yAxisLength ,
                            textStyle:{
                                fontSize:10,
                                // color:this.isTop?'#000':'#fff'
                            }
                        }
                    },
                    series:[
                        {
                            data:this.formatData[1],
                            type:'bar'
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
.container{
    padding:100px,0;
}
</style>