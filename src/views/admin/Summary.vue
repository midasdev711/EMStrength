<template>
  <v-container grid-list-xl class="page-content">
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
        :show-percent="false"
      >
        <img src="/img/Eden-4.png" width="80%" />
      </vue-circle>
    </div>
    <div v-else class="content-box">
      <v-alert v-model="alert" dismissible color="info">
        <v-flex row layout>
          <v-flex xs4 class="text-xs-center">
            <h2>{{getUserData.ForUserName}}</h2>
          </v-flex>
          <v-flex xs2 class="text-xs-center">
            <h2>Age: {{getUserData.ForUserAge}}</h2>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <h2>Group: {{getUserData.ForUserGroupName}}</h2>
          </v-flex>
        </v-flex>
      </v-alert>
      <div v-bind:class="{ 'showAlert': alert }">
        <v-tabs dark v-model="articleTab" color="primary" grow>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab
            v-for="article in getUserSummaryData"
            :key="article.articleNo + '-article'"
            :href="'#' + article.articleNo + '-article'"
          >{{ article.articleTitle }}</v-tab>
        </v-tabs>
        <v-tabs-items dark v-model="articleTab">
          <v-tab-item
            v-for="(article, index) in getUserSummaryData"
            :key="article.articleNo + '-article'"
            :value="article.articleNo + '-article'"
          >
            <v-card flat>
              <v-tabs v-model="sectionTab[index]" color="#00a38a" grow>
                <v-tabs-slider color="red"></v-tabs-slider>

                <v-tab
                  v-for="section in article.sections"
                  :key="article.articleNo + '_' + section.sectionNo + '-section'"
                  :href="'#' + article.articleNo + '_' + section.sectionNo + '-section'"
                >{{ section.section }}</v-tab>
              </v-tabs>
              <v-tabs-items v-model="sectionTab[index]">
                <v-tab-item
                  v-for="(section, iindex) in article.sections"
                  :key="article.articleNo + '_' + section.sectionNo + '-section'"
                  :value="article.articleNo + '_' + section.sectionNo + '-section'"
                >
                  <v-card flat v-if="!isGroupView">
                    <v-tabs v-model="dateTab[index + '-' + iindex]" color="#47bbe9" grow>
                      <!-- -->
                      <v-tabs-slider color="green"></v-tabs-slider>

                      <v-tab
                        v-for="(dateItem, iiindex) in section.dates"
                        :key="article.articleNo + '_' + section.sectionNo + '-' + iiindex + '-' + dateItem.date + '-date'"
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
                            :headers="titleHeader"
                            :pagination.sync="pagination"
                            :rows-per-page-items="pagination.rowsPerPageItems"
                            :items="dateItem.results"
                            hide-actions
                            class="elevation-1"
                            light
                          >
                            <template v-slot:items="props">
                              <td class="text-xs-center pointer-cursor">{{ props.item.title }}</td>
                            </template>
                          </v-data-table>
                          <v-data-table
                            :headers="generateUserHeader(dateItem.results)"
                            :items="dateItem.results"
                            :pagination.sync="pagination"
                            :rows-per-page-items="pagination.rowsPerPageItems"
                            class="elevation-1"
                            light
                          >
                            <template v-slot:items="props">
                              <td
                                class="text-xs-center pointer-cursor"
                                v-for="user in props.item.userResults"
                                :key="user.id"
                                @click="showAnswerLayout(user.forUserId, user.id, props.item.article);hStepper=props.item.sectionNo + 1;vStepper=props.item.subsectionNo + 1"
                              >{{ user.value == null ? 'N/A' : user.value }}</td>
                            </template>
                          </v-data-table>
                        </v-card>
                      </v-tab-item>
                    </v-tabs-items>
                  </v-card>
                  <v-card flat v-else>
                    <v-flex class="groupview-card" row layout>
                      <v-flex xs12 class="groupview">
                        <div class="result-group">
                          <v-data-table
                            :headers="titleHeader"
                            :pagination.sync="pagination"
                            :rows-per-page-items="pagination.rowsPerPageItems"
                            :items="section.results"
                            hide-actions
                            class="elevation-1"
                            light
                          >
                            <template v-slot:items="props">
                              <td class="text-xs-center pointer-cursor">{{ props.item.title }}</td>
                            </template>
                          </v-data-table>
                          <v-data-table
                            :headers="generateHeader(section.results)"
                            :items="section.results"
                            :pagination.sync="pagination"
                            :rows-per-page-items="pagination.rowsPerPageItems"
                            class="elevation-1"
                            light
                          >
                            <template v-slot:items="props">
                              <td
                                class="text-xs-center pointer-cursor"
                                v-for="user in props.item.userResults"
                                :key="user.id"
                                @click="showAnswerLayout(user.forUserId, user.id, props.item.article);hStepper=props.item.sectionNo + 1;vStepper=props.item.subsectionNo + 1"
                              >{{ user.value == null ? 'N/A' : user.value }}</td>
                            </template>
                          </v-data-table>
                        </div>
                      </v-flex>
                    </v-flex>
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
            :animation="{ duration: 1500, easing: 'circleProgressEasing' }"
            :animation-start-value="0.0"
            :start-angle="0"
            insert-mode="append"
            :thickness="12"
            :show-percent="false"
          >
            <img src="/img/Eden-4.png" width="80%" />
          </vue-circle>
        </div>
        <div class="mt-2" v-if="!isAnswerLoading && getFilteredQuestionData.length > 0">
          <div class="clear-fix"></div>
          <v-stepper v-model="hStepper">
            <v-stepper-header>
              <template v-for="step in getFilteredQuestionData">
                <v-stepper-step
                  :key="`${step.sectionNo}-step`"
                  :complete="hStepper > (step.sectionNo + 1)"
                  :step="step.sectionNo + 1"
                  :color="$vuetify.theme.subheading1"
                  editable
                >
                  <span :style="{ color: $vuetify.theme.subheading1 }">
                    {{step.section}}
                    <span class="dev-hint"></span>
                  </span>
                </v-stepper-step>
              </template>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content
                v-for="stepp in getFilteredQuestionData"
                :key="`${stepp.sectionNo}-content`"
                :step="stepp.sectionNo + 1"
              >
                <v-card v-if="isMobile">
                  <h3>
                    {{stepp.section}}
                    <span
                      class="right"
                    >{{stepp.sectionNo + 1}} of {{getFilteredQuestionData.length}}</span>
                  </h3>
                </v-card>
                <v-card>
                  <v-stepper vertical v-model="vStepper">
                    <div v-for="stepl in stepp.vertical" :key="stepl.subsectionNo + '-sub'">
                      <v-stepper-step
                        editable
                        v-bind:step="$vuetify.theme.step.charAt(stepl.subsectionNo)"
                        :key="stepl.subsectionNo + '-sub-step'"
                        :color="$vuetify.theme.subheading2"
                      >
                        <SectionPartStepper :data="stepl.items" />
                      </v-stepper-step>

                      <v-stepper-content
                        v-bind:step="stepl.subsectionNo + 1"
                        :key="stepl.subsectionNo + '-sub-content'"
                      >
                        <v-card v-if="isMobile && stepp.vertical.length > 1">
                          <h3>
                            {{$vuetify.theme.step.charAt(stepl.subsectionNo)}}
                            <span
                              class="right"
                            >{{stepl.subsectionNo + 1}} of {{stepp.vertical.length}}</span>
                          </h3>
                        </v-card>
                        <v-card class="mb-5">
                          <span class="dev-hint">P {{stepl.subsectionNo}} (SS No)</span>
                          <v-form v-model="form1Valid">
                            <div
                              class="row"
                              v-for="a in stepl.items"
                              :key="a.id"
                            >
                              <components
                                v-if="a.question.useText"
                                :is="a.question.type"
                                :id="'comp' + a.question.type + a.question.id"
                                :title="a.question.title"
                                :useText="a.question.useText"
                                :questionId="a.question.id"
                                :answerId="a.answerId"
                                :length="a.question.length"
                                :items="a.question.items"
                                :text="a.text"
                                :diabled="true"
                                @update-value="updateComponentValue"
                              />
                              <components
                                v-if="!a.question.useText"
                                :is="a.question.type"
                                :id="'comp' + a.question.type + a.question.id"
                                :title="a.question.title"
                                :useText="a.question.useText"
                                :questionId="a.question.id"
                                :answerId="a.answerId"
                                :length="a.question.length"
                                :items="a.question.items"
                                :value="a.value"
                                :diabled="true"
                                @update-value="updateComponentValue"
                              />
                            </div>
                          </v-form>
                        </v-card>
                      </v-stepper-content>
                    </div>
                  </v-stepper>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import VueCircle from "vue2-circle-progress";
