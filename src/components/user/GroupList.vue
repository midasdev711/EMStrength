<template>
  <v-card>
    <v-btn color="primary right" @click="deleteSelected">Delete selected</v-btn>
    <v-data-table
      :headers="headers"
      :items="getGroupData"
      item-key="id"
      :loading="loading"
      :pagination.sync="pagination"
      :total-items="totalGroups"
      ref="groupTable"
      class="table"
    >
      <template v-slot:items="props">
        <td>
          <v-checkbox background-color="white" color="success" v-model="props.item.checkbox" />
        </td>
        <td>{{ props.item.title }}</td>
      </template>
      <template slot="no-data">
        <div class="text-xs-center">{{getGroupData.length}} groups</div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "GroupList",
  data() {
    return {
      totalGroups: 0,
      loading: false,
      search: "",
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
        { text: "Title ", value: "title" }
      ],
      pagination: {
        sortBy: "title",
        rowsPerPage: 10
      }
    };
  },
  computed: {
    ...mapGetters("admin", {
      getGroupData: "getGroupData"
    })
  },
  methods: {
    ...mapActions("admin", {
      deleteGroup: "deleteGroup"
    }),
    deleteSelected() {
      let delList = this.getGroupData.filter(el => {
        return el.checkbox == true;
      });
      return this.deleteGroup(delList[0].id)
        .then(result => {
          return result;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
table.v-table
  >>>th:first-child {
    padding: 0;
  }

  >>>td {
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