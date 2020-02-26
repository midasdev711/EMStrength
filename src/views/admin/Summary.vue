<template>
  <v-container grid-list-xl>
    <v-alert v-model="alert" dismissible outline color="info">
      <v-flex row layout>
        <v-flex xs6 class="text-xs-center">
          <h2>{{username}}</h2>
        </v-flex>
        <v-flex xs6 class="text-xs-center">
          <h2>{{groupname}}</h2>
        </v-flex>
      </v-flex>
    </v-alert>

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
    <div v-else>
      <template>
        <v-tabs dark v-model="articleTab" color="primary" grow>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab
            v-for="article in getUserSummaryData"
            :key="article.articleNo + '-article'"
            :href="'#' + article.articleNo + '-article'"
          >{{ article.articleTitle }}</v-tab>
        </v-tabs>
      </template>
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
                  <v-tabs v-model="dateTab[iindex]" color="#47bbe9" grow>
                    <!-- -->
                    <v-tabs-slider color="green"></v-tabs-slider>

                    <v-tab
                      v-for="(dateItem, iiindex) in section.dates"
                      :key="article.articleNo + '_' + section.sectionNo + '-' + iiindex + '-' + dateItem.date + '-date'"
                      :href="'#' + iiindex + '-' + '-date'"
                    >{{ dateItem.date | formatDateOnly }} - {{iiindex}}</v-tab>
                  </v-tabs>
                  <v-tabs-items v-model="dateTab[iindex]">
                    <v-tab-item
                      v-for="(dateItem, iiindex) in section.dates"
                      :key="article.articleNo + '_' + section.sectionNo + '-' + iiindex + '-' + dateItem.date + '-date'"
                      :value="iiindex + '-' + '-date'"
                    >
                      <v-card flat>
                        <template>
                          <div
                            v-for="(result, resultIndex) in dateItem.results"
                            :key="article.articleNo + '_' + section.sectionNo + '-' + index + '-' + dateItem.date + resultIndex + '-result-' + result.forUserId"
                            class="result"
                          >
                            <v-data-table
                              :headers="headers"
                              :items="result['items']"
                              class="elevation-1"
                              light
                            >
                              <template v-slot:items="props">
                                <td
                                  class="pointer-cursor"
                                  @click="showAnswerLayout(props.item.id)"
                                >{{ props.item.article }}</td>
                                <td
                                  class="text-xs-right pointer-cursor"
                                  @click="showAnswerLayout(props.item.id)"
                                >{{ props.item.created | formatDate }}</td>
                                <td
                                  class="text-xs-right pointer-cursor"
                                  @click="showAnswerLayout(props.item.id)"
                                >{{ props.item.title }}</td>
                                <td
                                  class="text-xs-right pointer-cursor"
                                  @click="showAnswerLayout(props.item.id)"
                                >{{ props.item.description }}</td>
                                <td
                                  class="text-xs-right pointer-cursor"
                                  @click="showAnswerLayout(props.item.id)"
                                >{{ props.item.value }}</td>
                                <td
                                  class="text-xs-right pointer-cursor"
                                  @click="showAnswerLayout(props.item.id)"
                                >{{ props.item.id }}</td>
                              </template>
                            </v-data-table>
                          </div>
                        </template>
                      </v-card>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>
                <v-card flat v-else-if="isGroupView && !featureUserId">
                  <v-flex class="groupview-card" row layout>
                    <v-flex xs12 class="groupview">
                      <div class="result-group">
                        <v-data-table
                          :headers="generateHeader(section.results)"
                          :items="section.results"
                          class="elevation-1"
                          light
                        >
                          <template v-slot:items="props">
                            <td class="text-xs-center pointer-cursor">{{ props.item.title }}</td>
                            <td class="text-xs-center pointer-cursor" v-for="user in props.item.userResults" :key="user.id">{{ user.value }}</td>
                          </template>
                        </v-data-table>
                      </div>
                    </v-flex>
                  </v-flex>
                </v-card>
                <v-card flat v-else-if="isGroupView && featureUserId">
                  <v-flex class="groupview-card" row layout>
                    <v-flex xs12 class="groupview">
                      <div class="result-group">
                        <v-data-table
                          :headers="generateHeader(section.results)"
                          :items="section.results"
                          class="elevation-1"
                          light
                        >
                          <template v-slot:items="props">
                            <td class="text-xs-center pointer-cursor">{{ props.item.title }}</td>
                            <td class="text-xs-center pointer-cursor" v-for="user in props.item.userResults" :key="user.id">{{ user.value }}</td>
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

    results: [],

    isLoading: true,
    isAnswerLoading: false,

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
      {
        text: "Created",
        align: "center",
        value: "created"
      },
      {
        text: "Title",
        align: "center",
        value: "title"
      },
      {
        text: "Description",
        align: "center",
        value: "description"
      },
      {
        text: "Value",
        align: "center",
        value: "value"
      },
      {
        text: "Action",
        align: "center",
        value: "Id"
      }
    ],
    groupHeaders: [
      {
        text: "Title",
        align: "center",
        value: "title"
      },
      {
        text: "Value",
        align: "center",
        value: "value"
      }
    ],
    isGroupView: false
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
      getAnswersData: "getSummaryAnswersData"
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    }),
    
  },
  watch: {
    "$route.query"(newQuery, oldQuery) {
      this.isGroupView = newQuery.groupId ? true : false;
      this.groupname = newQuery.groupName ? newQuery.groupName : "";
      this.username = newQuery.user ? newQuery.user : "";
      this.getSummary(newQuery);
    },
    getUserSummaryData(newProps, oldProps) {
      if (newProps != oldProps) {
        let users = {}
        for (let i = 0; i < newProps[0].users.length; i ++) {
          const user = newProps[0].users[i]
          users[user.id] = user
        }
        this.userList = Object.assign({}, users);
        console.log(this.userList);
      }
    }
  },
  methods: {
    ...mapActions("app", {
      _getUserSummaryData: "getUserSummaryData",
      _getSummaryData: "getAnswersData",
      _getGroupSummaryData: "getGroupSummaryData"
    }),

    generateHeader(results) {
      let header = [{
        text: "Title",
        align: "center",
        value: "title"
      }]
      for(let i = 0; i < results[0].userResults.length; i ++) {
        const element = results[0].userResults[i]
        header.push({
          text: this.userList[element.forUserId].userName,
          align: "center",
          value: "value"
        })
      }
      return header
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
        this._getGroupSummaryData(data).then(data => {
          this.isLoading = false;
          console.log(data);
          this.questions = data;
        });
      } else if (this.$route.query.type == "groupuser") {
        this.featureUserId = this.$route.query.userId;
        let data = {
          params: `?groupId=${this.$route.query.groupId}&featureUserId=${this.$route.query.userId}` //  &featureUserId=dd
        };
        this._getGroupSummaryData(data).then(data => {
          this.isLoading = false;
          console.log(data);
          this.questions = data;
        });
      }
    }
  },
  mounted() {
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
</style>