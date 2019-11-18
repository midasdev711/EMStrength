<template>
  <v-app class="app dashboard">
    <admin-drawer class="app--drawer"></admin-drawer>
    <admin-toolbar class="app--toolbar"></admin-toolbar>
    <v-content>
      <h1 v-if="$vuetify.breakpoint.smAndUp && $route.meta.title" class="mt-4 ml-4">{{ $route.meta.title }}</h1>
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
