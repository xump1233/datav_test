<template>
  <div id="app">
    <HeadTop/>
    <OneTip/>
    <div class="routerBox">
      <router-link v-for="item in dataList" class="router" :key="item.id" active-class="onClickRouter" :to="{
        name:cmap[item.childrenName],
        query:{
          title:item.childrenName,
          position:item.position
        }
      }">{{item.childrenName}}</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import HeadTop from './components/HeadTop.vue'
import OneTip from './components/OneTip.vue'

export default {
  name: 'App',
  data(){
    return {
      dataList:'',
      cmap:{
        "毕业生就业基本情况":'chapter1',
        "择业过程与需求分析":'chapter2',
        "毕业生就业质量调查分析":'chapter3'
      },
    }
  },
  components: {
    // GraphicBox
    HeadTop,
    OneTip
  },
  
  methods:{
    getDataList(){
      return new Promise((resolve,reject)=>{
        axios.get(this.$dataUrl+'/datav/sql_server/all').then(
          res=>{
            resolve(res.data)
          },
          err=>{
            reject(err)
          }
        )
      })
    },
  },
  created(){
    this.getDataList().then(value=>{
      this.dataList = value
    })
  },
  mounted(){
    this.getDataList().then(value=>{
      this.dataList = value
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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  /* overflow: hidden; */
}
.routerBox{
  display: flex;
  justify-content: center;
  width: 100%;
}
.router{
  display: block;
  background-color: skyblue;
  width: 200px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 5px;
  text-decoration: none;
  margin:10px 30px;
  color:rgb(134, 68, 6);
  font-weight: bold;
}
.onClickRouter{
  background-color: orange;
  color:black
}

</style>
