import Vue from 'vue'
import router from '@/router'
import store from '@/store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration


import { constantRouterMap } from '@/router/router.config'

import { setDocumentTitle, domTitle } from '@/utils/domUtil'

// router.addRoutes(constantRouterMap)
router.beforeEach((to, from, next) => {
  alert(store.getters.isGenerateRoutes)
  console.log(to)
  NProgress.start()
  let token = Vue.ls.get('Access-Token')
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (token) {
    // has token
    // todo 如果未选公司的,跳到选择公司
    // router.addRoutes(asyncRouterMap)
    if (!store.getters.isGenerateRoutes) {
      console.log(store.getters.isGenerateRoutes)
      // console.log(store)
      store.dispatch('GenerateRoutes').then(() => {
        router.addRoutes(store.getters.addRouters)
        console.log(store)
        const redirect = decodeURIComponent(from.query.redirect || to.path)
        console.log(redirect)
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


    if (to.path == '/login') {
      next('/dashboard/statistics')
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})
