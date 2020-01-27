<template>
  <v-container grid-list-xl>
    <div class="text-xs-center" v-if="isLoading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="orange"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-stepper v-model="hStepper" v-else>
      <v-stepper-header>
        <template v-for="step in getDecisionHorizontalData">
          <v-stepper-step
            :key="`${step.sectionNo}-step`"
            :complete="hStepper > (step.sectionNo + 1)"
            :step="step.sectionNo + 1"
            editable
          >
            {{step.section}} (Section)
          </v-stepper-step>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="stepp in getDecisionHorizontalData"
          :key="`${stepp.sectionNo}-content`"
          :step="stepp.sectionNo + 1"
        >
          <v-card>
            <v-stepper vertical v-model="vStepper">
              <div v-for="stepl in stepp.vertical" :key="stepl.subsectionNo + '-sub'" >
                <v-stepper-step editable v-bind:step="stepl.subsectionNo + 1" :key="stepl.subsectionNo + '-sub-step'">
                  Part {{stepl.subsectionNo}}  (SS No {{stepl.subsectionNo}})
                </v-stepper-step>

                <v-stepper-content v-bind:step="stepl.subsectionNo + 1" :key="stepl.subsectionNo + '-sub-content'">
                  <v-card class="mb-5">
                    P {{stepl.subsectionNo}} (SS No)
                    <v-form v-model="form1Valid" >
                      <div class="row" v-for="a in stepl.items" :key="a.id">
                        <components v-if="a.question.useText" :is="a.question.type" :id="compId(a.question.type, a.question.id)" :title="a.question.title" :useText="a.question.useText" :questionId="a.question.id" :answerId="a.answerId" :length="a.question.length" :items="a.question.items" @updateValue="updateComponentValue" />
                        <components v-else :is="a.question.type" :id="compId(a.question.type, a.question.id)" :title="a.question.title" :useText="a.question.useText" :questionId="a.question.id" :answerId="a.answerId" :length="a.question.length" :items="a.question.items" @updateValue="updateComponentValue"/>
                      </div>
                    </v-form>
                    <v-btn
                      color="primary"
                      @click="nextVerticalStep(stepp.vertical.length, getDecisionHorizontalData.length)"
                    >
                      Continue
                    </v-btn>
                    <v-btn flat v-if="stepl.sectionNo > 1" @click="prevVerticalStep">Back</v-btn>
                  </v-card>
                </v-stepper-content>
              </div>
            </v-stepper>
          </v-card>

          <v-btn
            color="primary"
            @click="nextHorizontalStep"
          >
            Continue
          </v-btn>
          <v-btn flat v-if="stepp.sectionNo > 1" @click="prevHorizontalStep">Back</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>

import moment from 'moment';
import { mapActions, mapGetters } from "vuex";
import debounce from "debounce";
import components from '../components/questionLayout'

export default {
  name: "DecisionProfile",
  components,
  data() {
    return {
      isMobile: false,
      hStepper: 1,
      vStepper: 1,
      form1Valid: false,
      questions: [],
      answers: [],
      isLoading: true
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
      getAnswersData: "getDecisionAnswersData",
      getDecisionHorizontalData: "getDecisionHorizontalData"
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    })
  },
  methods: {
    ...mapActions("app", {
      _getQuestionsAnswers: "getAnswersData",
      _saveAnswers: "saveAnswers"
    }),
    compId(type, id) {
      return "comp"+type+id;
    },
    updateComponentValue(value, questionId, answerId, useText) {
      for (let i = 0; i < this.answers.length; i ++) {
        if (this.answers[i].questionId == questionId) {
          if (useText) {
            this.answers[i].text = value;
          } else {
            this.answers[i].value = value == true ? 1 : (value == false ? 0 : value);
          }
          return;
        }
      }
      let tmp = {
        answerId: answerId,
        questionId: questionId,
        value: useText ? null : value == true ? 1 : (value == false ? 0 : value),
        text: useText ? value : ""
      }

      this.answers.push(tmp);
    },
    nextVerticalStep(verticalMaxSteps, horizontalMaxSteps) {
      this.isLoading = true;
      return this.saveAnswers().then(res => {
        if (this.vStepper < verticalMaxSteps) {
          this.vStepper ++;
        } else {
          if (this.hStepper < horizontalMaxSteps) {
            this.hStepper ++;
          }
          this.vStepper = 1;
        }
      }).then(_ => {
        this.isLoading = false;
        this.$forceUpdate();
      }).catch(err => {
        console.log(err);
      });
    },
    nextHorizontalStep() {
      this.hStepper = this.hStepper < this.questions.horizontal.length ? this.hStepper + 1 : this.hStepper;
      this.vStepper = 1;
    },
    prevVerticalStep() {
      this.vStepper = this.vStepper > 1 ? this.vStepper - 1 : this.vStepper;
    },
    prevHorizontalStep() {
      this.hStepper = this.hStepper > 1 ? this.hStepper - 1 : this.hStepper;
      this.vStepper = 1;
    },
    saveAnswers() {
      let currentTime = new Date().toISOString();
      console.log(currentTime);
      let answerData = {
        userId: this.getDataUserProfile.id,
        answers: this.answers,
        complete: currentTime,
        article: "Symptom"
      }

      return this._saveAnswers(answerData)
        .then(res => {
          console.log(res);
          return res;
        }).catch(err => {
          throw err;
        })
    }
  },
  mounted() {
    if (window.innerWidth < 500 && window.innerWidth > 0) this.isMobile = true;
    else this.isMobile = false;
    let params = {
      params: '?Article=Decision',
      article: "Decision"
    }

    this._getQuestionsAnswers(params)
      .then(data => {
        this.isLoading = false;
        this.questions = data;
        console.log("Decision QA data:");
        console.log(data)
      });
  }

  
}
</script>

<style lang="stylus" scoped>
>>>.v-stepper__content
  padding 0
  margin-right 0
</style>
