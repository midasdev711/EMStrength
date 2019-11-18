<template>
  <v-card class="mt-3 meal-section">

    <v-container>
      <v-layout row align-center>
        <v-flex v-if="$vuetify.breakpoint.smAndUp"><strong>Meals</strong></v-flex>
        <v-flex layout justify-center align-center>
          <v-btn icon>
            <v-icon @click="$emit('prev_date'); previousDate()">chevron_left</v-icon>
          </v-btn>
          {{dateString}}
          <v-btn icon>
            <v-icon @click="$emit('next_date'); nextDate()">chevron_right</v-icon>
          </v-btn>
        </v-flex>
        <v-flex md3 v-if="$vuetify.breakpoint.smAndUp"><strong>Meal Macros</strong></v-flex>
      </v-layout>
      <v-layout v-for="(meal, index) in meals" :key="index" wrap align-center v-if="!isMobile">
        <v-flex xs4 md1 layout align-top>
          <span class="headline">#{{ index + 1 }} </span>
          <br/>
          <CopyMeal v-if="meal.selectedIntakes.length > 0 && !meal.isNewOrUpdated" :dialogId="index" @copyMealToDates="onCopyMealToDates"/>
          <v-tooltip bottom v-if="meal.selectedIntakes.length > 0 && meal.isNewOrUpdated">
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-btn icon disabled>
                  <v-icon>add_to_photos</v-icon>
                </v-btn>
              </div>
            </template>
            <span>Cannot copy new or updated meal</span>
          </v-tooltip>
        </v-flex>
        <v-flex xs8 md9>
          <template>
            <v-layout v-for="(intake, i) in meal.selectedIntakes" :key="i">
              <v-flex md3> {{intake.food.title}} </v-flex>
              <v-flex md2 class="weight-column"> {{totals[index][i]['weight'] + ' g'}} </v-flex>
              <v-flex md2 class="slider"> <v-slider readonly v-model="totals[index][i]['weight']"></v-slider> </v-flex>
              <v-flex md4> {{totals[index][i]['protein']}} P | {{totals[index][i]['carbohydrate']}} C | {{totals[index][i]['fat']}} F | {{totals[index][i]['calories']}} Cal
              </v-flex>
              <v-flex md1> <button @click="removeIntake(index, i)"><v-icon color="grey">highlight_off</v-icon></button> </v-flex>
            </v-layout>
          </template>
        </v-flex>
        <v-flex xs12 md2 pl-0>
          <AddItemToYourMeal v-if="meal" :dialogId="index" @addedIntakes="onAddedIntakes"/>
        </v-flex>
        <v-flex xs12 v-if="$vuetify.breakpoint.xsOnly">
          <hr />
        </v-flex>
      </v-layout>
      <v-layout v-for="(meal, index) in meals" :key="'mobile'+index" wrap align-center v-if="isMobile" class="mobile-section">
        <v-flex xs12 layout align-top>
          <span class="headline">#{{ index + 1 }} </span>
         <br/>
            <CopyMeal v-if="meal.selectedIntakes.length > 0 && !meal.isNewOrUpdated" :dialogId="index" @copyMealToDates="onCopyMealToDates"/>
            <v-tooltip bottom v-if="meal.selectedIntakes.length > 0 && meal.isNewOrUpdated">
              <template v-slot:activator="{ on }">
                <div v-on="on">
                  <v-btn icon disabled>
                    <v-icon>add_to_photos</v-icon>
                  </v-btn>
                </div>
              </template>
              <span>Cannot copy new or updated meal</span>
            </v-tooltip>
          <!--button @click="copyMeal(index, i)">
           <v-icon color="grey">date_range</v-icon>
          </button--> 
          <AddItemToYourMeal v-if="meal" :dialogId="index" @addedIntakes="onAddedIntakes"/>
        </v-flex>
        <v-flex xs12>
          <template>
            <v-layout v-for="(intake, i) in meal.selectedIntakes" :key="'mobile1'+i" row wrap>
              <v-flex xs1 class="pa-0"> <button @click="removeIntake(index, i)"><v-icon color="grey">highlight_off</v-icon></button> </v-flex>
              <v-flex xs9 class="pa-0"> {{intake.food.title}} </v-flex>
              <v-flex xs2 class="weight-column pa-0"> {{totals[index][i]['weight'] + ' g'}} </v-flex>
              <v-flex xs6 class="pt-0">
                <p class="mb-0"> {{totals[index][i]['protein']}} P | {{totals[index][i]['carbohydrate']}} C </p>
                <p class="mb-0"> {{totals[index][i]['fat']}} F | {{totals[index][i]['calories']}} Cal </p>
              </v-flex>
              <v-flex xs5 class="slider"> <v-slider readonly v-model="totals[index][i]['weight']"></v-slider> </v-flex>
            </v-layout>
          </template>
        </v-flex>
        <v-flex xs12 v-if="$vuetify.breakpoint.xsOnly">
          <hr />
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout wrap v-if="!isMobile">
      <v-flex>
        <v-btn @click="save()" :loading="loading" block dark>Save</v-btn>
      </v-flex>
      <v-flex>
        <v-btn flat>Autofit</v-btn>
      </v-flex>
      <v-flex pt-4><span class="mr-3">TOTALS</span> {{dayTotal.protein.toFixed(2)}} P | {{dayTotal.carbohydrate.toFixed(2)}} C | {{dayTotal.fat.toFixed(2)}} F | {{dayTotal.calories.toFixed(2)}} Cal</v-flex>
    </v-layout>
    <v-layout wrap v-else class="pa-2">
      <v-flex xs12 class="totals"><span class="mr-0">TOTALS</span> {{dayTotal.protein.toFixed(2)}} P | {{dayTotal.carbohydrate.toFixed(2)}} C | {{dayTotal.fat.toFixed(2)}} F | {{dayTotal.calories.toFixed(2)}} Cal</v-flex>
      <v-flex xs12 class="autofit-mobile align-center">
        <v-btn>Autofit</v-btn>
      </v-flex>
      <v-flex xs12>
        <v-btn @click="save()" :loading="loading" block dark>Save</v-btn>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import AddItemToYourMeal from "@/components/widgets/meals/AddItemToYourMeal"
