<template>
  <v-container grid-list-xl>
    <div class="text-xs-center" v-if="isLoading">
      <v-progress-circular
        :size="70"
        :width="7"
        v-bind:color="$vuetify.theme['progressColor']"
        indeterminate
      ></v-progress-circular>
    </div>
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
            <span :style="{ color: $vuetify.theme.subheading1 }">{{step.section}} <span class="dev-hint">(Section)</span></span>
          </v-stepper-step>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="stepp in getAnswersData"
          :key="`${stepp.sectionNo}-content`"
          :step="stepp.sectionNo + 1"
        >
          <v-card>
            <v-stepper vertical v-model="vStepper">
              <div v-for="stepl in stepp.vertical" :key="stepl.subsectionNo + '-sub'" >
                <v-stepper-step 
                  editable 
                  v-bind:step="stepl.subsectionNo + 1"
                  :key="stepl.subsectionNo + '-sub-step'" 
                  :color="$vuetify.theme.subheading2">
                  <!--span class="dev-hint"> Part {{stepl.subsectionNo}}  (SS No {{stepl.subsectionNo}})</span-->

                  <SectionPartStepper
                    v-if="sectionPartHead(stepl.items).type == 'SectionPart'"
                    :id="compId('SectionPart-H-', sectionPartHead(stepl.items).id)"
                    :title="sectionPartHead(stepl.items).title"
                  />

                </v-stepper-step>

                <v-stepper-content v-bind:step="stepl.subsectionNo + 1">
                  <v-card class="mb-5">
                    <span class="dev-hint">P {{stepl.subsectionNo}} (SS No)</span>
                    <v-form v-model="form1Valid" >
                      <div class="row" v-for="a in stepl.items" :key="a.id" v-if="a.isConditionQuestionMet">
                        <components v-if="a.question.useText && a.isConditionQuestionMet" :is="a.question.type" :id="compId(a.question.type, a.question.id)" :title="a.question.title" :useText="a.question.useText" :questionId="a.question.id" :answerId="a.answerId" :length="a.question.length" :items="a.question.items" @updateValue="updateComponentValue" />
                        <components v-if="!a.question.useText && a.isConditionQuestionMet" :is="a.question.type" :id="compId(a.question.type, a.question.id)" :title="a.question.title" :useText="a.question.useText" :questionId="a.question.id" :answerId="a.answerId" :length="a.question.length" :items="a.question.items" @updateValue="updateComponentValue"/>
                      </div>
                    </v-form>
                    <v-btn
                      color="primary"
                      @click="nextVerticalStep(stepp.vertical.length, getAnswersData.length)"
                    >
                      Continue
                    </v-btn>
                    <v-btn flat v-if="stepl.subsectionNo > 0" @click="prevVerticalStep">Back</v-btn>
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
          <v-btn flat v-if="stepp.sectionNo > 0" @click="prevHorizontalStep">Back</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>

import components from '../components/questionLayout'
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Diagnostic",
  components,
  data: () => ({
    hStepper: 1,
    vStepper: 1,
    form1Valid: false,

    questions: [],
    answers: [],

    isLoading: true,
    saved: false,
  }),
  computed: {
    ...mapGetters("app", {
      getAnswersData: "getDiagnosticAnswersData"
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    })
  },
  methods: {
    ...mapActions("app", {
      //_getUser: "getUser",
      _getQuestions: "getQuestions",
      _getQuestionsAnswers: "getAnswersData",  //getAnswersData ? make dynmaic
      _saveAnswers: "saveAnswers",
    }),

    compId(type, id)
    {
      return "comp"+type+id;
    },

    nameId(type, row, col)
    {
      return `${type}_${row}x${col}`;
    },

    nextStep(step)
    {
      this.saveAnswers();
      //this.hStepper = step + 1;

    },
    sectionPartHead(list)
    {
      //traverse stepl.items[1] to find the SectionPart for the label
        var item = list.find(x => x.question.type == 'SectionPart');
         
        //console.log("Question Item", item);
        if (item) 
          return item.question;
        else
          return undefined;

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

    saveAnswers() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.loading = true;
          console.log(this.answers);

          const formData = {
            userId: this.getDataUserProfile.id, 
            answers: this.answers,
          };
          console.log(formData);
          this._saveAnswers(formData).then(res => {
            this.$toast.success('Successfully saved');
            this.saved = true;
            this.loading = false;

          }).catch(err => {
            this.$toast.error(err);
          })
          
        }
      }).catch((error) => {
        console.error(error);
      });
    },
    nextVerticalStep(verticalMaxSteps, horizontalMaxSteps) {
      if (this.vStepper < verticalMaxSteps) {
        this.vStepper ++;
      } else {
        if (this.hStepper < horizontalMaxSteps) {
          this.hStepper ++;
        }
        this.vStepper = 1;
      }
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
    }
  },
  mounted() {
    let data = {
      params: "?Article=Diagnostic",
      article: "Diagnostic"
    }
    this._getQuestionsAnswers(data)
      .then(data => {
        this.isLoading = false;
        this.questions = data;
        console.log(data)
      });
  } 
}
</script>

<style lang="stylus" scoped>
>>>.v-stepper__content
  padding 0
</style>