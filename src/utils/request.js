import axios from 'axios'
// import router from '@/router'
import store from '@/store'
// import sysConfig from '@/utils/sysConfig'

const service = axios.create({
  // baseURL: 'http://192.168.101.115:8089/api',
  // baseURL: 'http://192.168.108.125',
  timeout: 30 * 1000
})

service.interceptors.request.use(config => {
  if (store.getters.getToken) {
    const TIME_OFFSET = 0.1
    if (+new Date().getTime() - +store.getters.getLoginTime >= +store.getters.getExpiresIn * 1000) {
      store.dispatch('logout')
      // router.push('/login')
    } else {
      if (+new Date().getTime() - +store.getters.getLoginTime > +store.getters.getExpiresIn * 1000 * TIME_OFFSET) {
        // refresh token
      }
    }
    config.headers['Authorization'] = store.getters.getToken
  } else {
    store.dispatch('logout')
    // router.push('/login')
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
    } catch (e) {
      msg = error.message
    }
    console.log(msg)
    return Promise.reject(error)
  })

export default service
