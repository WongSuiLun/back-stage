import ObjectUtil from '@/utils/ObjectUtil'
/* eslint-disable  */
// O代表住客，V代表空房，C代表干净，D代表脏
export const OD_LABEL = '脏住客房'
const VD_LABEL = '脏的退房'
const OC_LABEL = '干净的住客房'
const VC_LABEL = '干净的退房'
const LOCK_LABEL = '锁房'

// 不同房间状态的Label
const STATE_LABEL_OBJ = {
  'OD': OD_LABEL,
  'VD': VD_LABEL,
  'OC': OC_LABEL,
  'VC': VC_LABEL,
  'L': LOCK_LABEL
}

const OD_ICON_NAME = '#icon-people'
const VD_ICON_NAME = '#icon'
const OC_ICON_NAME = '#icon-people'
const VC_ICON_NAME = '#icon'
const L_ICON_NAME = '#icon-qingjie'

// 不同房间状态的Icon名
export const STATE_ICON_OBJ = {
  'OD': OD_ICON_NAME,
  'VD': VD_ICON_NAME,
  'OC': OC_ICON_NAME,
  'VC': VC_ICON_NAME,
  'L': L_ICON_NAME
}

// 不同房间状态的类名
export const CLEAN_DISTY_OBJ = {
  'OD': 'dirty',
  'VD': 'dirty',
  'OC': 'clean',
  'VC': 'clean'
}

// 房间干净和脏的设置
const roomStatusObj = {
  CLEAN: {
    key: 'CLEAN',
    label: '干净房',
    color: '#6ccac9',
    defaultValue: 0
  },
  DIRTY: {
    key: 'DIRTY',
    label: '脏房',
    color: '#c4b16f',
    defaultValue: 0
  }
}

// 房间预抵预离
const roomExpObj = {
  EXCARR: {
    key: 'EXCARR',
    label: '预抵',
    color: '#FFCCCC',
    defaultValue: 0
  },
  EXCLEA: {
    key: 'EXCLEA',
    label: '预离',
    color: '#FFCCFF',
    defaultValue: 0
  }
}

// 所有的inputType
const inputTypeObject = {
  IDLE: {
    key: 'IDLE',
    label: '空闲',
    color: '#99CCFF',
    defaultValue: 0
  },
  LOCK: {
    key: 'LOCK',
    label: '锁定',
    color: '#FF6633',
    defaultValue: 0
  },
  FIT: {
    key: 'FIT',
    label: '散客',
    color: '#CCCCFF',
    defaultValue: 0
  },
  TEAM: {
    key: 'TEAM',
    label: '团队',
    color: '#f598c6',
    defaultValue: 0
  },
  VIP: {
    key: 'VIP',
    label: 'VIP',
    color: '#f8d347',
    defaultValue: 0
  },
  FREE: {
    key: 'FREE',
    label: '免费',
    color: '#6666FF',
    defaultValue: 0
  },
  HOUR: {
    key: 'HOUR',
    label: '钟点',
    color: '#99CCCC',
    defaultValue: 0
  },
  RECEIVE: {
    key: 'RECEIVE',
    label: '接待',
    color: '#CC33FF',
    defaultValue: 0
  },
  REPAIR: {
    key: 'REPAIR',
    label: '维修',
    color: '#FF3333',
    defaultValue: 0
  }
}

export class RoomManagementHelper {
  getLabelByStatus(status) {
    return STATE_LABEL_OBJ[status] === undefined ? status : STATE_LABEL_OBJ[status]
  }
  getIconNameByStatus(status) {
    return STATE_ICON_OBJ[status] === undefined ? status : STATE_ICON_OBJ[status]
  }
  getCleanOrDirtyBySattus(status) {
    return CLEAN_DISTY_OBJ[status]
  }
  getOdLabel() {
    return OD_LABEL
  }
  getOcLabel() {
    return OC_LABEL
  }
  getVdLabel() {
    return VD_LABEL
  }
  getVcLabel() {
    return VC_LABEL
  }
  getLocalLabel() {
    return LOCK_LABEL
  }
  // 判断房间是否是干净房间
  isRoomClean(room) {
    let isCleanRoom = false
    if (room.hasOwnProperty('state')) {
      if (room.state === 'OC' || room.state === 'VC') {
        isCleanRoom = true
      }
    }
    return isCleanRoom
  }
  // 判断房间是否是预抵房间
  isRoomPreOrder(room) {
    let isPreRoom = false
    if (room.hasOwnProperty('pre_order_no')) {
      if (ObjectUtil.isNotNullOrUndefined(room.pre_order_no)) {
        isPreRoom = true
      }
    }
    return isPreRoom
  }
  /**
   * 将房间的数据进行过滤
   * 筛选房间楼层
   * 筛选房间类型
   * 筛选input_type||state||exc 其中之一
   */
  getRoomByFilter(typeFilter, floorFilter, otherTypeFilter, roomList) {
    let filterList = this.doFloorFilter(floorFilter, roomList)
    filterList = this.doTypeFilter(typeFilter, filterList)
    if(otherTypeFilter.isNeedFilter){
      let filterType = otherTypeFilter.filterType
      if(inputTypeObject.hasOwnProperty(filterType)){
        filterList = this.doInputTypeFilter(filterType, filterList)
      }else if(roomExpObj.hasOwnProperty(filterType)){
        filterList = this.doExpectTypeFilter(filterType, filterList)
      }else if(roomStatusObj.hasOwnProperty(filterType)){
        filterList = this.doRoomStateTypeFilter(filterType, filterList)
      }
    }
    return filterList
  }

