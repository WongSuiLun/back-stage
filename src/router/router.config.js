// eslint-disable-next-line
import { LoginLayout,BasicLayout, RouteView } from '@/layouts'

export const asyncRouterMap = [
  {
    path:'/',
    name:'index',
    component:BasicLayout,
    meta:{title:'首页'},
    redirect:'/dashboard',
    children:[
      {
        path:'/dashboard',
        name:'dashboard',
        redirect:'/dashboard/statistics',
        component:RouteView,
        meta:{title:'仪表盘'},
        children:[
          {
            path:'/dashboard/statistics',
            name:'Statistics',
            component:() => import('@/views/home/DataStatistics'),
            meta:{title:'数据统计'},
          }
        ]
      }
    ]
  }
]


/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: LoginLayout,
    redirect: '/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/user/Login')
      }
    ]
  },
  {
    path: '/dashboard',
    component: BasicLayout,
    children: [
      {
        path: '/dashboard/403',
        name: 'Exception403',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
        meta: { title: '403', permission: ['exception'] }
      },
      {
        path: '/dashboard/404',
        name: 'Exception404',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
        meta: { title: '404', permission: ['exception'] }
      },
      {
        path: '/dashboard/500',
        name: 'Exception500',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
        meta: { title: '500', permission: ['exception'] }
      }
    ]
  },
  // Exception
  {
    path: '/exception',
    name: 'exception',
    component: RouteView,
    redirect: '/exception/403',
    meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
    children: [
      {
        path: '403',
        name: 'Exception403',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
        meta: { title: '403', permission: ['exception'] }
      },
      {
        path: '404',
        name: 'Exception404',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
        meta: { title: '404', permission: ['exception'] }
      },
      {
        path: '500',
        name: 'Exception500',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
        meta: { title: '500', permission: ['exception'] }
      }
    ]
  }
]
