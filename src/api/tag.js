import request from '@/utils/request'
import { GOOD_BASE_URL, USER_BASE_URL } from '../constant'

export function addTag(data) {
    return request({
        url: `${USER_BASE_URL}/label/public/api/labels`,
        method: 'post',
        data
    })
}

export function deleteTag(params) {
    return request({
        url: `${USER_BASE_URL}/label/public/api/labels`,
        method: 'delete',
        params:params
    })
}

export function addTagGoods(data) {
    return request({
        url: `${USER_BASE_URL}/label/public/api/goods-labels`,
        method: 'post',
        data
    })
}

export function deleteTagGood(data) {
    return request({
        url: `${USER_BASE_URL}/label/public/api/goods-labels`,
        method: 'delete',
        data
    })
}

export function getTags(){
    return request({
        url:`${USER_BASE_URL}/label/public/api/labels`,
        method:'get',
    })
}

export function getTagsGood(params){
    return request({
        url:`${USER_BASE_URL}/label/public/api/goods-labels`,
        method:'get',
        params:params
    })
}