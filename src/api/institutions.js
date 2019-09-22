import request from '@/utils/request'
import { GOOD_BASE_URL,USER_BASE_URL } from '../constant'

export function getInstitutions() {
    return request(
        {
            url: `${USER_BASE_URL}/user/public/api/institutions`,
            method: 'get',
        }
    )
}


/**
 * 获取机构类别列表
 */
export function getInstitutionType(){
    return request({
        url:`${USER_BASE_URL}/user/public/api/institution-types`,
        method:'get'
    })
}

/**
 * 创建机构类别
 * @param {*} data 
 */
export function createInstitution(data){
    return request({
        url:`${USER_BASE_URL}/user/public/api/institution-types`,
        method:'post',
        data
    })
}

/**
 * 新增机构
 * @param {type_id:Number,name:String,parent_id:Number} data 
 */
export function addInsitutions(data){
    return request({
        url:`${USER_BASE_URL}/user/public/api/institutions`,
        method:'post',
        data
    })
}

/**
 * 
 * @param {limit:Number,start:Number} params 
 */
export function getInstitutionTypes(params){
    return request({
        url:`${USER_BASE_URL}/user/public/api/institution-types`,
        method:'get',
        params:params
    })
}
