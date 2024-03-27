<template>
  <div ref="pie1">

  </div>
</template>

<script>
export default {
    name:"PieFull",
    data(){
        return {
            myChart:'',
            
        }
    },
    props:['title'],
    methods:{
        setChart(){
            this.myChart = this.$echarts.init(this.$refs.pie1)
            let option = {
                title:{
                    text:this.title,
                    left:"center"
                },
                tooltip:{
                    trigger:'item'
                },
                legend:{
                    orient:'vertical',
                    left:'left'
                },
                series:[
                    {
                        name:'xump',
                        type:'pie',
                        redius:'50%',
                        data:[
                            { value: 817, name: '赣州市' },
                            { value: 479, name: '上饶市' },
                            { value: 473, name: '宜春市' },
                            { value: 329, name: '吉安市' },
                            { value: 312, name: '南昌市' },
                            { value: 310, name: '九江市' },
                            { value: 263, name: '抚州市' },
                            { value: 145, name: '萍乡市' },
                            { value: 98, name: '景德镇市' },
                            { value: 77, name: '新余市' },
                            { value: 52, name: '鹰潭市' },
                            { value: 30, name: '其他' }
                        ],
                        emphasis:{
                            itemStyle:{
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
            option && this.myChart.setOption(option);
        }
    },
    mounted(){
        this.$refs.pie1.style.width = "1000px"
        this.$refs.pie1.style.height = "1000px"

        this.setChart()
    }
}
</script>

<style>

</style>