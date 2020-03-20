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
        :show-percent="false"
      >
        <img src="/img/Eden-4.png" width="80%" />
      </vue-circle>
    </div>
    <template v-else>
      <v-layout justify-center ma-0>
        <v-flex sm6 xs12 v-if="notification">
          <v-card
            color
            class="black--text mt-2 col-sm-6"
          >
            <v-card-title primary-title>
              <div>
                <h3>This part of the diagnostic gathers information on factors that can have an impact on decisions and tendencies around self-care and energy management. <br> For each queston, a statement describes a fector in a person's life that might affect decisions of whether or not to push harder, take on more workload, not get enough recovery, or prioritise other things before self-care. These are not necessarily considered negative influences - some of them drive people to achieve great things - so answering the statements is not evaluating you in any way; rather, providing answers simply helps to paint a more accurate picture of what's going on in your world and the potential impact on your energy wellbeing.</h3>
              </div>
            </v-card-title>
            <v-card-actions text-align-right>
              <v-btn flat right @click="notification = false">Got it!</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-stepper v-model="hStepper" v-else>
          <v-stepper-header>
            <template v-for="step in getFilteredQuestionData">
              <v-stepper-step
                :key="`${step.sectionNo}-step`"
                :complete="hStepper > (step.sectionNo + 1)"
                :step="step.sectionNo + 1"
                :color="$vuetify.theme.subheading1"
                editable
              >{{step.section}}</v-stepper-step>
            </template>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content
              v-for="stepp in getFilteredQuestionData"
              :key="`${stepp.sectionNo}-content`"
              :step="stepp.sectionNo + 1"
            >
              <v-card v-if="isMobile">
                <h3>
                  {{stepp.section}}
                  <span
                    class="right"
                  >{{stepp.sectionNo + 1}} of {{getFilteredQuestionData.length}}</span>
                </h3>
              </v-card>
              <v-card>
                <v-stepper vertical v-model="vStepper">
                  <div
                    v-for="vStepNum in stepp.vertical.length"
                    :key="`${stepp.sectionNo}-${vStepNum}`"
                  >
                    <v-stepper-step
                      editable
                      v-bind:step="$vuetify.theme.step.charAt(vStepNum-1)"
                      :key="vStepNum + '-sub-step'"
                      :color="$vuetify.theme.subheading2"
                    >
                      <SectionPartStepper :data="stepp.vertical[vStepNum-1].items" />
                    </v-stepper-step>

                    <v-stepper-content v-bind:step="vStepNum" :key="vStepNum + '-sub-content'">
                      <v-card v-if="isMobile && stepp.vertical.length > 1">
                        <h3>
                          {{$vuetify.theme.step.charAt(vStepNum-1)}}
                          <span
                            class="right"
                          >{{vStepNum}} of {{stepp.vertical.length}}</span>
                        </h3>
                      </v-card>
                      <v-card class="mb-5">
                        <span class="dev-hint">P {{vStepNum-1}} (SS No)</span>
                        <v-form v-model="form1Valid">
                          <div
                            class="row"
                            v-for="a in stepp.vertical[vStepNum-1].items"
                            :key="a.id"
                          >
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
                              :section="stepp.sectionNo + 1"
                              :subsection="vStepNum"
                              @update-value="updateComponentValue"
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
                              :section="stepp.sectionNo + 1"
                              :subsection="vStepNum"
                              @update-value="updateComponentValue"
                            />
                          </div>
                        </v-form>
                        <v-btn
                          color="primary"
                          @click="nextVerticalStep(stepp.vertical.length, getFilteredQuestionData.length)"
                        >Continue</v-btn>
                        <v-btn flat v-if="vStepNum-1 > 0" @click="prevVerticalStep">Back</v-btn>
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
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import VueCircle from "vue2-circle-progress";
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
      notification: true,
      isMobile: false,
      hStepper: 1,
      vStepper: 1,
      form1Valid: false,
      questions: [],
      answers: [],
      isLoading: true,
      fill: { gradient: ["#48cba2", "#47bbe9"] }
    };
  },
  filters: {
    decNum(amount) {
      const amt = Number(amount);
      return (amt && amt.toFixed(2)) || "0.00";
    }
  },
  computed: {
    ...mapGetters("app", {
      getAnswersData: "getDecisionAnswersData",
      getDecisionHorizontalData: "getDecisionHorizontalData",
      getDecisionLastAnswered: "getDecisionLastAnswered"
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    }),
    getFilteredQuestionData() {
      let result = []
      for (let i = 0; i < this.getDecisionHorizontalData.length; i ++) {
        let stepp = this.getDecisionHorizontalData[i]
        let newVertical = []
        for (let j = 0; j < stepp.vertical.length; j ++) {
          let stepl = stepp.vertical[j]
          let items = stepl.items.filter( v => v.isConditionQuestionMet)
          let newStepl = Object.assign({}, stepl)
          newStepl.items = Object.assign([], items)
          newVertical.push(newStepl);
        }
        let newStepp = Object.assign({}, stepp)
        newStepp.vertical = Object.assign([], newVertical)
        result.push(newStepp)
      }
      console.log(result)
      return result
    },
    getLastAnswered() {
      this.hStepper = this.getDecisionLastAnswered.sectionNo
        ? this.getDecisionLastAnswered.sectionNo + 1
        : 1;
      this.vStepper = this.getDecisionLastAnswered.subsectionNo
        ? this.getDecisionLastAnswered.subsectionNo + 1
        : 1;

      if (
        this.getDecisionLastAnswered.sectionNo != null &&
        this.getDecisionLastAnswered.subsectionNo != null
      ) {
        this.goToLastStep(
          this.getDecisionHorizontalData[
            this.getDecisionLastAnswered.sectionNo || 0
          ].vertical.length,
          this.getDecisionHorizontalData.length
        );
        this.notification = false;
      }
    }
  },
  methods: {
    ...mapActions("app", {
      _getQuestionsAnswers: "getAnswersData",
      _saveAnswers: "saveAnswers",
      _setDecisionLastAnswered: "setDecisionLastAnswered"
    }),
    compId(type, id) {
      return "comp" + type + id;
    },
    updateComponentValue(value, questionId, answerId, useText, section, subsection) {
      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers[i].questionId == questionId) {
          if (useText) {
            this.answers[i].text = value;
          } else {
            this.answers[i].value =
              value == true ? 1 : value == false ? 0 : value;
          }
          return;
        }
      }
      let tmp = {
        answerId: answerId,
        questionId: questionId,
        value: useText ? null : value == true ? 1 : value == false ? 0 : value,
        text: useText ? value : "",
        section: section,
        subsection: subsection
      };

      this.answers.push(tmp);
    },
    goToLastStep(verticalMaxSteps, horizontalMaxSteps) {
      if (this.vStepper < verticalMaxSteps) {
        this.vStepper++;
      } else {
        if (this.hStepper < horizontalMaxSteps) {
          this.hStepper++;
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

      let answers = this.answers.filter( v => v.section == this.hStepper && v.subsection == this.vStepper );

      let answerData = {
        userId: this.getDataUserProfile.id,
        answers: answers,
        complete: currentTime,
        article: "Decision",
        nextSectionNo: nextSectionNo,
        nextSubsectionNo: nextSubsectionNo
      };

      return this._saveAnswers(answerData)
        .then(res => {
          return res;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  mounted() {
    if (window.innerWidth < 768 && window.innerWidth > 0) this.isMobile = true;
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

  @media (max-width: 768px) {
    margin: 0;
  }
}

.v-stepper__header {
  @media (max-width: 768px) {
    display: none;
  }
}

.v-stepper--vertical .v-stepper__step {
  @media (max-width: 768px) {
    display: none;
  }
}
</style>
