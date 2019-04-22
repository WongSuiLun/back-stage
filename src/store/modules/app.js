// import Vue from 'vue'
const app = {
  state: {
    sidebar: true,
    device: 'desktop'
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
  mutations: {
    SET_SIDEBAR_TYPE: (state, type) => {
      state.sidebar = type
    },
    SET_SIDEBAR_MODULE: (state, moduleType) => {
      state.sidebarModule = moduleType
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
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
    }
  }
}

export default app
