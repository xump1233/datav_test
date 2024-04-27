<template>
  <div class="topBox">
    <div class="topTime"><span class="topLeft">{{time}}</span></div>
    <div class="topTitle">智教 | 大学生就业数据分析智能平台</div>
    <div class="topTime"><span class="topRight">2022年度</span></div>
  </div>
</template>

<script>
export default {
    name:'HeadTop',
    data(){
      return {
        time:''
      }
    },
    mounted(){
      let time = new Date()
      this.time = time.toLocaleDateString()+' '+time.toLocaleTimeString()
      setInterval(()=>{
        let time = new Date()
        this.time = time.toLocaleDateString()+' '+time.toLocaleTimeString()
      },1000)
    }
}
</script>

<style>
.topBox{
  display: flex;
  height: 7%;
  justify-content: space-between;
  width: 100%;
  background-color: rgba(255, 255, 255,0.7);
  box-shadow: 0px 0px 5px 0px #888888;
  position: relative;
  z-index: 0;
}

.topTitle{
  font-size:30px;
  font-weight: bold;
  /* margin-right: 20%; */
  width: 50%;
  position: relative;
}
.topTitle::before{
  content:'';
  background-image: url('../assets/logo.gif');
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  width:100px;
  height: 100px;
  position: relative;
  float: left;
  left: 15%;
  top: -3%;
  z-index:3;
}
.topTime{
  font-size:16px;
  line-height: 48px;
  width:25%;
  text-align: center;
  position: relative;
  font-weight: bold;
}
.topLeft{
  position: relative;
  right:20%;
  padding: 10px;
  border-radius: 5px;
}
.topLeft::before{
  content:'';
  display: block;
  background-image: url('../assets/time.png');
  background-repeat: no-repeat;
  background-size: contain;
  width: 35px;
  height: 35px;
  z-index: 3;
  position: absolute;
  top: 0;
  left: -15%;
}
.topRight{
  position: relative;
  padding: 8px;
  border-radius: 5px;
  /* background-color: skyblue; */
  left:27%;
}
</style>