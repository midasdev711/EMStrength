<template>
  <v-container grid-list-xl>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Energy</v-stepper-step>

        <v-stepper-step :complete="e1 > 2" step="2">Mental & Emotional</v-stepper-step>

        <v-stepper-step step="3">Physical</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card
            class="mb-5"
            color="lighten-1"
          >
            <v-card-title>
              <h2>Energy</h2>
            </v-card-title>

            <v-card-actions>
            </v-card-actions>
          </v-card>

          <v-btn
            color="primary"
            @click="e1 = 2"
          >
            Continue
          </v-btn>

          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
            class="mb-5"
            color="lighten-1"
            height="200px"
          >
            <v-card-title>
              <h2>Mental & Emotional</h2>
            </v-card-title>
          </v-card>

          <v-btn
            color="primary"
            @click="e1 = 3"
          >
            Continue
          </v-btn>

          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-5"
            color="lighten-1"
            height="200px"
          >
            <v-card-title>
              <h2>Physical</h2>
            </v-card-title>
          </v-card>

          <v-btn
            color="primary"
            @click="e1 = 1"
          >
            Continue
          </v-btn>

          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import debounce from "debounce";
import components from '../components/questionLayout'

export default {
  name: "SymptomChecklist",
  components,
  data() {
    return {
      isMobile: false,
      e1: 1,
      e6: 1,
      questions: []
    }
  },
  filters: {
    decNum(amount) {
      const amt = Number(amount)
      return amt && amt.toFixed(2) || '0.00';
      //return amt && amt.toLocaleString(undefined, {maximumFractionDigits:3}) || '0'
    }  
  },
  computed: {
    ...mapGetters("app", {
      getAnswersData: "getSymptomAnswersData"
    }),
  },
  methods: {
    ...mapActions("app", {
      _getQuestionsAnswers: "getAnswersData",
    }),
  },
  watch: {
    getAnswersData(newprops, oldprops) {
      console.log(2123123123123);
    }
  },
  mounted() {
    if (window.innerWidth < 500 && window.innerWidth > 0) this.isMobile = true;
    else this.isMobile = false;
    let params = {
      params: '?Article=Symptom',
      article: "symptom"
    }

    this._getQuestionsAnswers(params)
      .then(data => this.questions = data);
  }

  
}
</script>

<style lang="stylus" scoped>
</style>
