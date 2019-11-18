<template>
  <div v-if="$route.query.user">
    <v-container grid-list-xl fluid>
      <v-layout wrap>
        <v-flex xs12 sm9>
          <h1>Dashboard / {{ $route.query.user }}</h1>
        </v-flex>

        <v-flex xs12 sm3>
          <v-btn @click="goToAccount()">Account</v-btn>
        </v-flex>

        <v-flex xs12 sm6>
          <h2>Weekly summary</h2>
          <WeeklySummary :unitLabels="selectedUserUnitLabels"/>
        </v-flex>

        <v-flex xs12 sm6>
          <LinesChart :unitLabels="selectedUserUnitLabels"/>
        </v-flex>

        <v-flex xs12 sm6>
          <h2>Nutrition compliance summary (Food tracker)</h2>
        </v-flex>

        <v-flex xs12 sm6>
          <SelectDateRange @update="rangeUpdate" />
        </v-flex>

        <v-carousel hide-controls :light="true" :cycle="false" :dark="false" v-if="isMobile">
          <v-carousel-item>
            <BarChart label="Protein" :unitLabels="selectedUserUnitLabels" color="#1895CB" :values="proteinData" :standard="profile.protein" />
          </v-carousel-item>
          <v-carousel-item>
            <BarChart label="Carbohydrates" :unitLabels="selectedUserUnitLabels" color="#0BE390" :values="carbohydratesData" :standard="profile.carbohydrate" />
          </v-carousel-item>
          <v-carousel-item>
            <BarChart label="Fat" color="red" :unitLabels="selectedUserUnitLabels" :values="fatData" :standard="profile.fat" />
          </v-carousel-item>
        </v-carousel>

        <v-flex xs12 md4 v-if="!isMobile">
          <BarChart label="Protein" color="#1895CB" :unitLabels="selectedUserUnitLabels" :values="proteinData" :standard="profile.protein" />
        </v-flex>

        <v-flex xs12 md4 v-if="!isMobile">
          <BarChart label="Carbohydrates" color="#0BE390" :unitLabels="selectedUserUnitLabels" :values="carbohydratesData" :standard="profile.carbohydrate" />
        </v-flex>

        <v-flex xs12 md4 v-if="!isMobile">
          <BarChart label="Fat" color="red" :unitLabels="selectedUserUnitLabels" :values="fatData" :standard="profile.fat" />
        </v-flex>

        <v-flex xs12 class="summary__spacer">
          <h2>Weekly measures summary</h2>
          <WeeklyMeasuresSummary />
        </v-flex>
      </v-layout>
      <form onsubmit="return false;" v-if="isCoach">
        <v-layout mt-2 mb-2>
          <v-flex xs7 sm9>
            <v-textarea
              outline
              placeholder="Type message"
              v-model="message"
              :rows="2"
              class="messages__form__message"
            ></v-textarea>
          </v-flex>
          <v-flex xs4 sm3>
            <v-btn
              color="secondary"
              class="messages__btn"
              block
              :loading="sendmessageloading"
              :disabled="message===``"
              @click.native.prevent="addMessage()"
            >Send</v-btn>
          </v-flex>
        </v-layout>
        <div class="text-xs-center">
          <v-btn color="success pl-5 pr-5" @click.native.prevent="reviewComplete()" :loading="submitreviewloading">Review complete</v-btn>
        </div>
      </form>
    </v-container>
  </div>
</template>

