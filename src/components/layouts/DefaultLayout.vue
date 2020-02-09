<template>
  <v-app id="inspire" class="app dashboard">
    <app-drawer class="app--drawer"></app-drawer>
    <app-toolbar class="app--toolbar"></app-toolbar>
    <v-content>
      <h1 v-if="$vuetify.breakpoint.smAndUp && $route.meta.title" class="mt-4 ml-4 page-title" v-bind:style="{'font-family': $vuetify.theme['heading-font-family']}">{{ $route.meta.title }}</h1>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppDrawer from "@/components/core/AppDrawer"
import AppToolbar from "@/components/core/AppToolbar"

export default {
  components: {
    AppDrawer,
    AppToolbar
  }
}
</script>

<style lang="css">
 .page-title {
   font-weight: 800;
   color: #1c4698;
 } 
</style>
