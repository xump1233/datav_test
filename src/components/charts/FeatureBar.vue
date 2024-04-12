<template>
  <div ref="bar" class="container"></div>
</template>

<script>
export default {
    name:'BasicBar',
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
            const result = [[],[]]
            for(let key in this.chartData){
                result[0].push(key)
                result[1].push(this.chartData[key])
            }
            return result
        },
        getValues(){
            let result = []
            for(let key in this.chartData){
                result.push(this.chartData[key])
            }
            return result
        },
        setMap(){
            let nameMap = {}
            for(let key in this.chartData){
                nameMap[key[0]] = key
            }
            return nameMap
        }
    },
    methods:{
        setChart(){
            this.myChart = this.$echarts.init(this.$refs.bar)
            let dataAxis = this.formatData[0];
            // prettier-ignore
            let data = this.getValues;
            let yMax = 5000;
            let dataShadow = [];
            for (let i = 0; i < data.length; i++) {
                dataShadow.push(yMax);
            }
            if(!this.title){
                this.myChart.showLoading();
            }
            else{
                this.myChart.hideLoading();
                let option = {
                    title: {
                        text: this.title,
                        left:'center',
                        subtext: '缩放点击拖动查看详细'
                    },
                    tooltip:{
                        trigger:'item',
                        formatter:(params) =>{
                            return ''+this.setMap[params.name] + ' : '+params.value+'人';
                        }
                    },
                    grid:{
                        bottom: '50'
                    },
                    xAxis: {
                        data: dataAxis.map(item=>item[0]),
                        axisLabel: {
                        inside: true,
                            color: 'orange'
                        },
                        axisTick: {
                        show: false
                        },
                        axisLine: {
                        show: false
                        },
                        z: 10
                    },
                    yAxis: {
                        axisLine: {
                        show: false
                        },
                        axisTick: {
                        show: false
                        },
                        axisLabel: {
                        color: '#999'
                        }
                    },
                    dataZoom: [
                        {
                        type: 'inside'
                        }
                    ],
                    series: [
                        {
                        type: 'bar',
                        showBackground: true,
                        itemStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#83bff6' },
                            { offset: 0.5, color: '#188df0' },
                            { offset: 1, color: '#188df0' }
                            ])
                        },
                        emphasis: {
                            itemStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#2378f7' },
                                { offset: 0.7, color: '#2378f7' },
                                { offset: 1, color: '#83bff6' }
                            ])
                            }
                        },
                        data: data
                        }
                    ]
                }
                const zoomSize = 6;
                this.myChart.on('click', (params) => {
                    const dataIndex = params.dataIndex;
                    const startIndex = Math.max(dataIndex - zoomSize / 2, 0);
                    const endIndex = Math.min(dataIndex + zoomSize / 2, data.length - 1);
                    this.myChart.dispatchAction({
                        type: 'dataZoom',
                        startValue: dataAxis[startIndex][0],
                        endValue: dataAxis[endIndex][0]
                    });
                });
                option && this.myChart.setOption(option);
            }
        },
    },

}
</script>

<style scoped>
.container{
    width:400px;
    height: 400px;
}
</style>