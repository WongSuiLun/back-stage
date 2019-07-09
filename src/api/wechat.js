import request from '@/utils/request'
const ENV = "/chpc"

export function getWechatMenus(id){
    return request({
      url:`${ENV}/user/public/api/official-accounts/${id}/menus`,
      method:'get',
    })
}