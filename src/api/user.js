import request from '@/utils/request'
import { GOOD_BASE_URL,USER_BASE_URL } from '../constant'

export function addUser(data) {
  console.log(data)
  return request({
    url: `${USER_BASE_URL}/user/public/api/users`,
    method: 'post',
    data
  })
}
