import Vue from "vue"
import Vuex from "vuex"
import app from "./modules/app"
import auth from "./modules/auth"
import admin from "./modules/admin"

Vue.use(Vuex)

export default new Vuex.Store({
  namespace: true,
  modules: {
    app,
    auth,
    admin
  }
})
