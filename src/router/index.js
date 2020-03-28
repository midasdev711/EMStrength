import Vue from "vue"
import Router from "vue-router"
import store from '@/store'
import { publicRoute, protectedRoute } from "./config"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
const routes = publicRoute.concat(protectedRoute)

Vue.use(Router)
const router = new Router({
  mode: "history",
  linkActiveClass: "active",
  routes: routes
})
// router gards
router.beforeEach((to, from, next) => {
  NProgress.start()
  //auth route is authenticated
  if (to.matched.some((m) => m.meta.requiresAuth)) {
    store.dispatch('app/disableNotification')
    var token = localStorage.getItem('token');
    
    if (!token && to.name !== 'Login') {
      next({ name: 'Auth' })
    }
  }

  // if (to.matched.some((m) => m.meta.onlyAdmin)) {
  //   store.dispatch('app/disableNotification')
  //   if (store.getters['auth/getUserType'] != 'Admin' && to.name !== 'Login' && from.name !== null) {
  //     next({ name: 'Forbidden' })
  //   }
  // }

  // if (to.matched.some((m) => m.meta.onlyUser)) {
  //   store.dispatch('app/disableNotification')
  //   if (store.getters['auth/getUserType'] != 'User' && to.name !== 'Login' && from.name !== null) {
  //     next({ name: 'Forbidden' })
  //   }
  // }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
