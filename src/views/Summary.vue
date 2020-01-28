<template>
  <v-container grid-list-xl>
    <!-- TODO: Implement a Widget with User summary Information for selected user header -->
    {{userSummaryData}}
    <div class="text-xs-center" v-if="isLoading">
      <v-progress-circular :size="70" :width="7" color="orange" indeterminate></v-progress-circular>
    </div>
    <v-stepper v-model="hStepper" v-else>
      <!-- Horiz: each Article completed -->
      <v-stepper-header>
        <template v-for="(step, index) in getUserSummaryData.articles">
          <v-stepper-step
            :key="`${index}-step`"
            :complete="hStepper > (index + 1)"
            :step="parseInt(index) + 1"
            editable
          >{{step}} (Section)</v-stepper-step>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="(stepp, indexp) in getUserSummaryData.articles"
          :key="`${indexp}-content`"
          :step="parseInt(indexp) + 1"
        >
          <v-card>
            <v-stepper vertical v-model="vStepper">
              <div v-for="stepl in stepp.vertical" :key="stepl.subsectionNo + '-sub'">
                <v-stepper-step editable v-bind:step="stepl.subsectionNo + 1">
                  <!-- DATE of Completion  -->
                  Part {{stepl.subsectionNo}} (SS No {{stepl.subsectionNo}})
                </v-stepper-step>

                <v-stepper-content v-bind:step="stepl.sectionNo + 1">
                  <v-card class="mb-5">
                    P {{stepl.subsectionNo}} (SS No)
                    <!-- Grid row with: Section No, Name, Value (Total)  -->
                    <!-- DATA: v-for="a in stepl.items" :key="a.id" -->

                    <template>
                      <v-data-table :headers="headers" :items="stepl.items" class="elevation-1">
                        <template v-slot:items="props">
                          <td>{{ props.item.title }} {{ props.item.description }}</td>
                          <td class="text-xs-right">{{ props.item.sectionNo }}</td>
                          <td class="text-xs-right">{{ props.item.value }}</td>
                          <!-- When loaded in Admin view this will contain multiple users (one per column) -->
                        </template>
                      </v-data-table>
                    </template>
                  </v-card>
                </v-stepper-content>
              </div>
            </v-stepper>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Summary",
  data: () => ({
    hStepper: 1,
    vStepper: 1,

    results: [],

    isLoading: true,

    headers: [
      { text: "Questions", align: "left", sortable: false, value: "title" },
      { text: "Section", align: "center", sortable: true, value: "sectionNo" },
      { text: "Score", align: "right", sortable: true, value: "value" } // when > 1, show: User's details above score
      // Other Users' scores
    ]
  }),
  computed: {
    ...mapGetters("app", {
      getUserSummaryData: "getUserSummaryData"
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    }),
    userSummaryData() {
      console.log(this.getUserSummaryData);
      let result = [];
      for (let index in this.getUserSummaryData.items) {
        let item = this.getUserSummaryData.items[index];
        let positionInfo = index
          .replace("(", "")
          .replace(")", "")
          .split(",");
        let articleIndex = parseInt(positionInfo[0]);
        let article = this.getUserSummaryData.articles[articleIndex];
        let sectionIndex = parseInt(positionInfo[1]);
        console.log(articleIndex, sectionIndex, item, index);
        if (result[articleIndex] && result[articleIndex]["articleTitle"]) {
          result[articleIndex]["sections"][sectionIndex].push(...item);
        } else {
          result[articleIndex] = {
            articleTitle: article,
            sections: [[...item]]
          };
        }
      }
    }
  },
  methods: {
    ...mapActions("app", {
      _getUserSummaryData: "getUserSummaryData"
    }),

    compId(type, id) {
      return "comp" + type + id;
    },

    nameId(type, row, col) {
      return `${type}_${row}x${col}`;
    }
  },
  mounted() {
    let data = {
      params: "?Article="
    };
    this._getUserSummaryData(data).then(data => {
      this.isLoading = false;
      this.questions = data;
    });
  }
};
</script>

<style lang="stylus" scoped>
>>>.v-stepper__content {
  padding: 0;
}
</style>