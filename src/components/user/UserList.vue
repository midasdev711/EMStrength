<template>
  <v-card>
    <v-btn color="primary right" @click="confirmdialog = true" :loading="loading">Delete selected</v-btn>
    <v-dialog
      v-model="confirmdialog"
      max-width="290"
    >
      <v-card>

        <v-card-text>
          Are you sure you want to delete {{deleteNumber}} users?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="confirmdialog = false; releaseSelect()"
          >
            Cancel
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="confirmdialog = false;deleteSelected()"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-text-field
      label="Search"
      v-model="search"
      append-icon="search"
      class="search-text"></v-text-field>
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
      class="table text-xs-center">
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
        <td @click="goToAccount(props.item)">{{ props.item.userType }}</td>
        <td @click="goToAccount(props.item)">{{ props.item.email }}</td>
        <td @click="goToAccount(props.item)">{{ props.item.groupName }}</td>
        <td @click="goToAccount(props.item)">{{ props.item.groupJoined }}</td>
      </template>
      <template slot="no-data">
        <div class="text-xs-center"> no matching users in the list</div>
      </template>
    </v-data-table>
    {{getUserData.length}} users in the list
  </v-card>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

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
        { text: "Name ", value: "fullName" },
        { text: "User type ", value: "userType" },
        { text: "Email address", value: "email" },
        { text: "Group name ", value: "groupName" },
        { text: "Date joined", value: "groupJoined" }
      ],
      pagination: {
        sortBy: 'fullName',
        rowsPerPage: 10
      },
      filters: {
        search: ''
      },
      search: '',
      user_data: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters("admin", {
      getUserData: "getUserData",
    }),
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
      return this.deleteUser(delList[0].id).then(result => {
        console.log(result);
        this.loading = false;
        this.deleteNumber = 0;
      }).catch( e => {
        console.log(e);
      });
    },
    goToAccount(user) {
      this.$router.push({ name: 'UserAccount', query: { userId: user.id, user: user.fullName } });
    },
    userFilter(items, search, filter) {
      search = search.toString().toLowerCase()
      return items.filter(row => filter(row["fullName"], search))
    },
    /*deleteSelected() {
      this.$store.state.app.users = this.$store.state.app.users.filter(el => {
        return el.checkbox === false;
      })
    },*/

    send_request() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        this.page = page;
        this.count = rowsPerPage;
        var sorting = "";
        if (descending == true) 
        {
          sorting = "-" + sortBy;          
        } else {
          sorting = sortBy;
        }
        if (this.count == -1) this.count = this.total;
        this.$store
          .dispatch("admin/getusers", {
            params: {
              Count: this.count,
              Page: this.page,
              Search: this.search,
              Sort: sorting,
            }
          })
          .then(resp => {
            console.log(resp.data);
            let items = resp.data;
            let total = resp.pagination.total;
            //let items = resp.data.data.multipleResults;
            //let total = resp.data.data.paginationMetada.total;
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
      console.log("Mounted user_data: "+ this.user_data);
    });
      
  } 
  
};
</script>

<style scoped>
.table .v-input--checkbox .v-input__slot {
  margin-bottom: -10px;
}

.search-text {
  width: 50%;
}


>>>table.v-table th {
  padding: 0.5em!important;
  text-align: center!important;
}

table.v-table td {
  padding: 0.5em!important;
  text-align: center;
}

.table th:first-child {
  padding: 0;
}

.v-input--selection-controls:not(.v-input--hide-details) >>>.v-input__slot {
  margin-bottom: 0;
}

>>>.v-input--selection-controls__ripple {
  margin: 0;
}

.v-input--selection-controls:not(.v-input--hide-details) >>>.v-input--selection-controls__input {
  margin: 0;
}
</style>