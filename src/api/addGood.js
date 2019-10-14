import request from '@/utils/request'
import { GOOD_BASE_URL } from '../constant'

// export function deleteAttach(id) {
//   return request({
//     url: `${GOOD_BASE_URL}/api/attach/${id}`,
//     method: 'delete',
//   })
// }

// export function addAttach(data){
//   return request({
//     url: `${GOOD_BASE_URL}/api/attach`,
//     method: 'post',
//     data,
//   })
// }

export function getDistrict(){
  return request({
    url: `${GOOD_BASE_URL}/api/tengxun`,
    method: 'get',
  })
}

export function getTags(){
  return request({
    url:`${GOOD_BASE_URL}/api/tags`,
    method:'get'
  })
}


export function addTag(data){
  return request({
    url:`${GOOD_BASE_URL}/api/tags`,
    method:'post',
    data
  })
}

export function addGood(data){
  return request({
    url:`${GOOD_BASE_URL}/api/goods/step1`,
    method:'post',
    data
  })
}

export function updateGood(no,data){
  return request({
    url:`${GOOD_BASE_URL}/api/goods/step1/${no}`,
    method:'post',
    data
  })
}

export function getDaterules(){
  return request({
    url:`${GOOD_BASE_URL}/api/daterules`,
    method:'get',
  })
}

export function postDaterules(data){
  return request({
    url:`${GOOD_BASE_URL}/api/daterules`,
    method:'post',
    data
  })
}

export function putDaterules(data,id){
  return request({
    url:`${GOOD_BASE_URL}/api/daterules/${id}`,
    method:'put',
    data
  })
}

export function deleteDaterules(id){
  return request({
    url:`${GOOD_BASE_URL}/api/daterules/${id}`,
    method:'delete'
  })
}

export function updateDaterules(data,id){
  return request({
    url:`${GOOD_BASE_URL}/api/daterules/${id}`,
    method:'put',
    data
  })
}


/**
 * 
 * @param {Number} no 
 * @param {desc:String} data 
 */
export function updateGoodDesc(no,data){
  return request({
    url:`${GOOD_BASE_URL}/api/goods/desc/${no}`,
    method:'post',
    data
  })
}