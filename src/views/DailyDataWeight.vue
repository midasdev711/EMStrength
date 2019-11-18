<template>
  <v-container style="max-width: 700px;" v-if="!isMobile">
    <v-card class="pb-4">
      <h2 class="text-xs-center">Enter your daily body weight for the week in the fields below:</h2>
      <v-container grid-list-xl>
        <h3 class="right">{{ averageKgs }} {{weightUnitLabel}} Weekly average</h3>
        <v-layout>
          <v-flex sm1></v-flex>
          <v-flex sm4 class="column-heading"><b>Select date</b></v-flex>
          <v-flex sm3 class="column-heading"><b>Weight</b></v-flex>
        </v-layout>
        <template v-for="day in 7">
          <DateWeight @average="addToAverage" :dataLoaded="dataLoaded" :weightData="weightData[day - 1]" :weightUnitLabel="weightUnitLabel" :key="day"/>
        </template>
      </v-container>
    </v-card>
  </v-container>
  <v-container v-else>
    <h4 class="text-xs-center">Week spans from Monday to Sunday</h4>
    <h4 class="text-xs-center">{{ averageKgs }} {{weightUnitLabel}} Weekly average</h4>
    <v-card class="pb-4">
      <h3 class="text-xs-center">Enter your daily body weight below:</h3>
      <v-container grid-list-xs>
        
        <DateWeightMobile @average="addToAverage" :dataLoaded="dataLoaded" :weightUnitLabel="weightUnitLabel"/>
      </v-container>
    </v-card>
    <v-card class="mt-4 pt-4">
      <h2 class="text-xs-center">Previous daily weight entries</h2>
      <v-container grid-list-xl>
        <v-layout>
          <v-flex xs1></v-flex>
          <v-flex xs6 class="text-xs-center">Date</v-flex>
          <v-flex xs4 class="text-xs-center">Weight</v-flex>
        </v-layout>
        <template v-for="(dailyWeight, day) of weightData">
          <v-layout :key="day">
            <v-flex xs1></v-flex>
            <v-flex xs6 class="text-xs-center">{{dailyWeight.date.split('T')[0]}}</v-flex>
            <v-flex xs4 class="text-xs-center">{{dailyWeight.weight + weightUnitLabel}}</v-flex>
          </v-layout>
        </template>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import Util from '@/util'
import DateWeight from "@/components/helper/DateWeight"
import DateWeightMobile from "@/components/helper/DateWeightMobile"


export default {
  name: "DailyDataWeight",
  components: {
    DateWeight,
    DateWeightMobile
  },
  data() {
    return {
      averageKgs: 0,
      addedValues: 0,
      totalKgs: 0,
      weightData: [],
      dataLoaded: false,
      weightUnitLabel: "kgs",
      isMobile: false,
    }
  },
  methods: {
    ...mapActions("app", {
      getWeightofWeek: "getWeightofWeek"
    }),
    addToAverage(kgs) {
      this.totalKgs = this.totalKgs + Number(kgs);
      this.addedValues = this.addedValues + 1;
      this.averageKgs = Math.round(this.totalKgs / this.addedValues);
    },
    getWeightData () {
      var week = moment().isoWeek();
      this.getWeightofWeek(week).then(result => {
        this.weightData = result['data'];

        console.log(this.weightData);
        this.dataLoaded = true;
        for (let i = 0; i < this.weightData.length; i++) {
          this.addToAverage(this.weightData[i]['weight']);
        }
      });
    },
    setMesurementUnitLabel(){
      if(this.getDataUserProfile && this.getDataUserProfile.profile) {
        var unitLabels = Util.getUnitLabels(this.getDataUserProfile.profile.measure);
        this.weightUnitLabel = unitLabels.weight.plural.toLowerCase();
      }
    }
  },
  computed: {
    ...mapGetters("app", {
      getWeekData: "getWeightofWeek",
    },),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile",
    },)
  },
  mounted() {
    if (window.innerWidth < 500 && window.innerWidth > 0) this.isMobile = true;
    else this.isMobile = false;
    this.setMesurementUnitLabel();

    if (this.getWeekData.length == 0) {
      this.getWeightData();
    }
    else {
      this.weightData = this.getWeekData;
      for (let i = 0; i < this.weightData.length; i++) {
        this.addToAverage(this.weightData[i]['weight']);
      }
      this.dataLoaded = true;
    }
  }
}
</script>

<style scoped>
  *, ::before, ::after {
    clear: both;
  }

  h3 {
    font-weight: bold;
  }

  @media (max-width: 600px) {
    .column-heading {
      display: none;
    }
  }
</style>