<template>
  <v-navigation-drawer
    class="app--drawer"
    :mini-variant.sync="mini"
    app
    v-model="inputValue"
    width="300"
  >
    <v-toolbar color="primary darken-1" dark>
      <img src="/img/EH-LL-W@3x.png" height="57" alt="EnergyHealth" />
    </v-toolbar>
    <v-tabs v-model="active" :hide-slider="true">
      <v-container pt-0 pb-0 ml-0 mr-0>
        <v-tab>SUBMISSIONS</v-tab>
      </v-container>

      <v-tab-item>
        <v-container pt-2 pb-0>
          <v-text-field
            flat
            prepend-inner-icon="search"
            label="Search user"
            clearable
            class="search"
            v-model="messageFilters.ForUserName"
          ></v-text-field>
          <v-select
            name="group_2"
            :items="getGroupData"
            item-text="title"
            item-value="title"
            v-model="messageFilters.ForUserGroupId"
            @change="selectGroup"
            clearable
            label="Group"
          ></v-select>
        </v-container>
        <v-data-table
          :items="activeUsers"
          :search="messageFilters"
          :custom-filter="messageFilter"
          hide-actions
        >
          <template v-slot:items="props">
            <td class="pr-1" @click="switchUser(props.item)">
              {{ props.item.Completed  | fromNow }} 
              <br />
              @ {{ props.item.Completed | hour }}
            </td>
            <td class="pr-1 pl-1" @click="switchUser(props.item)">
              {{ props.item.ForUserName }} {{ props.item.ForUserAge }}yo
              <br />
              {{ props.item.ForUserOccupation }} ({{ props.item.ForUserGroupName }})
            </td>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs>
  </v-navigation-drawer>
</template>
<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import { EventBus } from "../../util/event-bus";
import store from "@/store";

import moment from "moment";

