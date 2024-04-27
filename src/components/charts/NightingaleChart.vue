<template>
  <div ref="pie" class="container"></div>
</template>

<script>
export default {
    name:'NightingaleChart',
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
            const result = []
            for(let key in this.chartData){
                result.push({name:key,value:this.chartData[key]})
            }
            return result
        }
    },
    methods:{
        setChart(){
            this.myChart = this.$echarts.init(this.$refs.pie)
            if(!this.title){
                this.myChart.showLoading();
            }
            else{
                this.myChart.hideLoading();
                let option = {
                    title: {
                        text: this.title,
                        left: 'center',
                        // textStyle:this.isTop?{}:{color:'white'}
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        show:true,
                        left: 'left',
                        // textStyle:this.isTop?{}:{color:'white'},
                        top: '20',
                        orient: 'vertical',
                        data: this.formatData.map(item=>item.name)
                    },
                    toolbox: {
                        show: false,
                        feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                        }
                    },
                    series: [
                        {
                        name: this.title,
                        type: 'pie',
                        radius: this.isTop?[50, 200]:[30,150],
                        center: this.isTop?['45%','55%']:['48%', '68%'],
                        label:{
                            position:'outside',
                            show:this.isTop
                        },
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 5
                        },
                        data: this.formatData
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