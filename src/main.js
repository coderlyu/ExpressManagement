import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui' // element ui
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
import 'element-ui/lib/theme-chalk/display.css' // element ui 断点的隐藏与显示
import './icons' // icon
import './permission'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
