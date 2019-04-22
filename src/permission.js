import router from '@/router'
import store from '@/store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start()
  let token = store.getters.getToken
  if (token) {
    next()
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
