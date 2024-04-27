<template>
  <div class="oneTip" v-show="isShow" @click="dian">
    <component :is="myChart" :title="title" :chartData="chartData" :other="other" :isTop="true" class="topChart" :isOther="isOther"></component>
  </div>
</template>

<script>
import BasicBar from './charts/BasicBar.vue'
import BasicRadar from './charts/BasicRadar.vue'
import ChinaMap from './charts/ChinaMap.vue'
import FeatureBar from './charts/FeatureBar.vue'
import FunnelChart from './charts/FunnelChart.vue'
import HalfPie from './charts/HalfPie.vue'
import JiangXi from './charts/JiangXi.vue'
import NightingaleChart from './charts/NightingaleChart.vue'
import PieFull from './charts/PieFull.vue'
import PiePadAngle from './charts/PiePadAngle.vue'
import PieRoundedCorner from './charts/PieRoundedCorner.vue'
import PieSet from './charts/PieSet.vue'
import RadialPolarBar from './charts/RadialPolarBar.vue'
import RatePie from './charts/RatePie.vue'
import SimpleEncode from './charts/SimpleEncode.vue'
import WordCloud from './charts/WordCloud.vue'
export default {
    name:'OneTip',
    data(){
        return {
            isShow:false,
            myChart:'',
            title:'',
            chartData:[],
            other:[],
            isOther:''
        }
    },
    components:{
      BasicBar,
      BasicRadar,
      ChinaMap,
      FeatureBar,
      FunnelChart,
      HalfPie,
      JiangXi,
      NightingaleChart,
      PieFull,
      PiePadAngle,
      PieRoundedCorner,
      PieSet,
      RadialPolarBar,
      RatePie,
      SimpleEncode,
      WordCloud
    },
    methods:{
        dian(){
          this.isShow = false
        }
    },
    mounted(){
        this.$bus.$on('getChart',(chartDataList)=>{
          console.log(chartDataList)
          this.myChart = chartDataList.name
          this.title = chartDataList.title
          this.chartData = chartDataList.chartData
          this.other = chartDataList.other || ''
          this.isShow = true
          this.isOther = chartDataList.isOther || false
        })
    }
}
</script>

<style>
 .oneTip{
    position: absolute;
    width:100%;
    height:100%;
    /* background-color: rgb(102, 102, 102,0.5); */
    background-color: rgb(255, 255, 255,0.5);
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
 }
  .oneTip>div{
    width:80%;
    height:80%;
    /* background-color: rgb(255, 255, 255,0.5); */
    background-color: skyblue;
    border-radius: 20px;
    /* background-color: #fff; */
  }
  .topChart{
    width: 100%;
    height: 100%;
    margin: 20% 10%;
  }
</style>