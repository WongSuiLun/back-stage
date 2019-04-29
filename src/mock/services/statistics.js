import Mock from 'mockjs2'
import { builder } from '../util'


const statisticsInfo = () =>{

  const allStatisticsData = [
    {
      color:'#FB3157',
      icon:'aliwangwang',
      message:["未付款保留订单",Mock.mock('@datetime'),Mock.mock('@integer(0, 2000)')+"笔",Mock.mock('@integer(99999, 9999999)')+"元"]
    },
    {
      color:'#628217',
      icon:'aliwangwang',
      message:["已付款订单",Mock.mock('@datetime'),Mock.mock('@integer(0, 2000)')+"笔",Mock.mock('@integer(99999, 9999999)')+"元"]
    },
    {
      color:'#EDB21A',
      icon:'aliwangwang',
      message:["未付款保留订单",Mock.mock('@datetime'),Mock.mock('@integer(0, 2000)')+"笔",Mock.mock('@integer(99999, 9999999)')+"元"]
    },
    {
      color:'#53D769',
      icon:'aliwangwang',
      message:["未付款保留订单",Mock.mock('@datetime'),Mock.mock('@integer(0, 2000)')+"笔",Mock.mock('@integer(99999, 9999999)')+"元"]
    },
    {
      color:'#BC9CF7',
      icon:'aliwangwang',
      message:["未付款保留订单",Mock.mock('@datetime'),Mock.mock('@integer(0, 2000)')+"笔",Mock.mock('@integer(99999, 9999999)')+"元"]
    },
    {
      color:'#157EFB',
      icon:'aliwangwang',
      message:["未付款保留订单",Mock.mock('@datetime'),Mock.mock('@integer(0, 2000)')+"笔",Mock.mock('@integer(99999, 9999999)')+"元"]
    },
    {
      color:'#EB663B',
      icon:'aliwangwang',
      message:["未付款保留订单",Mock.mock('@datetime'),Mock.mock('@integer(0, 2000)')+"笔",Mock.mock('@integer(99999, 9999999)')+"元"]
    },
    {
      color:'#FC71A8',
      icon:'aliwangwang',
      message:["未付款保留订单",Mock.mock('@datetime'),Mock.mock('@integer(0, 2000)')+"笔",Mock.mock('@integer(99999, 9999999)')+"元"]
    },
    {
      color:'#FB3157',
      icon:'aliwangwang',
      message:["未付款保留订单",Mock.mock('@datetime'),Mock.mock('@integer(0, 2000)')+"笔",Mock.mock('@integer(99999, 9999999)')+"元"]
    },
    {
      color:'#628217',
      icon:'aliwangwang',
      message:["已付款订单",Mock.mock('@datetime'),Mock.mock('@integer(0, 2000)')+"笔",Mock.mock('@integer(99999, 9999999)')+"元"]
    },
    {
      color:'#EDB21A',
      icon:'aliwangwang',
      message:["未付款保留订单",Mock.mock('@datetime'),Mock.mock('@integer(0, 2000)')+"笔",Mock.mock('@integer(99999, 9999999)')+"元"]
    },
    {
      color:'#53D769',
      icon:'aliwangwang',
      message:["未付款保留订单",Mock.mock('@datetime'),Mock.mock('@integer(0, 2000)')+"笔",Mock.mock('@integer(99999, 9999999)')+"元"]
    },
    {
      color:'#BC9CF7',
      icon:'aliwangwang',
      message:["未付款保留订单",Mock.mock('@datetime'),Mock.mock('@integer(0, 2000)')+"笔",Mock.mock('@integer(99999, 9999999)')+"元"]
    },
    {
      color:'#157EFB',
      icon:'aliwangwang',
      message:["未付款保留订单",Mock.mock('@datetime'),Mock.mock('@integer(0, 2000)')+"笔",Mock.mock('@integer(99999, 9999999)')+"元"]
    },
    {
      color:'#EB663B',
      icon:'aliwangwang',
      message:["未付款保留订单",Mock.mock('@datetime'),Mock.mock('@integer(0, 2000)')+"笔",Mock.mock('@integer(99999, 9999999)')+"元"]
    },
    {
      color:'#FC71A8',
      icon:'aliwangwang',
      message:["未付款保留订单",Mock.mock('@datetime'),Mock.mock('@integer(0, 2000)')+"笔",Mock.mock('@integer(99999, 9999999)')+"元"]
    }
  ]
  return builder(allStatisticsData)
}
Mock.mock(/\/api\/statistics\/info/, 'get', statisticsInfo)