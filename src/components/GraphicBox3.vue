<template>
  <div class="containerBox" ref="container">
    <!-- <h1 style="width:100%">{{title}}</h1> -->
    <!-- <template v-for="item in dataList">
      <component v-if="item.isParent === 0 && item.data" :is="item.type" :key="item.id" :chartData="item.data" :title="item.childrenName" :other="JSON.parse(item.other)"  class="addBorder"/>
    </template>
    <PieSet v-if="childList.length != 0 " :chartData="formatChild" title="毕业生去向分布" class="addBorder"/> -->
    <template v-for="n in maxRow">
      <div v-if="myPosition === 'column'" :key="n" :style="{height:getIndex(n,1).position[3]+'%',width:100+'%'}" class="box">
        <template v-for="m in getMaxColumn(n)">
          <component 
          v-if="getIndex(n,m) && getIndex(n,m).isParent !=1 && getIndex(n,m).type!='RatePie'" 
          :is="getIndex(n,m).type" :key="m+100" :chartData="getIndex(n,m).data" 
          :title="getIndex(n,m).childrenName" 
          :other="JSON.parse(getIndex(n,m).other)"  
          class="addBorder" 
          :style="{width:getIndex(n,m).position[2]+'%',height:100+'%'}"
          />
        </template>
      </div>
      <div v-if="myPosition === 'row'" :key="n" :style="{width:getIndex(n,1).position[3]+'%',height:100+'%',flexDirection:'column'}" class="box">
        <template v-for="m in getMaxColumn(n)">
          <component 
          v-if="getIndex(n,m) && getIndex(n,m).isParent !=1 && getIndex(n,m).type!='RatePie'" 
          :is="getIndex(n,m).type" 
          :key="m+100" 
          :chartData="getIndex(n,m).data" 
          :title="getIndex(n,m).childrenName" 
          :other="JSON.parse(getIndex(n,m).other)"  
          class="addBorder" 
          :style="{height:getIndex(n,m).position[2]+'%',width:100+'%'}"
          />
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
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
  name:'GraphicBox',
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
  data(){
    return{
      cmap:{
        "毕业生就业基本情况":'chapter1',
        "择业过程与需求分析":'chapter2',
        "毕业生就业质量调查分析":'chapter3'
      },
      dataList:[],
      childId:[],
      childList:[],
      isPush:false,
      myPosition:'',
      isChildListChange:true,
      maxRow:0,
      nowIndex:'',
    }
  },
  computed:{
    formatChild(){
      let result = []
      if(this.childList.length != 0 ){
        this.childList[0].forEach(item=>{
          result.push({
            title:item.childrenName,
            data:item.data
          })
        })
      }
      return result
    },
  },
  props:['title','position'],
  watch:{
    title(){
      // console.log('title改变了')
      this.childList = []
      this.isPush = false
      this.childId = []
      this.maxRow = 0
      this.getDataList().then(value=>{
        this.dataList = value
      }).then(()=>{
        this.AddData()
      }).then(()=>{
        this.dataList.forEach(item=>{
          if(JSON.parse(item.position)[0]>this.maxRow)
            this.maxRow = JSON.parse(item.position)[0]
        })
        this.renderData()
        return this.getChildList()
      }).then(value=>{
        if(value.length != 0){
          this.childListData()
        }
      })
    },
    
  },
  methods:{
    getDataList(){
      return new Promise((resolve,reject)=>{
        axios.get(`${this.$dataUrl}/datav/sql_server/${this.cmap[this.title]}`).then(
          res=>{
            resolve(res.data)
          },
          err=>{
            reject(err)
          }
        )
      })
    },
    AddData(){
      this.dataList.forEach((item,i)=>{
          if(item.isParent != 1){
            axios.get(`${this.$dataUrl}/datav/sql_server/${this.cmap[this.title]}/${item.id}`).then(
              res=>{
                const result = {}
                res.data.forEach(item=>{
                  result[item.varName] = item.value
                })
                
                this.$set(this.dataList[i],'data',result)
              },
              err=>{
                console.log(err)
              }
            )
          }
        })

    },
    getChildList(){
      return new Promise((resolve,reject)=>{
        this.dataList.forEach((item)=>{
          if(item.isParent === 1){
            this.childId.push(item.id)
            axios.get(`${this.$dataUrl}/datav/sql_server/${this.cmap[this.title]}/${item.id}`).then(
              res=>{
                if(!this.isPush){
                  this.childList.push(res.data)
                  this.isPush = true
                }
                resolve(this.childList)
              },
              err=>{
                console.log(err)
                reject(err)
              }
            )
          }
        })
      })
    },
    childListData(){
      this.childList.forEach((value,index)=>{
        // console.log(value)
        value.forEach((item,i)=>{
          axios.get(`${this.$dataUrl}/datav/sql_server/${this.cmap[this.title]}/${this.childId[index]}/${item.id}`).then(
            res=>{
                  const result = {}
                  res.data.forEach(item=>{
                    result[item.varName] = item.value
                  })
                  this.$set(this.childList[index][i],'data',result)
                },
                err=>{
                  console.log(err)
                }
          )
        })
      })
    },
    renderData(){
      this.dataList.forEach(item=>{
        if(!Array.isArray(item.position))
          item.position = JSON.parse(item.position)
      })
    },
    getMaxColumn(n){
      let max = 0
      this.dataList.forEach(item=>{
        if(item.position[0] === n && item.position[1] > max)
          max = item.position[1]
      })
      return max
    },
    getIndex(n,m){
      // console.log(this.dataList)
      let result;
      this.dataList.forEach(item=>{
        if(item.position[0] === n && item.position[1] === m){
          result = item
        }
      })
      // console.log(n,m,'result=',result)
      return result
    }
  },
  created(){
    this.myPosition = this.position.replaceAll('"','')
    this.getDataList().then(value=>{
      this.dataList = value
    }).then(()=>{
      this.AddData()
    }).then(()=>{
      // console.log(this.dataList)
      this.dataList.forEach(item=>{
        if(JSON.parse(item.position)[0]>this.maxRow){
          this.maxRow = JSON.parse(item.position)[0]
        } 
      })
      this.renderData()
      return this.getChildList()
    }).then(value=>{
      if(value.length != 0){
        this.childListData()
      }
    }).then(()=>{
      this.renderData()
      // console.log(this.getIndex(1,1))
    })
  },
  mounted(){
    console.log(this.title,'挂载完毕')
    this.$refs.container.style.flexDirection = this.myPosition

  },
  beforeDestroy(){
    console.log(this.title,'即将被销毁')
  }
}
</script>

<style scoped>
.containerBox{
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: row; */
  justify-content: space-around;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.addBorder{
  /* border:1px solid skyblue; */
  /* margin:10 0px; */
  border:1px solid skyblue;
  background-color: rgb(255, 255, 255,0.7);
  border-radius:10px ;

}
.box{
  display: flex;
  justify-content: space-around;
}
</style>