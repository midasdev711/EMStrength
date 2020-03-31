<template>
  <v-app class="app without-drawer">
    <div class="without-drawer__logo left">
      <img src="/img/EH-LL-W.png" height="56" alt="EnergyHealth" />
    </div>
    <admin-toolbar class="app--toolbar"></admin-toolbar>
    <v-content>
      <h1 v-if="$vuetify.breakpoint.smAndUp && $route.meta.title" class="mt-4 ml-4 text-xs-center">{{ $route.meta.title }}</h1>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AdminDrawer from "@/components/core/AdminDrawer"
import AdminToolbar from "@/components/core/AdminToolbar"

export default {
  components: {
    AdminDrawer,
    AdminToolbar
  }
}
</script>

<style lang="stylus">
.without-drawer
  &__logo
    position: fixed
    padding: 8px 24px
    z-index: 100
</style>

