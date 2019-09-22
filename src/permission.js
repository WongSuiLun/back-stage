import Vue from 'vue'
import router from '@/router'
import store from '@/store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration

import { getUserInfo } from '@/api/auth'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
// import {constantRouterMap} from '@/router/router.config'
// router.addRoutes(constantRouterMap)

/**
*
*/
router.beforeEach((to, from, next) => {
  NProgress.start()
  let token = Vue.ls.get('Access-Token')
  let company = Vue.ls.get('company')
  console.log(company)
  console.log(token)
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (token) {
    if (company) {
      getUserInfo().then(res => {
        console.log(res)
      })
      // has token
      // todo 如果未选公司的,跳到选择公司
      // router.addRoutes(asyncRouterMap)
      if (!store.getters.isGenerateRoutes) {
        // console.log(store)
        store.dispatch('GenerateRoutes').then(() => {
          router.addRoutes(store.getters.addRouters)
          const redirect = decodeURIComponent(from.query.redirect || to.path)
          if (to.path === redirect) {
            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: false })
          } else {
            // 跳转到目的路由
            next({ path: redirect })
          }
        })
        next()
      }


      // 进店生成路由
      if(!store.getters.isGenerateShopRoutes){
        store.dispatch('GenerateShopRoutes').then(() => {
          console.log(store)
          console.log(store.getters.shopRouters)
          router.addRoutes(store.getters.shopRouters)
          const redirect = decodeURIComponent(from.query.redirect || to.path)
          if (to.path === redirect) {
            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: false })
          } else {
            // 跳转到目的路由
            next({ path: redirect })
          }
        })
        next()
      }

    }       
    if (to.path == '/login') {
      if (company) {
        next('/dashboard/statistics')
      } else {
        console.log(company)
        next({ name: 'company-choose' })
      }

    } else {
      next()
    }
  } else {
    console.warn("No token!You don't have access")
    if (to.path == '/login') {
      next()
    } else {
      if (from.name == 'login') {
        NProgress.done()
        return;
      } else {
        next({ name: 'login' })
      }

    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
