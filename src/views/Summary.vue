<template>
  <v-container grid-list-xl>
    <!-- TODO: Implement a Widget with User summary Information for selected user header -->
    <div class="text-xs-center" v-if="isLoading">
      <vue-circle
        :progress="100"
        :size="300"
        :reverse="false"
        line-cap="round"
        :fill="fill"
        empty-fill="rgba(200, 200, 200, .8)"
        :animation="{ duration: 1500, easing: 'circleProgressEasing' }"
        :animation-start-value="0.0"
        :start-angle="0"
        insert-mode="append"
        :thickness="12"
        :show-percent="false">
        <img src="/img/Eden-2.png" width="80%"/>
      </vue-circle>
    </div>
    <div v-else>
      <template>
        <v-tabs dark v-model="articleTab" color="primary" grow>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
            v-for="article in getUserSummaryData"
            :key="article.articleNo + '-article'"
          >{{ article.articleTitle }}</v-tab>
        </v-tabs>
      </template>
      <v-tabs-items dark v-model="articleTab">
        <v-tab-item
          v-for="article in getUserSummaryData"
          :key="article.articleNo + '-articlecontent'"
        >
          <v-card flat>
            <v-tabs v-model="sectionTab" color="#00a38a" grow>
              <v-tabs-slider color="yellow"></v-tabs-slider>

              <v-tab
                v-for="section in article.sections"
                :key="section.sectionNo + '-section'"
              >{{ section.section }}</v-tab>
            </v-tabs>
            <v-tabs-items v-model="sectionTab">
              <v-tab-item
                v-for="section in article.sections"
                :key="section.sectionNo + '-sectioncontent'"
              >
                <v-card flat>
                  <v-tabs v-model="dateTab" color="#47bbe9" grow> <!-- -->
                    <v-tabs-slider color="blue"></v-tabs-slider>

                    <v-tab
                      v-for="(dateItem, index) in section.dates"
                      :key="section.sectionNo + '-' + index + '-' + dateItem.date + '-date'"
                    >{{ dateItem.date | formatDateOnly }}</v-tab>
                  </v-tabs>
                  <v-tabs-items v-model="dateTab">
                    <v-tab-item
                      v-for="(dateItem, index) in section.dates"
                      :key="section.sectionNo + '-' + index + '-' + dateItem.date + '-datecontent'"
                    >
                      <v-card flat>
                        <template>
                          <div
                            v-for="(result, resultIndex) in dateItem.results"
                            :key="resultIndex + '-result-' + result.forUserId"
                            class="result"
                          >
                            <v-data-table
                              :headers="headers"
                              :items="result['items']"
                              class="elevation-1"
                              light
                            >
                              <template v-slot:items="props">
                                <td>{{ props.item.article }}</td>
                                <td class="text-xs-right">{{ props.item.created | formatDate }}</td>
                                <td class="text-xs-right">{{ props.item.title }}</td>
                                <td class="text-xs-right">{{ props.item.description }}</td>
                                <td class="text-xs-right">{{ props.item.value }}</td>
                                <td class="text-xs-right">{{ props.item.id }}</td>
                              </template>
                            </v-data-table>
                          </div>
                        </template>
                      </v-card>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from 'moment';
import VueCircle from 'vue2-circle-progress';

export default {
  name: "Summary",
  components: {
    VueCircle
  },
  data: () => ({
    hStepper: 1,
    vStepper: 1,
    fill : { gradient: ["#ABE5A1", "#34495e"] },
    
    results: [],

    isLoading: true,

    articleTab: null,
    sectionTab: null,
    dateTab: null,
    headers: [
      {
        text: "Article",
        align: "center",
        sortable: false,
        value: "article"
      },
      { text: "Created", align: "center", value: "created" },
      { text: "Title", align: "center", value: "title" },
      { text: "Description", align: "center", value: "description" },
      { text: "Value", align: "center", value: "value" },
      { text: "Action", align: "center", value: "Id" }
    ]
  }),
  filters: {
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD hh:mm:ss');
    },
    formatDateOnly(date) {
      return moment(date).format('YYYY-MM-DD');
    },
  },
  computed: {
    ...mapGetters("app", {
      getUserSummaryData: "getUserSummaryData"
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    })
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
      console.log("Summary:", this.questions);
    });
  }
};
</script>

<style lang="stylus" scoped>
>>>.v-stepper__content {
  padding: 0;
}

>>>.v-card {
  padding: 0;
}
</style>