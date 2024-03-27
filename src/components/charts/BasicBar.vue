<template>
  <div ref="bar"></div>
</template>

<script>
export default {
    name:'BasicBar',
    data(){
        return {
            myChart:'',
        }
    },
    methods:{
        setChart(){
            this.myChart = this.$echarts.init(this.$refs.bar)
            let option = {
                title:{
                    text:"biyefenbu",
                    left:"center"
                },
                grid: {
                    left: '30%' // 设置左边偏移量为容器宽度的 20%
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
                xAxis:{
                    type:'value'
                },
                yAxis:{
                    type:'category',
                    data:[
                    '软件学院',
                    '机械与电子工程学院',
                    '经济与管理学院',
                    '化学生物与材料科学学院',
                    '文法学院',
                    '理学院',
                    '水资源与环境工程学院',
                    '艺术学院',
                    '抚州师范学院',
                    '测绘工程学院',
                    '地球物理与测控技术学院',
                    '地球科学学院',
                    '土木与建筑工程学院',
                    '核科学与工程学院',
                    '信息工程学院',
                    '外国语学院',
                    '体育学院',
                    '九江职业技术学院（职教班）',
                    '现代学院（职教班）'
                    ],
                    // axisLabel: {
                    //     interval: 0, // 强制显示所有标签
                    //     // rotate: 45 // 旋转角度，可以根据需要调整
                    // }
                },
                series:[
                    {
                        data:[
                        777, 492, 404, 359, 320,
                        319, 275, 274, 266, 254,
                        229, 226, 206, 199, 166,
                        131, 107,  40,  38
                        ],
                        type:'bar'
                    }
                ]
            }
            option && this.myChart.setOption(option);
        }
    },
    mounted(){
        this.$refs.bar.style.width = "700px"
        this.$refs.bar.style.height = "500px"
        this.setChart()
    }
}
</script>

<style>

</style>