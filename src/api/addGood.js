import request from '@/utils/request'
import { GOOD_BASE_URL } from '../constant'

export function deleteAttach(id) {
  return request({
    url: `${GOOD_BASE_URL}/api/attach/${id}`,
    method: 'delete',
  })
}

export function addAttach(data){
  return request({
    url: `${GOOD_BASE_URL}/api/attach`,
    method: 'post',
    data,
  })
}

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