import router from '@/router'
import store from '@/store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration


import { asyncRouterMap } from '@/router/router.config'
router.addRoutes(asyncRouterMap)

import {setDocumentTitle,domTitle} from '@/utils/domUtil'

router.beforeEach((to, from, next) => {
  NProgress.start()
  let token = store.getters.getToken
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (token) {
    next()
    NProgress.done()
  } else {
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
