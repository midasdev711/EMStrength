<template>
  <v-stepper v-model="hStepper">
    <v-stepper-header>
      <v-stepper-step v-for="step in questions.horizontal" :key="step.sectionNo" :complete="hStepper > step.sectionNo" :step="step.sectionNo">{{step.articleSubheading}}
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items v-for="stepp in questions.horizontal" :key="stepp.sectionNo + 'stepper-item'">
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

    questions: {
      "article": "Diagnostic",
      "horizontal": [{
        "articleSubheading": "first",
        "sectionNo": 1,
        "subsectionNo": 1,
        "vertical": [{
          "sectionNo": 1,
          "subsectionNo": 1,
          "items": [
            {
              "answerId": "92c42cb0-2fde-402b-aecd-a981c06ec06f",
              "questionId": "871e7133-6cae-45fb-9e2e-44f5914bdda4",
              "value": 0,
              "text": null,
              "question": {
                "id": "871e7133-6cae-45fb-9e2e-44f5914bdda4",
                "article": "Diagnostic",
                "articleSubheading": null,
                "sectionNo": 0,
                "sequence": 4,
                "subsectionNo": null,
                "type": "Bool",
                "useText": false,
                "title": "I identify with messages like 'nothing comes without hard work'",
                "condition": null,
                "length": null,
                "items": []
              }
            },
            {
              "answerId": "6136a4fa-51ea-4017-8218-483cc28604e3",
              "questionId": "871e7133-6cae-45fb-9e2e-44f5914bdda4",
              "value": 0,
              "text": null,
              "question": {
                "id": "871e7133-6cae-45fb-9e2e-44f5914bdda4",
                "article": "Diagnostic",
                "articleSubheading": null,
                "sectionNo": 0,
                "sequence": 4,
                "subsectionNo": null,
                "type": "Bool",
                "useText": false,
                "title": "I identify with messages like 'nothing comes without hard work'",
                "condition": null,
                "length": null,
                "items": []
              }
            },
            {
              "answerId": "0366b743-05be-45b0-8ceb-df9d3027d96c",
              "questionId": "871e7133-6cae-45fb-9e2e-44f5914bdda4",
              "value": 0,
              "text": "",
              "question": {
                "id": "871e7133-6cae-45fb-9e2e-44f5914bdda4",
                "article": "Diagnostic",
                "articleSubheading": null,
                "sectionNo": 0,
                "sequence": 4,
                "subsectionNo": null,
                "type": "Bool",
                "useText": false,
                "title": "I identify with messages like 'nothing comes without hard work'",
                "condition": null,
                "length": null,
                "items": []
              }
            },
            {
              "answerId": "61d58878-e6d3-43ac-8efa-7acb7876a5af",
              "questionId": "871e7133-6cae-45fb-9e2e-44f5914bdda4",
              "value": 23,
              "text": "",
              "question": {
                "id": "871e7133-6cae-45fb-9e2e-44f5914bdda4",
                "article": "Diagnostic",
                "articleSubheading": null,
                "sectionNo": 0,
                "sequence": 4,
                "subsectionNo": null,
                "type": "Bool",
                "useText": false,
                "title": "I identify with messages like 'nothing comes without hard work'",
                "condition": null,
                "length": null,
                "items": []
              }
            },
            {
              "answerId": "6f088de0-c33c-4442-959f-45923ebb19bf",
              "questionId": "871e7133-6cae-45fb-9e2e-44f5914bdda4",
              "value": 1,
              "text": "",
              "question": {
                "id": "871e7133-6cae-45fb-9e2e-44f5914bdda4",
                "article": "Diagnostic",
                "articleSubheading": null,
                "sectionNo": 0,
                "sequence": 4,
                "subsectionNo": null,
                "type": "Bool",
                "useText": false,
                "title": "I identify with messages like 'nothing comes without hard work'",
                "condition": null,
                "length": null,
                "items": []
              }
            },
            {
              "answerId": "22f0f145-8847-4840-87d5-efc3c2ca91df",
              "questionId": "871e7133-6cae-45fb-9e2e-44f5914bdda4",
              "value": 1,
              "text": "",
              "question": {
                "id": "871e7133-6cae-45fb-9e2e-44f5914bdda4",
                "article": "Diagnostic",
                "articleSubheading": null,
                "sectionNo": 0,
                "sequence": 4,
                "subsectionNo": null,
                "type": "Bool",
                "useText": false,
                "title": "I identify with messages like 'nothing comes without hard work'",
                "condition": null,
                "length": null,
                "items": []
              }
            }
          ]}
        ],
        "items": []
      }]
    },
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
        //this.questions = data;
        console.log(this.questions.horizontal)
      });
  } 
}
</script>

<style lang="stylus" scoped>
>>>.v-stepper__content
  padding 0
</style>