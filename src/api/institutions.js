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
