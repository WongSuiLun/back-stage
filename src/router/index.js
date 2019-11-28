import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './router.config'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const createRouter = () => new Router({
  routes: constantRouterMap
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
