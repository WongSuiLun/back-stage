/**
 * 商品接口
 */
import request from '@/utils/request'
import { GOOD_BASE_URL } from '../constant'


/**
 * @header shop,company
 * @param {Number} page 
 * @param {Number} limit
 * @param {Object} searchParam
 */
export function getGoods(page,limit,searchParam) {
  return request({
    url: `${GOOD_BASE_URL}/api/goods`,
    params:{
        page,
        limit,
        ...searchParam
    },
    method: 'get',
  })
}

/**
 * 获取单个商品接口
 * @param {Number} no 
 */
export function getGood(no){
  return request({
    url:`${GOOD_BASE_URL}/api/goods/${no}`,
    method:'get'
  })
}

export function deleteGood(no){
  return request({
    url:`${GOOD_BASE_URL}/api/goods/${no}`,
    method:'delete'
  })
}


export function getGoodTypeList(){
  return request({
    url:`${GOOD_BASE_URL}/api/classification`,
    method:'get'
  })
}

// {
//   "name": "string",
//   "shop_id": "Unknown Type: int",
//   "company_no": "string",
//   "parent": "string",
//   "image": "string",
//   "image_id": "string"
// }
export function addGoodType(data){
  return request({
    url:`${GOOD_BASE_URL}/api/classification`,
    method:'post',
    data
  })
}

export function updateGoodType(id){
  return request({
    url:`${GOOD_BASE_URL}/api/classification/${id}`,
    method:'post'
  })
}
export function deleteGoodType(id){
  return request({
    url:`${GOOD_BASE_URL}/api/classification/${id}`,
    method:'delete'
  })
}
