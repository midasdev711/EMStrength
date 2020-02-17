<template>
  <v-container fluid grid-list-xl class="user-manage-section">
    <v-btn class="v-btn--back-link" @click="$router.push({ name: 'DashboardAdmin' });">Back to Dashboard</v-btn>
    <v-layout wrap>
      <v-flex xs12 lg5>
       
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
      </v-flex>
      <v-flex xs12 lg7>
        <v-tabs v-model="activeTab">
          <v-tab>Users</v-tab>
          <v-tab>Groups</v-tab>

          <v-tab-item>
            <UserList />
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
import CreateNewUser from "@/components/user/CreateNewUser"
import CreateNewGroup from "@/components/user/CreateNewGroup"
import CreateUserCodes from "@/components/user/CreateUserCodes"
import UserList from "@/components/user/UserList"
import GroupList from "@/components/user/GroupList"

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
      activeTab: null
    }
  }
}
</script>

<style scoped>
@media (max-width: 500px) {
  .user-manage-section {
    padding-top: 5em;
  }
}
</style>