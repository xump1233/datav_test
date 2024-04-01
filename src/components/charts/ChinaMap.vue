<template>
  <div ref="map"></div>
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
              }
    };
  },
  props:['title','chartData'],
  computed:{
    formatData(){
      const result = []
      for(let key in this.nameMap){
        const obj = {name:'',value:0}
        obj.name = key
        if(Object.prototype.hasOwnProperty.call(this.chartData, key)){
          obj.value = this.chartData[key]
        }
        result.push(obj)
      }
      return result
    }
  },
  methods: {
    setChart() {
      return new Promise((resolve, reject) => {
        axios
          .get("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json")
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
  },
  created() {
    this.setChart().then((value) => {
      this.myChart = this.$echarts.init(this.$refs.map);
      this.myChart.showLoading();
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
            formatter: "{b}<br/>{c}",
          },
          toolbox: {
            show: true,
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
            type: "piecewise",
            min: 0,
            max: 4000,
            splitNumber: 8,
            pieces: [
              { min: 0, max: 0, color: "white" }, 
              { min: 1, max: 10, color: "skyblue" }, 
              { min: 10, max: 30, color: "#ffa500" },
              { min: 30, max: 50, color: "#80f460" },
              { min: 50, max: 100, color: "#c3d461" }, 
              { min: 100, max: 150, color: "#00FF00" },
              { min: 150, max: 200, color: "#0000FF" }, 
              { min: 1000, max: 4000, color: "red" },
            ],
            left: 200, // 距离容器右侧的距离
            top: 100, // 距

          },
          series: [
            {
              name: "china",
              type: "map",
              map: "China",
              roam: true,
              label: {
                show: true,
                fontSize:10
              },
              data: this.formatData,
              nameMap: this.nameMap,
            },
          ],
        }),
        
      );
      option && this.myChart.setOption(option);
      
    });
  },
  mounted() {
    this.$refs.map.style.width = "100%";
    this.$refs.map.style.height = "700px";
  },
};
</script>

<style>
</style>