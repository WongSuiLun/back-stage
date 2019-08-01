import request from '@/utils/request'
import axios from 'axios'
import store from '@/store'

let COMPANY_ID = store.getters.getCompanyId
let SHOP_ID = store.getters.getShopId
let tempBaseApi = 'http://192.168.101.115/oqc/index.php/' + COMPANY_ID + '/'

// 获取房态列表
export function getRoomSurplus (query) {
  return request({
    url: '/roomsurplus',
    method: 'get',
    params: query
  })
}

// 获取房间日预定状态
export function roomDayStatus (query) {
  return request({
    url: '/roomdaystatus',
    method: 'get',
    params: query
  })
}

// 获取店内房间信息（带缓存）
export function hrooms (query) {
  return request({
    url: '/shops/hrooms',
    method: 'get',
    params: query
  })
}

// 获取线上店内房间信息
export function getShopsRooms (query) {
  return request({
    url: '/shops/rooms',
    method: 'get',
    params: query
  })
}

// 房间入住业务
export function checkIn (query) {
  return request({
    url: '/checkIn',
    method: 'POST',
    data: query
  })
}

// 根据shop Id 获取房型
export function roomtypes (id) {
  return request({
    url: `/roomtypes/${id}`,
    method: 'get'
  })
}

// 清除缓存
export function cleanRoomsCache () {
  return request({
    url: '/cleanRoomsCache',
    method: 'POST'
  })
}

// 获取房间下单的商品类型
export function getRoomGoods () {
  return new Promise(function (resolve, reject) {
    axios.get(tempBaseApi + '?app=api&mod=RoomService&act=getRoomGoods&shop_id=' + SHOP_ID + '&company_id=' + COMPANY_ID + '').then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

// 客房服务下单
export function addRoomOrder (data) {
  let params = ''
  for (let key in data) {
    params += '&' + key + '=' + data[key]
  }
  return new Promise(function (resolve, reject) {
    axios.post(tempBaseApi + '?app=api&mod=RoomService&act=addRoomOrder' + params).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

// 获取房间的下单信息
export function getOrderByShop () {
  return new Promise(function (resolve, reject) {
    axios.get(tempBaseApi + '?app=api&mod=RoomService&act=getOrderByShop&shop_id=' + SHOP_ID + '&company_id=' + COMPANY_ID + '&employee_id=70777').then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

// 客房服务取消订单
export function cancelRoomOrder (data) {
  let params = ''
  for (let key in data) {
    params += '&' + key + '=' + data[key]
  }
  return new Promise(function (resolve, reject) {
    axios.post(tempBaseApi + '?app=api&mod=RoomService&act=cancelRoomOrder' + params).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

// 客房服务订单详情
export function getOrderDetail (data) {
  let params = ''
  for (let key in data) {
    params += '&' + key + '=' + data[key]
  }
  return new Promise(function (resolve, reject) {
    axios.post(tempBaseApi + '?app=api&mod=RoomService&act=getOrderDetail' + params).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

// 客房服务订单日志
export function getRoomLog () {
  return new Promise(function (resolve, reject) {
    axios.get(tempBaseApi + '?app=api&mod=RoomService&act=getRoomLog&shop_id=' + SHOP_ID + '&company_id=' + COMPANY_ID + '&employee_id=70777').then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

// 系统排房
export function autoArrangeRooms (data) {
  return request({
    url: '/autoArrangeRooms',
    method: 'POST',
    data
  })
}

// 业务--排房
export function arrangeRooms (data) {
  return request({
    url: '/arrangeRooms',
    method: 'POST',
    data
  })
}
