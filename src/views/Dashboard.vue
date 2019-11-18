<template>
  <v-container grid-list-xl fluid>
    <v-layout wrap>
      <v-flex xs12 md6>
        <h2>Weekly summary</h2>
        <WeeklySummary :unitLabels="unitLabels"/>
      </v-flex>

      <v-flex xs12 md6>
        <LinesChart :unitLabels="unitLabels"/>
      </v-flex>

      <v-flex xs12 sm6>
        <h2>Nutrition compliance summary (Food tracker)</h2>
      </v-flex>

      <v-flex xs12 sm6>
        <SelectDateRange
          @update="rangeUpdate"
        />
      </v-flex>

      <v-carousel hide-controls :light="true" :cycle="false" :dark="false" v-if="isMobile">
        <v-carousel-item>
          <BarChart label="Protein" :unitLabels="unitLabels" color="#1895CB" :values="proteinData" :standard="getDataUserProfile.profile.protein" />
        </v-carousel-item>
        <v-carousel-item>
          <BarChart label="Carbohydrates" :unitLabels="unitLabels" color="#0BE390" :values="carbohydratesData" :standard="getDataUserProfile.profile.carbohydrate" />
        </v-carousel-item>
        <v-carousel-item>
          <BarChart label="Fat" color="red" :unitLabels="unitLabels" :values="fatData" :standard="getDataUserProfile.profile.fat" />
        </v-carousel-item>
      </v-carousel>

      <v-flex xs12 md4 v-if="!isMobile">
        <BarChart label="Protein" color="#1895CB" :unitLabels="unitLabels" :values="proteinData" :standard="getDataUserProfile.profile.protein" />
      </v-flex>

      <v-flex xs12 md4 v-if="!isMobile">
        <BarChart label="Carbohydrates" color="#0BE390" :unitLabels="unitLabels" :values="carbohydratesData" :standard="getDataUserProfile.profile.carbohydrate" />
      </v-flex>

      <v-flex xs12 md4 v-if="!isMobile">
        <BarChart label="Fat" color="red" :unitLabels="unitLabels" :values="fatData" :standard="getDataUserProfile.profile.fat" />
      </v-flex>

      <v-flex xs12 class="summary__spacer">
        <h2>Weekly measures summary</h2>
        <WeeklyMeasuresSummary />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import Util from '@/util';
import LinesChart from "@/components/widgets/chart/LinesChart"
import SelectDateRange from "@/components/widgets/select/SelectDateRange"
import BarChart from "@/components/widgets/chart/BarChart"
import WeeklySummary from "@/components/tables/WeeklySummary"
import WeeklyMeasuresSummary from "@/components/carousel/WeeklyMeasuresSummary"

export default {
  name: "Dashboard",
  components: {
    LinesChart,
    SelectDateRange,
    BarChart,
    WeeklySummary,
    WeeklyMeasuresSummary
  },
  data: function () {
    return {
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
      isMobile: false,
      unitLabels: Util.getEmptyUnitLabels()
    }
  },
  methods: {
    ...mapActions("app", {
      getWeeklySummary: "getWeeklySummary",
      getDiets: "getDiets"
    }),
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
        currentPage: 1
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
    getWeekData(start) {
      var weeks = [];
      for (let i = 0; i < 6; i++) {
        var element = start - 86400000 * 7;
        var tmp = new Date(start - 86400000 * 7 * i)
        var weekinfo = moment(tmp).isoWeek();
        weeks.push({week: weekinfo, year: tmp.getFullYear(), date: tmp});
      }
      return Promise.all(weeks.map(week => {
        var params = `?week=${week.week}&year=${week.year}&Sort=1&Count=10`;
        return this.getWeeklySummary({params: params, date: week.date}).then(res => {
          // console.log(res);
        }).catch(e => {
          console.log(e);
        });
      })).then(res => {
      });
    },
    getUnitLabels(){
      if(this.getDataUserProfile && this.getDataUserProfile.profile) {
        this.unitLabels = Util.getUnitLabels(this.getDataUserProfile.profile.measure);
      }
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
  mounted () {
    if (window.innerWidth < 500 && window.innerWidth > 0) this.isMobile = true;
    else this.isMobile = false;
    this.getUnitLabels();
    this.rangeUpdate(7);
    var today = new Date()
    this.getWeekData(today);
  }
}
</script>

<style lang="stylus">
.v-carousel .v-carousel__controls
  background rgba(255, 255, 255, 0)!important
  bottom -1em
  i
    font-size 13px!important
</style>