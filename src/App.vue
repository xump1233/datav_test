<template>
  <div id="app">
    <!-- <PieFull/>
    <BasicBar/>
    <ChinaMap/>
    <JiangXi/>
    <GraphicBox :title="dataList.title"/> -->
    <template v-for="item,index in dataList.data">
      <component :key="index" :is="gmap[item.type]" :title="item.title" v-if="!Array.isArray(item.data)"/>
      <!-- <template v-else v-for="item2,index2 in item">
        <component :key="index2" :is="gmap[item2.type]" :title="item.title" v-if="!Array.isArray(item.data)"></component>
      </template> -->
    </template>
  </div>
</template>

<script>
import PieFull from './components/charts/PieFull.vue'
import BasicBar from './components/charts/BasicBar.vue'
import ChinaMap from './components/charts/ChinaMap.vue'
import JiangXi from './components/charts/JiangXi.vue'
import GraphicBox from './components/GraphicBox.vue'
import axios from 'axios'

export default {
  name: 'App',
  data(){
    return {
      dataList:'',
      name:'GraphicBox',
      gmap:{
        'pie':'PieFull',
        'china':'ChinaMap',
        'jiangxi':'JiangXi',
        'bar':'BasicBar',
      }
    }
  },
  components: {
    PieFull,
    BasicBar,
    ChinaMap,
    JiangXi,
    GraphicBox
  },
  methods:{
    getData(){
      return new Promise((resolve,reject)=>{
        axios.get('http://xump.cn/datav/chapter1').then(
          res=>{
            resolve(res.data)
          },
          err=>{
            reject(err)
          }
        )
      })
    },
    showAll(value){
      if(Array.isArray(value.data)){
        console.log(value.title)
        for(let item of value.data){
          this.showAll(item)
        }
        
      }
      if(!Array.isArray(value.data)){
        return value
      }
    }
  },
  mounted(){
    this.getData().then(value=>{
      this.dataList = value
      this.showAll(this.dataList)
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
