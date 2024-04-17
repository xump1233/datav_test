<template>
  <div ref="map">

  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'JiangXi',
    data(){
        return {
            myChart:'',
            nameMap:{
                "景德镇市":"景德镇市",
                "九江市":"九江市",
                "上饶市":"上饶市",
                "鹰潭市":"鹰潭市",
                "南昌市":"南昌市",
                "新余市":"新余市",
                "宜春市":"宜春市",
                "萍乡市":"萍乡市",
                "吉安市":"吉安市",
                "抚州市":"抚州市",
                "赣州市":"赣州市"
            }
        }
    },
    props:['title','chartData','isTop'],
    watch:{
        chartData(){
            this.setChart().then(value=>{
                this.myChart = this.$echarts.init(this.$refs.map)
                this.myChart.showLoading()
                this.myChart.hideLoading()
                this.$echarts.registerMap('JX',value)
                let option
                this.myChart.setOption(
                    (option = {
                        title:{
                            text:this.title
                        },
                        tooltip:{
                            trigger:'item',
                            formatter:'{b}<br/>{c}'
                        },
                        toolbox:{
                            show:false,
                            orient:'vertical',
                            left:'center',
                            feature:{
                                dataView:{readOnly:false},
                                restore:{},
                                savaAsImage:{}
                            }
                        },
                        visualMap:{
                            min: 0,
                            max: 1000,
                            text: ['人数较多', '人数较少'],
                            realtime: false,
                            itemWidth: 10,
                            itemHeight: 70,
                            calculable: true,
                            inRange: {
                            color: ['lightskyblue', 'yellow', 'orangered']
                            }
                        },
                        series:[
                            {
                                name:'jx',
                                type:'map',
                                map:'JX',
                                zoom:1.2,
                                label:{
                                    show:true
                                },
                                data:this.formatData,
                                nameMap:this.nameMap
                            }
                        ]
                    })
                )
                option && this.myChart.setOption(option)
            })
        }
    },
    computed:{
        formatData(){
            const result = []
            if(this.chartData){
                for(let key in this.nameMap){
                    const obj = {name:'',value:0}
                    obj.name = key
                    if( Object.prototype.hasOwnProperty.call(this.chartData, key)){
                    obj.value = this.chartData[key]
                    result.push(obj)
                    }
                }
            }
            return result
        }
  },
    methods:{
        setChart(){
            return new Promise((resolve,reject)=>{
                axios.get('http://xump.cn/datav/jiangxi').then(
                    res=>{
                        resolve(res.data)
                    },
                    err=>{
                        reject(err)
                    }
                )
            })
        }
    },
    created(){
        
    },
    mounted(){
        if(!this.title){
            this.myChart = this.$echarts.init(this.$refs.map)
            this.myChart.showLoading()
        }
        else{
            this.setChart().then(value=>{
                this.myChart = this.$echarts.init(this.$refs.map)
                this.myChart.showLoading()
                this.myChart.hideLoading()
                this.$echarts.registerMap('JX',value)
                let option
                this.myChart.setOption(
                    (option = {
                        title:{
                            text:this.title
                        },
                        tooltip:{
                            trigger:'item',
                            formatter:'{b}<br/>{c}'
                        },
                        toolbox:{
                            show:false,
                            orient:'vertical',
                            left:'center',
                            feature:{
                                dataView:{readOnly:false},
                                restore:{},
                                savaAsImage:{}
                            }
                        },
                        visualMap:{
                            min: 0,
                            max: 1000,
                            text: ['人数较多', '人数较少'],
                            realtime: false,
                            itemWidth: 10,
                            itemHeight: 70,
                            calculable: true,
                            inRange: {
                            color: ['lightskyblue', 'yellow', 'orangered']
                            }
                        },
                        series:[
                            {
                                name:'jx',
                                type:'map',
                                map:'JX',
                                zoom:1.2,
                                label:{
                                    show:true
                                },
                                data:this.formatData,
                                nameMap:this.nameMap
                            }
                        ]
                    })
                )
                option && this.myChart.setOption(option);
                this.myChart.on('click',(e)=>{
                    e.event.cancelBubble = true
                    this.$bus.$emit('getChart',{name:this.$options.name,title:this.title,chartData:this.chartData,other:this.other || ''})
                })
        })
        }
    }
}
</script>

<style>

</style>