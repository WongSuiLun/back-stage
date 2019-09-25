// import Vue from 'vue'
import router from '@/router'
import {resetRouter} from '@/router'
const app = {
  state: {
    sidebar: true,//左边菜单
    device: 'desktop',//设备类型，或者是说根据屏幕适配的设备类型
    token:'',//token凭证
    company:null,//公司ID
    companyName:'',//公司姓名
    shop:'',//店Id
    // theme: '',
    // layout: '',
    // contentWidth: '',
    // fixedHeader: false,
    // fixSiderbar: false,
    // autoHideHeader: false,
    // color: null,
    // weak: false,
    // multiTab: true,
    // sidebarModule: 'home'
  },
  getters:{
    getToken: state => state.token,
    getCompany:state=>state.company,
    getShop:state=>state.shop,
  },
  mutations: {
    SET_SIDEBAR_TYPE: (state, type) => {
      state.sidebar = type
    },
    SET_SIDEBAR_MODULE: (state, moduleType) => {
      state.sidebarModule = moduleType
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_TOKEN:(state,token) =>{
      state.token = token
    },
    SET_COMPANY:(state,company)=>{
      state.company = company
    },
    SET_SHOP:(state,shopId) =>{
      state.shopId = shopId
    }
  },
  actions: {
    setSidebar ({ commit }, type) {
      commit('SET_SIDEBAR_TYPE', type)
    },
    CloseSidebar ({ commit }) {
      commit('CLOSE_SIDEBAR')
    },
    ToggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setCompany({commit},companyId){
      commit('SET_COMPANY',companyId)
    },
    //切换店，需要重设路由
    setShop({commit},shop){
      return new Promise(resolve => {
        commit('SET_SHOP',shop.id)
        resolve()
      })
    },
    logout(){
      router.push('login')
    },
    
  }
}

export default app
