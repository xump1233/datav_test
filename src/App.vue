<template>
  <div id="app">
    <HeadTop/>
    <OneTip/>
    <div class="routerBox">
      <router-link v-for="item,index in dataList" class="router" :key="item.id" active-class="onClickRouter" :ref="index==0?'firstRouter':''" replace :to="{
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
    
    this.$nextTick(()=>{
      console.log()
    })
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
  /* border: 1px solid blue; */
  /* padding:1px; */
  border-radius: 20px;
  background-color: rgb(198,224,247);
  /* background-image: url('./assets/bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%; */
  /* overflow: hidden; */
}
.routerBox{
  display: flex;
  justify-content: space-around;
  height: 7%;
  width: 100%;
  /* border: 2px solid red; */
}
.router{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
  height: 100%;
  text-align: center;
  /* border-radius: 5px; */
  text-decoration: none;
  color:rgb(134, 68, 6);
  font-weight: bold;
  box-shadow: 0px 0px 0px 0px #888888;
  transition: box-shadow 0.2s ease-in-out;
}
.onClickRouter{
  /* background-color: orange; */
  /* box-shadow: 0px 0px 5px 0px #888888; */
  color:orange;
  background: linear-gradient(to bottom, skyblue, rgb(198,224,247));
}

</style>
