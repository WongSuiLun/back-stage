import request from '@/utils/request'

export function getOrders (params) {
  return request({
    url: 'http://192.168.101.115:8089/api/orders',
    method: 'get',
    params,
    headers:{
      company:60,
      shop:51
    }
  })
}

export function getOrderDetail (orderId) {
  return request({
    url: '/orders/' + orderId + '/details',
    method: 'get'
  })
}

// 订单结账
export function settleAccount (orderId, data) {
  return request({
    url: '/orders/' + orderId + '/transactions',
    method: 'post',
    data
  })
}

// 获取结账方式
export function getPaytypes () {
  return request({
    url: '/paytypes',
    method: 'get'
  })
}

// 新增结账方式
/*
alias:支付宝
sign:ylkz_zfb
is_normal:1
is_add_point:1
is_hand_point:0
*/
export function addPaytypes () {
  return request({
    url: '/paytypes',
    method: 'post'
  })
}

// 获取所有订单的状态
export function getOrderStatusOptions () {
  return request({
    url: '/orders/status',
    method: 'get'
  })
}