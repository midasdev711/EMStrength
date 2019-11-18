import Vue from "vue"
import App from "./App.vue"
import router from "./router/"
import store from "./store/"
import "./registerServiceWorker"
import "./plugins/vuetify"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "@openfonts/muli_latin"
import "font-awesome/css/font-awesome.css"
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/index.css'
import VueAzureUploader from 'vue-azure-blob-upload'

// Forms validation
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
Vue.use(VueToast, {
  // One of options
  position: 'top-right',
  duration: 2000
});

Vue.use(VueAzureUploader);

// if (window.localStorage.getItem('token')) {
//   store.commit('setToken', token)
// }
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
