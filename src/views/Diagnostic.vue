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
        <v-flex sm6 xs12 v-if="notification || getNotificationStatus">
          <v-card
            color
            class="black--text mt-2 col-sm-6 notification"
          >
            <v-card-title class="headline">Stress-Recovery Analysis</v-card-title>
            <v-card-text>
              <p>
                After completing the Energy Health Symptom Checklist, this next part is about building a more detailed understanding of the sources of energy imbalance in your life.
                <br><br>
                There are 2 key areas of the Stress-Recovery Analysis:
                <br><br>
                  1. Stress Measurement - how much energy you are spending daily, <br>
                  weekly, monthly<br><br>

                  2. Recovery Measurement - how much energy you are recovering <br>
                  daily, weekly, monthly<br>
                <br>
                The analysis asks for your ratings on activities, personal experiences and health issues, and you are encouraged to provide as much detail as you can, in order to create an accurate picture of your Stress-Recovery Balance. The accuracy will help with developing the most effective responses to manage your Energy Health. Nonetheless, there is no pressure to respond to questions with which you don't feel comfortable.

              </p>
            </v-card-text>
            <v-card-actions text-align-right>
              <v-btn flat right @click="notification = false;_disableNotification();">Got it!</v-btn>
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
                          >
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
                              :subsection="stepl.subsectionNo + 1"
                              @update-value="updateComponentValue"
                            />
                            <components
                              v-if="!a.question.useText"
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
                              :subsection="stepl.subsectionNo + 1"
                              @update-value="updateComponentValue"
                            />
                          </div>
                        </v-form>
                        <v-btn
                          color="primary"
                          @click="nextVerticalStep(stepp.vertical.length, getFilteredQuestionData.length)"
                        >Continue</v-btn>
                        <v-btn flat v-if="stepl.subsectionNo > 0" @click="prevVerticalStep">Back</v-btn>
                      </v-card>
                    </v-stepper-content>
                  </div>
                </v-stepper>
              </v-card>

              <v-btn color="primary" v-if="stepp.sectionNo + 1 < getFilteredQuestionData.length" @click="nextHorizontalStep">Continue</v-btn>
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
    fill: { gradient: ["#48cba2", "#47bbe9"] },
    selectedSection: null
  }),
  computed: {
    ...mapGetters("app", {
      getAnswersData: "getDiagnosticAnswersData",
      getDiagnosticLastAnswered: "getDiagnosticLastAnswered",
      getNotificationStatus: "getNotificationStatus"
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile",
    }),
    getFilteredQuestionData() {
      let result = []
      for (let i = 0; i < this.getAnswersData.length; i ++) {
        let stepp = this.getAnswersData[i]
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
      return result
    },
    getLastAnswered() {
      if (this.getDiagnosticLastAnswered.sectionNo == undefined) {
        this.getDiagnosticLastAnswered.sectionNo = 0;
        this.notification = true;
      } else {
        this.notification = false;
      }
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
          this.goToLastStep(page.length, this.getAnswersData.length);
        }
      }
    }
  },
  methods: {
    ...mapActions("app", {
      //_getUser: "getUser",
      _getQuestions: "getQuestions",
      _getQuestionsAnswers: "getAnswersData", //getAnswersData ? make dynmaic
      _saveAnswers: "saveAnswers",
      _setDiagnosticLastAnswered: "setDiagnosticLastAnswered",
      _disableNotification: "disableNotification"
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

    saveAnswers(nextSectionNo, nextSubsectionNo) {
      let currentTime = new Date().toISOString();

      let answers = this.answers.filter( v => v.section == this.hStepper && v.subsection == this.vStepper );

      let answerData = {
        userId: this.getDataUserProfile.id,
        answers: answers,
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
      let lastAnswered = {
        sectionNo: this.hStepper,
        subsectionNo: -1
      };
      this._setDiagnosticLastAnswered(lastAnswered);
    },
    prevVerticalStep() {
      let lastAnswered = {
        sectionNo: this.hStepper - 1,
        subsectionNo: this.vStepper > 2 ? this.vStepper - 3 : -1
      };
      this._setDiagnosticLastAnswered(lastAnswered);
    },
    prevHorizontalStep() {
      let lastAnswered = {
        sectionNo: this.hStepper > 2 ? this.hStepper - 2 : 0,
        subsectionNo: -1
      };
      this._setDiagnosticLastAnswered(lastAnswered);
    },

    loadSubheading(activeMeasurement) {
      this.isLoading = true;
      let data = {
        params: `?Article=Diagnostic&ArticleSubheading=${activeMeasurement}`,
        article: "Diagnostic"
      };
      this._getQuestionsAnswers(data).then(data => {
        this.isLoading = false;
        this.questions = data;
        if (this.selectedSection.title) {
          let lastAnswered;
          switch (this.selectedSection.title) {
            case 'Physical':
              lastAnswered = {
                sectionNo: 1,
                subsectionNo: -1
              };
              break;
            case 'Mental':
              lastAnswered = {
                sectionNo: 0,
                subsectionNo: -1
              };
              break;
            case 'Emotional':
              lastAnswered = {
                sectionNo: 0,
                subsectionNo: -1
              };
              break;
            case 'Social':
              lastAnswered = {
                sectionNo: 2,
                subsectionNo: -1
              };
              break;
            case 'Environmental':
              lastAnswered = {
                sectionNo: 3,
                subsectionNo: -1
              };
              break;
            default:
              break;
          }
          this._setDiagnosticLastAnswered(lastAnswered);
        }
      });
    }
  },
  mounted() {
    if (window.innerWidth < 768 && window.innerWidth > 0) this.isMobile = true;
    else this.isMobile = false;
    this.loadSubheading(0);
    this.selectedSection = this.$router.currentRoute.params
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

>>>.v-stepper--vertical .v-stepper__content {
  @media (max-width: 768px) {
    margin: 0;
    padding: 0;
  }
}

.v-stepper--vertical .v-stepper__step {
  @media (max-width: 768px) {
    display: none;
  }
}

>>>.v-card.notification
  @media (max-width: 500px) {
    line-height 19px
    padding 10px
    

    .v-card__title, .v-card__text {
      padding 5px
    }

    .v-card__title {
      padding-bottom 15px
    }
  }

  @media (max-width: 500px) {
    .v-card__title {
      padding-bottom 15px
      font-size 20px!important
    }
  }
</style>