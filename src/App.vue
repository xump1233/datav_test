<template>
  <div id="app">
    <div class="routerBox">
      <router-link v-for="item in dataList" class="router" :key="item.id" :to="{
        name:cmap[item.childrenName],
        query:{
          title:item.childrenName
        }
      }">{{item.childrenName}}</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

// import GraphicBox from './components/GraphicBox.vue'
import axios from 'axios'

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
  },
  
  methods:{
    getDataList(){
      return new Promise((resolve,reject)=>{
        axios.get('http://xump.cn/datav/sql_server/all').then(
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
.routerBox{
  display: flex;
  justify-content: center;
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
  margin: 30px;
  color:rgb(134, 68, 6);
  font-weight: bold;
}

</style>
