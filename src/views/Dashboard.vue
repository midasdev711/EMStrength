<template>
  <v-container grid-list-xl fluid>
    <!-- <v-layout wrap>
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
          <BarChart label="Protein" :unitLabels="unitLabels" color="#1895CB" :values="proteinData" :standard="'20'" />
        </v-carousel-item>
        <v-carousel-item>
          <BarChart label="Carbohydrates" :unitLabels="unitLabels" color="#0BE390" :values="carbohydratesData" :standard="'20'" />
        </v-carousel-item>
        <v-carousel-item>
          <BarChart label="Fat" color="red" :unitLabels="unitLabels" :values="fatData" :standard="'20'" />
        </v-carousel-item>
      </v-carousel>

      <v-flex xs12 md4 v-if="!isMobile">
        <BarChart label="Protein" color="#1895CB" :unitLabels="unitLabels" :values="proteinData" :standard="'20'" />
      </v-flex>

      <v-flex xs12 md4 v-if="!isMobile">
        <BarChart label="Carbohydrates" color="#0BE390" :unitLabels="unitLabels" :values="carbohydratesData" :standard="'20'" />
      </v-flex>

      <v-flex xs12 md4 v-if="!isMobile">
        <BarChart label="Fat" color="red" :unitLabels="unitLabels" :values="fatData" :standard="'20'" />
      </v-flex>

      <v-flex xs12 class="summary__spacer">
        <h2>Weekly measures summary</h2>
        <WeeklyMeasuresSummary />
      </v-flex>
    </v-layout> -->
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
    }),
    rangeUpdate(range) {
      
    },
    getWeekData(start) {
      // var weeks = [];
      // for (let i = 0; i < 6; i++) {
      //   var element = start - 86400000 * 7;
      //   var tmp = new Date(start - 86400000 * 7 * i)
      //   var weekinfo = moment(tmp).isoWeek();
      //   weeks.push({week: weekinfo, year: tmp.getFullYear(), date: tmp});
      // }
      // return Promise.all(weeks.map(week => {
      //   var params = `?week=${week.week}&year=${week.year}&Sort=1&Count=10`;
      //   return this.getWeeklySummary({params: params, date: week.date}).then(res => {
      //     // console.log(res);
      //   }).catch(e => {
      //     console.log(e);
      //   });
      // })).then(res => {
      // });
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