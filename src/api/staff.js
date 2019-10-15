import request from '@/utils/request'
import { GOOD_BASE_URL, USER_BASE_URL } from '../constant'

export function getStaff() {
    return request({
        url: '/staff/list',
        method: 'get'
    })
}