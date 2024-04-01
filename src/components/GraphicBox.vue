<template>
  <div>
    <h1>{{title}}</h1>
    <template v-for="item in dataList">
      <component v-if="item.isParent === 0 && item.data" :is="gmap[item.type]" :key="item.id" :chartData="item.data" :title="item.childrenName"/>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import PieFull from './charts/PieFull.vue'
import BasicBar from './charts/BasicBar.vue'
import ChinaMap from './charts/ChinaMap.vue'
import JiangXi from './charts/JiangXi.vue'

export default {
  name:'GraphicBox',
  components:{
    PieFull,
    BasicBar,
    ChinaMap,
    JiangXi,
  },
  data(){
    return{
      cmap:{
        "毕业生就业基本情况":'chapter1',
        "择业过程与需求分析":'chapter2',
        "毕业生就业质量调查分析":'chapter3'
      },
      gmap:{
        'pie':'PieFull',
        'china':'ChinaMap',
        'jiangxi':'JiangXi',
        'bar':'BasicBar',
      },
      dataList:[],
      childId:[],
      childList:[],
      isPush:false,
      isChildListChange:true
    }
  },
  props:['title'],
  watch:{
    title(){
      // console.log('title改变了')
      this.childList = []
      this.isPush = false
      this.childId = []
      this.getDataList().then(value=>{
        this.dataList = value
      }).then(()=>{
        this.AddData()
      }).then(()=>{
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
        axios.get(`http://xump.cn/datav/sql_server/${this.cmap[this.title]}`).then(
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
            axios.get(`http://xump.cn/datav/sql_server/${this.cmap[this.title]}/${item.id}`).then(
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
            axios.get(`http://xump.cn/datav/sql_server/${this.cmap[this.title]}/${item.id}`).then(
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
          axios.get(`http://xump.cn/datav/sql_server/${this.cmap[this.title]}/${this.childId[index]}/${item.id}`).then(
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
    }
  },
  created(){
    this.getDataList().then(value=>{
      this.dataList = value
    }).then(()=>{
      this.AddData()
    }).then(()=>{
      return this.getChildList()
    }).then(value=>{
      if(value.length != 0){
        this.childListData()
      }
    })
  },
  mounted(){
    this.getDataList().then(value=>{
      this.dataList = value
    }).then(()=>{
      this.AddData()
    }).then(()=>{
      return this.getChildList()
    }).then(value=>{
      if(value.length != 0){
        this.childListData()
      }
    })
    console.log(this.title,'挂载完毕')
  },
  beforeDestroy(){
    console.log(this.title,'即将被销毁')
  }
}
</script>

<style>

</style>