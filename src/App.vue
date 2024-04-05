<template>
  <div id="app">
    <!-- <div class="routerBox">
      <router-link v-for="item in dataList" class="router" :key="item.id" :to="{
        name:cmap[item.childrenName],
        query:{
          title:item.childrenName
        }
      }">{{item.childrenName}}</router-link>
    </div>
    <router-view></router-view> -->
    <RatePie title="性别组成" :chartData="{male:3130,female:1952}"/>
    <NightingaleChart title="毕业生落实率" :chartData="chartd[0]"/>
    <HalfPie title="自主创业意向" :chartData="chartd[1]"/>
    <PiePadAngle title="意向就业单位" :chartData="chartd[2]"/>
    <SimpleEncode :total="5082" title="择业途径" :chartData="chartd[3]"/>
    <PieRoundedCorner title="专业关注度" :chartData="chartd[4]"/>
    <BasicBar title="求职短板" :chartData="chartd[5]"/>
    <PieFull title="用人单位占比" :chartData="chartd[6]"/>
    <BasicBar title="招聘关注因素" :chartData="chartd[7]"/>
    <RadialPolarBar title="就业现状满意度" :chartData="chartd[8]"/>
    <SimpleEncode title="单位综合满意度" :chartData="chartd[9]" :total="100"/>
    <BasicBar title="毕业生对岗位综合满意度" :chartData="chartd[10]"/>
    <PieFull title="工作与专业相关度" :chartData="chartd[11]"/>
    <PieRoundedCorner title="工作与专业不相关原因" :chartData="chartd[12]"/>
    <PieRoundedCorner title="岗位压力" :chartData="chartd[13]"/>
    <FunnelChart title="月薪满意度" :chartData="chartd[14]"/>
    <BasicRadar title="对毕业生求职建议" :chartData="chartd[15]" :max="30"/>
    <BasicRadar title="单位对毕业生工作表现评价" :chartData="chartd[16]" :max="100"/>
    <PieSet title="毕业生去向分布" :chartData="chartd[17]"/>
    <FeatureBar :chartData="chartd[18]" title="民族生源结构"/>
  </div>
</template>

<script>
import RatePie from './components/charts/RatePie.vue'
import NightingaleChart from './components/charts/NightingaleChart.vue'
import HalfPie from './components/charts/HalfPie.vue'
import PiePadAngle from './components/charts/PiePadAngle.vue'
import SimpleEncode from './components/charts/SimpleEncode.vue'
import PieRoundedCorner from './components/charts/PieRoundedCorner.vue'
import BasicBar from './components/charts/BasicBar.vue'
import PieFull from './components/charts/PieFull.vue'
import RadialPolarBar from './components/charts/RadialPolarBar.vue'
import FunnelChart from './components/charts/FunnelChart.vue'
import BasicRadar from './components/charts/BasicRadar.vue'
import PieSet from './components/charts/PieSet.vue'
import FeatureBar from './components/charts/FeatureBar.vue'
// import GraphicBox from './components/GraphicBox.vue'
import axios from 'axios'

