<template>
  <v-container grid-list-xl>
    <v-tabs dark color="primary" v-model="activeMeasurement" :hide-slider="false">
      <v-tabs-slider :color="$vuetify.theme.subheading2"></v-tabs-slider>
      <v-tab>Stress Measurement</v-tab>

      <v-tab>Recovery Measurement</v-tab>
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
      <v-alert
        :value="getDataUserProfile.stressRecoveryCompleted"
        color="warning"
        icon="done"
        outline
      >
        Submitted {{getDataUserProfile.stressRecoveryCompleted | formatDate}}
        <v-btn flat round outline @click="reRun">Re-Run</v-btn>
      </v-alert>
      <v-layout justify-center ma-0>
        <v-dialog sm6 xs12 v-model="getNotification">
          <v-card color class="black--text mt-2 col-sm-6 notification">
            <v-card-title class="headline">Stress-Recovery Analysis</v-card-title>
            <v-card-text>
              <p>
                After completing the Energy Health Symptom Checklist, this next part is about building a more detailed understanding of the sources of energy imbalance in your life.
                <br />
                <br />There are 2 key areas of the Stress-Recovery Analysis:
                <br />
                <br />1. Stress Measurement - how much energy you are spending daily, weekly, monthly
                <br />
                <br />2. Recovery Measurement - how much energy you are recovering daily, weekly, monthly
                <br />
                <br />The analysis asks for your ratings on activities, personal experiences and health issues, and you are encouraged to provide as much detail as you can, in order to create an accurate picture of your Stress-Recovery Balance. The accuracy will help with developing the most effective responses to manage your Energy Health. Nonetheless, there is no pressure to respond to questions with which you don't feel comfortable.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                flat
                color="green darken-1"
                @click="notification = false;_disableNotification();"
              >Got it!</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog sm6 xs12 persistent v-model="completeDialog">
          <v-card color class="black--text mt-2 col-sm-6 notification">
            <v-card-title class="headline">Stress-Recovery Analysis Complete</v-card-title>
            <v-card-text>
              <p>
                Thank you. You have completed the Stress-Recovery Analysis. We now have the data to help you pinpoint where you need to focus Recovery in order to get your Energy Health and Performance to where you want them!
                <br />
                <br />
                Make sure you contact us to discuss your results, and keep going with your Recovery To-DO List!
                <br />
                <br />The next step, if you haven't already done so, is to complete the Decision Profile to gather information about the factors that influence your decision making around Energy Health and Performance.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                flat="flat"
                color="green darken-1"
                @click="completeDialog = false; $router.push({name: 'Recovery'});"
              >Got it</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-stepper v-model="hStepper[activeMeasurement]">
          <v-stepper-header>
            <template v-for="step in getFilteredQuestionData[activeMeasurement]">
              <v-stepper-step
                :key="`${step.sectionNo}-step`"
                :complete="hStepper[activeMeasurement] > (step.sectionNo + 1)"
                :editable="step.sectionNo <= getAnswerLimit[activeMeasurement].sectionNo"
                :step="step.sectionNo + 1"
                :color="$vuetify.theme.subheading1"
              >
                <span :style="{ color: $vuetify.theme.subheading1 }">
                  {{step.section}}
                  <!--span class="dev-hint"></span-->
                </span>
              </v-stepper-step>
            </template>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content
              v-for="stepp in getFilteredQuestionData[activeMeasurement]"
              :key="`${stepp.sectionNo}-content`"
              :step="stepp.sectionNo + 1"
            >
              <v-card v-if="isMobile">
                <h3>
                  {{stepp.section}}
                  <span
                    class="right"
                  >{{stepp.sectionNo + 1}} of {{getFilteredQuestionData[activeMeasurement].length}}</span>
                </h3>
              </v-card>
              <v-card>
                <v-stepper vertical v-model="vStepper[activeMeasurement][stepp.sectionNo]">
                  <div v-for="stepl in stepp.vertical" :key="stepl.subsectionNo + '-sub'">
                    <v-stepper-step
                      :step="$vuetify.theme.step.charAt(stepl.subsectionNo)"
                      :key="stepl.subsectionNo + '-sub-step'"
                      :color="$vuetify.theme.subheading2"
                      :editable="stepp.sectionNo < getAnswerLimit[activeMeasurement].sectionNo || (stepp.sectionNo == getAnswerLimit[activeMeasurement].sectionNo && stepl.subsectionNo <= (getAnswerLimit[activeMeasurement].subsectionNo))"
                    >
                      <!--span class="dev-hint"> Part {{stepl.subsectionNo}}  (SS No {{stepl.subsectionNo}})</span-->

                      <SectionPartStepper :data="stepl.items" />
                    </v-stepper-step>

                    <v-stepper-content :step="$vuetify.theme.step.charAt(stepl.subsectionNo)">
                      <v-card v-if="isMobile && stepp.vertical.length > 1">
                        <h3>
                          <span class="v-stepper__step__step" style="background-color: rgb(0, 163, 138); border-color: rgb(0, 163, 138);">{{$vuetify.theme.step.charAt(stepl.subsectionNo)}}</span>
                          <span
                            class="right"
                          >{{stepl.subsectionNo + 1}} of {{stepp.vertical.length}}</span>
                        </h3>
                      </v-card>
                      <v-card
                        class="mb-5"
                        v-if="hStepper[activeMeasurement] == stepp.sectionNo + 1"
                      >
                        <span class="dev-hint">P {{stepl.subsectionNo}} (SS No)</span>
                        <v-form v-model="form1Valid">
                          <div class="row" v-for="a in stepl.items" :key="a.id">
                            <components
                              v-if="a.question.useText"
                              :is="a.question.type"
                              :id="a.question.id"
                              :title="a.question.title"
                              :useText="a.question.useText"
                              :questionId="a.question.id"
                              :answerId="a.answerId"
                              :length="a.question.length"
                              :items="a.question.items"
                              :text="a.text"
                              :section="stepp.sectionNo + 1"
                              :subsection="stepl.subsectionNo + 1"
                              :disabled="!stressRecoveryReruned && stressRecoveryCompleted"
                              :showBorder="showBorder"
                              :popup="hasNoQuestion"
                              @update-value="updateComponentValue"
                            />
                            <components
                              v-if="!a.question.useText"
                              :is="a.question.type"
                              :id="a.question.id"
                              :title="a.question.title"
                              :useText="a.question.useText"
                              :questionId="a.question.id"
                              :answerId="a.answerId"
                              :length="a.question.length"
                              :items="a.question.items"
                              :value="a.value"
                              :section="stepp.sectionNo + 1"
                              :subsection="stepl.subsectionNo + 1"
                              :disabled="!stressRecoveryReruned && stressRecoveryCompleted"
                              :showBorder="showBorder"
                              :popup="hasNoQuestion"
                              @update-value="updateComponentValue"
                            />
                          </div>
                        </v-form>
                        <div v-if="hasNoQuestion">
                          <p
                            class="black--text headline"
                          >INSTRUCTIONS: Due to previous answers, there is nothing to answer in this section.</p>
                        </div>
                        <v-btn
                          color="primary"
                          @click="nextVerticalStep(stepp.vertical.length, getFilteredQuestionData[activeMeasurement].length)"
                        >{{vStepper[activeMeasurement][hStepper[activeMeasurement]-1] == $vuetify.theme.step.charAt(stepp.vertical.length-1) && hStepper[activeMeasurement] == getFilteredQuestionData[activeMeasurement].length ? 'Complete' : 'Continue'}}</v-btn>
                        <v-btn
                          flat
                          v-if="!(vStepper[activeMeasurement][0] == 'A' && hStepper[activeMeasurement] == 1)"
                          @click="prevVerticalStep"
                        >Back</v-btn>
                        <p
                          v-if="showBorder"
                          class="black--text headline"
                        >You have missed a required question on this page. Please answer all questions.</p>
                      </v-card>
                    </v-stepper-content>
                  </div>
                </v-stepper>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        <v-dialog v-model="popup" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Nothing to answer? Skip this section?</v-card-title>
            <v-card-text></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="continueAnswer">Cancel</v-btn>
              <v-btn color="green darken-1" flat @click="skipSection">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import moment from "moment";
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
    completeDialog: false,
    notification: true,
    activeMeasurement: 0,
    hStepper: [1, 1],
    vStepper: [[], []],
    form1Valid: false,
    questions: [],
    answers: [],
    isLoading: true,
    saved: false,
    fill: { gradient: ["#48cba2", "#47bbe9"] },
    selectedSection: null,
    disableContinue: true,
    popup: false,
    showBorder: false,
    isCurrentBoolSection: false,
    hasNoQuestion: false
  }),
  computed: {
    ...mapGetters("app", {
      getAnswersData: "getDiagnosticAnswersData",
      getNotificationStatus: "getNotificationStatus",
      getAnswerLimit: "getStressRecoveryLimit"
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile",
      stressRecoveryReruned: "getStressRecoveryReruned",
      stressRecoveryCompleted: "getStressRecoveryCompleted"
    }),
    getNotification: {
      get() {
        return this.notification | this.getNotificationStatus;
      },
      set(val) {
        if (!val) {
          this._disableNotification();
          this.notification = false;
        }
      }
    },
    getFilteredQuestionData() {
      let result = [];
      for (let tab = 0; tab < this.getAnswersData.length; tab++) {
        let tmp = this.getAnswersData[tab].horizontal
          ? this.getAnswersData[tab].horizontal
          : [];
        let tmpResult = [];
        if (tmp.length > 0) {
          for (let i = 0; i < tmp.length; i++) {
            let stepp = tmp[i];
            let newVertical = [];
            for (let j = 0; j < stepp.vertical.length; j++) {
              let stepl = stepp.vertical[j];
              let items = stepl.items.filter(v => v.isConditionQuestionMet);
              let newStepl = Object.assign({}, stepl);
              newStepl.items = Object.assign([], items);
              newVertical.push(newStepl);
            }
            let newStepp = Object.assign({}, stepp);
            newStepp.vertical = Object.assign([], newVertical);
            tmpResult.push(newStepp);
          }
        }
        result.push(tmpResult);
      }
      return result;
    }
  },
  watch: {
    answers: {
      handler(val) {
        let steps = this.$vuetify.theme.step;
        let index = steps.indexOf(this.vStepper[this.activeMeasurement][this.hStepper[this.activeMeasurement] - 1]);
        let currentAnswered = val.filter(
          v => v.section == this.hStepper[this.activeMeasurement] && v.subsection == index + 1
        );

        let currentSection = this.getFilteredQuestionData[this.activeMeasurement][this.hStepper[this.activeMeasurement] - 1]
          .vertical[index].items;
        let currentQuestions = currentSection.filter(
          v => v.question.type == "Bool"
        );

        for (let i = 0; i < currentQuestions.length; i++) {
          const element = currentQuestions[i];
          let answered = currentAnswered.filter(
            v => v.questionId == element.questionId
          );
          if (element.question.type == "Bool") {
            if (answered.length == 0 && element.value == null) {
              this.disableContinue = true;
              return;
            }
          }
        }

        let unAnswered = 0;
        let unAnsweredQuestions = currentAnswered.filter(
          v => (v.questionType == "Scale" && v.value == 0) || (v.questionType == "Selection" && v.value == 0)
        );
        unAnswered = unAnsweredQuestions.length;
        if (unAnswered == 0) {
          this.showBorder = false;
        }

        this.disableContinue = false;
      },
      deep: true
    },
    vStepper: {
      handler(val) {
        let steps = this.$vuetify.theme.step;
        let index = steps.indexOf(val[this.activeMeasurement][this.hStepper[this.activeMeasurement] - 1]);
        let currentSection = this.getFilteredQuestionData[this.activeMeasurement][this.hStepper[this.activeMeasurement] - 1]
          .vertical[index].items;
        let questions = [];
        currentSection.map(question => {
          if (
            question.question.type == "SectionHeading" ||
            question.question.type == "SectionPart" ||
            question.question.type == "SectionInstruction"
          ) {
            return;
          } else {
            questions.push(question);
          }
        });

        let boolquestions = questions.filter(
          question => question.question.type == "Bool"
        );
        this.isCurrentBoolSection = boolquestions.length > 0 ? true : false;

        if (!this.getDataUserProfile.stressRecoveryCompleted) {
          if (questions.length == 0) {
            this.hasNoQuestion = true;
          } else {
            this.hasNoQuestion = false;
          }
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions("app", {
      _getQuestions: "getQuestions",
      _getQuestionsAnswers: "getAnswersData",
      _saveAnswers: "saveAnswers",
      _setDiagnosticLastAnswered: "setDiagnosticLastAnswered",
      _disableNotification: "disableNotification",
      _setAnswer: "setAnswerData",
      _reRunArticle: "reRunArticle",
      _setArticleLimit: "setArticleLimit"
    }),

    reRun() {
      let data = {
        article: "Diagnostic"
      };
      return this._reRunArticle(data);
    },

    skipSection() {
      this.popup = false;
      this.save();
    },

    continueAnswer() {
      this.showBorder = true;
      this.popup = false;
    },

    updateComponentValue(
      value,
      questionId,
      answerId,
      useText,
      section,
      subsection,
      questionType = null
    ) {
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
        subsection: subsection,
        questionType: questionType
      };

      this.answers.push(tmp);
    },

    saveAnswers(
      nextSectionNo,
      nextSubsectionNo,
      verticalMaxSteps,
      horizontalMaxSteps
    ) {
      let currentTime = new Date().toISOString();
      let steps = this.$vuetify.theme.step;
      let index = steps.indexOf(
        this.vStepper[this.activeMeasurement][
          this.hStepper[this.activeMeasurement] - 1
        ]
      );

      let answers = this.answers.filter(
        v =>
          v.section == this.hStepper[this.activeMeasurement] &&
          v.subsection == index + 1
      );

      let answerData = {
        userId: this.getDataUserProfile.id,
        answers: answers,
        article: "Diagnostic",
        sectionNo: nextSectionNo - 1,
        subsectionNo: nextSubsectionNo - 1,
        verticalMaxSteps: verticalMaxSteps,
        horizontalMaxSteps: horizontalMaxSteps,
        active: this.activeMeasurement
      };

      if (
        this.hStepper[this.activeMeasurement] == horizontalMaxSteps &&
        index + 1 == verticalMaxSteps &&
        this.activeMeasurement == 1
      ) {
        answerData["complete"] = currentTime;
      }

      return this._saveAnswers(answerData)
        .then(res => {
          return answerData;
        })
        .catch(err => {
          throw err;
        });
    },

    nextVerticalStep(verticalMaxSteps, horizontalMaxSteps) {
      let steps = this.$vuetify.theme.step;
      let index = steps.indexOf(this.vStepper[this.activeMeasurement][this.hStepper[this.activeMeasurement] - 1]);

      let currentSection = this.getFilteredQuestionData[this.activeMeasurement][this.hStepper[this.activeMeasurement] - 1]
        .vertical[index].items;
      let questions = [];
      currentSection.map(question => {
        if (
          question.question.type == "SectionHeading" ||
          question.question.type == "SectionPart" ||
          question.question.type == "SectionInstruction"
        ) {
          return;
        } else {
          if (question.question.type == "Bool" && question.value == null) {
            questions.push(question);
          }
          if (
            question.question.type == "Scale" &&
            (question.value == 0 || question.value == null)
          ) {
            questions.push(question);
          }
          if (question.question.type == "Selection" && question.value == null) {
            questions.push(question);
          }
        }
      });

      let currentAnswered = this.answers.filter(
        v => v.section == this.hStepper[this.activeMeasurement] && v.subsection == index + 1
      );

      let currentQuestions = currentSection.filter(
        v => v.question.type == "Bool"
      );

      for (let i = 0; i < currentQuestions.length; i++) {
        const element = currentQuestions[i];
        let answered = currentAnswered.filter(
          v => v.questionId == element.questionId
        );
        if (element.question.type == "Bool") {
          if (answered.length == 0 && element.value == null) {
            this.showBorder = true;
            return;
          }
        }
      }

      this.showBorder = false;

      let nextSectionNo = this.hStepper[this.activeMeasurement];
      let nextSubsectionNo = index + 1;
      if (nextSubsectionNo < verticalMaxSteps) {
        // nextSubsectionNo++;
      } else {
        if (this.hStepper[this.activeMeasurement] < horizontalMaxSteps) {
          nextSectionNo++;
        }
        nextSubsectionNo = 0;
      }

      let answers = this.answers.filter(
        v => v.section == this.hStepper[this.activeMeasurement] && v.subsection == index + 1
      );

      if (!this.isCurrentBoolSection) {
        if (!this.getDataUserProfile.stressRecoveryCompleted) {
          if (answers.length < questions.length) {
            this.popup = true;
            return;
          }

          let tmpitems = answers.filter(
            v => v.questionType == "Scale" && v.value == 0
          );
          if (tmpitems.length > 0) {
            this.popup = true;
            return;
          }
        }
      }

      this.save();
    },

    save() {
      let verticalMaxSteps = this.getFilteredQuestionData[this.activeMeasurement][this.hStepper[this.activeMeasurement] - 1]
        .vertical.length;
      let horizontalMaxSteps = this.getFilteredQuestionData[this.activeMeasurement].length;
      let steps = this.$vuetify.theme.step;
      let nextSectionNo = this.hStepper[this.activeMeasurement];
      let index = steps.indexOf(
        this.vStepper[this.activeMeasurement][
          this.hStepper[this.activeMeasurement] - 1
        ]
      );
      let nextSubsectionNo = index + 1;
      if (nextSubsectionNo < verticalMaxSteps) {
        // nextSubsectionNo++;
      } else {
        if (this.hStepper[this.activeMeasurement] < horizontalMaxSteps) {
          nextSectionNo++;
        }
        nextSubsectionNo = 0;
      }

      let answers = this.answers.filter(
        v =>
          v.section == this.hStepper[this.activeMeasurement] &&
          v.subsection == index + 1
      );

      this.isLoading = true;

      let answerData = {
        answers: answers,
        article: "Diagnostic",
        nextSectionNo: this.hStepper[this.activeMeasurement] - 1,
        nextSubsectionNo: index,
        active: this.activeMeasurement
      };
      if (!this.stressRecoveryReruned && this.stressRecoveryCompleted) {
        this.goToNextStep();
        this.isLoading = false;
      } else {
        this._setAnswer(answerData);
        return this.saveAnswers(
          nextSectionNo,
          nextSubsectionNo,
          verticalMaxSteps,
          horizontalMaxSteps
        )
          .then(res => {
            this.showBorder = false;
            this.hasNoQuestion = false;
            this.popup = false;
            if (res.complete) {
              this.$toast.success(`Completed`);
              this.completeDialog = true;
              this.isLoading = false;
            } else {
              this.goToNextStep();
              this.isLoading = false;
              this.$forceUpdate();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    prevVerticalStep() {
      let lastAnswered;
      let steps = this.$vuetify.theme.step;
      let index = steps.indexOf(
        this.vStepper[this.activeMeasurement][
          this.hStepper[this.activeMeasurement] - 1
        ]
      );
      if (index > 0) {
        let tmp = Object.assign([], this.vStepper[this.activeMeasurement]);
        tmp[this.hStepper[this.activeMeasurement] - 1] = steps.charAt(index - 1);
        this.vStepper[this.activeMeasurement] = Object.assign([], tmp);
      } else {
        this.vStepper[this.activeMeasurement][
          this.hStepper[this.activeMeasurement] - 2
        ] = steps.charAt(
          this.getFilteredQuestionData[this.activeMeasurement][
            this.hStepper[this.activeMeasurement] - 2
          ].vertical.length - 1
        );
        this.hStepper[this.activeMeasurement]--;
      }
      this.answers = [];
      this.disableContinue = true;
    },

    goToNextStep() {
      let horizontalMaxSteps = this.getFilteredQuestionData[
        this.activeMeasurement
      ].length;
      let verticalMaxSteps = this.getFilteredQuestionData[
        this.activeMeasurement
      ][this.hStepper[this.activeMeasurement] - 1].vertical.length;
      let steps = this.$vuetify.theme.step;
      let index = steps.indexOf(
        this.vStepper[this.activeMeasurement][
          this.hStepper[this.activeMeasurement] - 1
        ]
      );
      
      if (index + 1 < verticalMaxSteps) {
        if (this.isCurrentBoolSection && index == 0 && this.hStepper[this.activeMeasurement] == horizontalMaxSteps) {
          let currentBoolAnswered = this.answers.filter(
            v => v.section == this.hStepper[this.activeMeasurement] && v.subsection == 1 && v.questionType == 'Bool' && v.value == 1
          );
          
          if (currentBoolAnswered.length == 0) {
            if (this.activeMeasurement == 1) {
              let tmp = Object.assign([], this.vStepper);
              tmp[1][this.hStepper[1] - 1] = steps.charAt(verticalMaxSteps - 1);
              this.vStepper = Object.assign([], tmp);
            } else {
              this.activeMeasurement = 1;
              let tmp = Object.assign([], this.vStepper);
              tmp[1][0] = 'A';
              tmp[0][this.hStepper[0] - 1] = steps.charAt(verticalMaxSteps - 1);
              this.vStepper = Object.assign([], tmp);
              this.hStepper[1] = 1;
            }
          }
          
        } else {
          let tmp = Object.assign([], this.vStepper);
          tmp[this.activeMeasurement][
            this.hStepper[this.activeMeasurement] - 1
          ] = steps.charAt(index + 1);
          this.vStepper = Object.assign([], tmp);
        }
      } else {
        if (this.hStepper[this.activeMeasurement] == horizontalMaxSteps) {
          
          if (this.activeMeasurement == 0) {
            this.activeMeasurement = 1;
          } else {
            this.activeMeasurement = 0;
            this.hStepper[0] = 1;
            this.vStepper[0][0] = 'A';
          }
        } else if (this.hStepper[this.activeMeasurement] < horizontalMaxSteps) {
          this.hStepper[this.activeMeasurement]++;
          this.vStepper[this.activeMeasurement][
            this.hStepper[this.activeMeasurement] - 1
          ] = "A";
        }
      }
      this.answers = [];
      this.disableContinue = true;
    },

    loadData() {
      this.isLoading = true;
      return this.loadSubheading(0).then(_ => {
        return this.loadSubheading(1).then(_ => {
          let lastAnswered = this.getAnswersData[this.activeMeasurement]
            .lastAnswered;
          if (lastAnswered.sectionNo != null) {
            // go to last answered section
            this.hStepper[this.activeMeasurement] = lastAnswered.sectionNo + 1;
            this.vStepper[this.activeMeasurement][
              this.hStepper[this.activeMeasurement] - 1
            ] = this.$vuetify.theme.step.charAt(lastAnswered.subsectionNo);
            // go to new section
            this.goToNextStep();
          }
          if (this.getAnswersData[0].lastAnswered.sectionNo == undefined || this.getAnswersData[0].lastAnswered.sectionNo == null) {
            this.notification = true;
          } else {
            this.notification = false;
          }
          this.isLoading = false;
        });
      });
    },

    loadSubheading(activeMeasurement) {
      let params = {
        params: `?Article=Diagnostic&ArticleSubheading=${activeMeasurement}`,
        article: "Diagnostic",
        active: activeMeasurement
      };
      return this._getQuestionsAnswers(params).then(data => {
        this.questions = Object.assign([], data);
        this.vStepper[activeMeasurement] = [];
        this.hStepper[activeMeasurement] = 1;
        for (let i = 0; i < this.questions.horizontal.length; i++) {
          this.vStepper[activeMeasurement].push("A");
        }

        let lastAnswered = this.questions.lastAnswered;

        if (lastAnswered.sectionNo != null) {
          // go to last answered section
          this.hStepper[activeMeasurement] = lastAnswered.sectionNo + 1;
          this.vStepper[activeMeasurement][
            this.hStepper[activeMeasurement] - 1
          ] = this.$vuetify.theme.step.charAt(lastAnswered.subsectionNo);
        }

        let limit = {
          article: 'Diagnostic',
          sectionNo: this.questions.horizontal.length - 1,
          subsectionNo: this.questions.horizontal[this.questions.horizontal.length - 1].vertical.length - 1,
          active: activeMeasurement
        };

        if (this.getDataUserProfile.stressRecoveryCompleted) {
          this._setArticleLimit(limit);
        }
      });
    }
  },

  filters: {
    formatDate(date) {
      return moment(date).format("Do MMMM, YYYY");
    },
    formatDateOnly(date) {
      return moment(date).format("YYYY-MM-DD");
    }
  },

  mounted() {
    if (window.innerWidth < 768 && window.innerWidth > 0) this.isMobile = true;
    else this.isMobile = false;
    this.loadData();
    this.selectedSection = this.$router.currentRoute.params;
  }
};
</script>

<style lang="stylus">
.v-dialog {
  .v-card__actions {
    padding-top: 0;
  }

  .notification .v-card__text {
    padding-bottom: 0 !important;
  }
}
</style>

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

>>>.v-card__actions {
  display: flex;
  justify-content: flex-end;
}

>>>.v-dialog {
  max-width: 50%;

  @media (max-width: 500px) {
    max-width: 90%;
    line-height: 18px;

    .v-card {
      padding: 10px;
    }

    .v-card__title, .v-card__text {
      padding: 5px;
    }

    .v-card__title {
      padding-bottom: 15px;
    }
  }

  @media (max-width: 500px) {
    max-width: 90%;
    line-height: 18px;

    .v-card__title {
      padding-bottom: 15px;
      font-size: 20px !important;
    }
  }
}
</style>