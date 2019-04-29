import request from '@/utils/request'

export function getAllStatisticsData(){
  return request({
    url:'/api/statistics/info',
    method:'get'
  })
}