export default {
  name: "AdminDrawer",
  data() {
    return {
      weekNo: null,
      groupId: null, //DONE: set when selected
      search: null, // searched string OR group setting
      mini: false,
      active: null,
      group: null,
      filters: {
        group: ""
      },
      groups: ["Group", "Group A", "Group B", "Group C"],
      headers: [
        {
          text: "",
          value: "group"
        }
      ],
      items: [],
      users: [
        {
          uuid: "",
          name: "",
          email: "",
          username: "",
          userType: "",
          groupName: "",
          dateJoined: "",
          jobTitle: "",
          phone: "",
          avatar: "",
          checkbox: false
        }
      ],
      reviewCount: 0,
      bottom: false,
      left: false,
      overlap: false,
      loading: false,
      group_sel: "", //TODO: there should be single dropdown in the UI
      group_sel2: null,

      message_thread: [],
      messageFilters: {
        ForUserName: "",
        ForUserGroupId: ""
      }
    };
  },
  computed: {
    ...mapGetters("admin", {
      getGroupData: "getGroupData",
      getUserData: "getUserData",
      getSubmissionList: "getSubmissionList"
    }),
    ...mapState("admin", ["color"]),
    activeUsers() {
      if (this.search !== null) {
        let search = this.search.toString().toLowerCase();
        const filtered = this.getSubmissionList.filter(
          d =>
            d.ForUserName.toLowerCase().includes(search) && d.archived == null
        );
        return filtered;
      }
      return this.getSubmissionList;
    },

    inputValue: {
      get() {
        return this.$store.state.app.showDrawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    }
  },
  filters: {
    fromNow(time) {
      const date = moment(time);
      return date.fromNow();
    },
    hour(time) {
      const date = moment(time);
      return date.format("HH:mm");
    }
  },
  watch: {
    group_sel(newValue, oldValue) {
      var x = newValue;
    }
  },
  methods: {
    ...mapActions("admin", {
      getgroups: "getgroups",
      getusers: "getusers",
      getSubmissionFilter: "getSubmissionFilter"
    }),

    ...mapActions("app", {
      _clearAnswersData: "clearAnswersData"
    }),

    ...mapMutations("admin", ["setDrawer", "toggleDrawer"]),

    getGroupList() {
      this.loading = true;

      var params = {
        Count: 999,
        Page: 1,
        Search: "",
        Sort: ""
      };
      return this.getgroups(params)
        .then(res => {
          return res;
        })
        .catch(e => {
          return e;
        });
    },

    getUserList() {
      this.loading = true;

      var params = {
        Count: 999,
        Page: 1,
        Search: "",
        Sort: ""
      };
      return this.getusers(params)
        .then(res => {
          return res;
        })
        .catch(e => {
          return e;
        });
    },

    messageFilter(items, messageFilters, filter) {
      var filteredItems = items.filter(item => true);
      var userNameFilter = !messageFilters.ForUserName
        ? ""
        : messageFilters.ForUserName.trim().toLowerCase();
      filteredItems =
        userNameFilter === ""
          ? filteredItems
          : filteredItems.filter(item =>
              item.ForUserName.toLowerCase().includes(userNameFilter)
            );
      var ForUserGroupId = messageFilters.ForUserGroupId;
      filteredItems =
        !ForUserGroupId || ForUserGroupId.length === 0
          ? filteredItems
          : filteredItems.filter(item => item.ForUserGroupName === ForUserGroupId);

      return filteredItems;
    },

    selectGroup() {
      this._clearAnswersData();
      let index;
      for (let i = 0; i < this.getGroupData.length; i++) {
        const element = this.getGroupData[i];
        if (element["title"] == this.messageFilters.ForUserGroupId) {
          index = element["id"];
        }
      }
      this.$router.push({
        name: "AdminSummary",
        query: {
          groupName: this.messageFilters.ForUserGroupId,
          groupId: index,
          type: "group"
        }
      });
    },

    switchUser(item) {
      this._clearAnswersData();
      if (this.messageFilters.ForUserGroupId) {
        let index;
        for (let i = 0; i < this.getGroupData.length; i++) {
          const element = this.getGroupData[i];
          if (element["title"] == this.messageFilters.ForUserGroupId) {
            index = element["id"];
          }
        }
        this.$router.push({
          name: "AdminSummary",
          query: {
            groupName: item.ForUserGroupName,
            groupId: index,
            userId: item.ForUserId,
            user: item.ForUserName,
            type: "groupuser",
            lastCompleted: item.Completed
          }
        });
      } else {
        this.$router.push({
          name: "AdminSummary",
          query: {
            groupName: item.ForUserGroupName,
            userId: item.ForUserId,
            user: item.ForUserName,
            type: "user",
            lastCompleted: item.Completed
          }
        });
      }

      EventBus.$emit("admin-drawer-switch-user", item);
    },
    switchChat(item) {
      //this.$router.push({ name: 'CoachingFeedbackAdmin', query: { userId: item.userId, user: item.fullName, group: item.groupId } })
    }
  },
  mounted() {
    if (this.getGroupData.length == 0) {
      this.getGroupList();
    }

    var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    this.$nextTick(() => {
      if (iOS) {
        for (let i = 0; i < this.$el.getElementsByClassName('v-list__tile').length ; i ++) {
          let element = this.$el.getElementsByClassName('v-list__tile')[i];
          element.addEventListener("mouseenter", function( event ) {   
            element.click();
          }, false);
        }
      }
    })

    if (this.getSubmissionList.length == 0) {
      this.getSubmissionFilter().then(res => {
        if (this.getSubmissionList.length > 0) {
          let element = this.getSubmissionList[0];
          this.$router.push({
            name: "AdminSummary",
            query: {
              groupName: element.ForUserGroupName,
              userId: element.ForUserId,
              user: element.ForUserName,
              type: "user",
              lastCompleted: element.Completed
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="stylus">
.app--drawer .v-tabs__wrapper--show-arrows {
  margin: 0;
}

.app--drawer .v-datatable {
  cursor: pointer;

  thead {
    display: none;
  }

  tr:hover td:last-child {
    position: relative;

    &:after {
      content: '▸';
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
}

.v-tabs__icon {
  display: none !important;
}

.pr-1 {
  padding-right: 10px;
}

.pl-1 {
  padding-right: 10px;
}
</style>