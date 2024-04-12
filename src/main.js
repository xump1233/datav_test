import Vue from 'vue'
import App from './App.vue'
import * as echarts from 'echarts'
import router from './router/index'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$echarts = echarts
    Vue.prototype.$dataUrl = 'http://xump.cn'
    // Vue.prototype.$dataUrl = 'http://127.0.0.1:5003'
  },
  router:router
}).$mount('#app')
