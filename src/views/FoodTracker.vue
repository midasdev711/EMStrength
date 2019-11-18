<template>
  <v-container grid-list-xl v-if="isDataReady">
    <v-tabs slider-color="black">
      <v-tab @click="currentTab='consumed'; tabToggle()">Consumed</v-tab>
      <v-tab @click="currentTab='remaining'; tabToggle()">Remaining</v-tab>
      <v-tab>Micronutrients</v-tab>
      <v-tab-item>
        <h2 class="mt-4">MACROS</h2>
        <v-card>
          <v-layout wrap>
            <v-flex xs4 sm4>
              <DoughnutChart :chart-data="macrosChartData.protein" />
            </v-flex>
            <v-flex xs4 sm4>
              <DoughnutChart :chart-data="macrosChartData.carbohydrate" />
            </v-flex>
            <v-flex xs4 sm4>
              <DoughnutChart :chart-data="macrosChartData.fat" />
            </v-flex>
          </v-layout>
          <div id="showCalories">
            <div class="right">{{(todayDiet && todayDiet.consumed && todayDiet.consumed.calories ? todayDiet.consumed.calories : "") + " / " + (userProfile && userProfile.calories ? userProfile.calories : "")}}</div>
            <div>Calories</div>
            <progress v-bind:value="todayDiet && todayDiet.consumed && todayDiet.consumed.calories ? todayDiet.consumed.calories : 0" v-bind:max="userProfile && userProfile.calories ? userProfile.calories : 0"></progress>
          </div>
        </v-card>
        <Meals @prev_date="previousDate" @next_date="nextDate" @onNewIntakes="newIntakes"/>
      </v-tab-item>
      <v-tab-item>
        <h2 class="mt-4">MACROS</h2>
        <v-card>
          <v-layout wrap>
            <v-flex xs4 sm4>
              <DoughnutChart :chart-data="macrosChartData.protein" />
            </v-flex>
            <v-flex xs4 sm4>
              <DoughnutChart :chart-data="macrosChartData.carbohydrate" />
            </v-flex>
            <v-flex xs4 sm4>
              <DoughnutChart :chart-data="macrosChartData.fat" />
            </v-flex>
          </v-layout>
          <div id="showCalories">
            <div class="right">{{(todayDiet && todayDiet.remaining && todayDiet.remaining.calories ? todayDiet.remaining.calories : "") + " / " + (userProfile && userProfile.calories ? userProfile.calories : "")}}</div>
            <div>Calories</div>
            <progress v-bind:value="todayDiet && todayDiet.remaining && todayDiet.remaining.calories ? todayDiet.remaining.calories : 0" v-bind:max="userProfile && userProfile.calories ? userProfile.calories : 0"></progress>
          </div>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <Micronutrients :tableData="micronutrientsData" />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from 'moment';
import store from '@/store';
import DoughnutChart from "@/components/widgets/chart/DoughnutChart";
import Meals from "@/components/widgets/meals/Meals";
import Micronutrients from "@/components/widgets/meals/Micronutrients";

