<template>
  <div ref="bar"></div>
</template>

<script>
export default {
    name:'PieSet',
    data(){
        return {
            myChart:'',
        }
    },
    props:['title','chartData','isTop'],
    computed:{
        formatData(){
            const result = []
            if(this.chartData){
                this.chartData.forEach(item=>{
                const arr = []
                for(let key in item.data){
                    arr.push({
                        name:key,
                        value:item.data[key]
                    })
                }
                result.push(arr)
            })
            }
            return result
        },
    },
    watch:{
        chartData(){
            this.setChart()
        }
    },
    methods:{
        setChart(){
            this.myChart = this.$echarts.init(this.$refs.bar)
            if(!this.title || !this.chartData){
                this.myChart.showLoading();
                return
            }
            else{
                try{
                    this.myChart.hideLoading();
                    let option = {
                        title:{
                            text:this.title,
                            left:"center",
                            // textStyle:this.isTop?{fontSize:30}:{color:'white'}
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{b}<br/>{c}人",
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        series:[
                            {
                                name:this.chartData[0].title,
                                radius:'20%',
                                center:["17%","27%"],
                                data:this.formatData[0],
                                type:'pie',
                                label:{
                                    show:this.isTop
                                },
                                title: {
                                    text: 'xxhh',
                                    left: '50%', 
                                    top:'50%',
                                    textStyle: {
                                        fontSize: 32, 
                                        color:'white'
                                    },
                                    
                                }
                            },
                            {
                                name:this.chartData[1].title,
                                type:'pie',
                                radius:'20%',
                                center:["51%","27%"],
                                data:this.formatData[1],
                                label:{
                                    show:this.isTop
                                }
                            },
                            {
                                name:this.chartData[2].title,
                                radius:'20%',
                                center:["83%","27%"],
                                data:this.formatData[2],
                                type:'pie',
                                label:{
                                    show:this.isTop
                                }
                            },
                            {
                                name:this.chartData[3].title,
                                radius:'20%',
                                center:["17%","65%"],
                                data:this.formatData[3],
                                type:'pie',
                                label:{
                                    show:this.isTop
                                }
                            },
                            {
                                name:this.chartData[4].title,
                                radius:'21`%',
                                center:["51%","65%"],
                                data:this.formatData[4],
                                type:'pie',
                                label:{
                                    show:this.isTop
                                }
                            },
                            {
                                name:this.chartData[5].title,
                                radius:'20%',
                                center:["83%","65%"],
                                data:this.formatData[5],
                                type:'pie',
                                label:{
                                    show:this.isTop
                                },
                                
                            },
                        ]
                    }
                    option && this.myChart.setOption(option);
                    this.myChart.on('click',(e)=>{
                        e.event.cancelBubble = true
                        this.$bus.$emit('getChart',{name:this.$options.name,title:this.title,chartData:this.chartData,other:this.other || ''})
                    })
                }
                catch{
                    return
                }
                
            }
        },
    },
    mounted(){
        console.log(this.title)
        this.setChart()
    }
}
</script>

<style scoped>

</style>