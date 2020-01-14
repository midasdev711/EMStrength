<template>
  <v-stepper v-model="hStepper">
    <v-stepper-header>
      <v-stepper-step v-for="step in steppers" :key="step.title" :complete="hStepper > step.id" v-bind:step="step.id">{{step.title}}
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items v-for="stepp in steppers" :key="stepp.title">
      <v-stepper-content v-bind:step="stepp.id" :name="nameId('stepco', stepp.id, 0)">
        <v-card>
          <v-stepper vertical v-model="vStepper">
            <div v-for="stepl in vSteppers" :key="stepl.title" :name="nameId('divco', stepp.id, stepl.id)" >
              <v-stepper-step editable :complete="vStepper > stepl.id" v-bind:step="stepl.id">
                {{stepl.title}}
              </v-stepper-step>

              <v-stepper-content v-bind:step="stepl.id" :name="nameId('stepci', stepp.id, stepl.id)">
                <v-card class="mb-5" height="600px">
                  Hi there {{stepl.title}}
                  <v-form v-model="form1Valid" >
                    <div class="row" v-for="a in getAnswersData" :key="a.id" :name="nameId('col', stepl.id, a.id)">
                      <components v-if="a.question.useText" :is="a.question.type" :id="compId(a.question.type, a.question.id)" :title="a.question.title" :useText="a.question.useText" :questionId="a.question.id" :answerId="a.answerId" :length="a.question.length" :items="a.question.items" @updateValue="updateComponentValue" />
                      <components v-else :is="a.question.type" :id="compId(a.question.type, a.question.id)" :title="a.question.title" :useText="a.question.useText" :questionId="a.question.id" :answerId="a.answerId" :length="a.question.length" :items="a.question.items" @updateValue="updateComponentValue"/>
                    </div>
                  </v-form>
                </v-card>
              </v-stepper-content>
              <v-stepper-content step="2" :name="nameId('stepca', stepp.id, stepl.id)" > 
                <!--v-card>
                  ANSWERS
                  <v-container>
                  <v-row :name="nameId('ans-row', stepl.id, 0)">
                  <v-col cols="12" v-for="q in questions" :key="q.id" :name="nameId('ans-col', stepl.id, q.id)">
                      <p> {{q.title}} => {{q.value}}
                      </p>
                  </v-col>
                  </v-row>
                  </v-container>
                </v-card-->
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
  props: {
    componentName: { type: String, required: false }
  },
  data: () => ({
    hStepper: 0,
    vStepper: 1,
    form1Valid: false,

    steppers: [
      {title: "Step1", id: 1},
      //{title: "Step2", id: 2},
      //{title: "Step3", id: 3}
    ],

    vSteppers: [
      {title: "VStep1", id: 1},
      //{title: "VStep2", id: 2},
      //{title: "VStep3", id: 3}
    ],

    questions: [],
    /*    {id: 1, value: null, type: "SectionHeading", title: "Mental Energy Demands", length: null, items: []},
        {id: 2, value: null, type: "SectionPart", title: "A, Applicable statements", length: null, items: []},
          {id: 6, value: 2,  type: "Scale", title: "Rate your current energy level", length: null, items: 
            [
            'Alfa',
            'BMW',
            'Toyota',
            'Apple',
            ]
        },
                
        {id: 3, value: null, type: "Instruction", title: "Still tick even if only SOMETIMES and only SOMEWHAT applicable:", length: null, items: []},
        {id: 4, value: null, type: "Bool", title: "I feel pressure from the world around me to keep my struggle to myself", length: null, items: []},
        {id: 7, value: null, type: "TextArea", title: "Give a long answer here", length: 800, items: []},  
        {id: 5, value: null, type: "TextField", title: "What other factors may affect your Energy wellbeing?", length: 120, items: []},

    ],*/

    answers: [],

    loading: false,
    saved: false,
  }),
  computed: {
    ...mapGetters("app", {
      getAnswersData: "getAnswersData"
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
    //this.questions = this._getQuestionsAnswers().then(data => this.questions = data);
    this._getQuestionsAnswers()
      .then(data => console.log(data));
    
  } 
}
</script>