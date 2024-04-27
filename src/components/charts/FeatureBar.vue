<template>
  <div ref="bar"></div>
</template>

<script>
export default {
    name:'FeatureBar',
    data(){
        return {
            myChart:'',
            Index:0,
            timer:''
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
                        subtext: '缩放点击拖动查看详细',
                        // textStyle:this.isTop?{fontSize:20,color:'#000'}:{color:'#fff'}
                    },
                    tooltip:{
                        trigger:'item',
                        formatter:(params) =>{
                            return ''+this.setMap[params.name] + ' : '+params.value+'人'+'<br>'+'毕业生落实率：'+((80+Math.random()*20).toFixed(2))+'%';
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
                
                
                option && this.myChart.setOption(option);
            }
            if(this.formatData[0] != 0){
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
                this.timer =  setInterval(() => {
                    // 获取当前数据索引范围
                    
                    const startIndex = Math.max(this.Index - zoomSize / 2, 0);
                    const endIndex = Math.min(this.Index + zoomSize / 2, data.length - 1);

                    // 设置 dataZoom 的起始值和结束值
                    this.myChart.dispatchAction({
                        type: 'dataZoom',
                        startValue: dataAxis[startIndex][0],
                        endValue: dataAxis[endIndex][0]
                    });

                    // 更新 dataIndex
                    this.Index = (this.Index + 1) % data.length;
                }, 2000); // 每 2 秒更新一次
                this.myChart.on('dblclick',(e)=>{
                    e.event.cancelBubble = true
                    this.$bus.$emit('getChart',{name:this.$options.name,title:this.title,chartData:this.chartData,other:this.other || ''})
                })
                if(this.isTop){
                    clearInterval(this.timer);
                }
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