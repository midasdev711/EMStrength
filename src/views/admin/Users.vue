<template>
  <v-container fluid grid-list-xl class="user-manage-section">
    <v-btn
      class="v-btn--back-link"
      @click="$router.push({ name: 'DashboardAdmin' });"
    >Back to Dashboard</v-btn>
    <v-layout wrap>
      <!-- <v-flex xs12 lg5>
       
        <CreateNewGroup @switchTab="activeTab = 1" />
        <div>
          <p></p>
        </div>
        <CreateUserCodes @switchTab="activeTab = 1" />
        <div>
          <p></p>
<p></p>
<p></p>
        </div>
         <CreateNewUser @switchTab="activeTab = 2" class="mb-4" />
      </v-flex>-->
      <v-flex xs12 lg12>
        <v-tabs v-model="activeTab">
          <v-tab>Users</v-tab>
          <v-tab>Groups</v-tab>

          <v-tab-item>
            <UserList />
            <v-card>
              <v-layout>
                <v-flex xs12 md2>
                  <v-text-field v-model="codeCount" :counter="10" label="How many" required></v-text-field>
                </v-flex>

                <v-flex xs12 md3>
                  <v-select
                    :items="getGroupData"
                    item-value="id"
                    item-text="title"
                    label="For group"
                    v-model="groupId"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md3>
                  <v-btn color="success" @click="generateUserCode()">Create</v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <GroupList />
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CreateNewUser from "@/components/user/CreateNewUser";
import CreateNewGroup from "@/components/user/CreateNewGroup";
import CreateUserCodes from "@/components/user/CreateUserCodes";
import UserList from "@/components/user/UserList";
import GroupList from "@/components/user/GroupList";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Users",
  components: {
    CreateNewUser,
    CreateNewGroup,
    CreateUserCodes,
    UserList,
    GroupList
  },
  data() {
    return {
      activeTab: null,
      valid: false,
      codeCount: null,
      groupId: null,
      loading: false
    };
  },
  methods: {
    ...mapActions("admin", {
      getgroups: "getgroups",
      getusers: "getusers"
    }),

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
    generateUserCode(step) {
      console.log(step);
    }
  },
  computed: {
    ...mapGetters("admin", {
      getGroupData: "getGroupData",
      getUserData: "getUserData"
    })
  },
  mounted() {
    if (this.getGroupData.length == 0) {
      this.getGroupList();
    }

    if (this.getUserData.length == 0) {
      this.getUserList();
    }
  }
};
</script>

<style scoped>
@media (max-width: 500px) {
  .user-manage-section {
    padding-top: 5em;
  }
}
</style>