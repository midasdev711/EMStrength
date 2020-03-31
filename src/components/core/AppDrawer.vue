<template>
  <v-navigation-drawer class="app--drawer" :mini-variant.sync="mini" app v-model="inputValue" width="250">
    <v-toolbar color="primary darken-1" dark>
      <img src="/img/EH-LL-W@3x.png" height="57" alt="EnergyHealth" />
    </v-toolbar>
    <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
      <v-list dense expand>
        <template v-for="item in menus">
          <!--group with subitems-->
          <v-list-group
            v-if="item.items"
            :key="item.key"
            :group="item.group"
            :prepend-icon="item.icon"
            no-action="no-action"
          >
            <v-list-tile slot="activator" ripple="ripple">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <template v-for="subItem in item.items">
              <!--sub group-->
              <v-list-group v-if="subItem.items" :key="subItem.key" :group="subItem.group" sub-group="sub-group">
                <v-list-tile slot="activator" ripple="ripple">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile
                  v-for="grand in subItem.children"
                  :key="grand.name"
                  :to="genChildTarget(item, grand)"
                  :href="grand.href"
                  ripple="ripple"
                >
                  <v-list-tile-content>
                    <v-list-tile-title>{{ grand.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-group>
              <!--child item-->
              <v-list-tile
                v-else
                :key="subItem.name"
                :to="genChildTarget(item, subItem)"
                :href="subItem.href"
                :disabled="subItem.disabled"
                :target="subItem.target"
                ripple="ripple"
              >
                <v-list-tile-content>
                  <v-list-tile-title>
                    <span>{{ subItem.title }}</span>
                  </v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action v-if="subItem.action">
                  <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list-group>
          <v-subheader v-else-if="item.header" :key="item.key">{{ item.header }}</v-subheader>
          <v-divider v-else-if="item.divider" :key="item.key"></v-divider>
          <!--top-level link-->
          <v-list-tile
            v-else
            :to="!item.href ? { name: item.name } : null"
            :href="item.href"
            ripple="ripple"
            :disabled="item.disabled"
            :target="item.target"
            rel="noopener"
            :key="item.key"
          >
            <v-list-tile-action v-if="item.icon">
              <v-badge v-if="item.badge" color="red" overlap>
                <span slot="badge">{{ item.badge }}</span>
              </v-badge>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.title }}
                <v-icon v-if="item.target" class="ml-3">open_in_new</v-icon>
              </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="item.subAction">
              <v-icon class="success--text">{{ item.subAction }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
</template>
<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
import menu from "@/api/menu"
import VuePerfectScrollbar from "vue-perfect-scrollbar"

export default {
  name: "AppDrawer",
  components: {
    VuePerfectScrollbar
  },
  data() {
    return {
      mini: false,
      menus: [],
      scrollSettings: {
        maxScrollbarLength: 160
      }
    }
  },
  computed: {
    ...mapState("app", ["color"]),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    }),
    inputValue: {
      get() {
        return this.$store.state.app.showDrawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    }

  },
  watch: {
    getDataUserProfile(newObj, oldObj) {
      if(!newObj){
        return;
      }
      this.updateBadgeValues();
    }
  },
  created() {},

  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    
    genChildTarget(item, subItem) {
      if (subItem.href) return
      if (subItem.component) {
        return {
          name: subItem.component
        }
      }
      return { name: `${item.group}/${subItem.name}` }
    },
    updateBadgeValues() {
      this.menus.forEach(menuItem => {
        switch (menuItem.badgeType) {
          case "UnreadReceivedMessages":
            menuItem.badge = this.getDataUserProfile.unreadReceivedMessages;
            break;
        
          default:
            break;
        }
      });
    }
  },
  mounted() {
    this.menus = menu;
    this.updateBadgeValues();
  }
}
</script>

<style lang="stylus" scoped>
.app--drawer
  overflow: hidden
  .drawer-menu--scroll
    // height: calc(100vh - 48px)
    padding-top 20px
    overflow: auto
  .v-list__tile__action i
    margin auto
  .v-list__tile--active
    background-color: #ddd;
  .v-badge
    top: -3px
    left: -15px
</style>
