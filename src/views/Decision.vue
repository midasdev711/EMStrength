<template>
  <v-container grid-list-xl>
    {{getLastAnswered}}
    <div class="text-xs-center" v-if="isLoading">
      <vue-circle
        :progress="100"
        :size="300"
        :reverse="false"
        line-cap="round"
        :fill="fill"
        empty-fill="rgba(200, 200, 200, .8)"
        :animation="{ duration: 1500, easing: 'circleProgressEasing' }"
        :animation-start-value="0.0"
        :start-angle="0"
        insert-mode="append"
        :thickness="12"
        :show-percent="false">
        <img src="/img/Eden-4.png" width="80%"/>
      </vue-circle>
    </div>
    <v-stepper v-model="hStepper" v-else>
      <v-stepper-header>
        <template v-for="step in getDecisionHorizontalData">
          <v-stepper-step
            :key="`${step.sectionNo}-step`"
            :complete="hStepper > (step.sectionNo + 1)"
            :step="step.sectionNo + 1"
            :color="$vuetify.theme.subheading1"
            editable
          >{{step.section}} (Section)</v-stepper-step>
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
              <div v-for="stepl in stepp.vertical" :key="stepl.subsectionNo + '-sub'">
                <v-stepper-step
                  editable
                  v-bind:step="$vuetify.theme.step.charAt(stepl.subsectionNo)"
                  :key="stepl.subsectionNo + '-sub-step'"
                  :color="$vuetify.theme.subheading2">

                  <!-- for DEBUG: span :style="{ color: $vuetify.theme.subheading2 }">Part {{stepl.subsectionNo}}  (SS No {{stepl.subsectionNo}})</span-->
                  <!--SectionHeading 
                    v-if="stepl.items[0].question.type == 'SectionHeading'"
                    :id="compId('SectionHeading-H-', stepl.items[0].question.id)"
                    :title="stepl.items[0].question.title"
                  /-->
                  <SectionPartStepper
                    v-if="stepl.items[1].question.type == 'SectionPart'"
                    :id="compId('SectionPart-H1-', stepl.items[1].question.id)"
                    :title="stepl.items[1].question.title"
                  />
                  <SectionPartStepper
                    v-if="stepl.items[2].question.type == 'SectionPart'"
                    :id="compId('SectionPart-H2-', stepl.items[2].question.id)"
                    :title="stepl.items[2].question.title"
                  />
                  <!-- for DEBUG: span v-if="stepl.items[1].question.type == 'SectionPart'">{{stepl.items[1].question.title}}</span-->

                </v-stepper-step>

                <v-stepper-content
                  v-bind:step="stepl.subsectionNo + 1"
                  :key="stepl.subsectionNo + '-sub-content'"
                >
                  <v-card class="mb-5">
                    <span class="dev-hint">P {{stepl.subsectionNo}} (SS No)</span>
                    <v-form v-model="form1Valid">
                      <div class="row" v-for="a in stepl.items" :key="a.id" v-if="a.isConditionQuestionMet">
                        <!-- TODO: only show only if a.isConditionQuestionMet == true  -->
                        <components
                          v-if="a.question.useText"
                          :is="a.question.type"
                          :id="compId(a.question.type, a.question.id)"
                          :title="a.question.title"
                          :useText="a.question.useText"
                          :questionId="a.question.id"
                          :answerId="a.answerId"
                          :length="a.question.length"
                          :items="a.question.items"
                          :text="a.text"
                          @updateValue="updateComponentValue"
                        />
                        <components
                          v-else
                          :is="a.question.type"
                          :id="compId(a.question.type, a.question.id)"
                          :title="a.question.title"
                          :useText="a.question.useText"
                          :questionId="a.question.id"
                          :answerId="a.answerId"
                          :length="a.question.length"
                          :items="a.question.items"
                          :value="a.value"
                          @updateValue="updateComponentValue"
                        />
                      </div>
                    </v-form>
                    <v-btn
                      color="primary"
                      @click="nextVerticalStep(stepp.vertical.length, getDecisionHorizontalData.length)"
                    >Continue</v-btn>
                    <v-btn flat v-if="stepl.subsectionNo > 0" @click="prevVerticalStep">Back</v-btn>
                  </v-card>
                </v-stepper-content>
              </div>
            </v-stepper>
          </v-card>

          <v-btn color="primary" @click="nextHorizontalStep">Continue</v-btn>
          <v-btn flat v-if="stepp.sectionNo > 1" @click="prevHorizontalStep">Back</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>

import VueCircle from 'vue2-circle-progress'
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import debounce from "debounce";
import components from "../components/questionLayout";

