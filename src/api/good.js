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
