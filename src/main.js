import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Viser from 'viser-vue'

import '@/styles/index.less'
import './permission'
import './mock'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(Viser)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
