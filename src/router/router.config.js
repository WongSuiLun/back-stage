// eslint-disable-next-line
import { LoginLayout, BasicLayout, RouteView } from '@/layouts'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/statistics',
        component: RouteView,
        meta: { title: '仪表盘', icon: 'form' },
        children: [
          {
            path: '/dashboard/statistics',
            name: 'statistics',
            component: () => import('@/views/dashboard/data_statistics/DataStatistics'),
            meta: { title: '数据统计' },
          },
          {
            path: '/dashboard/admin-log',
            name: 'admin-log',
            component: () => import('@/views/dashboard/AdminLog'),
            meta: { title: '系统日志' },
          }
        ]
      },
      {
        path: '/company',
        name: 'company',
        redirect: '/company/staff-management',
        component: RouteView,
        meta: { title: '公司', icon: 'deployment-unit' },
        children: [
          {
            path: '/company/staff-management',
            name: 'staff-management',
            component: () => import('@/views/company/StaffManagement'),
            meta: { title: '员工管理' }
          },
          {
            path: '/company/organizational/management',
            name:'organizational-management',
            component: () => import('@/views/company/organizational/OrgManagement'),
            meta: { title: '机构管理',icon:'setting' }
          },
          {
            path: '/company/user/management/list',
            name:'user-management',
            component: () => import('@/views/company/user/UserManagement'),
            meta: { title: '用户管理',icon:'setting'},
            // children:[
            //   {
            //     path: '/company/user/management/list',
            //     name:'user-list',
            //     component: () => import('@/views/company/user/UserList'),
            //     meta: { title: '用户列表',icon:'setting'},
            //   },
            //   {
            //     path: '/company/user/management/add',
            //     name:'add-user',
            //     component: () => import('@/views/company/user/AddUser'),
            //     meta: { title: '添加用户',icon:'setting'},
            //   },
            // ]
          }
        ]
      },
      {
        path: '/order',
        name: 'order',
        redirect: '/order/index',
        meta: { title: '订单', icon: 'shop' },
        component: RouteView,
        children: [
          {
            path: '/order/index',
            name: 'order-index',
            component: () => import('@/views/order/AllOrder'),
            meta: { title: '全部订单' }
          },
          {
            path: '/order/placeOrder',
            name: 'place-order',
            component: () => import('@/views/order/placeOrder/PlaceOrder'),
            meta: { title: '快速下单' }
          }
        ]
      },
      {
        path: '/good',
        name: 'good',
        redirect: '/good/add',
        meta: { title: '商品', icon: 'shop' },
        component: RouteView,
        children: [
          {
            path: '/good/add',
            name: 'add-good',
            component: () => import('@/views/good/addGood/AddGood'),
            meta: { title: '添加商品' }
          }
        ]
      },
      {
        path: '/wechat',
        name: 'wechat',
        redirect: '/wechat/AutoResponse',
        meta: { title: '微信设置', icon: 'wechat' },
        component: RouteView,
        children: [
          {
            path: '/wechat/AutoResponse',
            name: 'auto-response',
            component: () => import('@/views/wechat/autoResponse/index'),
            meta: { title: '自动回复' }
          },
          {
            path: '/wechat/customizeMenu',
            name: 'auto-response',
            component: () => import('@/views/wechat/customizeMenu/index'),
            meta: { title: '自定义菜单' }
          }
        ]
      },
      {
        path: '/linen',
        name: 'linen',
        redirect: '/linen/linenManagement',
        meta: { title: '布草管理', icon: 'wechat' },
        component: RouteView,
        children: [
          {
            path: '/linen/linenManagement',
            name: 'linen-management',
            component: () => import('@/views/linen/linenManagement/linenManagement'),
            meta: { title: '布草类型' }
          },
          {
            path: '/linen/linenStorage',
            name: 'linen-Storage',
            component: () => import('@/views/linen/linenManagement/linenManagement'),
            meta: { title: '布草入库' }
          },
          {
            path: '/linen/linenScan',
            name: 'linen-scan',
            component: () => import('@/views/linen/linenManagement/linenManagement'),
            meta: { title: '布草扫描' }
          },
          {
            path: '/linen/linenSetting',
            name: 'linen-setting',
            component: () => import('@/views/linen/linenManagement/linenManagement'),
            meta: { title: '仓库设置' }
          },
          {
            path: '/linen/linenRoomType',
            name: 'linen-roomType',
            component: () => import('@/views/linen/linenManagement/linenManagement'),
            meta: { title: '房型布草' }
          }
        ]
      },
      {
        path: '/reception',
        name: 'reception',
        redirect: '/reception/roomstate',
        meta: { title: '前台', icon: 'shop' },
        component: RouteView,
        children: [
          {
            path: '/reception/roomstate',
            component: () => import('@/views/reception/roomManagement/RoomManagement'),
            meta: { title: '房态管理', icon: 'menu', module: 1 }
          },
          // {
          //   path: 'checkin',
          //   component: () => import('@/views/errpage/err404'),
          //   meta: { title: '预定分房入住', icon: 'menu', module: 1 }
          // },
          {
            path: 'chooseroom',
            component: () => import('@/views/reception/chooseRoom/ChooseRoom'),
            meta: { title: '房态分房', icon: 'menu', module: 1 }
          },
          // {
          //   path: 'order',
          //   component: () => import('@/views/orderPage/OrderPage'),
          //   meta: { title: '订单管理', icon: 'menu', module: 1 }
          // },
          {
            path: 'lock',
            component: () => import('@/views/reception/doorLock/index'),
            meta: { title: '门锁管理', icon: 'menu', module: 1 }
          }
        ]
      },
      {
        path: '/account/center',
        name: 'center',
        component: () => import('@/views/account/center/Center'),
        meta: { title: '个人中心', icon: 'wechat' }
      },
    ]
  },
  {
    path: '*', redirect: '/exception/404'
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
        component: () => import('@/views/user/Login'),
        meta: { title: '登录' }
      },
      {
        path: '/company-choose',
        name: 'company-choose',
        component: () => import('@/views/user/CompanyChoose'),
        meta: { title: '切换公司' }
      }
    ]
  },
  {
    path: '/apply',
    component: LoginLayout,
    redirect: '/apply/company',
    children: [
      {
        path: '/apply/company',
        name: 'apply-company',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/public/ApplyCompany'),
        meta: { title: '申请公司', }
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
