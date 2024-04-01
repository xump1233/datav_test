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
    props:['title','chartData'],
    computed:{
        formatData(){
            const result = []
            for(let key in this.nameMap){
                const obj = {name:'',value:0}
                obj.name = key
                if( Object.prototype.hasOwnProperty.call(this.chartData, key)){
                obj.value = this.chartData[key]
                result.push(obj)
                }
            }
            return result
        }
  },
    methods:{
        setChart(){
            return new Promise((resolve,reject)=>{
                axios.get('https://geo.datav.aliyun.com/areas_v3/bound/360000_full.json').then(
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
                        show:true,
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
                        text: ['High', 'Low'],
                        realtime: false,
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
        
    },
    mounted(){
        this.$refs.map.style.width = "100%"
        this.$refs.map.style.height = "500px"
    }
}
</script>

<style>

</style>