export default {
  name: "FoodTracker",
  components: {
    DoughnutChart,
    Meals,
    Micronutrients
  },
  data() {
    return {
      isDataReady: true,
      selectedDate: new Date(),
      todayDiet: {},
      userProfile: {},
      currentTab: 'consumed',
      micronutrientsData: [
        {
          title: 'Vitamins',
          items: [
            {
              title: 'B1 (Thiamine)',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'B2 (Ribocflavin)',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'B3 (Niacin)',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'B5 (Pantothenic Acid)',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'B6 (Pyridoxine)',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'B12 (Cobalamin)',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'Folate',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'Vitamin A',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'Vitamin C',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'Vitamin D',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'Vitamin E',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'Vitamin K',
              amount: '0.0',
              percentage: '0'
            }
          ]
        },
        {
          title: 'Minerals',
          items: [
            {
              title: 'Calcium',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'Copper',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'Iron',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'Magnesium',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'Manganese',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'Phosphorus',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'Potasium',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'Selenium',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'Sodium',
              amount: '0.0',
              percentage: '0'
            },
            {
              title: 'Zinc',
              amount: '0.0',
              percentage: '0'
            }
          ]
        }
      ],
      macrosChartData: {
        protein: {
          datasets: [
            {
              label: "PROTEIN",
              backgroundColor: ["#0BE390", "#EEE"],
              data: [0, 0]
            }
          ]
        },
        carbohydrate: {
          datasets: [
            {
              label: "CARBOHYDRATE",
              backgroundColor: ["#0BE390", "#EEE"],
              data: [0, 0]
            }
          ]
        },
        fat: {
          datasets: [
            {
              label: "FAT",
              backgroundColor: ["#0BE390", "#EEE"],
              data: [0, 0]
            }
          ]
        }
      },
      macrosChartIndexes: {
        consumed: 0,
        profile: 1
      }
    };
  },
  methods: {
    ...mapActions("app", {
      _getTodayDiet: "getTodayDiet"
    }),

    previousDate() {
      let newDate = this.selectedDate - 86400000;
      this.selectedDate = new Date(newDate);
    },

    nextDate() {
      var today = new Date();
      if ((today - this.selectedDate) < 86400000) {
        return;
      }
      let newDate = this.selectedDate.getTime() + 86400000;
      this.selectedDate = new Date(newDate);
    },

    newIntakes(data) {
      this.todayDiet.consumed.calories = 0;
      this.todayDiet.consumed.protein = 0;
      this.todayDiet.consumed.carbohydrate = 0;
      this.todayDiet.consumed.fat = 0;
      this.todayDiet.remaining.calories = parseFloat(this.userProfile.calories);
      this.todayDiet.remaining.protein = parseFloat(this.userProfile.protein);
      this.todayDiet.remaining.carbohydrate = parseFloat(this.userProfile.carbohydrate);
      this.todayDiet.remaining.fat = parseFloat(this.userProfile.fat);

      for (var value of data.totals) {
        for (var each of value) {
          this.todayDiet.consumed.calories += parseFloat(each.calories);
          this.todayDiet.remaining.calories -= parseFloat(each.calories);

          this.todayDiet.consumed.protein += parseFloat(each.protein);
          this.todayDiet.remaining.protein -= parseFloat(each.protein);

          this.todayDiet.consumed.carbohydrate += parseFloat(each.carbohydrate);
          this.todayDiet.remaining.carbohydrate -= parseFloat(each.carbohydrate);

          this.todayDiet.consumed.fat += parseFloat(each.fat);
          this.todayDiet.remaining.fat -= parseFloat(each.fat);
        }
      }
      this.todayDiet.consumed.calories = this.todayDiet.consumed.calories.toFixed(2);
      this.todayDiet.consumed.protein = this.todayDiet.consumed.protein.toFixed(2);
      this.todayDiet.consumed.carbohydrate = this.todayDiet.consumed.carbohydrate.toFixed(2);
      this.todayDiet.consumed.fat = this.todayDiet.consumed.fat.toFixed(2);
      this.todayDiet.remaining.calories = this.todayDiet.remaining.calories.toFixed(2);
      this.todayDiet.remaining.protein = this.todayDiet.remaining.protein.toFixed(2);
      this.todayDiet.remaining.carbohydrate = this.todayDiet.remaining.carbohydrate.toFixed(2);
      this.todayDiet.remaining.fat = this.todayDiet.remaining.fat.toFixed(2);
      this.buildDataForMacrosChart();
    },

    getTodayDiet() {
      this._getTodayDiet().then(data => {
        this.todayDiet = data;
        if(data.profile){
          this.userProfile = data.profile;
          this.buildDataForMacrosChart();
          this.buildDataForMicroNutrients();
        }
        this.isDataReady = true;
      });
    },

    buildDataForMicroNutrients() {
      let data = this.todayDiet.consumed.micronutrients;
      let Vitamins = Object.assign({}, this.micronutrientsData[0]);
      let Minerals = Object.assign({}, this.micronutrientsData[1]);
      Vitamins['items'][0].amount = data ? data.B1 : 0;
      Vitamins['items'][1].amount = data ? data.B2 : 0;
      Vitamins['items'][2].amount = data ? data.B3 : 0;
      Vitamins['items'][3].amount = data ? data.B5 : 0;
      Vitamins['items'][4].amount = data ? data.B6 : 0;
      Vitamins['items'][5].amount = data ? data.B12 : 0;
      Vitamins['items'][6].amount = data ? data.Folate : 0;
      Vitamins['items'][7].amount = data ? data.A : 0;
      Vitamins['items'][8].amount = data ? data.C : 0;
      Vitamins['items'][9].amount = data ? data.D : 0;
      Vitamins['items'][10].amount = data ? data.E : 0;
      Vitamins['items'][11].amount = data ? data.K : 0;
      Minerals['items'][0].amount = data ? data.Calcium : 0;
      Minerals['items'][1].amount = data ? data.Copper : 0;
      Minerals['items'][2].amount = data ? data.Iron : 0;
      Minerals['items'][3].amount = data ? data.Magnesium : 0;
      Minerals['items'][4].amount = data ? data.Manganese : 0;
      Minerals['items'][5].amount = data ? data.Phosphorous : 0;
      Minerals['items'][6].amount = data ? data.Potassium : 0;
      Minerals['items'][7].amount = data ? data.Selenium : 0;
      Minerals['items'][8].amount = data ? data.Sodium : 0;
      Minerals['items'][9].amount = data ? data.Zinc : 0;

      let temp = [ Vitamins, Minerals];
      this.micronutrientsData = temp;
    },

    tabToggle() {
      setTimeout(this.buildDataForMacrosChart, 100);
    },

    buildDataForMacrosChart() {
      let protein = {
        datasets: [{
          label: "PROTEIN",
          backgroundColor: ["#0BE390", "#EEE"],
          data: []
        }]
      };

      let carbohydrate = {
        datasets: [ {
          label: "CARBOHYDRATE",
          backgroundColor: ["#0BE390", "#EEE"],
          data: []
        }]
      };
      
      let fat = {
        datasets: [{
          label: "FAT",
          backgroundColor: ["#0BE390", "#EEE"],
          data: []
        }]
      };
      if (this.currentTab == "consumed") {
        protein.datasets[0].data[this.macrosChartIndexes.consumed] = parseFloat(this.todayDiet.consumed.protein).toFixed(2);
        carbohydrate.datasets[0].data[this.macrosChartIndexes.consumed] = parseFloat(this.todayDiet.consumed.carbohydrate).toFixed(2);
        fat.datasets[0].data[this.macrosChartIndexes.consumed] = parseFloat(this.todayDiet.consumed.fat).toFixed(2);
      }
      else if (this.currentTab == 'remaining') {
        protein.datasets[0].data[this.macrosChartIndexes.consumed] = parseFloat(this.todayDiet.remaining.protein).toFixed(2);
        carbohydrate.datasets[0].data[this.macrosChartIndexes.consumed] = parseFloat(this.todayDiet.remaining.carbohydrate).toFixed(2);
        fat.datasets[0].data[this.macrosChartIndexes.consumed] = parseFloat(this.todayDiet.remaining.fat).toFixed(2);
      }
      protein.datasets[0].data[this.macrosChartIndexes.profile] = this.userProfile.protein;
      carbohydrate.datasets[0].data[this.macrosChartIndexes.profile] = this.userProfile.carbohydrate;
      fat.datasets[0].data[this.macrosChartIndexes.profile] = this.userProfile.fat;
      this.macrosChartData = Object.assign({}, this.macrosChartData, { protein, carbohydrate, fat });
    },
  },
  mounted() {
    this.getTodayDiet();
  }
};
</script>

<style lang="stylus">
#showCalories {
  margin-top: 3em;
}

.chart-doughnut {
  margin: 0 auto;
}

@media (max-width: 800px) {
  .chart-doughnut__inside {
    top: 60%;
  }

  .chart {
    h3 {
      font-size: 12px;
    }
  }
}
</style>