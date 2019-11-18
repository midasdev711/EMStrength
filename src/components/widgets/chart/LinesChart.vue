<template>
  <div>
    <v-select
      :items="checkIns"
      v-model="checkInsSwitcher"
      class="lines-chart__selector"></v-select>
    <v-card class="lines-chart">
      <chart-lines :chart-data.sync="chartData" :unitLabels="unitLabels"></chart-lines>
    </v-card>
  </div>
</template>

<script>

import ChartLines from '@/components/chart/Lines'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: "LinesChart",
  props:{
    unitLabels: Object
  },
  components: {
    ChartLines
  },
  data() {
    return {
      checkIns: ['Last 10 checkins', 'Last 20 checkins'],
      checkInsSwitcher: 'Last 10 checkins',
      apiData: [],
      chart1: {
        labels: [],
        datasets: [
          {
            label: "Weight",
            backgroundColor: ["rgba(0, 0, 0, 0)"],
            lineTension: 0,
            borderColor: ["#084D46"],
            data: []
          },
          {
            label: 'Measures',
            backgroundColor: ["rgba(0, 0, 0, 0)"],
            borderColor: ["#0BE390"],
            lineTension: 0,
            data: []
          },
          {
            label: 'Calories',
            backgroundColor: ["rgba(0, 0, 0, 0)"],
            borderColor: ["#1895CB"],
            lineTension: 0,
            data: []
          }
        ]
      },
      chart2: {
        labels: [],
        datasets: [
          {
            label: 'Weight',
            backgroundColor: ["rgba(0, 0, 0, 0)"],
            borderColor: ["#084D46"],
            data: []
          },
          {
            label: 'Measures',
            backgroundColor: ["rgba(0, 0, 0, 0)"],
            borderColor: ["#0BE390"],
            data: []
          },
          {
            label: 'Calories',
            backgroundColor: ["rgba(0, 0, 0, 0)"],
            borderColor: ["#1895CB"],
            data: []
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters("app", {
      getCheckinData: "getCheckinData"
    }),
    ...mapGetters("admin", {
      getAdminCheckinData: "getCheckinData"
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    }),
    chartData() {
      // last 10 checkin
      var newData = [];
      if (this.getDataUserProfile.userRoles && this.getDataUserProfile.userRoles.length > 0) {
        newData = this.getAdminCheckinData;
      }
      else {
        newData = this.getCheckinData;
      }
      if (newData.length > 0) {
        var length = newData.length > 10 ? 10 : newData.length;
        for (var i = 0; i < length; i ++){
          var measure = 0;
          let tmp = newData[newData.length - i - 1];
          measure += tmp.height | 0;
          measure += tmp.bicep | 0;
          measure += tmp.glutes | 0;
          measure += tmp.hips | 0;
          measure += tmp.neck | 0;
          measure += tmp.waistBelly | 0;
          measure += tmp.waistSmall | 0;
          measure += tmp.thigh | 0;
          this.chart1.datasets[0]['data'][i] = tmp.weight;
          this.chart1.datasets[1]['data'][i] = measure / 8;
          this.chart1.datasets[2]['data'][i] = tmp.calories | 0;
        }
        this.chart1.labels = [];
        for (var i = 0; i < length; i++){
          var dateStr = newData[newData.length - i - 1].dateFor;
          var date = new Date(dateStr);
          this.chart1.labels[i] = dateStr.split('T')[0].split('-')[2] + '/' + (date.getMonth() + 1);
        }
        // last 20 checkin
        length = newData.length > 20 ? 20 : newData.length;
        for (var i = 0; i < length; i ++){
          var measure = 0;
          let tmp = newData[newData.length - i - 1];
          measure += tmp.height | 0;
          measure += tmp.bicep | 0;
          measure += tmp.glutes | 0;
          measure += tmp.hips | 0;
          measure += tmp.neck | 0;
          measure += tmp.waistBelly | 0;
          measure += tmp.waistSmall | 0;
          measure += tmp.thigh | 0;
          this.chart2.datasets[0]['data'][i] = tmp.weight;
          this.chart2.datasets[1]['data'][i] = measure / 8;
          this.chart2.datasets[2]['data'][i] = tmp.calories | 0;
        }
        this.chart2.labels = [];
        for (var i = 0; i < length; i++){
          var dateStr = newData[newData.length - i - 1].dateFor;
          var date = new Date(dateStr);
          this.chart2.labels[i] = dateStr.split('T')[0].split('-')[2] + '/' + (date.getMonth() + 1);
        }
        if (this.checkInsSwitcher === 'Last 10 checkins') {
          let temp = Object.assign({}, this.chart1)
          return temp;
        }
        if (this.checkInsSwitcher === 'Last 20 checkins') {
          let temp = Object.assign({}, this.chart2)
          return temp
        }
      }
      let temp = Object.assign({}, this.chart1)
      return temp;
    }
  },
  methods: {
    ...mapActions("app", {
      getData: "getCheckinData", 
    }),
    ...mapActions("admin", {
      getAdminData: "getCheckinData", 
    }),
    getChartData() {
      console.log(this.getDataUserProfile.userRoles);
      if (this.getDataUserProfile.userRoles && this.getDataUserProfile.userRoles.length > 0) {
        var routeQuery = this.$route.query;
        var userId;
        if (routeQuery && routeQuery.userId && routeQuery.userId.length > 0) {
          userId = routeQuery.userId;
        }
        this.getAdminData(userId).then(res => {
          this.apiData = res;
        });
      } else {
        this.getData().then(res => {
          this.apiData = res;
        });
      }
    }
  },
  mounted () {
    // if (this.getCheckinData.length == 0) {
    this.getChartData();
    // }
  }
}
</script>

<style lang="stylus">
.lines-chart 
  &__selector 
    width 50%
    margin-top -18px
  canvas 
    height 366px!important
@media (max-width: 600px)
  .lines-chart 
    padding 0
    padding-top 1em
    &__selector 
      width 100%
</style>