export default {
  name: 'App',
  data(){
    return {
      chartd:[
            {
                "毕业生协议和合同就业率":61.89,
                "升学率":21.88,
                "待就业率":14.38,
                "灵活就业率":1.12,
                "暂不就业率":0.37,
                "自主创业率":0.35
            },
            {
                "已经创业":1.15,
                "有想法":23.81,
                "没想法":75.03
            },
            {
            "党政机关":17.46,
            "大型民营企业":8.38,
            "三资企业":6.52,
            "国有企业":33.44,
            "事业单位":23.74,
            "其他":4.97
            },
            {
            "校园招聘会/双选会":46.34,
            "招聘网站":13.94,
            "家庭亲友推荐":9.59,
            "老师推荐":9.26,
            "学习官网或公众号":8.4,
            "其他":5.01,
            "用人单位内部招聘渠道":3.58,
            "政府组织招聘会":1.71,
            "报纸、电视等媒体":0.06
            },
            {
            "非常关注":24.27,
            "比较关注":25.77,
            "一般":35.15,
            "不太关注":4.18,
            "一点也不关注":0.63
            },
            {
            "专业知识和技能":19.88,
            "求职技巧":16.09,
            "沟通协调能力":15.08,
            "对岗位专业知识的了解":14.92,
            "对社会的了解":13.71,
            "承受压力和客服困难的能力":11.01,
            "基本解决问题能力":4.82,
            "其他":4.49
            },
            {
            "制造业":27.82,
            "建筑业":20.92,
            "信息传输、软件和信息技术服务业":11.72,
            "教育":6.90,
            "电力、热力、燃气及水生产和供应业":5.86,
            "金融业":4.60,
            "批发和零售业":4.39,
            "科学研究和技术服务业":2.51,
            "交通运输、仓储和邮政业":2.51,
            "居民服务、修理和其他服务业":2.09,
            "公共管理、社会保障和社会组织":1.88,
            "水利、环境和公共设施管理业":1.67,
            "卫生和社会工作":1.46,
            "文化、体育和娱乐业":1.26,
            "房地产业":1.26,
            "农、林、牧、渔业":1.05,
            "租赁和商务服务业":0.84,
            "采矿业":0.84,
            "住宿和餐饮业":0.42
            },
            {
                "综合素质":19.41,
                "人品素质、忠诚度、责任心":16.74,
                "社会关系":12.47,
                "社会适应能力":10.77,
                "是否学生干部":6.32,
                "获奖证书":5.61,
                "毕业院校":4.63,
                "工作/实习/兼职经历":4.45,
                "所学专业":3.29,
                "户籍":3.21,
                "学历层次":2.94,
                "学习成绩":2.85,
                "项目经验":2.49,
                "身体素质":2.32,
                "其他":1.16,
                "培训经历":0.71,
                "作品展示":0.62
            },
            {
                "不满意":1.15,
                "比较满意":37.22,
                "满意":12.67,
                "非常满意":24.74
            },
            {
                "非常满意":14.65,
                "比较满意":47.23,
                "一般":33.83,
                "不太满意":2.89,
                "不满意":1.40
            },
            {
                "非常满意":13.04,
                "比较满意":46.15,
                "一般":35.87,
                "不太满意":3.93,
                "不满意":1.00
            },
            {
                "非常相关":12.09,
                "相关":41.90,
                "比较相关":18.74,
                "不太相关":18.92,
                "不相关":8.35
            },
            {
                "迫于现实就业在择业":22.67,
                "对专业无兴趣":20.64,
                "其他":16.75,
                "专业工作与自身理想不符":9.48,
                "专业工作环境差":9.31,
                "专业工作岗位少":8.12,
                "专业工作收入水平低":7.28,
                "达不到专业相关工作的要求":"5.25",
                "社会对母校专业认可度不高":"0.51"
            },
            {
                "非常大":6.18,
                "大":29.57,
                "比较大":24.68,
                "比较小":24.36,
                "非常小":2.73,
                "不了解":12.48
            },
            {
                "非常满意":2.68,
                "满意":40.06,
                "比较满意":20.86,
                "不太满意":30.73,
                "不满意":5.68
            },
            {
                "简历制作":19.01,
                "求职技巧":17.16,
                "临场反应":16.44,
                "着装礼仪":15.72,
                "职业素养":11.92,
                "面试礼仪":8.94,
                "对应聘单位的了解准备":6.89,
                "其他":3.91
            },
            {
                "发展潜力":97.49,
                "职业能力":95.61,
                "专业水平":95.19,
                "工作态度":94.77,
                "政治素养":93.72
            },
            [
                {
                    "title":"协议和合同就业",
                    "data":{
                        "签就业协议形式就业": 2812,
                        "签劳动合同形式就业": 282,
                        "应征义务兵": 24,
                        "西部计划": 16,
                        "三支一扶": 5,
                        "其它（地方基层项目）": 3,
                        "特岗教师（地方）": 2,
                        "选调生": 1
                    },
                    "type":"Default arrangement"
                },
                {
                    "title":"升学",
                    "data":{
                        "研究生": 1078,
                        "出国、出境": 33,
                        "第二学士学位": 1
                    },
                    "type":"Default arrangement"
                },
                {
                    "title":"待就业",
                    "data":{
                        "求职中":720,
                        "拟参加公招考试":10,
                        "签约中":1
                    },
                    "type":"Default arrangement"
                },
                {
                    "title":"灵活就业",
                    "data":{
                        "其他录用形式就业":46,
                        "自由职业":11
                    },
                    "type":"Default arrangement"
                },
                {
                    "title":"暂不就业",
                    "data":{
                        "不就业拟升学":14,
                        "暂不就业":5
                    },
                    "type":"Default arrangement"
                },
                {
                    "title":"自主创业",
                    "data":{
                        "自主创业":18
                    },
                    "type":"Default arrangement"
                }
            ],
            {
                "汉族": 4928,
                "土家族": 23,
                "壮族": 18,
                "满族": 15,
                "苗族": 15,
                "回族": 13,
                "畲族": 13,
                "蒙古族": 11,
                "藏族": 8,
                "侗族": 6,
                "白族": 5,
                "仡佬族": 4,
                "彝族": 4,
                "水族": 4,
                "布依族": 3,
                "瑶族": 3,
                "维吾尔族": 2,
                "黎族": 2,
                "傣族": 1,
                "哈萨克族": 1,
                "土族": 1,
                "拉祜族": 1,
                "达斡尔族": 1
            }
            ],
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
    RatePie,
    NightingaleChart,
    HalfPie,
    PiePadAngle,
    SimpleEncode,
    PieRoundedCorner,
    BasicBar,
    PieFull,
    RadialPolarBar,
    FunnelChart,
    BasicRadar,
    PieSet,
    FeatureBar

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
  display: flex;
  flex-wrap: wrap;
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
