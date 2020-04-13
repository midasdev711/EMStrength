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
              <v-btn flat @click="notification = false;_disableNotification();">Got it!</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-stepper v-model="hStepper">
          <v-stepper-header>
            <template v-for="step in getFilteredQuestionData">
              <v-stepper-step
                :key="`${step.sectionNo}-step`"
                :complete="hStepper > (step.sectionNo + 1)"
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
                    v-for="vStepNum in stepp.vertical.length"
                    :key="`${stepp.sectionNo}-${vStepNum}`"
                  >
                    <v-stepper-step
                      v-bind:step="$vuetify.theme.step.charAt(vStepNum - 1)"
                      :key="vStepNum + '-sub-step'"
                      :color="$vuetify.theme.subheading2"
                      :editable="stepp.sectionNo < getAnswerLimit.sectionNo || (stepp.sectionNo == getAnswerLimit.sectionNo && vStepNum <= (getAnswerLimit.subsectionNo))"
                    >
                      <SectionPartStepper :data="stepp.vertical[vStepNum-1].items" />
                    </v-stepper-step>

                    <v-stepper-content :step="$vuetify.theme.step.charAt(vStepNum - 1)" :key="vStepNum + '-sub-content'">
                      <v-card v-if="isMobile && stepp.vertical.length > 1">
                        <h3>
                          {{$vuetify.theme.step.charAt(vStepNum-1)}}{{stepp.section}}
                          <span
                            class="right"
                          >{{vStepNum}} of {{stepp.vertical.length}}</span>
                        </h3>
                      </v-card>
                      <v-card class="mb-5" v-if="vStepper[stepp.sectionNo] == $vuetify.theme.step.charAt(vStepNum - 1)">
                        <span class="dev-hint">P {{vStepNum-1}} (SS No)</span>
                        <v-form v-model="form1Valid">
                          <div
                            class="row"
                            v-for="a in stepp.vertical[vStepNum-1].items"
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
                        >{{vStepper[hStepper-1] == $vuetify.theme.step.charAt(stepp.vertical.length-1) && hStepper == getFilteredQuestionData.length ? 'Complete' : 'Continue'}}</v-btn>
                        <v-btn
                          flat
                          v-if="!(vStepper[0] == 'A' && hStepper == 1)"
                          @click="prevVerticalStep"
                        >Back</v-btn>
                      </v-card>
                    </v-stepper-content>
                  </div>
                </v-stepper>
              </v-card>
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
      vStepper: [],
      form1Valid: false,
      questions: [],
      answers: [],
      isLoading: true,
      fill: { gradient: ["#48cba2", "#47bbe9"] }
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
  methods: {
    ...mapActions("app", {
      _getQuestionsAnswers: "getAnswersData",
      _saveAnswers: "saveAnswers",
      _setDecisionLastAnswered: "setDecisionLastAnswered",
      _disableNotification: "disableNotification",
      _setAnswer: "setAnswerData",
      _reRunArticle: 'reRunArticle'
    }),
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
    },

    nextVerticalStep(verticalMaxSteps, horizontalMaxSteps) {
      this.isLoading = true;
      let steps = this.$vuetify.theme.step;
      let nextSectionNo = this.hStepper;
      let index = steps.indexOf(this.vStepper[this.hStepper-1]);
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

      let answerData = {
        answers: answers,
        article: "Decision",
        nextSectionNo: this.hStepper - 1,
        nextSubsectionNo: index
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
            if (answerData.complete) {
              this.$toast.success(`Completed`);
            }
            this.goToNextStep();
            this.isLoading = false;
            this.$forceUpdate();
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
      this.isLoading = false;
      this.questions = data;
      this.vStepper = [];
      for (let i = 0; i < this.questions.length; i++) {
        this.vStepper.push(1);
      }
      // go to last answered section
      this.hStepper = this.questions.lastAnswered.sectionNo + 1;
      this.vStepper[this.hStepper-1] = this.$vuetify.theme.step.charAt(this.questions.lastAnswered.subsectionNo);
      // go to new section
      this.goToNextStep();

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