export default {
  name: "DecisionProfile",
  components: {
    ...components,
    VueCircle
  },
  data() {
    return {
      isMobile: false,
      hStepper: 1,
      vStepper: 1,
      form1Valid: false,
      questions: [],
      answers: [],
      isLoading: true,
      fill : { gradient: ["#48cba2", "#47bbe9"] },
    };
  },
  filters: {
    decNum(amount) {
      const amt = Number(amount);
      return (amt && amt.toFixed(2)) || "0.00";
      //return amt && amt.toLocaleString(undefined, {maximumFractionDigits:3}) || '0'
    }
  },
  computed: {
    ...mapGetters("app", {
      getAnswersData: "getDecisionAnswersData",
      getDecisionHorizontalData: "getDecisionHorizontalData",
      getDecisionLastAnswered: "getDecisionLastAnswered",
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    }),
    getLastAnswered() {
      this.hStepper = this.getDecisionLastAnswered.sectionNo ? this.getDecisionLastAnswered.sectionNo + 1 : 1;
      this.vStepper = this.getDecisionLastAnswered.subsectionNo ? this.getDecisionLastAnswered.subsectionNo + 1 : 1;
      if (this.getDecisionLastAnswered.sectionNo != null && this.getDecisionLastAnswered.subsectionNo != null) {
        this.goToLastStep(this.getDecisionHorizontalData[this.getDecisionLastAnswered.sectionNo || 0].vertical.length, this.getDecisionHorizontalData.length);
      }
    }
  },
  methods: {
    ...mapActions("app", {
      _getQuestionsAnswers: "getAnswersData",
      _saveAnswers: "saveAnswers"
    }),
    compId(type, id) {
      return "comp" + type + id;
    },
    updateComponentValue(value, questionId, answerId, useText) {
      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers[i].questionId == questionId) {
          if (useText) {
            this.answers[i].text = value;
          } else {
            this.answers[i].value =
              value == true ? 1 : value == false ? 0 : value;
          }
          //console.log(this.answers);
          return;
        }
      }
      let tmp = {
        answerId: answerId,
        questionId: questionId,
        value: useText ? null : value == true ? 1 : value == false ? 0 : value,
        text: useText ? value : ""
      };

      this.answers.push(tmp);
    },
    goToLastStep(verticalMaxSteps, horizontalMaxSteps) {
      if (this.vStepper < verticalMaxSteps) {
        this.vStepper ++;
      } else {
        if (this.hStepper < horizontalMaxSteps) {
          this.hStepper ++;
        }
        this.vStepper = 1;
      }
    },
    nextVerticalStep(verticalMaxSteps, horizontalMaxSteps) {
      this.isLoading = true;
      let nextSectionNo = this.hStepper;
      let nextSubsectionNo = this.vStepper;
      if (this.vStepper < verticalMaxSteps) {
        nextSubsectionNo++;
      } else {
        if (this.hStepper < horizontalMaxSteps) {
          nextSectionNo++;
        }
        nextSubsectionNo = 1;
      }
      return this.saveAnswers(nextSectionNo, nextSubsectionNo)
        .then(res => {
          if (this.vStepper < verticalMaxSteps) {
            this.vStepper++;
          } else {
            if (this.hStepper < horizontalMaxSteps) {
              this.hStepper++;
            }
            this.vStepper = 1;
          }
        })
        .then(_ => {
          this.isLoading = false;
          this.$forceUpdate();
        })
        .catch(err => {
          console.log(err);
        });
    },
    nextHorizontalStep() {
      this.hStepper =
        this.hStepper < this.questions.horizontal.length
          ? this.hStepper + 1
          : this.hStepper;
      this.vStepper = 1;
    },
    prevVerticalStep() {
      this.vStepper = this.vStepper > 1 ? this.vStepper - 1 : this.vStepper;
    },
    prevHorizontalStep() {
      this.hStepper = this.hStepper > 1 ? this.hStepper - 1 : this.hStepper;
      this.vStepper = 1;
    },
    saveAnswers(nextSectionNo, nextSubsectionNo) {
     
      let currentTime = new Date().toISOString();
      console.log(currentTime);
      let answerData = {
        userId: this.getDataUserProfile.id,
        answers: this.answers,
        complete: currentTime,
        article: "Decision",
        nextSectionNo: nextSectionNo - 1,
        nextSubsectionNo: nextSubsectionNo - 1
      };

      return this._saveAnswers(answerData)
        .then(res => {
          console.log(res);
          return res;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  mounted() {
    if (window.innerWidth < 500 && window.innerWidth > 0) this.isMobile = true;
    else this.isMobile = false;
    let params = {
      params: "?Article=Decision",
      article: "Decision"
    };

    this._getQuestionsAnswers(params).then(data => {
      this.isLoading = false;
      this.questions = data;
      console.log(data);
    });
  }
};
</script>

<style lang="stylus" scoped>
>>>.v-stepper__content {
  padding: 0;
  margin-right: 0;
}
</style>
