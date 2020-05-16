<template>
  <v-container grid-list-xl>
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
      <v-alert :value="getDataUserProfile.symptomCompleted" color="warning" icon="done" outline>
        Submitted {{getDataUserProfile.symptomCompleted | formatDate}}
        <v-btn flat round outline @click="reRun">Re-Run</v-btn>
      </v-alert>
      <v-alert
        :value="showNotifcationBox"
        color="warning"
        outline
      >Re-run the Diagnostic by reviewing your previous answers and making any necessary changes through to completion.</v-alert>
      <v-layout justify-center ma-0>
        <v-dialog sm6 xs12 v-model="getNotification">
          <v-card color class="black--text mt-2 col-sm-6 notification">
            <v-card-title class="headline">Energy Health Symptom Checklist</v-card-title>
            <v-card-text>
              <p>
                You have arrived at the first part of the Energy Health Diagnostic, designed to assess the markers of energy imbalance in your life.
                <br />
                <br />The early signs of mental and physical health conditions, and/or performance challenges often show up in our daily experiences of mild to moderate mental, emotional &amp; physical symptoms.
                <br />
                <br />These symptoms are indicators that there is some sort of imbalance in your body. Without an effective response to the symptoms, they will likely stay the same or progressively get worse.
                <br />
                <br />Some of these symptoms may seem obvious, some are often hidden from awareness. However, many people don’t pay attention to their symptoms until they become significant and/or disruptive to their lives.
                <br />
                <br />The Symptom Checklist helps you with a quick survey of a range of symptoms that indicate your current Energy Health balance (or imbalance), so that you can take steps to get healthier.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                flat="flat"
                color="green darken-1"
                @click="notification = false;_disableNotification();"
              >Got it!</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog sm6 xs12 persistent v-model="completeDialog">
          <v-card color class="black--text mt-2 col-sm-6 notification">
            <v-card-title class="headline">Symptom Checklist complete</v-card-title>
            <v-card-text>
              <p>
                Thank you. You have completed the Symptom Checklist. Make sure you are working on your Recovery To-Do List to get your Energy Health and Performace to where you want them!
                <br />
                <br />The next step, if you haven't already done so, is to complete the Stress-Recovery Analysis to help you pinpoint the sources of Stress-Recovery imbalance in your life.
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

        <v-stepper v-model="hStepper">
          <v-stepper-header>
            <template v-for="step in getFilteredQuestionData">
              <v-stepper-step
                :key="`${step.sectionNo}-step`"
                :complete="hStepper > (step.sectionNo + 1)"
                :editable="step.sectionNo <= getAnswerLimit.sectionNo"
                :step="step.sectionNo + 1"
                :color="$vuetify.theme.subheading1"
              >
                <span :style="{ color: $vuetify.theme.subheading1 }">
                  {{step.section}}
                  <span class="dev-hint"></span>
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
                <v-stepper vertical v-model="vStepper[stepp.sectionNo]">
                  <div v-for="stepl in stepp.vertical" :key="stepl.subsectionNo + '-sub'">
                    <!--stepl.subsectionNo + 1-->
                    <v-stepper-step
                      :step="$vuetify.theme.step.charAt(stepl.subsectionNo)"
                      :key="stepl.subsectionNo + '-sub-step'"
                      :color="$vuetify.theme.subheading2"
                      :editable="stepp.sectionNo < getAnswerLimit.sectionNo || (stepp.sectionNo == getAnswerLimit.sectionNo && stepl.subsectionNo <= (getAnswerLimit.subsectionNo))"
                    >
                      <SectionPartStepper :data="stepl.items" />
                    </v-stepper-step>

                    <v-stepper-content
                      :step="$vuetify.theme.step.charAt(stepl.subsectionNo)"
                      :key="stepl.subsectionNo + '-sub-content'"
                    >
                      <v-card v-if="isMobile && stepp.vertical.length > 1">
                        <h3>
                          <span
                            class="v-stepper__step__step"
                            style="background-color: rgb(0, 163, 138); border-color: rgb(0, 163, 138);"
                          >{{$vuetify.theme.step.charAt(stepl.subsectionNo)}}</span>
                          <span
                            class="right"
                          >{{stepl.subsectionNo + 1}} of {{stepp.vertical.length}}</span>
                        </h3>
                      </v-card>
                      <v-card
                        class="mb-5"
                        v-if="vStepper[stepp.sectionNo] == $vuetify.theme.step.charAt(stepl.subsectionNo)"
                      >
                        <span class="dev-hint">P {{stepl.subsectionNo}} (SS No)</span>
                        <v-form v-model="form1Valid">
                          <div class="row" v-for="a in stepl.items" :key="a.id">
                            <!--{{a.question.type}}-->
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
                              :disabled="!symptomReruned && symptomCompleted"
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
                              :disabled="!symptomReruned && symptomCompleted"
                              :showBorder="showBorder"
                              :popup="hasNoQuestion"
                              @update-value="updateComponentValue"
                            />
                          </div>
                        </v-form>
                        <div v-if="hasNoQuestion">
                          <p
                            class="pink--text headline"
                          >Due to previous answers, there is nothing to answer in this section</p>
                        </div>
                        <v-btn
                          color="primary"
                          :disabled="disableContinue"
                          @click="nextVerticalStep(stepp.vertical.length, getFilteredQuestionData.length)"
                        >{{vStepper[hStepper-1] == $vuetify.theme.step.charAt(stepp.vertical.length-1) && hStepper == getFilteredQuestionData.length ? 'Complete' : 'Continue'}}</v-btn>
                        <v-btn
                          flat
                          v-if="!(vStepper[0] == 'A' && hStepper == 1)"
                          @click="prevVerticalStep"
                        >Back</v-btn>
                        <p
                          v-if="showBorder"
                          class="pink--text headline"
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
import { mapActions, mapGetters } from "vuex";
import debounce from "debounce";
import VueCircle from "vue2-circle-progress";
import components from "../components/questionLayout";

