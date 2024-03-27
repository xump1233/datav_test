import Vue from 'vue'
import App from './App.vue'
import * as echarts from 'echarts'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$echarts = echarts
  }
}).$mount('#app')