import components from "../../components/questionLayout";

export default {
  name: "AdminSummary",
  components: {
    ...components,
    VueCircle
  },
  data: () => ({
    alert: true,
    userList: {},
    username: "",
    groupname: "",
    featureUserId: null,
    hStepper: 1,
    vStepper: 1,
    form1Valid: null,
    fill: { gradient: ["#48cba2", "#47bbe9"] },
    user: {},
    results: [],
    isLoading: true,
    isAnswerLoading: null,
    isMobile: null,

    articleTab: null,
    sectionTab: [],
    dateTab: [],
    isGroupView: false,
    pagination: {
      page: 1,
      rowsPerPage: 5,
      rowsPerPageItems: [1, 5, 10, 15],
      totalItems: 0
    },
    titleHeader: [
      {
        text: "Title",
        align: "center",
        value: "title",
        sortable: false,
        fixed: true
      }
    ]
  }),
  filters: {
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD hh:mm:ss");
    },
    formatDateOnly(date) {
      return moment(date).format("YYYY-MM-DD");
    }
  },
  computed: {
    ...mapGetters("app", {
      getUserSummaryData: "getUserSummaryData",
    }),
    ...mapGetters("admin", {
      getAnswersData: "getSummaryAnswersData",
      getSubmissionList: "getSubmissionList"
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    }),
    getUserData() {
      if (this.$route.query.user) {
        var filteredUser = this.getSubmissionList.filter( v => v.ForUserId == this.$route.query.userId )
        if (filteredUser.length > 0) {
          this.user = filteredUser[0]
          return this.user
        } else {
          return {}
        }
      }
      return this.user;
    },
    getFilteredQuestionData() {
      let result = []
      for (let i = 0; i < this.getAnswersData.length; i ++) {
        let stepp = this.getAnswersData[i]
        let newVertical = []
        for (let j = 0; j < stepp.vertical.length; j ++) {
          let stepl = stepp.vertical[j]
          let items = stepl.items.filter( v => v.isConditionQuestionMet)
          let newStepl = Object.assign({}, stepl)
          newStepl.items = Object.assign([], items)
          newVertical.push(newStepl);
        }
        let newStepp = Object.assign({}, stepp)
        newStepp.vertical = Object.assign([], newVertical)
        result.push(newStepp)
      }
      return result
    },
  },
  watch: {
    "$route.query"(newQuery, oldQuery) {
      this.isGroupView = newQuery.groupId ? true : false;
      this.groupname = newQuery.groupName ? newQuery.groupName : "";
      this.username = newQuery.user ? newQuery.user : "";
      this.getSummary(newQuery);
    },
    getUserSummaryData(newProps, oldProps) {
      if (newProps != oldProps && this.isGroupView) {
        let users = {};
        for (let i = 0; i < newProps[0].users.length; i++) {
          const user = newProps[0].users[i];
          users[user.id] = user;
        }
        this.userList = Object.assign({}, users);
      }
    }
  },
  methods: {
    ...mapActions("app", {
      _getUserSummaryData: "getUserSummaryData",
      _getGroupSummaryData: "getGroupSummaryData"
    }),

    ...mapActions("admin", {
      _getSummaryData: "getAnswersData"
    }),

    updateComponentValue() {},

    generateUserHeader(results) {
      let header = [];
      for (let i = 0; i < results[0].userResults.length; i++) {
        const element = results[0].userResults[i];
        header.push({
          text: moment(element.created).format("YYYY-MM-DD hh:mm:ss"),
          align: "center",
          value: "value",
          sortable: false
        });
      }
      return header;
    },

    generateHeader(results) {
      let header = [];
      for (let i = 0; i < results[0].userResults.length; i++) {
        const element = results[0].userResults[i];
        header.push({
          text: this.userList[element.forUserId].userName,
          align: "center",
          value: "value",
          sortable: false
        });
      }
      return header;
    },

    showAnswerLayout(userId, summaryId, article = "Symptom") {
      let data = {
        params: `?UserId=${userId}&article=${article}&AnswerSummaryId=${summaryId}`,
        article: "Summary"
      };
      this.isAnswerLoading = true;
      return this._getSummaryData(data).then(res => {
        this.isAnswerLoading = false;
        console.log(res);
      });
    },

    getSummary(index) {
      this.isLoading = true;
      if (this.$route.query.type == "user") {
        let data = {
          params: "?userId=" + this.$route.query.userId
        };
        this._getUserSummaryData(data).then(data => {
          this.isLoading = false;
          this.questions = data;
        });
      } else if (this.$route.query.type == "group") {
        let data = {
          params: "?groupId=" + this.$route.query.groupId //  &featureUserId=dd
        };
        this._getGroupSummaryData(data).then(res => {
          this.isLoading = false;
          this.questions = res;
          console.log(res);
        });
      } else if (this.$route.query.type == "groupuser") {
        this.featureUserId = this.$route.query.userId;
        let data = {
          params: `?groupId=${this.$route.query.groupId}&featureUserId=${this.$route.query.userId}` //  &featureUserId=dd
        };
        this._getGroupSummaryData(data).then(res => {
          this.isLoading = false;
          this.questions = res;
          console.log(res);
        });
      }
    }
  },
  mounted() {
    if (window.innerWidth < 768 && window.innerWidth > 0) this.isMobile = true;
    else this.isMobile = false;
    var routeQuery = this.$route.query;
    this.isGroupView = routeQuery.groupId ? true : false;
    this.groupname = routeQuery.groupName ? routeQuery.groupName : "";
    this.username = routeQuery.user ? routeQuery.user : "";
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
  cursor: pointer;
}

