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
        :animation="{ duration: 1000, easing: 'circleProgressEasing' }"
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
                              <template v-slot:items="props" >
                                <td class="pointer-cursor" @click="showAnswerLayout(props.item.id)">{{ props.item.article }}</td>
                                <td class="text-xs-right pointer-cursor" @click="showAnswerLayout(props.item.id)">{{ props.item.created | formatDate }}</td>
                                <td class="text-xs-right pointer-cursor" @click="showAnswerLayout(props.item.id)">{{ props.item.title }}</td>
                                <td class="text-xs-right pointer-cursor" @click="showAnswerLayout(props.item.id)">{{ props.item.description }}</td>
                                <td class="text-xs-right pointer-cursor" @click="showAnswerLayout(props.item.id)">{{ props.item.value }}</td>
                                <td class="text-xs-right pointer-cursor" @click="showAnswerLayout(props.item.id)">{{ props.item.id }}</td>
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
      <div class="text-xs-center mt-2" v-if="isAnswerLoading">
        <vue-circle
          :progress="100"
          :size="300"
          :reverse="false"
          line-cap="round"
          :fill="fill"
          empty-fill="rgba(200, 200, 200, .8)"
          :animation="{ duration: 1000, easing: 'circleProgressEasing' }"
          :animation-start-value="0.0"
          :start-angle="0"
          insert-mode="append"
          :thickness="12"
          :show-percent="false">
          <img src="/img/Eden-4.png" width="80%"/>
        </vue-circle>
      </div>
      <v-stepper v-model="hStepper" v-else>
        <v-stepper-header>
          <template v-for="step in getAnswersData">
            <v-stepper-step
              :key="`${step.sectionNo}-step`"
              :complete="hStepper > (step.sectionNo + 1)"
              :step="step.sectionNo + 1"
              :color="$vuetify.theme.subheading1"
              editable
            >
              <span :style="{ color: $vuetify.theme.subheading1 }">{{step.section}} <span class="dev-hint">(Section)</span></span>
            </v-stepper-step>
          </template>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content
            v-for="stepp in getAnswersData"
            :key="`${stepp.sectionNo}-content`"
            :step="stepp.sectionNo + 1"
          >
            <v-card>
              <v-stepper vertical v-model="vStepper">
                <div v-for="stepl in stepp.vertical" :key="stepl.subsectionNo + '-sub'" >
                  <v-stepper-step 
                    editable 
                    v-bind:step="$vuetify.theme.step.charAt(stepl.subsectionNo)"
                    :key="stepl.subsectionNo + '-sub-step'" 
                    :color="$vuetify.theme.subheading2">
                    <!--span class="dev-hint"> Part {{stepl.subsectionNo}}  (SS No {{stepl.subsectionNo}})</span-->
                    <!-- <SectionPartStepper
                      v-if="sectionPartHead(stepl.items).type == 'SectionPart'"
                      :id="compId('SectionPart-H-', sectionPartHead(stepl.items).id)"
                      :title="sectionPartHead(stepl.items).title"
                    /> -->

                  </v-stepper-step>

                  <v-stepper-content v-bind:step="stepl.subsectionNo + 1">
                    <v-card class="mb-5">
                      <span class="dev-hint">P {{stepl.subsectionNo}} (SS No)</span>
                      <v-form v-model="form1Valid" >
                        <div class="row" v-for="a in stepl.items" :key="a.id" v-if="a.isConditionQuestionMet">
                          <components v-if="a.question.useText && a.isConditionQuestionMet" :is="a.question.type" :id="compId(a.question.type, a.question.id)" :title="a.question.title" :useText="a.question.useText" :questionId="a.question.id" :answerId="a.answerId" :length="a.question.length" :items="a.question.items" :text="a.text" @updateValue="updateComponentValue" :disabled="true" />
                          <components v-if="!a.question.useText && a.isConditionQuestionMet" :is="a.question.type" :id="compId(a.question.type, a.question.id)" :title="a.question.title" :useText="a.question.useText" :questionId="a.question.id" :answerId="a.answerId" :length="a.question.length" :items="a.question.items" :value="a.value" :disabled="true" @updateValue="updateComponentValue"/>
                        </div>
                      </v-form>
                      <v-btn
                        color="primary"
                        @click="nextVerticalStep(stepp.vertical.length, getAnswersData.length)"
                      >
                        Continue
                      </v-btn>
                      <v-btn flat v-if="stepl.subsectionNo > 0" @click="prevVerticalStep">Back</v-btn>
                    </v-card>
                  </v-stepper-content>
                </div>
              </v-stepper>
            </v-card>

            <v-btn
              color="primary"
              @click="nextHorizontalStep"
            >
              Continue
            </v-btn>
            <v-btn flat v-if="stepp.sectionNo > 0" @click="prevHorizontalStep">Back</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from 'moment';
import VueCircle from 'vue2-circle-progress';
import components from '../../components/questionLayout'

export default {
  name: "AdminSummary",
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
    isAnswerLoading: false,

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
      getUserSummaryData: "getUserSummaryData",
      getAnswersData: "getSummaryAnswersData",
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    })
  },
  watch: {
    "$route.query"(newQuery, oldQuery) {
      this.getSummary(newQuery);
    }
  },
  methods: {
    ...mapActions("app", {
      _getUserSummaryData: "getUserSummaryData",
      _getSummaryData: "getAnswersData",
    }),

    compId(type, id) {
      return "comp" + type + id;
    },

    nameId(type, row, col) {
      return `${type}_${row}x${col}`;
    }, 

    showAnswerLayout(summaryId) {
      console.log(summaryId);
      this.isAnswerLoading = true;
      let data = {
        params: `?Article=Symptom&AnswerSummaryId=${summaryId}`,
        article: "Summary"
      };
      return this._getSummaryData(data).then(res => {
        this.isAnswerLoading = false;
        console.log(res);
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
    },
    getSummary(index) {
      this.isLoading = true;
      let data = {
          params: "?userId=" + this.$route.query.userId
      };
      this._getUserSummaryData(data).then(data => {
          this.isLoading = false;
          this.questions = data;
          console.log("Summary:", this.questions);
      });
    }
  },
  mounted() {
    var routeQuery = this.$route.query;
    this.getSummary(routeQuery);
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