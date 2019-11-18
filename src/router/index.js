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

    console.log(store.getters['auth/getIsLogined']);

    var token = localStorage.getItem('token');
    
    // if (!store.getters['auth/getIsLogined'] && to.name !== 'Login') {
    //   next({ name: 'Auth' })
    // }

    if (!token && to.name !== 'Login') {
      next({ name: 'Auth' })
    }

    // if (needSubscription() && to.name !== 'Subscription') {
    //   next({ name: 'Subscription' })
    // }
  }

  // if (to.path === '/logout') {
  //   store.dispatch('entities/auth/logout')
  //   next({ name: 'Login' })
  // }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