  // 处理过滤干净或不干净的房间
  doRoomStateTypeFilter(cleanOrDirty, roomList) {
    let newRoomList = {}
    if (cleanOrDirty === 'CLEAN') {
      for (let key in roomList) {
        let floorList = roomList[key]
        newRoomList[key] = []
        floorList.forEach(element => {
          if (this.isRoomClean(element)) {
            newRoomList[key].push(element)
          }
        })
      }
    }else{
      for (let key in roomList) {
        let floorList = roomList[key]
        newRoomList[key] = []
        floorList.forEach(element => {
          if (!this.isRoomClean(element)) {
            newRoomList[key].push(element)
          }
        })
      }
    }
    return newRoomList
  }
  // 处理过滤预抵达和预留
  doExpectTypeFilter(expectName, roomList) {
    let newRoomList = {}
    if (expectName === 'EXCARR') {
      for (let key in roomList) {
        let floorList = roomList[key]
        newRoomList[key] = []
        floorList.forEach(element => {
          if (this.isRoomPreOrder(element)) {
            newRoomList[key].push(element)
          }
        })
      }
      // 预留的房间
    }
    return newRoomList
  }
  // 根据input_type进行过滤
  doInputTypeFilter(inputTypeName, roomList) {
    let newRoomList = {}
    for (let key in roomList) {
      let floorList = roomList[key]
      newRoomList[key] = []
      floorList.forEach(element => {
        let inputType = (element['input_type'] === '' || element['input_type'] === null) ? 'IDLE' : element['input_type']
        if (inputType === inputTypeName) {
          newRoomList[key].push(element)
        }
      })
    }
    return newRoomList
  }
  // 根据选择的楼层过滤
  doFloorFilter(floorFilter, roomList) {
    let filterRoomList = {}
    floorFilter.forEach(element => {
      filterRoomList[element] = roomList[element]
    })
    return filterRoomList
  }
  // 根据选择的房间类型过滤
  doTypeFilter(typeFilter, roomList) {
    if (typeof roomList !== 'object') {
      return roomList
    }
    if (typeFilter.length < 1) {
      return null
    }
    let newRoomList = {}
    for (let key in roomList) {
      let floorList = roomList[key]
      newRoomList[key] = []
      floorList.forEach(element => {
        if (typeFilter.indexOf(element.room_type_name) !== -1) {
          newRoomList[key].push(element)
        }
      })
    }
    return newRoomList
  }
  // 将房间数据转换成页面所需要的Object
  converterRoomObject(roomObject) {
    let roomList = {}
    let roomTypeOptions = []
    for (let key in roomObject) {
      let floor = roomObject[key].floor
      let roomType = roomObject[key].room_type_name
      if (!roomList.hasOwnProperty(floor)) {
        roomList[floor] = []
      }
      roomList[floor].push(roomObject[key])
      if (roomTypeOptions.indexOf(roomType) === -1) {
        roomTypeOptions.push(roomType)
      }
    }
    let floorOptions = Object.keys(roomList)
    return {
      roomList,
      floorOptions,
      roomTypeOptions
    }
  }
  /*
  * @param {Object} originObject
  * @return {Object} calculateObject
  * 计算干净/不干净的房间 &&  input_type的房间 && Exc 类型的房间 的数量
  */
  calculateType(originObject) {
    return Object.assign({},this.calculateCleanOrDirtyType(originObject),this.calculateExcType(originObject),this.calculateInputType(originObject))
  }
  /*
  * @param {Object} originObject
  * @return {Object} calculateObject
  * 计算干净/不干净的房间 的数量
  */
  calculateCleanOrDirtyType(originObject) {
    let calculatedCleanOrDirtyObject = {
      CLEAN:0,
      DIRTY:0
    }
    for (let key in originObject) {
      if(this.isRoomClean(originObject[key])){
        calculatedCleanOrDirtyObject.CLEAN++
      }else{
        calculatedCleanOrDirtyObject.DIRTY++
      }
    }
    return calculatedCleanOrDirtyObject
  }
  /*
  * @param {Object} originObject
  * @return {Object} calculateObject
  * 计算预抵/预留 的房间 的数量
  */
  calculateExcType(originObject) {
    let calculatedExpObject = {
      EXCARR:0,
      EXCLEA:0
    }
    for (let key in originObject) {
      if(this.isRoomPreOrder(originObject[key])){
        calculatedExpObject.EXCARR++
      }
      // 还差计算预离的
    }
    return calculatedExpObject
  }
  /*
  * @param {Object} originObject
  * @return {Object} calculateObject
  * 计算input_type的房间 的数量
  */
  calculateInputType(originObject) {
    let calculatedObject = {}
    for (let key in originObject) {
      let type = originObject[key].input_type
      if (!ObjectUtil.isNotNullOrUndefined(type)) {
        type = 'IDLE'
      }
      if (calculatedObject.hasOwnProperty(type)) {
        calculatedObject[type]++
      } else {
        calculatedObject[type] = 1
      }
    }
    return calculatedObject
  }
  getAllKeys(){
    let keys = []
    keys = keys.concat(Object.keys(roomStatusObj)).concat(Object.keys(inputTypeObject)).concat(Object.keys(roomExpObj))
    return keys
  }
  getAllTypeObject(){
    return Object.assign({},roomStatusObj,roomExpObj,inputTypeObject)
  }
  /*
  /
  */
  getHadCheckInRooms(originObject){
    let hadCheckInRooms= []
    for (let key in originObject) {
      let type = originObject[key].input_type
      if (!ObjectUtil.isNotNullOrUndefined(type)) {
        hadCheckInRooms.push(originObject[key])
      }
    }
    return hadCheckInRooms
  }
}
export default new RoomManagementHelper()