import CopyMeal from "@/components/widgets/meals/CopyMeal"

import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: "Meals",
  components: {
    AddItemToYourMeal,
    CopyMeal,
  },
  data () {
    return {
      loading: false,
      meals: [],
      totals: [],
      dayTotal: {
        calories: 0,
        carbohydrate: 0,
        fat: 0,
        protein: 0
      },
      date: new Date(),
      dateString: "TODAY",
      copyMealActive: false,
      isMobile: false
    }
  },
  computed: {
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    }),
  },
  methods: {
    ...mapActions("app",{
      _getMeals: "getMeals",
      _updateMeals: "updateMeals",
      _copyMeal: "copyMeal",
    }),
    previousDate() {
      let newDate = this.date - 86400000;
      this.date = new Date(newDate);
      this.dateString = moment(this.date).format('YYYY-MM-DD');
      this.loading = true;
      this.getMeals();
      // can we show some UI feedback like:
      /*.then(result => {
        this.$toast.success(`loaded ${dateString}`, {
        });
        this.loading = false;
      }).catch( e => {
        console.log(e);
        this.loading = false;
      });*/
    },

    nextDate() {
      var today = new Date();
      var todayStr = moment(today).format('YYYY-MM-DD');
      if ((today - this.date) < 86400000) {
        return;
      }
      let newDate = this.date.getTime() + 86400000;
      this.date = new Date(newDate);
      this.dateString = moment(this.date).format('YYYY-MM-DD');
      if (this.dateString == todayStr) {
        this.dateString = "TODAY";
      }
      this.loading = true;
      this.getMeals();
      // can we show some UI feedback like:
      /*.then(result => {
        this.$toast.success(`loaded ${dateString}`, {
        });
        this.loading = false;
      }).catch( e => {
        console.log(e);
        this.loading = false;
      });*/
    },

    onAddedIntakes(data){
      var newintakes = data.intakes;

      this.meals[data.dialogId].isNewOrUpdated = (newintakes && newintakes.length > 0) ? true : this.meals[data.dialogId].isNewOrUpdated;

      for (var intake of newintakes) {
        var flag = true;
        for (var i = 0; i < this.meals[data.dialogId].intakes.length; i++) {
          var old = Object.assign({}, this.meals[data.dialogId].intakes[i]);
          var newsize;
          if (intake.food.id == old.food.id) {
            if (old.serveSize) {
              newsize = old.serves + (intake.serves * intake.serveRatio / old.serveSize);
              this.meals[data.dialogId].intakes[i].serves = newsize;
              this.meals[data.dialogId].selectedIntakes[i].serves = newsize;
            }
            else if (old.serveRatio) {
              newsize = old.serves + (intake.serves * intake.serveRatio / old.serveRatio);
              this.meals[data.dialogId].intakes[i].serves = newsize;
              this.meals[data.dialogId].selectedIntakes[i].serves = newsize;
            }
            flag = false;
          }
        }
        if (flag) {
          var tmp = Object.assign({}, intake);
          this.meals[data.dialogId].intakes.push(tmp);
        }
      }
      this.totalWeights(this.meals[data.dialogId].intakes, data.dialogId);
      this.$emit("onNewIntakes", {totals: this.totals});
    },

    copyMeal(index, i) {
      this.copyMealActive = true;
      console.log(this.meals[index]);
    },

    onCopyMealToDates(data) {
      //this.meals[index]
      console.log("CALLED: onCopyMealToDates");
      
      console.log(data);
      console.log(data.dates);
      //show CopyMeal w/ calendar multi picker
      //selected dates write back selection to
      //API needed that accepts the intake list, meal no and dates. 

      this.loading = true;
      var date = new Date();
      var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      let body = {
        userId: this.getDataUserProfile.id,
        dateFor: dateStr,
        mealNum: data.dialogId,
        dates: data.dates  
      };
      console.log(body);
      this._copyMeal(body).then(res => {
        this.loading = false;
      });
    },

    removeIntake(index, i) {
      console.log(this.meals[index]);
      this.totals[index].splice(i, 1);
      this.meals[index].intakes.splice(i, 1);
      this.calculateDayTotal();
      this.meals[index].isNewOrUpdated = true;
    },
    save() {
      this.loading = true;
      var date = new Date();
      var allIntakes = [];
      var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      this.meals.map((meal, index) => {
        var tmp = meal.selectedIntakes.map(selected => {
          return {
            userId: this.getDataUserProfile.id,
            dateFor: dateStr,
            mealNum: index,
            foodId: selected.food.id,
            serves: selected.serves,
            serveSize: selected.serveRatio,
            protein: (selected.serves * selected.food.protein * selected.serveRatio).toFixed(2),
            carbohydrate: (selected.serves * selected.food.carbohydrate * selected.serveRatio).toFixed(2),
            fat: (selected.serves * selected.food.fat * selected.serveRatio).toFixed(2),
            calories: (selected.serves * selected.food.calories * selected.serveRatio).toFixed(2)
          }
        });
        allIntakes.push(...tmp);
      });
      this._updateMeals({data: allIntakes, date: dateStr}).then(res => {
        this.meals.forEach(meal => meal.isNewOrUpdated = false);
        this.loading = false;
      });
    },
    totalWeights(meals, index) {
      this.totals[index] = [];
      for (var i = 0; i < meals.length; i ++) {
        var tmp = {
          weight: (meals[i].serves * 100 * meals[i].serveRatio).toFixed(2),
          protein: (meals[i].food.protein * meals[i].serves * meals[i].serveRatio).toFixed(2),
          fat: (meals[i].food.fat * meals[i].serves * meals[i].serveRatio).toFixed(2),
          carbohydrate: (meals[i].food.carbohydrate * meals[i].serves * meals[i].serveRatio).toFixed(2),
          calories: (meals[i].food.calories * meals[i].serves * meals[i].serveRatio).toFixed(2)
        }
        this.totals[index].push(tmp);
      }
      this.calculateDayTotal();
      return true;
    },
    calculateTotals(meals, index) {
      this.totals[index] = [];

      for (var i = 0; i < meals.length; i ++) {
        var tmp = {
          weight: (meals[i].serves * 100 * meals[i].serveSize).toFixed(2),
          protein: (meals[i].protein * meals[i].serves * meals[i].serveSize).toFixed(2),
          fat: (meals[i].fat * meals[i].serves * meals[i].serveSize).toFixed(2),
          carbohydrate: (meals[i].carbohydrate * meals[i].serves * meals[i].serveSize).toFixed(2),
          calories: (meals[i].calories * meals[i].serves * meals[i].serveSize).toFixed(2)
        }
        this.totals[index].push(tmp);
      }
      return true;
    },
    calculateDayTotal() {
      this.dayTotal = {
        calories: 0,
        carbohydrate: 0,
        fat: 0,
        protein: 0
      };
      for (let i = 0; i < this.totals.length; i++) {
        const element1 = this.totals[i];
        for (let j = 0; j < element1.length; j++) {
          const element = element1[j];
          this.dayTotal.carbohydrate += parseFloat(element.carbohydrate);
          this.dayTotal.calories += parseFloat(element.calories);
          this.dayTotal.protein += parseFloat(element.protein);
          this.dayTotal.fat += parseFloat(element.fat);
        }
      }
    },
    getMeals() {
      this._getMeals(this.date).then(resp => {
        this.meals = [];
        this.totals = [];
        var mealDict = resp;
        for (var mealNum in mealDict) {
          var meal = [];
          for (var each of mealDict[mealNum]) {
            var tmp;
            tmp = Object.assign({}, each);
            meal.push(tmp);
          }

          this.meals.push({
            mealNum: mealNum,
            selectedIntakes: meal,
            intakes: meal
          });
          if (mealDict[mealNum]) {
            this.calculateTotals(mealDict[mealNum], mealNum);
          }
        };
        this.calculateDayTotal();
      });
    }
  },
  mounted(){
    if (window.innerWidth < 800 && window.innerWidth > 0) this.isMobile = true;
    else this.isMobile = false;
    this.getMeals();
  }

}
</script>

<style lang="stylus" scoped>
  .slider 
    padding 0!important
    padding-right 1em
    .v-input--slider
      margin-top 0.5em
      .v-input__slot
        margin 0!important
  .mobile-section
    padding 0
  .meal-section
    @media screen and (max-width: 500px)
      padding 0
  .totals
    font-size 14px
    font-weight bold
    text-align center
  
  .autofit-mobile
    text-align center
    .v-btn
      margin 0 auto
      font-size 12px
      padding 1em
      width 100%
</style>
