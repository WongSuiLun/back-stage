//权限
import { asyncRouterMap, constantRouterMap,asyncShopRouterMap } from '@/router/router.config.js'
import {resetRouter} from '@/router'
/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission(permission, route) {
  //根据meta中的permission属性
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = permission[i].includes('*')||route.meta.permission.includes(permission[i])
      console.log(flag)
      if(flag){
        return true
      }
    }
    return false
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
// function hasRole(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return route.meta.roles.includes(roles.id)
//   } else {
//     return true
//   }
// }


/**
 * 过滤路由权限
 *
 * @param routerMap
 * @param permissionList
 * @returns {Array}
 */
function filterAsyncRouter(routerMap,permissionList){
  const accessedRouters = routerMap.filter(route=>{
    if(hasPermission(permissionList,route)){
      if(route.children&&route.children.length){
        route.children = filterAsyncRouter(route.children,permissionList)
      }
      return true
    }
    return false
  })
  return accessedRouters
}



const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    shopRouters:[],
    isGenerateRoutes:false,
    isGenerateShopRoutes:false
  },
  getters:{
    addRouters:(state)=>{
      return state.addRouters
    },
    shopRouters:(state)=>{
      return state.shopRouters
    },
    isGenerateRoutes:(state)=>{
      return state.isGenerateRoutes
    },
    isGenerateShopRoutes:(state)=>{
      return state.isGenerateShopRoutes
    }
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_IS_GENERATE_ROUTES:(state,isGenerateRoutes)=>{
      state.isGenerateRoutes = isGenerateRoutes
    },
    SET_IS_GENERATE_SHOP_ROUTES:(state,isGenerateShopRoutes)=>{
      state.isGenerateShopRoutes = isGenerateShopRoutes
    },
    SET_SHOP_ROUTERS:(state,routers)=>{
      state.shopRouters = routers
    }
  },
  actions: {
    GenerateRoutes ({ commit }) {
      return new Promise(resolve => {
        // const { roles } = data
        let permissionList = ['*']
        const accessedRouters = filterAsyncRouter(asyncRouterMap, permissionList);
        commit('SET_ROUTERS', accessedRouters)
        commit('SET_IS_GENERATE_ROUTES',true)
        resolve()
      })
    },
    GenerateShopRoutes({commit}){
      return new Promise(resolve => {
        let permissionList = ['*']
        const accessedRouters = filterAsyncRouter(asyncShopRouterMap, permissionList);
        commit('SET_SHOP_ROUTERS', accessedRouters)
        commit('SET_IS_GENERATE_SHOP_ROUTES',true)
        resolve()
      })
    },
    ResetRouter({commit}){
      return new Promise(resolve=>{
        resetRouter()
        commit('SET_IS_GENERATE_ROUTES',false)
        commit('SET_IS_GENERATE_SHOP_ROUTES',false)
        resolve()
      })
    }
  }
}

export default permission

