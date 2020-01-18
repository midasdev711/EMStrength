<template>
  <v-container grid-list-xl>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Stress Measurement</v-stepper-step>

        <v-stepper-step :complete="e1 > 2" step="2">Recovery Measurement</v-stepper-step>

        <v-stepper-step step="3">Physical</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card
            class="mb-5 step-content1"
            color="lighten-1"
          >
            <v-card-title>
              <h2>Mental/Emotional Energy Demands</h2>
            </v-card-title>

            <v-card-actions>
              <v-stepper v-model="e6" vertical>
                <v-stepper-step :complete="e6 > 1" step="A">
                  Applicable statements
                </v-stepper-step>

                <v-stepper-content step="1">
                  <v-card color="lighten-1" class="mb-5" min-height="200px">
                    <h4>Still tick if only SOMETIMES and only SOMEWHAT applicable</h4>
                    <v-checkbox v-for="question in questions" v-model="question.value" :label="question.questionText"></v-checkbox>
                    <components :is="'TextField'" :title="''" :id="''" :disabled="false" :text="''" :length="120" :useText="true" :questionId="null" :answerId="null" @updateValue="updateComponentValue"/>
                  </v-card>
                  
                  <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 2" step="B">To what extent does each statement apply?</v-stepper-step>

                <v-stepper-content step="2">
                  <v-card color="lighten-1" class="mb-5" min-height="200px">
                    <h4>Still tick if only SOMETIMES and only SOMEWHAT applicable</h4>
                    <v-checkbox v-for="question in questions" v-model="question.value" :label="question.questionText"></v-checkbox>
                    <components :is="'TextField'" :title="''" :id="''" :disabled="false" :text="''" :length="120" :useText="true" :questionId="null" :answerId="null" @updateValue="updateComponentValue"/>
                  </v-card>
                  <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
                  <v-btn flat @click="e6 = 1">Back</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 3" step="C">For HOW LONG has the following applied?</v-stepper-step>

                <v-stepper-content step="3">
                  <v-card color="lighten-1" class="mb-5" min-height="200px">
                    <h4>Still tick if only SOMETIMES and only SOMEWHAT applicable</h4>
                    <v-checkbox v-for="question in questions" v-model="question.value" :label="question.questionText"></v-checkbox>
                    <components :is="'TextField'" :title="''" :id="''" :disabled="false" :text="''" :length="120" :useText="true" :questionId="null" :answerId="null" @updateValue="updateComponentValue"/>
                  </v-card>
                  <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
                  <v-btn flat @click="e6 = 2">Back</v-btn>
                </v-stepper-content>
              </v-stepper>
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
  name: "StressRecoveryDiagnostic",
  components,
  data() {
    return {
      isMobile: false,
      e1: 1,
      e6: 1,
      questions: [{
        id: "n-a",
        questionText: "I feel pressure from the world around me to keep my struggles to myself",
        value: false
      }, {
        id: "n-a",
        questionText: "I identify with messages like 'nothing does not comes without hard work'",
        value: false
      }, {
        id: "n-a",
        questionText: "I feel pressure from the world we live in to look for a certain way",
        value: false
      }, {
        id: "n-a",
        questionText: "any other socio cultural factors not listed",
        value: false
      }],
      // questionLists: [{
      //   title: "Physical",
      //   questions: [{
      //       id: "n-a",
      //       questionText: "Waking 5 mins stretching",
      //       value: false
      //     }, {
      //       id: "n-a",
      //       questionText: "morning 10 - 15 mins walking",
      //       value: false
      //     }, {
      //       id: "n-a",
      //       questionText: "fruit & vegetables breakfast smoothly",
      //       value: false
      //     }, {
      //       id: "n-a",
      //       questionText: "glass of water (before coffee)",
      //       value: false
      //     }]
      //   }, {
      //     title: "Mental & Emotional",
      //     questions:[{
      //       id: "n-a",
      //       questionText: "10 mins meditation after walking",
      //       value: false
      //     }, {
      //       id: "n-a",
      //       questionText: "review positives in your life",
      //       value: false
      //     }, {
      //       id: "n-a",
      //       questionText: "fruit & vegetables breakfast smoothly",
      //       value: false
      //     }, {
      //       id: "n-a",
      //       questionText: "glass of water (before coffee)",
      //       value: false
      //     }]}
      // ],
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
  },
  methods: {
    ...mapActions("app", {
    }),
    updateComponentValue() {

    }
  },
  watch: {
  },
  mounted() {
    if (window.innerWidth < 500 && window.innerWidth > 0) this.isMobile = true;
    else this.isMobile = false;
  }

  
}
</script>

<style lang="stylus" scoped>
>>>.v-card__title
  padding-bottom 0
>>>.v-stepper__header
  box-shadow none
>>>.v-stepper__content
  padding 0
.theme--light.v-sheet
  padding 5px
.v-stepper--vertical .v-stepper__step
  padding-left 1em
.step-content1 .v-stepper__content
  margin-left 1.8em
  margin-right 0
.step-content1 .v-card
  box-shadow none 
</style>
