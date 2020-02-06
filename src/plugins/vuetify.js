import Vue from "vue"
import Vuetify from "vuetify/lib"
import "../theme/default.styl"


Vue.use(Vuetify, {
  theme: {
    primary: "#1c4698",
    secondary: "#47bbe9",
    accent: "#48cba2",
    error: "#f44336",
    warning: "#213060",
    info: "#00a38a",
    success: "#48cba2",
    subheading1: "#48cba2",
    subheading2: "#00a38a",
    subheading3: "#47bbe9",
    "heading-font-family": 'Muli'

  },
  customProperties: true
})
