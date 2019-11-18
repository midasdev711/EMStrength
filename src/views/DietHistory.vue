<template>
  <v-container grid-list-xl fluid>
    <v-layout wrap>
      <v-flex xs12 sm6 v-for="(diet, index) in diets" :key="index">
        <v-card>
          <table class="v-table theme--light">
            <caption>Diet from: {{ diet.date }}</caption>
            <tbody>
              <tr>
                <td>Protein</td>
                <td>{{diet.protein | decNum}}</td>
                <td>{{diet.proteinpercent}} %</td>
              </tr>
              <tr>
                <td>Carbohydrate</td>
                <td>{{diet.carbohydrate | decNum}}</td>
                <td>{{diet.carbohydratepercent}} %</td>
              </tr>
              <tr>
                <td>Fat</td>
                <td>{{diet.fat | decNum}}</td>
                <td>{{diet.fatpercent}} %</td>
              </tr>
              <tr>
                <td>Calories</td>
                <td>{{diet.calories | decNum}}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import API from "@/api";
import moment from 'moment';
import { isNumber } from 'util';

export default {
  name: "DietHistory",
  data() {
    return {
      diets: [],
      startDate: new Date(2019, 0, 1),
      endDate: new Date(2019, 11, 1),
      pageSize: 5,
      currentPage: 1,
      total: 0
    };
  },
  computed: {
    // diets() {
    //   return this.getDiets();
    // },
  },
  filters: {
    decNum(amount) {
      const amt = Number(amount)
      return amt && amt.toFixed(2) || '0.00';
    }  
  },
  methods: {
    ...mapActions("app", {
      getDiets: "getDiets"
    }),
    getDietsData() {
      var params = {
        startDate: this.startDate,
        endDate: this.endDate,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }
      this.getDiets(params).then(result => {
        for (var each in result.results) {
          var tmp = Object.assign({}, result.results[each]);
          var total = parseFloat(tmp['protein']) + parseFloat(tmp['carbohydrate']) + parseFloat(tmp['fat']);
          tmp['date'] = this.fromNow(tmp['dateFor']), //tmp['dateFor'].split('T')[0];
          tmp['proteinpercent'] = (parseFloat(tmp['protein']) * 100 / total).toFixed(2);
          tmp['carbohydratepercent'] = (parseFloat(tmp['carbohydrate']) * 100 / total).toFixed(2);
          tmp['fatpercent'] = (parseFloat(tmp['fat']) * 100 / total).toFixed(2);
          this.diets.push(tmp);
        }
        // this.diets = result.results;
        console.log(this.diets);
        this.totals = result.total;
      });
    },
    numberWithCommas(x) {
      if(isNumber(x)){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return x;
    },
    fromNow(time) {
      const date = moment(time)
      return date.fromNow();
    }  
  },
  mounted() {
    this.getDietsData();
  }
};
</script>

<style scoped>
.v-table.theme--light td {
  padding: 1em;
}
</style>