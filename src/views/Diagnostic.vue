<template>
  <v-container grid-list-xl>
    {{getLastAnswered}}
    <v-tabs dark color="primary" v-model="activeMeasurement" :hide-slider="false">
      <v-tabs-slider :color="$vuetify.theme.subheading2"></v-tabs-slider>
      <v-tab @click="loadSubheading(0)">Stress Measurement</v-tab>

      <v-tab @click="loadSubheading(1)">Recovery Measurement</v-tab>
    </v-tabs>
    <p>&nbsp;</p>

    <div class="text-xs-center" v-if="isLoading">
      <vue-circle
        :progress="100"
        :size="300"
        :reverse="false"
        line-cap="round"
        :fill="fill"
        empty-fill="rgba(200, 200, 200, .8)"
        :animation="{ duration: 3000, easing: 'circleProgressEasing' }"
        :animation-start-value="0.0"
        :start-angle="90"
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
            <v-card-actions right>
              <v-btn flat class="right" @click="notification = false">Got it!</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-stepper v-model="hStepper" v-else>
          
          <v-stepper-header>
            <template v-for="step in getAnswersData">
              <v-stepper-step
                :key="`${step.sectionNo}-step`"
                :complete="hStepper > (step.sectionNo + 1)"
                :step="step.sectionNo + 1"
                :color="$vuetify.theme.subheading1"
                editable
              >
                <span :style="{ color: $vuetify.theme.subheading1 }">
                  {{step.section}}
                  <!--span class="dev-hint">(Section)</span-->
                </span>
              </v-stepper-step>
            </template>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content
              v-for="stepp in getAnswersData"
              :key="`${stepp.sectionNo}-content`"
              :step="stepp.sectionNo + 1"
            >
              <v-card v-if="isMobile">
                <h3>
                  {{stepp.section}}
                  <span
                    class="right"
                  >{{stepp.sectionNo + 1}} of {{getAnswersData.length}}</span>
                </h3>
              </v-card>
              <v-card>
                <v-stepper vertical v-model="vStepper">
                  <div v-for="stepl in stepp.vertical" :key="stepl.subsectionNo + '-sub'">
                    <v-stepper-step
                      editable
                      v-bind:step="$vuetify.theme.step.charAt(stepl.subsectionNo)"
                      :key="stepl.subsectionNo + '-sub-step'"
                      :color="$vuetify.theme.subheading2"
                    >
                      <!--span class="dev-hint"> Part {{stepl.subsectionNo}}  (SS No {{stepl.subsectionNo}})</span-->

                      <SectionPartStepper :data="stepl.items" />
                    </v-stepper-step>

                    <v-stepper-content v-bind:step="stepl.subsectionNo + 1">
                      <v-card v-if="isMobile && stepp.vertical.length > 1">
                        <h3>
                          {{$vuetify.theme.step.charAt(stepl.subsectionNo)}}
                          <span
                            class="right"
                          >{{stepl.subsectionNo + 1}} of {{stepp.vertical.length}}</span>
                        </h3>
                      </v-card>
                      <v-card class="mb-5">
                        <span class="dev-hint">P {{stepl.subsectionNo}} (SS No)</span>
                        <v-form v-model="form1Valid">
                          <div
                            class="row"
                            v-for="a in stepl.items"
                            :key="a.id"
                            v-if="a.isConditionQuestionMet"
                          >
                            <components
                              v-if="a.question.useText && a.isConditionQuestionMet"
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
                              v-if="!a.question.useText && a.isConditionQuestionMet"
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
                          @click="nextVerticalStep(stepp.vertical.length, getAnswersData.length)"
                        >Continue</v-btn>
                        <v-btn flat v-if="stepl.subsectionNo > 0" @click="prevVerticalStep">Back</v-btn>
                      </v-card>
                    </v-stepper-content>
                  </div>
                </v-stepper>
              </v-card>

              <v-btn color="primary" @click="nextHorizontalStep">Continue</v-btn>
              <v-btn flat v-if="stepp.sectionNo > 0" @click="prevHorizontalStep">Back</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import VueCircle from "vue2-circle-progress";
import components from "../components/questionLayout";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Diagnostic",
  components: {
    ...components,
    VueCircle
  },
  data: () => ({
    notification: true,
    activeMeasurement: 0,

    hStepper: 1,
    vStepper: 1,
    form1Valid: false,

    questions: [],
    answers: [],

    isLoading: true,
    saved: false,
    fill: { gradient: ["#48cba2", "#47bbe9"] }
  }),
  computed: {
    ...mapGetters("app", {
      getAnswersData: "getDiagnosticAnswersData",
      getDiagnosticLastAnswered: "getDiagnosticLastAnswered"
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    }),
    getLastAnswered() {
      if (this.getDiagnosticLastAnswered.sectionNo == undefined)
        this.getDiagnosticLastAnswered.sectionNo = 0;
      this.hStepper = this.getDiagnosticLastAnswered.sectionNo
        ? this.getDiagnosticLastAnswered.sectionNo + 1
        : 1;
      this.vStepper = this.getDiagnosticLastAnswered.subsectionNo
        ? this.getDiagnosticLastAnswered.subsectionNo + 1
        : 1;
      let pageHolder = this.getAnswersData[
        this.getDiagnosticLastAnswered.sectionNo
      ];
      if (pageHolder != undefined) {
        let page = pageHolder.vertical;
        if (page != undefined) {
          //this.goToLastStep(page.length, this.getAnswersData.length);
        }
      }
    }
  },
  methods: {
    ...mapActions("app", {
      //_getUser: "getUser",
      _getQuestions: "getQuestions",
      _getQuestionsAnswers: "getAnswersData", //getAnswersData ? make dynmaic
      _saveAnswers: "saveAnswers"
    }),

    compId(type, id) {
      return "comp" + type + id;
    },

    nameId(type, row, col) {
      return `${type}_${row}x${col}`;
    },

    nextStep(step) {
      this.saveAnswers();
      //this.hStepper = step + 1;
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

    saveAnswers(nextSectionNo, nextSubsectionNo) {
      let currentTime = new Date().toISOString();
      console.log(currentTime);
      let answerData = {
        userId: this.getDataUserProfile.id,
        answers: this.answers,
        complete: currentTime,
        article: "Diagnostic",
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

    loadSubheading(activeMeasurement) {
      console.log(activeMeasurement);
      this.isLoading = true;
      let data = {
        params: `?Article=Diagnostic&ArticleSubheading=${activeMeasurement}`,
        article: "Diagnostic"
      };
      this._getQuestionsAnswers(data).then(data => {
        this.isLoading = false;
        this.questions = data;
        console.log(data);
      });
    }
  },
  mounted() {
    if (window.innerWidth < 768 && window.innerWidth > 0) this.isMobile = true;
    else this.isMobile = false;
    this.loadSubheading(0);
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