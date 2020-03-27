<template>
  <v-toolbar color="primary" fixed dark app>
    <v-toolbar-title>
      <v-toolbar-side-icon @click="handleDrawerToggle" v-if="$route.name != 'ManageUsers'"></v-toolbar-side-icon>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn icon flat @click="$router.push({ name: 'ManageUsers' })">
        <v-icon medium>settings</v-icon>
      </v-btn>
      <!-- <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator">
          <v-badge color="red" overlap>
            <span slot="badge" v-if="getDataUserProfile.unreadReceivedMessages > 0">{{getDataUserProfile.unreadReceivedMessages}}</span>
            <v-icon medium>notifications</v-icon>
          </v-badge>
        </v-btn>
        <notification-list></notification-list>
      </v-menu> -->
      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
        <v-btn icon large flat slot="activator">
          <v-avatar size="30px">
            <img v-bind:src="getDataUserProfile.avatarURL || '/static/avatar/default.png'" alt="Logged in user" />
          </v-avatar>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile
            v-for="(item, index) in items"
            :to="!item.href ? { name: item.name } : null"
            :href="item.href"
            @click="item.click"
            ripple="ripple"
            :disabled="item.disabled"
            :target="item.target"
            rel="noopener"
            :key="index"
          >
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import NotificationList from "@/components/widgets/list/NotificationList"
import Util from "@/util"
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "AdminToolbar",
  components: {
    NotificationList
  },
  data() {
    return {
      items: [
        {
          icon: "account_circle",
          href: "/users/account",
          title: "Profile",
          click: this.handleProfile
        },
        {
          icon: "fullscreen_exit",
          href: "/admin/auth/login",
          title: "Logout",
          click: this.handleLogut
        }
      ]
    }
  },
  computed: {
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    }),
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav
    }
  },
  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    handleDrawerToggle() {
      this.setDrawer(!this.$store.state.app.showDrawer);
    },
    handleFullScreen() {
      Util.toggleFullScreen()
    },
    handleLogut() {
      //handle logout
      localStorage.removeItem('token');
      this.$router.push({name: "adminLogin"});
    },
    handleSetting() {},
    handleProfile() {}
  }
}
</script>
