import axios from 'axios'
// import router from '@/router'
import Vue from 'vue'
import store from '@/store'
import Modal from 'ant-design-vue'
// import sysConfig from '@/utils/sysConfig'

const service = axios.create({
  // baseURL: 'http://192.168.101.115:8089',
  // baseURL: 'http://192.168.108.125',
  timeout: 30 * 1000
})

service.interceptors.request.use(config => {
  let token = Vue.ls.get('Access-Token')
  if (token) {
    const TIME_OFFSET = 0.1
    if (+new Date().getTime() - +store.getters.getLoginTime >= +store.getters.getExpiresIn * 1000) {
      store.dispatch('logout')
      // router.push('/login')
    } else {
      if (+new Date().getTime() - +store.getters.getLoginTime > +store.getters.getExpiresIn * 1000 * TIME_OFFSET) {
        // refresh token
      }
    }

    config.headers['Authorization'] = token

  } else {
    store.dispatch('logout')
    // router.push('/login')
  }

  if (!config.headers.hasOwnProperty('company')) {
    let company = Vue.ls.get('company')
    config.headers['company'] =  company.id
    // config.headers['company'] = 1
  }
  if (!config.headers.hasOwnProperty('shop')) {
    config.headers['shop'] = store.getters.getShop
  }

  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    let msg = ''
    try {

      msg = error.response.data.message
     
      if(error.response.status === 401){
        Vue.prototype.$confirm({
          title: '错误信息',
          content: '您的登录凭证已失效，是否重新登录？',
          okText: '确认',
          cancelText: '取消',
          onOk(){

            store.dispatch('logout')
          },
        });
      }
    } catch (e) {
      msg = error.message
    }
    return Promise.reject(error)
  })

export default service
