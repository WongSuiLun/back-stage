import axios from 'axios'

const REMOTE_ADDRESS = 'http://120.79.66.188:22347/v1'
const APP_ID = '15446726785411'
const SECRET = '15446726785412'
const PHONE_NUM = '15919289957'

const request = axios.create({
  baseURL: REMOTE_ADDRESS,
  timeout: 30 * 1000
})

// 获取token
export function getToken () {
  let params = {
    'appid': APP_ID,
    'secret': SECRET
  }
  return request({
    url: '/token',
    method: 'get',
    params
  })
}

// 发卡
export function setRoomCard (data) {
  let params = {
    'appid': APP_ID,
    'keytype': 0,
    'time-type': 1,
    'phonenum': PHONE_NUM,
    'requestid': 1
  }
  Object.assign(params, data)
  return request({
    url: '/setting-card-password',
    method: 'get',
    params
  })
}

// 取消卡
export function cancelRoomCard (data) {
  let params = {
    'appid': APP_ID,
    'keytype': 0,
    'requestid': 1
  }
  Object.assign(params, data)
  return request({
    url: '/cancel-card-password',
    method: 'get',
    params
  })
}

// 开门
export function openDoor (data) {
  let params = {
    'appid': APP_ID,
    'phonenum': PHONE_NUM,
    'method': 1,
    'requestid': 1
  }
  Object.assign(params, data)
  return request({
    url: '/open-door',
    method: 'get',
    params
  })
}

// 设置锁状态（正常/常开/长关）
export function setLockState (data) {
  let params = {
    'appid': APP_ID,
    'devtype': 0,
    'requestid': 1
  }
  Object.assign(params, data)
  return request({
    url: '/dev-nonc-set',
    method: 'get',
    params
  })
}

// 设备复位
export function reset (data) {
  let params = {
    'appid': APP_ID,
    'requestid': 1
  }
  Object.assign(params, data)
  return request({
    url: '/dev-reset',
    method: 'get',
    params
  })
}

// 信号测试
export function signalTest (data) {
  let params = {
    'appid': APP_ID,
    'requestid': 1
  }
  Object.assign(params, data)
  return request({
    url: '/dev-signal-test',
    method: 'get',
    params
  })
}
