<template>
  <v-app class="">
    <v-toolbar color="primary darken-1" dark>
      <img src="/img/EH-LL-W.png" height="56" alt="EnergyHealth" />
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
          <v-btn icon large flat slot="activator" @click="enableNotification">
            <v-icon>info_outline</v-icon>
          </v-btn>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout  justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <router-view :key="$route.path"></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data: () => ({}),

  methods: {
    ...mapActions("app", {
      enableNotification: "enableNotification"
    })
  }
}
</script>
<style scoped lang="css">
.split-bg {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