export default {
  name: "SymptomChecklist",
  components: {
    ...components,
    VueCircle
  },
  data() {
    return {
      notification: true,
      isMobile: false,
      hStepper: 1,
      vStepper: [],
      form1Valid: false,
      questions: [],
      answers: [],
      isLoading: true,
      fill: { gradient: ["#48cba2", "#47bbe9"] },
      disableContinue: true,
      showNotifcationBox: false,
      completeDialog: false,
      popup: false,
      showBorder: false,
      isCurrentBoolSection: false,
      hasNoQuestion: false
    };
  },
  watch: {
    answers: {
      handler(val) {
        let steps = this.$vuetify.theme.step;
        let index = steps.indexOf(this.vStepper[this.hStepper - 1]);
        let currentAnswered = val.filter(
          v => v.section == this.hStepper && v.subsection == index + 1
        );

        let currentSection = this.getFilteredQuestionData[this.hStepper - 1]
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
          v => (v.questionType == "Scale" && v.value == 0)
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
        let index = steps.indexOf(val[this.hStepper - 1]);
        let currentSection = this.getFilteredQuestionData[this.hStepper - 1]
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

        if (!this.getDataUserProfile.symptomCompleted) {
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
  computed: {
    ...mapGetters("app", {
      getSymptomHorizontalData: "getSymptomHorizontalData",
      getSymptomLastAnswered: "getSymptomLastAnswered",
      getNotificationStatus: "getNotificationStatus",
      getAnswerLimit: "getSymptomLimit"
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile",
      symptomReruned: "getSymptomReruned",
      symptomCompleted: "getSymptomCompleted"
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
      for (let i = 0; i < this.getSymptomHorizontalData.length; i++) {
        let stepp = this.getSymptomHorizontalData[i];
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
        result.push(newStepp);
      }
      return result;
    }
  },
  methods: {
    ...mapActions("app", {
      _getQuestionsAnswers: "getAnswersData",
      _saveAnswers: "saveAnswers",
      _setLastAnswered: "setSymptomLastAnswered",
      _disableNotification: "disableNotification",
      _setAnswer: "setAnswerData",
      _reRunArticle: "reRunArticle",
      _setArticleLimit: "setArticleLimit"
    }),
    skipSection() {
      this.popup = false;
      this.save();
    },
    continueAnswer() {
      this.showBorder = true;
      this.popup = false;
    },
    reRun() {
      let data = {
        article: "Symptom"
      };
      return this._reRunArticle(data).then(res => {
        console.log(res);
      });
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
              value === true ? 1 : value === false ? 0 : value;
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

    goToNextStep() {
      let horizontalMaxSteps = this.questions.horizontal.length;
      let verticalMaxSteps = this.questions.horizontal[this.hStepper - 1]
        .vertical.length;
      let steps = this.$vuetify.theme.step;
      let index = steps.indexOf(this.vStepper[this.hStepper - 1]);
      if (index + 1 < verticalMaxSteps) {
        let tmp = Object.assign([], this.vStepper);
        tmp[this.hStepper - 1] = steps.charAt(index + 1);
        this.vStepper = Object.assign([], tmp);
      } else {
        if (this.hStepper < horizontalMaxSteps) {
          this.hStepper++;
        }
        this.vStepper[this.hStepper - 1] = "A";
      }
      this.answers = [];
      this.disableContinue = true;
    },

    nextVerticalStep(verticalMaxSteps, horizontalMaxSteps) {
      let steps = this.$vuetify.theme.step;
      let index = steps.indexOf(this.vStepper[this.hStepper - 1]);

      let currentSection = this.getFilteredQuestionData[this.hStepper - 1]
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
        }
      });

      let nextSectionNo = this.hStepper;
      let nextSubsectionNo = index + 1;
      if (nextSubsectionNo < verticalMaxSteps) {
        // nextSubsectionNo++;
      } else {
        if (this.hStepper < horizontalMaxSteps) {
          nextSectionNo++;
        }
        nextSubsectionNo = 0;
      }

      let answers = this.answers.filter(
        v => v.section == this.hStepper && v.subsection == index + 1
      );

      if (!this.isCurrentBoolSection) {
        if (!this.getDataUserProfile.symptomCompleted) {
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
      let verticalMaxSteps = this.getFilteredQuestionData[this.hStepper - 1]
        .vertical.length;
      let horizontalMaxSteps = this.getFilteredQuestionData.length;
      let steps = this.$vuetify.theme.step;
      let nextSectionNo = this.hStepper;
      let index = steps.indexOf(this.vStepper[this.hStepper - 1]);
      let nextSubsectionNo = index + 1;
      if (nextSubsectionNo < verticalMaxSteps) {
        // nextSubsectionNo++;
      } else {
        if (this.hStepper < horizontalMaxSteps) {
          nextSectionNo++;
        }
        nextSubsectionNo = 0;
      }
      this.isLoading = true;

      let answers = this.answers.filter(
        v => v.section == this.hStepper && v.subsection == index + 1
      );

      let answerData = {
        answers: answers,
        article: "Symptom",
        nextSectionNo: this.hStepper - 1,
        nextSubsectionNo: index
      };
      if (!this.symptomReruned && this.symptomCompleted) {
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
            if (res.complete) {
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
      let index = steps.indexOf(this.vStepper[this.hStepper - 1]);
      if (index > 0) {
        let tmp = Object.assign([], this.vStepper);
        tmp[this.hStepper - 1] = steps.charAt(index - 1);
        this.vStepper = Object.assign([], tmp);
      } else {
        this.vStepper[this.hStepper - 2] = steps.charAt(
          this.getFilteredQuestionData[this.hStepper - 2].vertical.length - 1
        );
        this.hStepper--;
      }
      this.answers = [];
      this.disableContinue = true;
    },

    saveAnswers(
      nextSectionNo,
      nextSubsectionNo,
      verticalMaxSteps,
      horizontalMaxSteps
    ) {
      let currentTime = new Date().toISOString();
      let steps = this.$vuetify.theme.step;
      let index = steps.indexOf(this.vStepper[this.hStepper - 1]);

      let answers = this.answers.filter(
        v => v.section == this.hStepper && v.subsection == index + 1
      );

      let answerData = {
        userId: this.getDataUserProfile.id,
        answers: answers,
        article: "Symptom",
        sectionNo: nextSectionNo - 1,
        subsectionNo: nextSubsectionNo - 1,
        verticalMaxSteps: verticalMaxSteps,
        horizontalMaxSteps: horizontalMaxSteps
      };

      if (
        this.hStepper == horizontalMaxSteps &&
        index + 1 == verticalMaxSteps
      ) {
        answerData["complete"] = currentTime;
      }

      return this._saveAnswers(answerData)
        .then(res => {
          if (answerData.complete) {
            this.$toast.success(`Completed`);
          }
          this.showBorder = false;
          this.hasNoQuestion = false;
          this.popup = false;
          return answerData;
        })
        .catch(err => {
          throw err;
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

    if (this.$route.params.rerun) {
      this.showNotifcationBox = true;
    }

    let params = {
      params: "?Article=Symptom",
      article: "Symptom"
    };

    this._getQuestionsAnswers(params).then(data => {
      this.questions = data;
      this.vStepper = [];
      this.hStepper = 1;
      for (let i = 0; i < this.questions.horizontal.length; i++) {
        this.vStepper.push("A");
      }

      if (this.questions.lastAnswered.sectionNo != null) {
        // go to last answered section
        this.hStepper = this.questions.lastAnswered.sectionNo + 1;
        this.vStepper[this.hStepper - 1] = this.$vuetify.theme.step.charAt(
          this.questions.lastAnswered.subsectionNo
        );
        // go to new section
        this.goToNextStep();
      }

      if (
        this.questions.lastAnswered.sectionNo == undefined ||
        this.questions.lastAnswered.sectionNo == null
      ) {
        this.notification = true;
      } else {
        this.notification = false;
      }

      let limit = {
        article: "Symptom",
        sectionNo: this.questions.horizontal.length - 1,
        subsectionNo:
          this.questions.horizontal[this.questions.horizontal.length - 1]
            .vertical.length - 1
      };

      if (this.getDataUserProfile.symptomCompleted) {
        this._setArticleLimit(limit);
      }

      this.isLoading = false;
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

>>>.v-stepper--vertical .v-stepper__content {
  @media (max-width: 768px) {
    margin: 0;
    padding: 0;
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

.v-stepper.v-stepper--vertical.theme--light {
  overflow: visible;
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
