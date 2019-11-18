<template>
  <v-navigation-drawer class="app--drawer" :mini-variant.sync="mini" app v-model="inputValue" width="300">
    <v-toolbar color="primary darken-1" dark>
      <img src="/img/logo.png" height="36" alt="EnergyHealth" />
    </v-toolbar>
    <v-tabs
      v-model="active"
      :hide-slider="true">
      <v-container pt-0 pb-0 ml-0 mr-0>
        <v-tab>
          <v-badge
            :bottom="bottom"
            :color="'rgba(100, 100, 200, 0.8)'"
            :left="left"
            :overlap="overlap"
            class="align-self-center"
          >
            <template v-slot:badge v-if="reviewCount > 0">
              <span>{{reviewCount}}</span>
            </template>
            To be reviewed
          </v-badge>
        </v-tab>
        <v-tab>
          Messages
        </v-tab>
        
      </v-container>

      <v-tab-item>
        <v-container pt-2 pb-0>
          <v-select
            name="group_1"
            :items="getGroupData"
            item-text="title"
            item-value="id"
            v-model="group_sel"
            clearable
            label="Group"></v-select>
 
        </v-container>
        <v-data-table
          :search="group_sel"
          :items="reviewList"
          :custom-filter="filterWeeklyData"
          hide-actions>
          <template v-slot:items="props" >
            <td @click="switchUser(props.item)" v-if="!props.item.reviewed">{{ props.item.submitted | fromNow }}<br/>@ {{ props.item.submitted | hour }} </td>
            <td @click="switchUser(props.item)" v-if="!props.item.reviewed">{{ props.item.fullName }}<br>{{ props.item.groupName }}</td>
          </template>
        </v-data-table>
      </v-tab-item>

      <v-tab-item>
        <v-container pt-2 pb-0>
          <v-text-field
            flat
            prepend-inner-icon="search"
            label="Search user"
            clearable
            class="search"
            v-model="messageFilters.userName"
          ></v-text-field>
          <v-select
            name="group_2"
            :items="getGroupData"
            item-text="title"
            item-value="id"
            v-model="messageFilters.groupId"
            clearable
            label="Group">
          </v-select>
        </v-container>
        <v-data-table
          :items="activeUsers"
          :search="messageFilters"
          :custom-filter="messageFilter"
          hide-actions>
          <template v-slot:items="props">
            <td @click="switchChat(props.item)">{{ props.item.submitted | fromNow }}<br/>@ {{ props.item.submitted | hour }}</td>
            <td @click="switchChat(props.item)">{{ props.item.fullName }}<br>{{ props.item.groupName }}</td>
          </template>
        </v-data-table>
        <div class="text-xs-center mt-4 mb-2">Archived</div>
        <v-data-table
          :headers="headers"
          :items="archivedUsers"
          :search="messageFilters"
          :custom-filter="messageFilter"
          hide-actions>
          <template v-slot:items="props">
            <td @click="switchChat(props.item)">{{ props.item.submitted | fromNow }}<br/>@ {{ props.item.submitted | hour }}</td>
            <td @click="switchChat(props.item)">{{ props.item.fullName }}<br>{{ props.item.groupName }}</td>
          </template>
        </v-data-table>
      </v-tab-item>

    </v-tabs>

  </v-navigation-drawer>
</template>
<script>

import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import { EventBus } from '../../util/event-bus';
import store from '@/store'

