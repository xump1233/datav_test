<template>
  <div class="cmapBox">
    <div ref="map" class="chinaMap"></div>
    <div class="mapNO">中国地图审图号：GS(2016)2923号</div>
  </div>
  
</template>

<script>
import axios from "axios";

export default {
  name: "ChinaMap",
  data() {
    return {
      myChart: "",
      nameMap:{
              北京市: "北京市",
              天津市: "天津市",
              河北省: "河北省",
              山西省: "山西省",
              内蒙古自治区: "内蒙古自治区",
              辽宁省: "辽宁省",
              吉林省: "吉林省",
              黑龙江省: "黑龙江省",
              上海市: "上海市",
              江苏省: "江苏省",
              浙江省: "浙江省",
              安徽省: "安徽省",
              福建省: "福建省",
              江西省: "江西省",
              山东省: "山东省",
              河南省: "河南省",
              湖北省: "湖北省",
              湖南省: "湖南省",
              广东省: "广东省",
              广西壮族自治区: "广西壮族自治区",
              海南省: "海南省",
              重庆市: "重庆市",
              四川省: "四川省",
              贵州省: "贵州省",
              云南省: "云南省",
              西藏自治区: "西藏自治区",
              陕西省: "陕西省",
              甘肃省: "甘肃省",
              青海省: "青海省",
              宁夏回族自治区: "宁夏回族自治区",
              新疆维吾尔自治区: "新疆维吾尔自治区",
              台湾省: "台湾省",
              香港特别行政区: "香港特别行政区",
              澳门特别行政区: "澳门特别行政区",
      },
      oData:{
        "江西省": 1471,
        "广东省": 681,
        "浙江省": 355,
        "上海市": 241,
        "江苏省": 212,
        "北京市": 199,
        "湖北省": 155,
        "福建省": 121,
        "湖南省": 117,
        "安徽省": 93,
        "陕西省": 63,
        "四川省": 63,
        "山东省": 50,
        "甘肃省": 48,
        "河北省": 47,
        "新疆维吾尔自治区": 44,
        "重庆市": 36,
        "云南省": 36,
        "天津市": 33,
        "国外": 33,
        "山西省": 32,
        "广西壮族自治区": 31,
        "河南省": 28,
        "辽宁省": 24,
        "海南省": 21,
        "内蒙古自治区": 21,
        "贵州省": 19,
        "吉林省": 18,
        "宁夏回族自治区": 16,
        "黑龙江省": 14,
        "西藏自治区": 5,
        "青海省": 5
      },
      isTimer:false,
      timer:''
    };
  },
  props:['title','chartData','isTop'],
      watch:{
        chartData(){
          this.setChart().then((value) => {
          var option;
          this.myChart.hideLoading();
          this.$echarts.registerMap("China", value);
          this.myChart.setOption(
            (option = {
              title: {
                text: this.title,
                left: "center",
              },
              tooltip: {
                trigger: "item",
                formatter: "{b}<br/>{c}人",
              },
              toolbox: {
                show: false,
                orient: "vertical",
                left: "right",
                top: "center",
                feature: {
                  dataView: { readOnly: false },
                  restore: {},
                  savaAsImage: {},
                },
              },
              visualMap: {
                // type: "piecewise",
                // min: 0,
                // max: 4000,
                // splitNumber: 8,
                // pieces: [
                //   { min: 0, max: 0, color: "white" }, 
                //   { min: 1, max: 10, color: "skyblue" }, 
                //   { min: 10, max: 30, color: "#ffa500" },
                //   { min: 30, max: 50, color: "#80f460" },
                //   { min: 50, max: 100, color: "#c3d461" }, 
                //   { min: 100, max: 150, color: "#00FF00" },
                //   { min: 150, max: 200, color: "#0000FF" }, 
                //   { min: 1000, max: 4000, color: "red" },
                // ],
                left:'30',
                top:'0'

              },
              series: [
                {
                  name: "china",
                  type: "map",
                  map: "China",
                  center:[91.195397, 35.86166],
                  zoom:1.7,
                  // roam: true,
                  label: {
                    show: true,
                    fontSize:this.isTop?18:6,
                    color:'#666'
                  },
                  data: this.formatData,
                  nameMap: this.nameMap,
                },
              ],
            }),
            
          );
          option && this.myChart.setOption(option);
          if(!this.isTop && !this.timer) this.addTimer()
      });
        }
    },
  computed:{
    formatData(){
      const result = []
      if(this.chartData){
        for(let key in this.nameMap){
          const obj = {name:'',value:0}
          obj.name = key
          if(Object.prototype.hasOwnProperty.call(this.chartData, key)){
            obj.value = this.chartData[key]
          }
          result.push(obj)
        }
      }
      
      return result
    },
    formatOData(){
      const result = []
      if(this.oData){
        for(let key in this.nameMap){
          const obj = {name:'',value:0}
          obj.name = key
          if(Object.prototype.hasOwnProperty.call(this.oData, key)){
            obj.value = this.oData[key]
          }
          result.push(obj)
        }
      }
      
      return result
    }
  },
  methods: {
    setChart() {
      return new Promise((resolve, reject) => {
        axios
          .get("http://xump.cn/datav/china")
          .then(
            (res) => {
              resolve(res.data);
            },
            (err) => {
              reject(err);
            }
          );
      });
    },
    addTimer(){
      this.timer = setInterval(()=>{
        this.myChart.setOption({
          title:{
            text:this.isTimer?'毕业生就业省份分布':this.title
          },
          series: [{
            data: this.isTimer?this.formatOData:this.formatData // 转换数据格式
          }]
        });
        this.isTimer = !this.isTimer
      },3000)
    }
  },
  created() {
    // this.isTimer = this.isOther?true:false
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.map);
    if(!this.title){
      this.myChart.showLoading();
    }
    else{
      this.setChart().then((value) => {
        var option;
        const vmap = {
          // type: "piecewise",
          // min: 0,
          // max: 4000,
          // splitNumber: 8,
          // pieces: [
          //   { min: 0, max: 0, color: "white" }, 
          //   { min: 1, max: 10, color: "skyblue" }, 
          //   { min: 10, max: 30, color: "#ffa500" },
          //   { min: 30, max: 50, color: "#80f460" },
          //   { min: 50, max: 100, color: "#c3d461" }, 
          //   { min: 100, max: 150, color: "#00FF00" },
          //   { min: 150, max: 200, color: "#0000FF" }, 
          //   { min: 1000, max: 4000, color: "red" },
          // ],
          left:'30',
          top:'20',
          // textStyle:this.isTop?{}:{color:'white'}
        }
        this.myChart.hideLoading();
        this.$echarts.registerMap("China", value);
        this.myChart.setOption(
          (option = {
            title: {
              text: this.title,
              left: "center",
              top:this.isTop?20:0,
              // textStyle:this.isTop?{fontSize:30,color:'#000'}:{color:'#fff'},
            },
            tooltip: {
              trigger: "item",
              formatter: "{b}<br/>{c}人",
            },
            toolbox: {
              show: false,
              orient: "vertical",
              left: "right",
              top: "center",
              feature: {
                dataView: { readOnly: false },
                restore: {},
                savaAsImage: {},
              },
            },
            visualMap: this.isTop?{left:'30',top:'20',text:['多','少']}:vmap,
            series: [
              {
                name: "china",
                type: "map",
                map: "China",
                center:this.isTop?[102.195397, 35.86166]:[91.195397, 35.86166],
                zoom:1.7,
                roam: this.isTop,
                label: {
                  show: true,
                  fontSize:this.isTop?12:6,
                  color:'#666'
                },
                data: this.formatData,
                nameMap: this.nameMap,
              },
            ],
          }),
          
        );
        option && this.myChart.setOption(option);
        if(!this.isTop) this.addTimer()
      });
    }
    if(this.isTop){
        this.myChart.on('click',(e)=>{
          e.event.cancelBubble = true
          console.log('我被点击了')
        })
    }
    else{
      this.myChart.on('click',(e)=>{
        e.event.cancelBubble = true
        this.$bus.$emit('getChart',{name:this.$options.name,title:this.title,chartData:this.chartData,isOther:this.isTimer})
      })
    }
  },
};
</script>

<style>
.cmapBox{
  position: relative;
}
.chinaMap{
  width:100%;
  height:100%
}
.mapNO{
  position: absolute;
  right:0;
  bottom: 0;
  font-size: 12px;
}
</style>