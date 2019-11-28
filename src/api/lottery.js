import request from '@/utils/request'
import { LOTTERY_BASE_URL } from '@/constant'

/*
* 获取抽奖列表
* */
export function getLottery(params) {
    return request({
        url: `${LOTTERY_BASE_URL}/lottery`,
        method: 'get',
        params
    })
}

/*
* 添加抽奖
* */
export function createLottery(data) {
    return request({
        url: `${LOTTERY_BASE_URL}/lottery`,
        method: 'post',
        data
    })
}

/*
* 查看抽奖
* */
export function getLotteryById(id) {
    return request({
        url: `${LOTTERY_BASE_URL}/lottery/${id}`,
        method: 'get'
    })
}

/*
* 删除抽奖
* */
export function deleteLotteryById(id) {
    return request({
        url: `${LOTTERY_BASE_URL}/lottery/${id}`,
        method: 'delete'
    })
}
