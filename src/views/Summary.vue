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
        <img src="/img/Eden-4.png" width="80%"/>
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
          v-for="(article, index) in getUserSummaryData"
          :key="article.articleNo + '-articlecontent' + article.article"
        >
          <v-card flat>
            <v-tabs v-model="sectionTab[index]" color="#00a38a" grow>
              <v-tabs-slider color="yellow"></v-tabs-slider>

              <v-tab
                v-for="section in article.sections"
                :key="section.sectionNo + '-section'"
              >{{ section.section }}</v-tab>
            </v-tabs>
            <v-tabs-items v-model="sectionTab[index]">
              <v-tab-item
                v-for="(section, iindex) in article.sections"
                :key="section.sectionNo + '-sectioncontent'"
              >
                <v-card flat>
                  <v-tabs v-model="dateTab[index + '-' + iindex]" color="#47bbe9" grow>
                    <v-tabs-slider color="green"></v-tabs-slider>

                    <v-tab
                      v-for="(dateItem, iiindex) in section.dates"
                      :key="article.articleNo + '_' + section.sectionNo + '-' + iiindex + '-' + dateItem.date + '-datekey'"
                      :href="'#' + iiindex + '-' + '-date'"
                    >{{ dateItem.date | formatDateOnly }} - {{iiindex}}</v-tab>
                  </v-tabs>
                  <v-tabs-items v-model="dateTab[index + '-' + iindex]">
                    <v-tab-item
                      v-for="(dateItem, iiindex) in section.dates"
                      :key="article.articleNo + '_' + section.sectionNo + '-' + iiindex + '-' + dateItem.date + '-date'"
                      :value="iiindex + '-' + '-date'"
                    >
                      <v-card flat>
                        <v-data-table
                          :headers="generateUserHeader(dateItem.results)"
                          :items="dateItem.results"
                          class="elevation-1"
                          light
                        >
                          <template v-slot:items="props">
                            <td class="text-xs-center pointer-cursor">{{ props.item.title }}</td>
                            <td class="text-xs-center pointer-cursor" v-for="user in props.item.userResults" :key="user.id">{{ user.value == null ? 'N/A' : user.value }}</td>
                          </template>
                        </v-data-table>
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
import components from '../components/questionLayout'

export default {
  name: "Summary",
  components: {
    ...components,
    VueCircle
  },
  data: () => ({
    hStepper: 1,
    vStepper: 1,
    form1Valid: null,
    fill : { gradient: ["#48cba2", "#47bbe9"] },
    
    results: [],

    isLoading: true,
    isAnswerLoading: null,

    articleTab: null,
    sectionTab: [],
    dateTab: [],
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
      getUserSummaryData: "getUserSummaryData",
      getAnswersData: "getSummaryAnswersData",
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    })
  },
  methods: {
    ...mapActions("app", {
      _getUserSummaryData: "getUserSummaryData",
      _getSummaryData: "getAnswersData",
    }),

    generateUserHeader(results) {
      let header = [{
        text: "Title",
        align: "center",
        value: "title",
        fixed: true
      }]
      for(let i = 0; i < results[0].userResults.length; i ++) {
        const element = results[0].userResults[i]
        header.push({
          text: moment(element.created).format("YYYY-MM-DD hh:mm:ss"),
          align: "center",
          value: "value"
        })
      }
      return header
    },

    compId(type, id) {
      return "comp" + type + id;
    },

    nameId(type, row, col) {
      return `${type}_${row}x${col}`;
    }, 

    showAnswerLayout(summaryId) {
      let data = {
        params: `?Article=Symptom&AnswerSummaryId=${summaryId}`,
        article: "Summary"
      };
      this.isAnswerLoading = true;
      return this._getSummaryData(data).then(res => {
        this.isAnswerLoading = false;
      });
    },

    updateComponentValue() {

    },

    sectionPartHead(list)
    {
      //traverse stepl.items[1] to find the SectionPart for the label
        var item = list.find(x => x.question.type == 'SectionPart');
        //console.log("Question Item", item);
        if (item) 
          return item.question;
        else
          return undefined;

    },
    nextVerticalStep(verticalMaxSteps, horizontalMaxSteps) {
      if (this.vStepper < verticalMaxSteps) {
        this.vStepper ++;
      } else {
        if (this.hStepper < horizontalMaxSteps) {
          this.hStepper ++;
        }
        this.vStepper = 1;
      }
    },
    nextHorizontalStep() {
      this.hStepper = this.hStepper < this.questions.horizontal.length ? this.hStepper + 1 : this.hStepper;
      this.vStepper = 1;
    },
    prevVerticalStep() {
      this.vStepper = this.vStepper > 1 ? this.vStepper - 1 : this.vStepper;
    },
    prevHorizontalStep() {
      this.hStepper = this.hStepper > 1 ? this.hStepper - 1 : this.hStepper;
      this.vStepper = 1;
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

>>>.pointer-cursor {
  cursor pointer
}
</style>