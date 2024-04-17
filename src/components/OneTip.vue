<template>
  <div class="oneTip" v-show="isShow">
    <div ref="target" @click="dian">

    </div>
  </div>
</template>

<script>
export default {
    name:'OneTip',
    data(){
        return {
            isShow:false,
            myChart:''
        }
    },
    methods:{
        dian(){
            this.isShow = false
        }
    },
    mounted(){
        this.$bus.$on('getChart',(value)=>{
            console.log(value)
            console.log(this)
            this.isShow = true
        })
    }
}
</script>

<style>
 .oneTip{
    position: absolute;
    width:70%;
    height:80%;
    background-color: rgb(102, 102, 102,0.5);
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
 }
  .oneTip>div{
    width:100px;
    height:100px;
    background-color: #fff;
  }
</style>