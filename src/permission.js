import Vue from 'vue'
import router from '@/router'
import store from '@/store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration


import { asyncRouterMap } from '@/router/router.config'
router.addRoutes(asyncRouterMap)
store.dispatch('GenerateRoutes')
import {setDocumentTitle,domTitle} from '@/utils/domUtil'

router.beforeEach((to, from, next) => {
  NProgress.start()
  let token =  Vue.ls.get('Access-Token')
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (token) {
    // has token
    if(to.path == '/login'){
      next('/dashboard/statistics')
    }else{
      next()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})
