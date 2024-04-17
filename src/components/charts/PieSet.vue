<template>
  <div ref="bar" class="container"></div>
</template>

<script>
export default {
    name:'PieSet',
    data(){
        return {
            myChart:'',
        }
    },
    props:['title','chartData'],
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
                            left:"center"
                        },
                        tooltip: {
                            trigger: 'item',
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
                                type:'pie'
                            },
                            {
                                name:this.chartData[1].title,
                                type:'pie',
                                radius:'20%',
                                center:["51%","27%"],
                                data:this.formatData[1]
                            },
                            {
                                name:this.chartData[2].title,
                                radius:'20%',
                                center:["83%","27%"],
                                data:this.formatData[2],
                                type:'pie'
                            },
                            {
                                name:this.chartData[3].title,
                                radius:'20%',
                                center:["17%","65%"],
                                data:this.formatData[3],
                                type:'pie'
                            },
                            {
                                name:this.chartData[4].title,
                                radius:'21`%',
                                center:["51%","65%"],
                                data:this.formatData[4],
                                type:'pie'
                            },
                            {
                                name:this.chartData[5].title,
                                radius:'20%',
                                center:["83%","65%"],
                                data:this.formatData[5],
                                type:'pie'
                            },
                        ]
                    }
                    option && this.myChart.setOption(option);
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
.container{
    width:800px;
    height: 600px;
}
</style>