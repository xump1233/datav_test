<template>
  <div ref="radar" class="container"></div>
</template>

<script>
export default {
    name:'BasicRadar',
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
            const result = [[],[]]
            for(let key in this.chartData){
                result[0].push(key)
                result[1].push(this.chartData[key])
            }
            return result
        },
        getChart(){
            let result = []
            for(let key in this.chartData){
                result.push({
                    name:key,
                    max:this.other[0]
                })
            }
            return result
        }
    },
    methods:{
        setChart(){
            this.myChart = this.$echarts.init(this.$refs.radar)
            if(!this.title){
                this.myChart.showLoading();
            }
            else{
                let option = {
                    title: {
                        text: this.title.length>8?this.title.substring(0,8)+'\n'+this.title.substring(8,this.title.length):this.title,
                        left:this.isTop?50:'left',
                        top:this.isTop?50:'',
                        // textStyle:this.isTop?{fontSize:30,color:'#000'}:{fontSize:16,color:'#fff'}
                    },
                    tooltip:{
                        trigger:'item'
                    },
                    radar: {
                        radius:'68%',
                        // shape: 'circle',
                        indicator: this.getChart,
                        axisName: {
                            // color: '#fff',
                            fontWeight:'',
                            fontSize:this.isTop?16:10
                        },
                    },
                    grid:{

                    },
                    series: [
                        {
                        name: this.title,
                        type: 'radar',
                        zoom:0.6,
                        center:['50%','50%'],
                        data: [
                            {
                            value:this.formatData[1],
                            name: this.title
                            },
                        ]
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