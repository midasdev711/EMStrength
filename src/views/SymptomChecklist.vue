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
        <v-dialog sm6 xs12 v-model="getNotification">
          <v-card
            color
            class="black--text mt-2 col-sm-6 notification"
          >
            <v-card-title class="headline">Energy Health Symptom Checklist</v-card-title>
            <v-card-text>
              <p>
                You have arrived at the first part of the Energy Health Diagnostic, designed to assess the markers of energy imbalance in your life.
                <br><br>
                The early signs of mental and physical health conditions, and/or performance challenges often show up in our daily experiences of mild to moderate mental, emotional &amp; physical symptoms. 
                <br><br>
                These symptoms are indicators that there is some sort of imbalance in your body. Without an effective response to the symptoms, they will likely stay the same or progressively get worse.
                <br><br>
                Some of these symptoms may seem obvious, some are often hidden from awareness. However, many people don’t pay attention to their symptoms until they become significant and/or disruptive to their lives.
                <br><br>
                The Symptom Checklist helps you with a quick survey of a range of symptoms that indicate your current Energy Health balance (or imbalance), so that you can take steps to get healthier.
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
                <v-stepper vertical v-model="vStepper">
                  <div v-for="stepl in stepp.vertical" :key="stepl.subsectionNo + '-sub'">
                    <!--stepl.subsectionNo + 1-->
                    <v-stepper-step
                      v-bind:step="$vuetify.theme.step.charAt(stepl.subsectionNo)"
                      :key="stepl.subsectionNo + '-sub-step'"
                      :color="$vuetify.theme.subheading2"
                    >
                      <SectionPartStepper :data="stepl.items" />
                    </v-stepper-step>

                    <v-stepper-content
                      v-bind:step="stepl.subsectionNo + 1"
                      :key="stepl.subsectionNo + '-sub-content'"
                    >
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
                            <!--{{a.question.type}}-->
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
                        >{{vStepper == stepp.vertical.length && hStepper == getFilteredQuestionData.length ? 'Save/Exit' : 'Continue'}}</v-btn>
                        <v-btn flat v-if="!(vStepper == 1 && hStepper == 1)" @click="prevVerticalStep">Back</v-btn>
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
      getAnswersData: "getSymptomAnswersData",
      getSymptomHorizontalData: "getSymptomHorizontalData",
      getSymptomLastAnswered: "getSymptomLastAnswered",
      getNotificationStatus: "getNotificationStatus"
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    }),
    getNotification: {
      get() {
        return this.notification | this.getNotificationStatus
      },
      set(val) {
        if (!val) {
          this._disableNotification();
          this.notification = false
        }
      }
    },
    getFilteredQuestionData() {
      let result = []
      for (let i = 0; i < this.getSymptomHorizontalData.length; i ++) {
        let stepp = this.getSymptomHorizontalData[i]
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
      if (this.getSymptomLastAnswered.sectionNo == undefined) {
        this.notification = true;
      } else {
        this.notification = false;
      }
      this.hStepper = this.getSymptomLastAnswered.sectionNo
        ? this.getSymptomLastAnswered.sectionNo + 1
        : 1;
      this.vStepper = this.getSymptomLastAnswered.subsectionNo
        ? this.getSymptomLastAnswered.subsectionNo + 1
        : 1;
      if (this.getSymptomLastAnswered.sectionNo != null && this.getSymptomLastAnswered.subsectionNo != null) {
        this.notification = false | this.getNotificationStatus;
        this.goToLastStep(this.getSymptomHorizontalData[this.getSymptomLastAnswered.sectionNo].vertical.length, this.getSymptomHorizontalData.length);
      }
    }
  },
  methods: {
    ...mapActions("app", {
      _getQuestionsAnswers: "getAnswersData",
      _saveAnswers: "saveAnswers",
      _setLastAnswered: "setSymptomLastAnswered",
      _disableNotification: "disableNotification",
      _setAnswer: "setAnswerData"
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
    nextVerticalStep(
      verticalMaxSteps,
      horizontalMaxSteps,
      isSavingAnswer = true
    ) {
      this.isLoading = true;
      let nextSectionNo = this.hStepper;
      let nextSubsectionNo = this.vStepper;
      if (this.vStepper < verticalMaxSteps) {
        // nextSubsectionNo++;
      } else {
        if (this.hStepper < horizontalMaxSteps) {
          nextSectionNo++;
        }
        nextSubsectionNo = 0;
      }
      let answers = this.answers.filter( v => v.section == this.hStepper && v.subsection == this.vStepper );

      let answerData = {
        answers: answers,
        article: "Symptom",
        nextSectionNo: this.hStepper - 1,
        nextSubsectionNo: this.vStepper - 1
      };
      this._setAnswer(answerData)
      if (isSavingAnswer) {

        return this.saveAnswers(nextSectionNo, nextSubsectionNo, verticalMaxSteps, horizontalMaxSteps)
          .then(res => {
            this.isLoading = false;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    prevVerticalStep() {
      let lastAnswered
      if (this.vStepper > 1) {
        lastAnswered = {
          sectionNo: this.hStepper - 1,
          subsectionNo: this.vStepper > 2 ? this.vStepper - 3 : -1
        }
      } else {
        lastAnswered = {
          sectionNo: this.hStepper - 2,
          subsectionNo: this.getFilteredQuestionData[this.hStepper - 2].vertical.length - 2
        }
      }
      
      this._setLastAnswered(lastAnswered)
    },
    saveAnswers(nextSectionNo, nextSubsectionNo, verticalMaxSteps, horizontalMaxSteps) {
      let currentTime = new Date().toISOString();

      let answers = this.answers.filter( v => v.section == this.hStepper && v.subsection == this.vStepper );

      let answerData = {
        userId: this.getDataUserProfile.id,
        answers: answers,
        article: "Symptom",
        sectionNo: nextSectionNo - 1,
        subsectionNo: nextSubsectionNo - 1,
        verticalMaxSteps: verticalMaxSteps,
        horizontalMaxSteps: horizontalMaxSteps
      };

      if (this.hStepper == horizontalMaxSteps && this.vStepper == verticalMaxSteps) {
        answerData['complete'] = currentTime
      }

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
      params: "?Article=Symptom",
      article: "Symptom"
    };

    this._getQuestionsAnswers(params).then(data => {
      this.isLoading = false;
      this.questions = data;
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
