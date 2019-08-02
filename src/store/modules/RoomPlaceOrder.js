import Vue from 'vue'
const state = {
  roomInfo: Object,
  orderProductList: {},
  orderListByShop: [],
  orderLogList: []
}
const getters = {

}
const mutations = {
  Update_Room_Id (state, roomInfo) {
    state.roomInfo = roomInfo
  },
  Increase_Product (state, product) {
    let roomId = state.roomInfo.room_id
    if (!state.orderProductList.hasOwnProperty(roomId)) {
      Vue.set(state.orderProductList, roomId, {})
    }
    if (state.orderProductList[roomId].hasOwnProperty(product.materials_name)) {
      if (state.orderProductList[roomId][product.materials_name].count === product.quantity) {
        // Message({
        //   showClose: true,
        //   message: product.materials_name + '已达到库存上限了',
        //   type: 'warning',
        //   duration: 1 * 1000
        // })
      }
      Vue.set(state.orderProductList[roomId][product.materials_name], 'count', ++state.orderProductList[roomId][product.materials_name].count)
    } else {
      Vue.set(state.orderProductList[roomId], product.materials_name, product)
      Vue.set(state.orderProductList[roomId][product.materials_name], 'count', 1)
    }
  },
  Delete_Product (state, product) {
    let roomId = state.roomInfo.room_id
    Vue.delete(state.orderProductList[roomId], product.materials_name)
  },
  Update_Product_Count (state, product) {
    let roomId = state.roomInfo.room_id
    Vue.set(state.orderProductList[roomId], product.materials_name, product)
  },
  Init_Order_List_By_Shop (state, orderList) {
    state.orderListByShop = orderList.slice()
  },
  Init_Order_Log_list (state, logList) {
    state.orderLogList = logList
  },
  Clean_Order_List (state) {
    let roomId = state.roomInfo.room_id
    Vue.set(state.orderProductList, roomId, {})
  }
}
const actions = {
  updateRoomId ({commit}, roomInfo) {
    commit('Update_Room_Id', roomInfo)
  },
  increaseProduct ({commit}, product) {
    commit('Increase_Product', product)
  },
  deleteProductInOrderList ({commit}, product) {
    commit('Delete_Product', product)
    // Message({
    //   message: '成功删除',
    //   type: 'success',
    //   duration: 1 * 1000
    // })
  },
  updateProductCount ({commit}, product) {
    commit('Update_Product_Count', product)
  },
  cleanOrderList ({commit}) {
    commit('Clean_Order_List')
  },
  initOrderListByShop ({commit}, orderList) {
    commit('Init_Order_List_By_Shop', orderList)
  },
  initOrderLogList ({commit}, logList) {
    commit('Init_Order_Log_list', logList)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
