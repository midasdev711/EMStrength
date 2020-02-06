<template>
  <div class="app-root" v-if="!appLoading">
    <router-view></router-view>
    <!-- global snackbar -->
    <v-snackbar :timeout="3000" bottom right :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>

//import * as components from './components/questionLayout'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: "App",
  data() {
    return {
      rightDrawer: false,
      snackbar: {
        show: false,
        text: "",
        color: ""
      },
      appLoading: true
    }
  },
  created() {
    // add app events
  },
  methods: {
    ...mapActions('auth', {getMe: "getMe"}),
    openThemeSettings() {
      this.$vuetify.goTo(0)
      this.rightDrawer = !this.rightDrawer
    }
  },
  async created () {
    try {
      await this.getMe();
      this.appLoading = false;
    } catch (err) {
      // lgoout
    }
  },
  mounted () {
    
  }
}
</script>

<style>
.body {
  font-family: 'Muli' !important;
} 

.application {
  font-family: 'Muli' !important;
}
.headline,
.title,
.subheading {
  font-family: 'Muli' !important;
}

.v-slider__thumb-label {
  font-size: 10px !important;
}
.dev-hint {
  color:rgba(238, 238, 238, 0.089);
}

</style>
