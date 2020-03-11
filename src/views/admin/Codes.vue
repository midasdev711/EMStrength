<template>
  <v-container fluid grid-list-xl class="user-manage-section">
    <v-layout wrap>
      <v-flex xs12 lg12>
        Codes list
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Codes",
  components: {
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