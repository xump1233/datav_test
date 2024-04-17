<template>
  <div ref="pie1" class="container">

  </div>
</template>

<script>
export default {
    name:"RatePie",
    data(){
        return {
            myChart:'',
            genderIcon:{
                male:'http://xump.cn/datav/assets/male',
                female:'http://xump.cn/datav/assets/female'
            }
            
        }
    },
    props:['title','chartData','isTop'],
    watch:{
        chartData(){
            this.setChart()
        }
    },
    computed:{
        getTotal(){
            let result = 0
            if(this.title){
                for(let value of Object.values(this.chartData)){
                    result += Number(value)
                }
            }
            
            return result
        }
    },
    methods:{
        setChart(){
            this.myChart = this.$echarts.init(this.$refs.pie1)
            if(!this.title || !this.chartData){
                this.myChart.showLoading();
            }
            else{
                this.myChart.hideLoading();
                let all = this.getTotal
                const rate1 = (Number(this.chartData.male)/Number(this.chartData.female)).toFixed(2)
                const value1 = ((Number(this.chartData.male)/this.getTotal)*100).toFixed(0)
                const value2 = ((Number(this.chartData.female)/this.getTotal)*100).toFixed(0)
                const colorList={
                    '男':'#00d488',
                    '女':'#3feed4'
                }
                this.myChart.hideLoading();
                let option = {
                    title:{
                        text:rate1+' : '+'1', 
                        subtext:'性别比例',
                        x:'center',
                        y:'center',
                        textStyle:{
                            fontSize:10,
                            fontWerght:'normal',
                            color:'#333'
                        },
                        subtextStyle: {
                            color: '#666',
                            fontSize: 8
                        }
                    },
                    tooltip:{
                        trigger:'item',
                        formatter: function (params) {
                            return ''+params.name + ' : '+ Math.floor(Number(params.value)*all/100)+'人';
                        }
                    }
                    ,
                    legend: {
                        show: false,
                        orient: 'vertical',
                        top: "middle",
                        right: "5%",
                        textStyle: {
                            color: '#f2f2f2',
                            fontSize: 25,
                        },
                        icon: 'roundRect'
                    },
                    series:[
                        {
                            radius: ['25%', '51%'],
                            center: ['50%', '50%'],
                            type: 'pie',
                            itemStyle: {
                                color: function(params) {
                                    return colorList[params.name]
                                }   
                            },
                            labelLine: {
                                show: true,
                                length: 15,
                                length2: 120,
                                lineStyle: {
                                    color: '#d3d3d3'
                                },
                                align: 'right',
                                color: "#000",
                                emphasis: {
                                    labelLine: {
                                        show: true
                                    }
                                }
                            },
                            label: {
                                formatter: function(params) {
                                    var str = '';
                                    switch (params.name) {
                                        case '男':
                                            str = '{a|}\n{nameStyle|男生 }' + '{rate|' + params.value + '%}';
                                            break;
                                        case '女':
                                            str = '{b|}\n{nameStyle|女生 }' + '{rate|' + params.value + '%}';
                                            break;
                                    }
                                    return str
                                },
                                padding: [0, -145],
                                height: 100,
                                rich: {
                                    a: {
                                        width: 20,
                                        height: 20,
                                        lineHeight: 30,
                                        backgroundColor: {
                                            image: this.genderIcon.male
                                        },
                                        align: 'left'
                                    },
                                    b: {
                                        width: 20,
                                        height: 20,
                                        lineHeight: 30,
                                        backgroundColor: {
                                            image: this.genderIcon.female
                                        },
                                        align: 'left'
                                    },
                                    nameStyle: {
                                        fontSize: 10,
                                        color: "#555",
                                        align: 'left'
                                    },
                                    rate: {
                                        fontSize: 16,
                                        color: "#1ab4b8",
                                        align: 'left'
                                    }
                                },
                            },
                            data:[{
                                value:value2,
                                name:'女'
                            },
                            {
                                value:value1,
                                name:'男'
                            }],
                        },
                        {
                            radius: ['47%', '51%'],
                            center: ['50%', '50%'],
                            type: 'pie',
                            label: {
                                show: false,
                                emphasis: {
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            emphasis: {
                                labelLine: {
                                    show: true
                                }
                            },
                            animation: false,
                            tooltip: {
                                show: false
                            },
                            itemStyle: {
                                color: 'rgba(250,250,250,0.5)'
                            },
                            data: [{
                                value: 1,
                            }],
                        }
                        
                    ]
                }
                option && this.myChart.setOption(option);
                this.myChart.on('click',(e)=>{
                    e.event.cancelBubble = true
                    this.$bus.$emit('getChart',{name:this.$options.name,title:this.title,chartData:this.chartData,other:this.other || ''})
                })
            }
            
        }
    },
    mounted(){
        this.setChart()
    }
}
</script>

<style scoped>
.container{
    width: 200px!important;
    height: 200px!important;
    position: absolute;
    left: 380px;
    top:250px;
    z-index: 2;
}
</style>