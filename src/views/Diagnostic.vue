<template>
  <v-stepper v-model="hStepper">
    <v-stepper-header>
      <v-stepper-step v-for="step in questions" :key="step.sectionNo" :complete="hStepper > step.sectionNo" v-bind:step="step.sectionNo">{{step.articleSubheading}}
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items v-for="stepp in questions" :key="stepp.sectionNo + 'stepper-item'">
      <v-stepper-content v-bind:step="stepp.sectionNo">
        <v-card>
          <v-stepper vertical v-model="vStepper">
            <div v-for="stepl in stepp.vertical" :key="stepl.sectionNo" >
              <v-stepper-step editable :complete="vStepper > stepl.sectionNo" v-bind:step="stepl.sectionNo">
                {{stepl.subsectionNo}}
              </v-stepper-step>

              <v-stepper-content v-bind:step="stepl.sectionNo">
                <v-card class="mb-5" height="600px">
                  Hi there {{stepl.subsectionNo}}
                  <v-form v-model="form1Valid" >
                    <div class="row" v-for="a in stepl.items" :key="a.id" :name="nameId('col', stepl.id, a.id)">
                      <components v-if="a.question.useText" :is="a.question.type" :id="compId(a.question.type, a.question.id)" :title="a.question.title" :useText="a.question.useText" :questionId="a.question.id" :answerId="a.answerId" :length="a.question.length" :items="a.question.items" @updateValue="updateComponentValue" />
                      <components v-else :is="a.question.type" :id="compId(a.question.type, a.question.id)" :title="a.question.title" :useText="a.question.useText" :questionId="a.question.id" :answerId="a.answerId" :length="a.question.length" :items="a.question.items" @updateValue="updateComponentValue"/>
                    </div>
                  </v-form>
                </v-card>
              </v-stepper-content>
            </div>
          </v-stepper>
        </v-card>

        <v-btn
          color="primary"
          @click="nextStep(stepp.id)"
        >
          Continue
        </v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>

import components from '../components/questionLayout'
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Diagnostic",
  components,
  data: () => ({
    hStepper: 0,
    vStepper: 1,
    form1Valid: false,

    questions: [],
    answers: [],

    loading: false,
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
  watch: {
    getAnswersData(newProps, oldProps) {
      console.log("123123", newProps);
    }
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

    saveAnswers()
    {
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
    }
  },
  mounted() {
    let data = {
      params: "?Article=Diagnostic",
      article: "Diagnostic"
    }
    this._getQuestionsAnswers(data)
      .then(data => {
        this.questions = data;
        console.log(this.questions.horizontal)
      });
  } 
}
</script>

<style lang="stylus" scoped>
>>>.v-stepper__content
  padding 0
</style>