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
    props:['title','chartData','other'],
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
                        left:'left',
                        textStyle:{
                            fontSize:16
                        }
                    },
                    tooltip:{
                        trigger:'item'
                    },
                    radar: {
                        radius:'68%',
                        // shape: 'circle',
                        indicator: this.getChart,
                        axisName: {
                            color: 'black',
                            fontWeight:'',
                            fontSize:10
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
    width: 420px;
    height: 400px;
}
</style>