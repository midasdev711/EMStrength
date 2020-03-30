<template>
  <v-card>
    <v-flex row id="delete-button">
      <v-btn color="primary" @click="confirmdialog = true" :loading="loading">Delete selected</v-btn>
    </v-flex>
    
    <v-dialog v-model="confirmdialog" max-width="290">
      <v-card>
        <v-card-text>Are you sure you want to delete {{deleteNumber}} users?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="confirmdialog = false; releaseSelect()"
          >Cancel</v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="confirmdialog = false;deleteSelected()"
          >Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-flex row layout>
      <v-flex lg6 xs12>
        <v-text-field label="Search" v-model="search.username" append-icon="search" class="search-text"></v-text-field>
      </v-flex>
      <v-flex lg6 xs12>
        <v-select
          :items="getGroupData"
          item-text="title"
          item-value="title"
          label="Group"
          v-model="search.selectedGroup"
        ></v-select>
      </v-flex>
    </v-flex>
    
    <v-data-table
      :headers="headers"
      :items="getUserData"
      :items-per-page="10"
      :total-items="total"
      item-key="userId"
      :pagination.sync="pagination"
      :search="search"
      :custom-filter="userFilter"
      ref="studentsTable"
      class="table text-xs-center"
    >
      <template v-slot:items="props">
        <td>
          <v-checkbox
            background-color="white"
            color="success"
            v-model="props.item.checkbox"
            @change="countSelected()"
          />
        </td>
        <td @click="goToAccount(props.item)">{{ props.item.fullName }}</td>
        <td @click="goToAccount(props.item)">{{ props.item.email }}</td>
        <td @click="goToAccount(props.item)">{{ props.item.groupName }}</td>
        <td @click="goToAccount(props.item)">{{ props.item.groupJoined | formatDate }}</td>
      </template>
      <template slot="no-data">
        <div class="text-xs-center">no matching users in the list</div>
      </template>
    </v-data-table>
    {{getUserData.length}} users in the list
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "UserList",
  //:items="$store.state.app.users"
  data() {
    return {
      total: 0,
      loading: false,
      deleteNumber: 0,
      confirmdialog: false,
      dialog: false,
      count: 15,
      page: 1,
      headers: [
        {
          text: " ",
          align: "left",
          sortable: false,
          value: "checkbox"
        },
        { text: "User Name", value: "fullName" },
        { text: "Email", value: "email" },
        { text: "Group Name ", value: "groupName" },
        { text: "Created", value: "groupJoined" }
      ],
      pagination: {
        sortBy: "fullName",
        rowsPerPage: 10
      },
      filters: {
        search: ""
      },
      search: {
        username: "",
        selectedGroup: ""
      },
      user_data: [],
      loading: false
    };
  },
  computed: {
    ...mapGetters("admin", {
      getUserData: "getUserData",
      getGroupData: "getGroupData"
    })
  },
  methods: {
    ...mapActions("admin", {
      deleteUser: "deleteUser"
    }),
    releaseSelect() {
      this.deleteNumber = 0;
      for (let i = 0; i < this.getUserData.length; i++) {
        this.getUserData[i].checkbox = false;
      }
    },
    countSelected() {
      let delList = this.getUserData.filter(el => {
        return el.checkbox == true;
      });
      this.deleteNumber = delList.length;
    },
    deleteSelected() {
      let delList = this.getUserData.filter(el => {
        return el.checkbox == true;
      });
      this.deleteNumber = delList.length;
      this.loading = true;
      return this.deleteUser(delList[0].id)
        .then(result => {
          console.log(result);
          this.loading = false;
          this.deleteNumber = 0;
        })
        .catch(e => {
          console.log(e);
        });
    },
    goToAccount(user) {
      this.$router.push({
        name: "AdminSummary",
        query: {
          groupName: user.groupName,
          userId: user.id,
          user: user.fullName,
          type: "user",
          lastCompleted: user.lastCompleted
        }
      });
    },
    userFilter(items, search, filter) {
      var username = search.username.toString().toLowerCase();
      var selectedGroup = search.selectedGroup;
      return items.filter(row => {
        if (row['fullName'] && row['fullName'].toLowerCase().includes(username)) {
          if (row['groupName'] && selectedGroup && row['groupName'].includes(selectedGroup)) {
            return row
          } else if (selectedGroup == "") {
            return row
          }
        }
      });
    },

    send_request() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        this.page = page;
        this.count = rowsPerPage;
        var sorting = "";
        if (descending == true) {
          sorting = "-" + sortBy;
        } else {
          sorting = sortBy;
        }
        if (this.count == -1) this.count = this.total;
        this.$store
          .dispatch("admin/getusers", {
            Count: this.count,
            Page: this.page,
            Search: this.search,
            Sort: sorting
          })
          .then(resp => {
            console.log(resp.data);
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
    }
  },
  filters: {
    formatDate(date) {
      if (!date) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD hh:mm:ss");
    },
    formatDateOnly(date) {
      return moment(date).format("YYYY-MM-DD");
    }
  },
  watch: {
    pagination: {
      handler() {
        this.send_request().then(data => {
          this.user_data = data.items;
          this.total = data.total;
        });
      },
      deep: true
    },
    search: {
      handler() {
        this.send_request().then(data => {
          this.user_data = data.items;
          this.total = data.total;
        });
      }
    }
  },
  mounted() {
    this.send_request().then(data => {
      this.user_data = data.items;
      this.total = data.total;
      console.log("Mounted user_data: " + this.user_data);
    });
  }
};
</script>

<style lang="stylus" scoped>
>>>#delete-button {
  text-align right
}

.table .v-input--checkbox .v-input__slot {
  margin-bottom: -10px;
}

>>> table.v-table th {
  padding: 0.5em !important;
  text-align: center !important;
}

table.v-table td {
  padding: 0.5em !important;
  text-align: center;
}

.table th:first-child {
  padding: 0;
}

.v-input--selection-controls:not(.v-input--hide-details) >>> .v-input__slot {
  margin-bottom: 0;
}

>>> .v-input--selection-controls__ripple {
  margin: 0;
}

.v-input--selection-controls:not(.v-input--hide-details)
  >>> .v-input--selection-controls__input {
  margin: 0;
}
</style>