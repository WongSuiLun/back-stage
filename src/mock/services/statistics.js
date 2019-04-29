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

const daCanWeekInfo = () => {
  const weekDaCanData = [
    { date: "星期一", 'all': 7.0, 'cn': 3.9,'hk':3.1,'ma':3.6 },
    { date: "星期二", 'all': 6.9, 'cn': 4.2,'hk':3.3,'ma':4.6 },
    { date: "星期三", 'all': 9.5, 'cn': 5.7,'hk':5.6,'ma':6.6 },
    { date: "星期四", 'all': 14.5, 'cn': 8.5,'hk':8.1,'ma':7.6 },
    { date: "星期五", 'all': 18.4, 'cn': 11.9,'hk':11.1,'ma':12.6 },
    { date: "星期六", 'all': 21.5, 'cn': 15.2,'hk':15.1,'ma':13.6 },
    { date: "星期日", 'all': 25.2, 'cn': 17.0,'hk':18.1,'ma':16.6 },
  ];

  return builder(weekDaCanData)
} 
Mock.mock(/\/api\/statistics\/info/, 'get', statisticsInfo)
Mock.mock(/\/api\/chart\/dacan/, 'get', daCanWeekInfo)