<script>
import LinesChart from "@/components/widgets/chart/LinesChart";
import BarChart from "@/components/widgets/chart/BarChart";
import WeeklySummary from "@/components/tables/WeeklySummary";
import WeeklyMeasuresSummary from "@/components/carousel/WeeklyMeasuresSummary";
import SelectDateRange from "@/components/widgets/select/SelectDateRange";
import { EventBus } from "../../util/event-bus";
import Util from "@/util";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "Dashboard",
  components: {
    LinesChart,
    BarChart,
    WeeklySummary,
    WeeklyMeasuresSummary,
    SelectDateRange
  },
  data: function() {
    return {
      userId: "",
      weekNo: "",
      userName: "",
      message: ``,
      isCoach: false,
      proteinData: {
        values: [],
        labels: []
      },
      carbohydratesData: {
        values: [],
        labels: []
      },
      fatData: {
        values: [],
        labels: []
      },
      profile: {
        protein: 100,
        carbohydrate: 100,
        fat: 100
      },
      sendmessageloading: false,
      submitreviewloading: false,
      localRoute: this.$route,
      selectedUserUnitLabels: Util.getEmptyUnitLabels(),
      isMobile: false
    };
  },
  watch: {
    "$route.query"(newQuery, oldQuery) {
      this.onRouterChange(newQuery, oldQuery);
    }
  },
  computed: {
    ...mapGetters("app", {
      getWeeklyData: "getWeeklySummary"
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    })
  },
  methods: {
    ...mapActions("admin", {
      sendMessage: "sendMessage",
      submitReview: "submitReview",
      getWeeklySummary: "getWeeklySummary",
      getUser: "getUser",
      getDiets: "getDiets",
      setSelectedUser: "setSelectedUser",
    }),
    ...mapActions("auth", {
      getMe: "getMe"
    }),
    goToAccount() {
      var routeQuery = this.$route.query;
      if (routeQuery && routeQuery.userId && routeQuery.userId.length > 0) {
        console.log("routeQuery", routeQuery);
        this.$router.push({ name: 'UserAccount', query: { userId: routeQuery.userId, user: routeQuery.user } });
      }
    },
    rangeUpdate(range) {
      this.proteinData.values = [];
      this.proteinData.labels = [];
      this.carbohydratesData.values = [];
      this.carbohydratesData.labels = [];
      this.fatData.values = [];
      this.fatData.labels = [];
      var date = new Date();
      var today = date;
      var startDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var yesterday;
      var mapDateToIndex = {};
      for (var i = 0; i < range; i++){
        this.proteinData.labels[i] = (date.getDate()) + '/' + (date.getMonth() + 1);
        this.carbohydratesData.labels[i] = (date.getDate()) + '/' + (date.getMonth() + 1);
        this.fatData.labels[i] = (date.getDate()) + '/' + (date.getMonth() + 1);
        today = today - 86400000;
        date = new Date(today)
        mapDateToIndex[this.proteinData.labels[i]] = i;
      }
      var endDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      var params = {
        startDate: endDate,
        endDate: startDate,
        pageSize: range,
        currentPage: 1,
        userId: this.userId
      }
      this.getDiets(params).then(res => {
        var data = res.results;
        var tmp1 = [], tmp2 = [], tmp3 = [];
        for (i = 0; i < range; i ++){
          tmp1[i] = 0;
          tmp2[i] = 0;
          tmp3[i] = 0;
        }
        for (var each of data) {
          var eachDate = new Date(each.dateFor);
          var eachStr = (eachDate.getDate()) + '/' + (eachDate.getMonth() + 1);
          tmp1[mapDateToIndex[eachStr]] = each.protein.toFixed(2);
          tmp2[mapDateToIndex[eachStr]] = each.carbohydrate.toFixed(2);
          tmp3[mapDateToIndex[eachStr]] = each.fat.toFixed(2);
        }
        this.proteinData.values = tmp1;
        this.carbohydratesData.values = tmp2;
        this.fatData.values = tmp3;
      });
    },
    addMessage() {
      const formData = {
        message: this.message,
        userId: this.userId,
        weekNo: this.weekNo
      };
      this.sendmessageloading = true;

      return this.sendMessage(formData)
        .then(result => {
          this.message = "";
          this.sendmessageloading = false;
          this.$toast.success('Successfully sent message');
        })
        .catch(e => {
          console.log(e);
        });
    },
    reviewComplete() {
      const bodyData = {
        message: this.message,
        userId: this.userId,
        weekno: this.weekNo
      };
      this.submitreviewloading = true;
      return this.submitReview(bodyData)
        .then(result => {
          this.submitreviewloading = false;
          this.$toast.success('Successfully reviewed');
          this.$router.push({ name: 'DashboardAdmin' })
        })
        .catch(e => {
          console.log(e);
        });
    },
    getWeekData(start, userId) {
      var weeks = [];
      for (let i = 0; i < 6; i++) {
        var element = start - 86400000 * 7;
        var tmp = new Date(start - 86400000 * 7 * i);
        var weekinfo = moment(tmp).isoWeek();
        weeks.push({ week: weekinfo, year: tmp.getFullYear(), date: tmp });
      }
      return Promise.all(
        weeks.map(week => {
          var params = `?userId=${userId}&week=${week.week}&year=${week.year}&Sort=1&Count=10`;
          return this.getWeeklySummary({ params: params, date: week.date })
            .then(res => {
              // console.log(res);
            })
            .catch(e => {
              console.log(e);
            });
        })
      ).then(res => {});
    },
    onRouterChange(routeQuery) {
      if (this.getDataUserProfile.userRoles && this.getDataUserProfile.userRoles.indexOf('Coach') > -1) {
        this.isCoach = true;
      } else {
        this.isCoach = false;
      }
      
      if (routeQuery && routeQuery.userId && routeQuery.userId.length > 0) {
        if (this.userId != routeQuery.userId) {
          this.userId = routeQuery.userId;
          this.weekNo = routeQuery.weekId;

          this.getUser(this.userId).then(res => {
            this.profile = res.profile ? res.profile : {measure: "Metrics"};
            this.userName = res.fullName;

            this.selectedUserUnitLabels = Util.getUnitLabels(this.profile.measure);
            var today = new Date();
            this.getWeekData(today, routeQuery.userId);
          });
          this.setSelectedUser(this.userId);
          this.rangeUpdate(7);
        }
      }
    }
  },

  mounted() {
    if (window.innerWidth < 500 && window.innerWidth > 0) this.isMobile = true;
    else this.isMobile = false;
    var routeQuery = this.$route.query;
    this.onRouterChange(routeQuery);
  },
};
</script>

<style lang="stylus">
.v-carousel .v-carousel__controls
  background rgba(255, 255, 255, 0)!important
  bottom -1em
  i
    font-size 13px!important
</style>