import moment from 'moment'

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
        group: ''
      },
      groups: ['Group', 'Group A', 'Group B', 'Group C'],
      headers: [
        {
          text: '',
          value: 'group'
        }
      ],
      items: [],
      users: [{
        uuid: "",
        name: "",
        email: "",
        username: "",
        userType: '',
        groupName: '',
        dateJoined: '',
        jobTitle: "",
        phone: "",
        avatar: "",
        checkbox: false
      }],
      reviewCount: 0,
      bottom: false,
      left: false,
      overlap: false,
      loading: false,
      group_sel: '', //TODO: there should be single dropdown in the UI
      group_sel2: null,
      group_list: [], //TODO swap to getGroupList
      review_list: [], //TODO swap to getReviewList
      message_list: [], //TODO swap to getMessageList
      message_thread: [],
      messageFilters: {
        userName: "",
        groupId: ""
      }
    }
  },
  computed: {
    ...mapGetters("admin", {
      checkoutStatus: "getCheckoutStatus",
      getGroupData: "getGroupData",
      reviewList: "getReviewData",
      messageList: "getMessageList"
    }),
    ...mapState("admin", ["color"]),
    activeUsers() {
      if (this.search !== null) {
        let search = this.search.toString().toLowerCase();
        const filtered = this.message_list.filter(d => d.fullName.toLowerCase().includes(search) && d.archived == null);
        return filtered;
      }
      return this.message_list.filter(d => d.archived == null);
    },
    archivedUsers() {
      if (this.search !== null) {
        let search = this.search.toString().toLowerCase();
        const filtered = this.messageList.filter(d => d.fullName.toLowerCase().includes(search) && d.archived != null);
        return filtered;
      }
      return this.messageList.filter(d => d.archived != null);
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
    group_sel(newValue, oldValue){
      var x = newValue;
    }
  },
  methods: {
    ...mapActions("admin", {
      getCoachGroups: "getCoachGroups",
      getgroups: "getgroups",
      getReviewList: "getReviewList",
      getMessageList: "getMessageList",
    }),
    ...mapMutations("admin", ["setDrawer", "toggleDrawer"]),
    getGroupList() {
      this.loading = true;
      if (this.$store.state.auth.userProfile.userRoles.indexOf('Coach') > -1) {
        return this.getCoachGroups().then(res => {
          return res;
        }).catch(e => {
          return e;
        });
      }
      else {
        var params = {
            Count: 999,
            Page: 1,
            Search: "",
            Sort: "",
          };
        return this.getgroups(params).then(res => {
          return res;
        })
        .catch(e => {
          return e;
        });
      }
      
    },
    /*
    getMessagesForUser(userId) {
      this.loading = true;
      console.log("Show messages for userId: "+userId);
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("admin/getmessagesthread", {
            params: {
              UserId: userId,
              Count: 999,
              Page: 1,
              Search: "",
              Sort: "",
            }
          })
          .then(resp => {
            
            console.log("Messages: resp.data for items:");
            let items = resp.data;
            let total = resp.pagination.total;

            this.loading = false;
            resolve({
              items,
              total
            });
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      });
    },*/
    
    messageFilter(items, messageFilters, filter) {
      var filteredItems = items.filter(item => true);
      var userNameFilter = !messageFilters.userName ? "" : messageFilters.userName.trim().toLowerCase();
      filteredItems = userNameFilter === "" 
                        ? filteredItems 
                        : filteredItems.filter(item => item.fullName.toLowerCase().includes(userNameFilter));
      var groupId = messageFilters.groupId;
      filteredItems = (!groupId || groupId.length === 0)
                      ? filteredItems : filteredItems.filter(item => item.groupId === groupId);

      return filteredItems;

      //old code
      //group = group.toString().toLowerCase()
      //if (group === null) groupId = ''
      // use search string if group not used
      // if (groupId == null && search != null) groupId = this.search;
      // return items.filter(row => filter(row["groupId"], groupId))
    },
    switchUser(item) {
      this.$router.push({ name: 'DashboardAdmin', query: { userId: item.userId, user: item.fullName, weekId: item.weeklyDataId } })

      /*this.getMessagesForUser(item.userId)(data => {
         this.message_thread = data.items;
      });*/

      EventBus.$emit('admin-drawer-switch-user', item);
    },
    switchChat(item) {
      this.$router.push({ name: 'CoachingFeedbackAdmin', query: { userId: item.userId, user: item.fullName, group: item.groupId } })
    },
    filterWeeklyData(items, search, filter) {
      //search is groupId
      if(!search || search.length === 0){
        return items;
      }

      return items.filter(item => item.groupId === search);
    }
  }, 
  mounted () {
    if (this.getGroupData.length == 0) {
      this.getGroupList();
    }
    this.weekNo = moment().isoWeek();
    // this.getGroupList().then(data => {
    //   this.group_list = data.items;
    // });
    var params = {
      weekNo: this.weekNo,
      groupId: this.groupId
    };
    this.getReviewList(this.weekNo, this.groupId).then(data => {
      this.review_list = data;
      this.reviewCount = data.length;
      var routeQuery = this.$route.query;
      console.log(routeQuery);
      if (!routeQuery.userId && this.review_list.length > 0) {
        this.$router.push({ name: 'DashboardAdmin', query: { userId: this.review_list[0].userId, user: this.review_list[0].fullName, weekId: this.review_list[0].weeklyDataId } });
      }
      console.log(this.review_list);
    });
    this.getMessageList(this.weekNo, this.groupId).then(data => {
      this.message_list = data;
    });
    /*let userId = "";
    this.getMessagesForUser(userId).then(data => {
      this.message_thread = data.items;
    });*/
  },
}
</script>

<style lang="stylus">
.app--drawer .v-tabs__wrapper--show-arrows
  margin: 0;
.app--drawer .v-datatable
  cursor: pointer
  thead
    display: none
  tr:hover td:last-child
    position: relative
    &:after
      content "▸"
      position absolute
      right: 10px
      top: 10px
.v-tabs__icon
  display none!important
</style>