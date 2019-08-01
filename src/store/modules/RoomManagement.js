import Vue from 'vue'
import RoomManagementHelper from '@/utils/RoomManagementHelper.js'
const defaultState = {
  roomDetail: {
    visibility: false,
    roomId: null
  },
  originalRoomData: {},
  roomList: {},
  floorOptions: [],
  floorFilter: [],
  typeOptions: [],
  typeFilter: [],
  anchorRoomNum: '',
  isShowRoomOrderDialog: false,
  isShowRoomOrderZoomIn: false,
  otherTypeFilter: {
    isNeedFilter: false,
    filterType: 'state',
    typeName: '',
    emphasizeColor: ''
  },
  roomDataForId: {}
}
const state = {
  roomDetail: {
    visibility: false,
    roomId: null
  },
  originalRoomData: {},
  roomList: {},
  floorOptions: [],
  floorFilter: [],
  typeOptions: [],
  typeFilter: [],
  anchorRoomNum: '',
  otherTypeFilter: {
    isNeedFilter: false,
    filterType: 'state',
    typeName: '',
    emphasizeColor: ''
  },
  isShowRoomOrderDialog: false,
  isShowRoomOrderZoomIn: false
}
const getters = {
  getAllRoomsByFilter: (state) => {
    let newRoomObject = RoomManagementHelper.converterRoomObject(state.originalRoomData)
    return RoomManagementHelper.getRoomByFilter(state.typeFilter, state.floorFilter, state.otherTypeFilter, newRoomObject.roomList)
  },
  getCalculateType: (state) => {
    return RoomManagementHelper.calculateType(state.originalRoomData)
  },
  getHadCheckInRoom: (state) => {
    return RoomManagementHelper.getHadCheckInRooms(state.originalRoomData)
  }
}
const mutations = {
  Reset_RoomManagement (state) {
    state = defaultState
  },
  Init_Original_Room_Data (state, roomdata) {
    state.originalRoomData = roomdata
    state.roomDataForId = getRoomDataForId(roomdata)
  },
  Init_Room_List (state, roomList) {
    state.roomList = roomList
  },
  Init_Floor_Options (state, options) {
    state.floorOptions = options
  },
  Update_Floor_Filter (state, filter) {
    state.floorFilter = filter
  },
  Init_Type_Options (state, options) {
    state.typeOptions = options
  },
  Update_Type_Filter (state, filter) {
    state.typeFilter = filter
  },
  Update_One_Room_By_Id (state, room) {
    Vue.set(state.originalRoomData, room.room_num, room)
  },
  Update_Room_Detail (state, roomDetail) {
    state.roomDetail = roomDetail
  },
  Update_Anchor_Room (state, anchorRoomNum) {
    state.anchorRoomNum = anchorRoomNum
  },
  Update_Other_Type_Filter (state, otherTypeFilter) {
    state.otherTypeFilter = otherTypeFilter
  },
  Update_Is_Show_Order_Dialog (state, isShowRoomOrderDialog) {
    state.isShowRoomOrderDialog = isShowRoomOrderDialog
  },
  Update_Is_Show_ZoomIn (state, isShowRoomOrderZoomIn) {
    state.isShowRoomOrderZoomIn = isShowRoomOrderZoomIn
  }
}

const actions = {
  initRoomList ({ commit }, roomObject) {
    let newRoomObject = RoomManagementHelper.converterRoomObject(roomObject)
    commit('Init_Original_Room_Data', roomObject)
    // commit('Init_Room_List', newRoomObject.roomList)
    commit('Init_Floor_Options', newRoomObject.floorOptions)
    commit('Update_Floor_Filter', newRoomObject.floorOptions)
    commit('Init_Type_Options', newRoomObject.roomTypeOptions)
    commit('Update_Type_Filter', newRoomObject.roomTypeOptions)
  },
  updateFloorFilter ({commit}, floorFilter) {
    commit('Update_Floor_Filter', floorFilter)
  },
  updateTypeFilter ({commit}, floorFilter) {
    commit('Update_Type_Filter', floorFilter)
  },
  updateOneRoomById ({commit}, room) {
    commit('Update_One_Room_By_Id', room)
  },
  updateRoomDetail ({commit}, roomDetail) {
    commit('Update_Room_Detail', roomDetail)
  },
  closeRoomDetail ({commit}) {
    commit('Update_Room_Detail', {visibility: false, roomId: null})
  },
  updateAnchorRoom ({commit}, roomNum) {
    commit('Update_Anchor_Room', roomNum)
  },
  updateOtherTypeFilter ({commit}, otherTypeFilter) {
    commit('Update_Other_Type_Filter', otherTypeFilter)
  },
  resetRoomManagement ({commit}) {
    commit('Reset_RoomManagement')
  },
  updateisShowRoomOrderDialog ({commit}, isShowRoomOrderDialog) {
    commit('Update_Is_Show_Order_Dialog', isShowRoomOrderDialog)
  },
  updateIsShowZoomIn ({commit}, isShowZoomIn) {
    commit('Update_Is_Show_ZoomIn', isShowZoomIn)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

function getRoomDataForId (originalRoomData) {
  let roomDataForId = {}
  for (let key in originalRoomData) {
    roomDataForId[originalRoomData[key].room_id] = originalRoomData[key]
  }
  return roomDataForId
}