>>>.groupview-card {
  margin: 0 !important;

  .result-group {
    width: 100%;
  }
}

>>>.groupview {
  overflow-x: scroll;
  white-space: nowrap;
  padding: 0 !important;
}

>>>.result-group {
  display: inline-block;
}

>>>.padding-0 {
  padding: 0;
}

>>>.elevation-1 {
  width: 80%;
  float: left;

  @media (max-width: 768px) {
    width: 60%;
  }
}

>>>.elevation-1:first-child {
  width: 20%;

  @media (max-width: 768px) {
    width: 40%;
  }
}

>>>.v-stepper__content {
  padding: 0;
  margin-right: 0;

  @media (max-width: 768px) {
    margin: 0;
  }
}

.v-stepper__header {
  @media (max-width: 768px) {
    display: none;
  }
}

.v-stepper--vertical .v-stepper__step {
  @media (max-width: 768px) {
    display: none;
  }
}

.v-stepper.v-stepper--vertical.theme--light {
  overflow: visible;
}

.clear-fix {
  clear: both;
}

.mt-2 {
  margin-top: 1em;
}

.showAlert {
  margin-top: 20px;
}

>>>.v-alert {
  position: sticky;
  top: 64px;
  width: 100%;
  z-index: 9999999;
}

.content-box {
  width 100%
}

.page-content {
  padding-top: 0;
}
</style>