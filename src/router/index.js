import Vue from 'vue'
import Router from 'vue-router'
import {routes} from '../application/index'
Vue.use(Router)

export const router = new Router({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (window.sessionStorage.getItem('userId')) {
      next()
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
export default router
