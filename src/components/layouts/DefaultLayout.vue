<template>

  <v-app id="inspire" class="app dashboard">
    <span class="bg origin"></span>
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

 /* body {
  background-image: url("/img/Eden-4.png");
  background-repeat: no-repeat;
  background-position: right bottom;
  margin-right: 200px;
} */

.bg {
  background-position: right 0px bottom 0px;
    width: 200px;
    height: 200px;
    position: absolute;
    left: calc(100% - 200px);
    bottom: 0;
    background: url( '/img/Corner-Graphic-2.png') no-repeat bottom right;
    background-size: cover;
    /* background-color: red;*/
    transform: scale(1.0);
    box-sizing: border-box;
  }

.origin {
  /* padding: 15px; */
  background-origin: content-box;
  background-position: 100% 100%;
}
</style>
