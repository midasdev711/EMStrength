import Vue from "vue"
import Vuetify from "vuetify/lib"
import "../theme/default.styl"
Vue.use(Vuetify, {
  theme: {
    primary: "#2196f3",
    secondary: "#3f51b5",
    accent: "#e91e63",
    error: "#f44336",
    warning: "#00bcd4",
    info: "#4caf50",
    success: "#009688"
  },
  customProperties: true
})
