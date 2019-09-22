import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './router.config'

Vue.use(Router)

const createRouter = () => new Router({
  routes: []
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

export default router
// export default new Router({
//   routes: constantRouterMap
// })
