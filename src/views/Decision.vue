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
      <v-alert
        :value="getDataUserProfile.decisionCompleted"
        color="warning"
        icon="done"
        outline>
        Submitted {{getDataUserProfile.decisionCompleted | formatDate}} <v-btn flat round outline @click="reRun">Re-Run</v-btn>
      </v-alert>
      <v-layout justify-center ma-0>
        <v-dialog sm6 xs12 v-model="getNotification">
          <v-card
            color
            class="black--text mt-2 col-sm-6 notification"
          >
            <v-card-title class="headline">Energy Health Decision Profile</v-card-title>
            <v-card-text>
              <p>
                You have arrived at the part of the Diagnostic within which we gather information to build your Energy Health Decision Profile. 
              </p>
              <p>
                The profile covers the factors from 5 key areas of influence:
                <br><br>
                1. Socio-Cultural<br>
                2. Situational<br>
                3. People/Relationships<br>
                4. Personal<br>
                5. Mental Health
                <br><br>
                You are encouraged to provide as much detail as you can, in order to build an accurate Profile. The accuracy will help with developing the most effective responses to manage your Energy Health. Nonetheless, there is no pressure to respond to questions with which you don't feel comfortable.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="green darken-1" @click="notification = false;_disableNotification();">Got it!</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog sm6 xs12 persistent v-model="completeDialog">
          <v-card color class="black--text mt-2 col-sm-6 notification">
            <v-card-title class="headline">Decision Profile complete</v-card-title>
            <v-card-text>
              <p>
                Thank you. You have completed the Decision Profile. We now have a better understanding to help you develop the key mindsets and decision-making processes to get your Energy Health and Performance to an optimum!
                <br />
                <br />Make sure you contact us to discuss your results, and keep going with your Recovery To-DO List!
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
                <v-stepper vertical v-model="vStepper[stepp.sectionNo]">
                  <div
                    v-for="stepl in stepp.vertical"
                    :key="`${stepp.sectionNo}-${stepl.subsectionNo}`"
                  >
                    <v-stepper-step
                      v-bind:step="$vuetify.theme.step.charAt(stepl.subsectionNo)"
                      :key="stepl.subsectionNo + '-sub-step'"
                      :color="$vuetify.theme.subheading2"
                      :editable="stepp.sectionNo < getAnswerLimit.sectionNo || (stepp.sectionNo == getAnswerLimit.sectionNo && stepl.subsectionNo <= (getAnswerLimit.subsectionNo))"
                    >
                      <SectionPartStepper :data="stepp.vertical[stepl.subsectionNo].items" />
                    </v-stepper-step>

                    <v-stepper-content :step="$vuetify.theme.step.charAt(stepl.subsectionNo)" :key="stepl.subsectionNo + '-sub-content'">
                      <v-card v-if="isMobile && stepp.vertical.length > 1">
                        <h3>
                          <span class="v-stepper__step__step" style="background-color: rgb(0, 163, 138); border-color: rgb(0, 163, 138);">{{$vuetify.theme.step.charAt(stepl.subsectionNo)}}</span>
                          <span
                            class="right"
                          >{{stepl.subsectionNo + 1}} of {{stepp.vertical.length}}</span>
                        </h3>
                      </v-card>
                      <v-card class="mb-5" v-if="stepp.sectionNo == hStepper - 1">
                        <span class="dev-hint">P {{stepl.subsectionNo}} (SS No)</span>
                        <v-form v-model="form1Valid">
                          <div
                            class="row"
                            v-for="a in stepp.vertical[stepl.subsectionNo].items"
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
                              :disabled="!decisionReruned && decisionCompleted"
                              :showBorder="showBorder"
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
                              :subsection="stepl.subsectionNo + 1"
                              :disabled="!decisionReruned && decisionCompleted"
                              :showBorder="showBorder"
                              @update-value="updateComponentValue"
                            />
                          </div>
                        </v-form>
                        <v-btn
                          color="primary"
                          @click="nextVerticalStep(stepp.vertical.length, getFilteredQuestionData.length)"
                        >{{vStepper[hStepper-1] == $vuetify.theme.step.charAt(stepp.vertical.length-1) && hStepper == getFilteredQuestionData.length ? 'Complete' : 'Continue'}}</v-btn>
                        <v-btn
                          flat
                          v-if="!(vStepper[0] == 'A' && hStepper == 1)"
                          @click="prevVerticalStep"
                        >Back</v-btn>
                        <p v-if="showBorder" class="pink--text headline">You have missed a required question on this page. Please answer all questions.</p>
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
      completeDialog: false,
      popup: false,
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
      showBorder: false,
    };
  },
  computed: {
    ...mapGetters("app", {
      getAnswersData: "getDecisionAnswersData",
      getDecisionHorizontalData: "getDecisionHorizontalData",
      getDecisionLastAnswered: "getDecisionLastAnswered",
      getNotificationStatus: "getNotificationStatus",
      getAnswerLimit: "getDecisionLimit"
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile",
      decisionReruned: "getDecisionReruned",
      decisionCompleted: "getDecisionCompleted"
    }),
    getNotification: {
      get() {
        return this.notification | this.getNotificationStatus
      },
      set(val) {
        if (!val) {
          this.notification = false
          this._disableNotification()
        }
      }
    },
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
      return result
    }
  },
  watch: {
    answers: {
      handler(val) {
        let steps = this.$vuetify.theme.step;
        let index = steps.indexOf(this.vStepper[this.hStepper-1]);
        let currentAnswered = val.filter(
          v => v.section == this.hStepper && v.subsection == (index + 1)
        );

        let currentSection = this.getFilteredQuestionData[this.hStepper - 1].vertical[index].items;
        let currentQuestions = currentSection.filter(
          v => v.question.type == "Bool" || v.question.type == "Scale" || v.question.type == "Selection"
        );

        let yesCount = 0;

        // for (let i = 0; i < currentQuestions.length ; i ++) {
        //   const element = currentQuestions[i];
        //   let answered = currentAnswered.filter(
        //     v => v.questionId == element.questionId
        //   );
        //   if (element.question.type == "Bool") {
        //     if (answered.length == 0 && element.value == null) {
        //       this.disableContinue = true;
        //       return;
        //     } else if (answered.length == 0 && element.value == 1) {
        //       yesCount ++;
        //     } else if (answered.length > 0 && answered[0].value == 1) {
        //       yesCount ++;
        //     }
        //   } else if (element.question.type == "Scale") {
        //     if (answered.length == 0 && element.value == null) {
        //       this.disableContinue = true;
        //       return;
        //     } else if (answered.length == 0 && element.value > 0) {
        //       yesCount ++;
        //     } else if (answered.length == 0 && element.value == 0) {
        //       this.disableContinue = true;
        //       return;
        //     } else if (answered.length > 0 && answered[0].value > 0) {
        //       yesCount ++;
        //     } else if (answered.length > 0 && answered[0].value == 0) {
        //       this.disableContinue = true;
        //       return;
        //     }
        //   } else if (element.question.type == "Selection") {
        //     if (answered.length == 0 && element.value == null) {
        //       this.disableContinue = true;
        //       return;
        //     } else if (answered.length == 0 && element.value > 0) {
        //       yesCount ++;
        //     } else if (answered.length == 0 && element.value == 0) {
        //       this.disableContinue = true;
        //       return;
        //     } else if (answered.length > 0 && answered[0].value > 0) {
        //       yesCount ++;
        //     } else if (answered.length > 0 && answered[0].value == 0) {
        //       this.disableContinue = true;
        //       return;
        //     }
        //   }
        // }

        // if (currentQuestions.length > 0 && yesCount == 0) {
        //   this.disableContinue = true;
        // } else {
        //   this.disableContinue = false;
        // }
      },
      deep: true,
    },
    vStepper: {
      handler(val) {
        let steps = this.$vuetify.theme.step;
        let index = steps.indexOf(val[this.hStepper - 1]);
        let currentSection = this.getFilteredQuestionData[this.hStepper - 1].vertical[index].items;
        let questions = [];
        currentSection.map(question => {
          if (question.question.type == 'SectionHeading' || question.question.type == 'SectionPart' || question.question.type == 'SectionInstruction') {
            return;
          } else {
            questions.push(question);
          }
        });
        if (questions.length == 0) {
          this.popup = true;
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions("app", {
      _getQuestionsAnswers: "getAnswersData",
      _saveAnswers: "saveAnswers",
      _setDecisionLastAnswered: "setDecisionLastAnswered",
      _disableNotification: "disableNotification",
      _setAnswer: "setAnswerData",
      _reRunArticle: 'reRunArticle',
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
        article: 'Decision'
      }
      return this._reRunArticle(data).then(res => {
        console.log(res)
      })
    },
    compId(type, id) {
      return "comp" + type + id;
    },
    updateComponentValue(value, questionId, answerId, useText, section, subsection, questionType=null) {
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

    goToNextStep() {
      let horizontalMaxSteps = this.questions.horizontal.length;
      let verticalMaxSteps = this.questions.horizontal[this.hStepper-1].vertical.length;
      let steps = this.$vuetify.theme.step;
      let index = steps.indexOf(this.vStepper[this.hStepper - 1]);
      if ((index + 1) < verticalMaxSteps) {
        let tmp = Object.assign([], this.vStepper);
        tmp[this.hStepper-1] = steps.charAt(index + 1);
        this.vStepper = Object.assign([], tmp);
      } else {
        if (this.hStepper < horizontalMaxSteps) {
          this.hStepper++;
        }
        this.vStepper[this.hStepper - 1] = "A";
      }
      this.answers = [];
      this.disableContinue = true;
      this.showBorder = false;
    },

    nextVerticalStep(verticalMaxSteps, horizontalMaxSteps) {
      let steps = this.$vuetify.theme.step;
      let index = steps.indexOf(this.vStepper[this.hStepper-1]);

      let currentSection = this.getFilteredQuestionData[this.hStepper - 1].vertical[index].items;
      let questions = [];
      currentSection.map(question => {
        if (question.question.type == 'SectionHeading' || question.question.type == 'SectionPart' || question.question.type == 'SectionInstruction') {
          return;
        } else {
          if (question.question.type == 'Bool' && question.value == null) {
            questions.push(question);
          }
          if (question.question.type == 'Scale' && (question.value == 0 || question.value == null)) {
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
        v => v.section == this.hStepper && v.subsection == (index + 1)
      );

      if (!this.getDataUserProfile.decisionCompleted) {
        if (answers.length < questions.length) {
          this.popup = true;
          return;
        }

        let tmpitems = answers.filter( v => (v.questionType =='Scale' && v.value == 0));
        if (tmpitems.length > 0) {
          this.popup = true;
          return;
        }
      }

      this.save();
    },

    save() {
      let verticalMaxSteps = this.getFilteredQuestionData[this.hStepper - 1].vertical.length;
      let horizontalMaxSteps = this.getFilteredQuestionData.length;
      let steps = this.$vuetify.theme.step;
      let index = steps.indexOf(this.vStepper[this.hStepper-1]);
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
        v => v.section == this.hStepper && v.subsection == (index + 1)
      );
      this.isLoading = true;

      let answerData = {
        answers: answers,
        article: "Decision",
        nextSectionNo: this.hStepper - 1,
        nextSubsectionNo: index
      };
      if (!this.decisionReruned && this.decisionCompleted) {
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
            if (answerData.complete) {
              this.$toast.success(`Completed`);
              this.isLoading = false;
              this.completeDialog = true;
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
        tmp[this.hStepper-1] = steps.charAt(index - 1);
        this.vStepper = Object.assign([], tmp);
      } else {
        this.vStepper[this.hStepper-2] = steps.charAt(this.getFilteredQuestionData[
          this.hStepper - 2
        ].vertical.length - 1);
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
      let index = steps.indexOf(this.vStepper[this.hStepper-1]);

      let answers = this.answers.filter(
        v => v.section == this.hStepper && v.subsection == (index + 1)
      );

      let answerData = {
        userId: this.getDataUserProfile.id,
        answers: answers,
        article: "Decision",
        sectionNo: nextSectionNo - 1,
        subsectionNo: nextSubsectionNo - 1,
        verticalMaxSteps: verticalMaxSteps,
        horizontalMaxSteps: horizontalMaxSteps
      };

      if (
        this.hStepper == horizontalMaxSteps &&
        (index + 1) == verticalMaxSteps
      ) {
        answerData["complete"] = currentTime;
      }

      return this._saveAnswers(answerData)
        .then(res => {
          console.log(res);
          return res;
        })
        .catch(err => {
          throw err;
        });
    },
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
    let params = {
      params: "?Article=Decision",
      article: "Decision"
    };

    this._getQuestionsAnswers(params).then(data => {
      
      this.questions = data;
      this.vStepper = [];
      this.hStepper = 1;
      for (let i = 0; i < this.questions.horizontal.length; i++) {
        this.vStepper.push('A');
      }

      if (this.questions.lastAnswered.sectionNo != null) {
        // go to last answered section
        this.hStepper = this.questions.lastAnswered.sectionNo + 1;
        this.vStepper[this.hStepper-1] = this.$vuetify.theme.step.charAt(this.questions.lastAnswered.subsectionNo);
        // go to new section
        this.goToNextStep();
      }

      if (this.questions.lastAnswered.sectionNo == undefined || this.questions.lastAnswered.sectionNo == null) {
        this.notification = true;
      } else {
        this.notification = false;
      }

      let limit = {
        article: 'Decision',
        sectionNo: this.questions.horizontal.length - 1,
        subsectionNo: this.questions.horizontal[this.questions.horizontal.length - 1].vertical.length - 1
      };

      if (this.getDataUserProfile.decisionCompleted) {
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
  display flex
  justify-content flex-end
}

>>>.v-dialog
  max-width 50%
  @media (max-width: 500px) {
    max-width 90%
    line-height 18px
    .v-card {
      padding 10px
    }

    .v-card__title, .v-card__text {
      padding 5px
    }

    .v-card__title {
      padding-bottom 15px
    }
  }

  @media (max-width: 500px) {
    max-width 90%
    line-height 18px

    .v-card__title {
      padding-bottom 15px
      font-size 20px!important
    }
  }
</style>
