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
        permission: ['dashboard'],
        meta: { title: '仪表盘', icon: 'form' },
        children: [
          {
            path: '/dashboard/statistics',
            name: 'statistics',
            component: () => import('@/views/dashboard/statistics/DataStatistics'),
            meta: { title: '数据统计', },
          },
          {
            path: '/dashboard/report',
            name: 'report',
            component: () => import('@/views/dashboard/report/ReportCenter'),
            meta: {
              title: '报表中心',
              permission: ['report']
            }
          },
          {
            path: '/dashboard/log',
            name: 'admin-log',
            component: () => import('@/views/dashboard/AdminLog'),
            meta: { title: '系统日志' },
          }
        ]
      },
      {
        path: '/business',
        name: 'business',
        redirect: '/business/roomtype',
        component: RouteView,
        meta: {
          title: '营业管理',
          icon: 'wechat',
          permission: ['business'],
        },
        children: [
          {
            path: '/business/roomtype',
            name: 'roomtype',
            component: () => import('@/views/business/roomtype/RoomTypeManagement'),
            meta: { title: '房型管理', icon: '' }
          },
          {
            path: '/business/state',
            name: 'roomstate',
            component: () => import('@/views/business/roomstate/RoomState'),
            meta: { title: '房态', icon: '' }
          },
          {
            path: '/business/bus',
            name: 'bus',
            component: () => import('@/views/business/bus/BusManagement'),
            meta: { title: '接车管理', icon: '' }
          }
        ]
      },
      {
        path: '/company',
        name: 'company',
        redirect: '/company/employee/management',
        component: RouteView,
        meta: {
          title: '公司', icon: 'deployment-unit',
          //  permission: ['company']
        },
        children: [
          {
            path: '/company/employee/management',
            name: 'staff-management',
            component: () => import('@/views/company/employee/StaffManagement'),
            meta: { title: '员工管理' }
          },
          {
            path: '/company/organizational/management',
            name: 'organizational-management',
            component: () => import('@/views/company/organizational/OrgManagement'),
            meta: { title: '机构管理', icon: '' }
          },
          {
            path: '/company/user/management/list',
            name: 'user-management',
            component: () => import('@/views/company/user/UserManagement'),
            meta: { title: '用户管理', icon: '' },
          }
        ]
      },
      {
        path: '/order',
        name: 'order',
        redirect: '/order/index',
        meta: { title: '订单', icon: 'shop', },
        component: RouteView,
        children: [
          {
            path: '/order/index',
            name: 'order-index',
            component: () => import('@/views/order/AllOrder'),
            meta: { title: '全部订单' }
          },
          {
            path: '/order/place',
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
          },
          {
            path: '/good/price',
            name: 'price-date',
            component: () => import('@/views/good/price/PriceDateManagement'),
            meta: { title: '价格日期规则' }
          },
          {
            path: '/good/price/management',
            name: 'price-management',
            component: () => import('@/views/good/priceManagement/GoodPriceManagement'),
            meta: { title: '商品价格管理' }
          },
          {
            path: '/good/management',
            name: 'good-management',
            component: () => import('@/views/good/goodManagement/GoodManagement'),
            meta: { title: '商品管理' }
          },
          {
            path: '/good/comment/management',
            name: 'comment-management',
            component: () => import('@/views/good/comment/CommentManagement'),
            meta: { title: '评论管理' }
          }
        ]
      },
      {
        path: '/wechat',
        name: 'wechat',
        redirect: '/wechat/AutoResponse',
        meta: {
          title: '微信设置', icon: 'wechat',
          // permission: ['wechat'] 
        },
        component: RouteView,
        children: [
          {
            path: '/wechat/response',
            name: 'auto-response',
            component: () => import('@/views/wechat/autoResponse/index'),
            meta: { title: '自动回复' }
          },
          {
            path: '/wechat/menu',
            name: 'wechat-menu',
            component: () => import('@/views/wechat/customizeMenu/index'),
            meta: { title: '自定义菜单' }
          }
        ]
      },
      {
        path: '/linen',
        name: 'linen',
        redirect: '/linen/linenManagement',
        meta: {
          title: '布草管理', icon: 'wechat',
          //  permission: ['linen'] 
        },
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
        path: '/account',
        name: 'account',
        redirect: '/account/center',
        meta: {
          title: '个人中心', icon: 'wechat',
        },
        component: RouteView,
        children: [
          {
            path: '/account/center',
            name: 'account-center',
            component: () => import('@/views/account/center/Center'),
            meta: { title: '个人信息' }
          },
        ],
      },
      {
        path: '/coupon',
        name: 'coupon',
        redirect: '/coupon/list',
        meta: {
          title: '优惠券',
          icon: 'euro'
        },
        component: RouteView,
        children: [{
          path: '/coupon/list',
          name: 'coupon-list',
          component: () => import('@/views/coupon/couponList/CouponList'),
          meta: {
            title: '优惠券列表'
          }
        },
        {
          path: '/coupon/add',
          name: 'coupon-add',
          component: () => import('@/views/coupon/addCoupon/AddCoupon'),
          meta: {
            title: '添加优惠券'
          }
        }
        ]
      },
      {
        path: '/tag',
        name: 'tag',
        redirect: '/tag/list',
        meta: {
          title: '标签',
          icon: 'tags'
        },
        component: RouteView,
        children: [
          {
            path: '/tag/list',
            name: 'tag-list',
            component: () => import('@/views/tags/tagList/TagList'),
            meta: {
              title: '标签列表'
            }
          },
          {
            path: '/tag/edit',
            name: 'tag-edit',
            component: () => import('@/views/tags/tagEdit/TagEdit'),
            meta: {
              title: '标签編輯'
            }
          }
        ]
      }
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
    meta: {
      title: '异常页',
      icon: 'warning',
      permission: ['exception']
    },
    children: [
      {
        path: '403',
        name: 'Exception403',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
        meta: { title: '403', }
      },
      {
        path: '404',
        name: 'Exception404',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
        meta: { title: '404', }
      },
      {
        path: '500',
        name: 'Exception500',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
        meta: { title: '500', }
      }
    ]
  }
]
