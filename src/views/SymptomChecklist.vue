<template>
  <v-container grid-list-xl>
    <v-stepper v-model="hStepper">
      <v-stepper-header>
        <v-stepper-step v-for="step in questions.horizontal" :key="step.sectionNo" :complete="hStepper > step.sectionNo" :step="step.sectionNo">{{step.section}}
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items v-for="stepp in questions.horizontal" :key="stepp.sectionNo + 'stepper-item'">
        <v-stepper-content v-bind:step="stepp.sectionNo">
          <v-card>
            <v-stepper vertical v-model="vStepper">
              <div v-for="stepl in stepp.vertical" :key="stepl.sectionNo" >
                <v-stepper-step editable v-bind:step="stepl.sectionNo">
                  Part {{stepl.subsectionNo}}  (SS No)
                </v-stepper-step>

                <v-stepper-content v-bind:step="stepl.sectionNo">
                  <v-card class="mb-5">
                    P {{stepl.subsectionNo}} (SS No)
                    <v-form v-model="form1Valid" >
                      <div class="row" v-for="a in stepl.items" :key="a.id">
                        <components v-if="a.question.useText" :is="a.question.type" :id="compId(a.question.type, a.question.id)" :title="a.question.title" :useText="a.question.useText" :questionId="a.question.id" :answerId="a.answerId" :length="a.question.length" :items="a.question.items" @updateValue="updateComponentValue" />
                        <components v-else :is="a.question.type" :id="compId(a.question.type, a.question.id)" :title="a.question.title" :useText="a.question.useText" :questionId="a.question.id" :answerId="a.answerId" :length="a.question.length" :items="a.question.items" @updateValue="updateComponentValue"/>
                      </div>
                    </v-form>
                    <v-btn
                      color="primary"
                      @click="nextVerticalStep(stepl.sectionNo, stepp.sectionNo, stepp.vertical.length, questions.horizontal.length)"
                    >
                      Continue
                    </v-btn>
                    <v-btn flat v-if="stepl.sectionNo > 1" @click="prevVerticalStep">Back</v-btn>
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
          <v-btn flat v-if="stepp.sectionNo > 1" @click="prevHorizontalStep">Back</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import debounce from "debounce";
import components from '../components/questionLayout'

export default {
  name: "SymptomChecklist",
  components,
  data() {
    return {
      isMobile: false,
      hStepper: 1,
      vStepper: 1,
      form1Valid: false,
      questions: {
        "article": "Symptom",
        "horizontal": [{
            "articleSubheading": "Energy",
            "sectionNo": 1,
            "subsectionNo": 1,
            "vertical": [{
                "sectionNo": 1,
                "subsectionNo": 1,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "bf313903-1b79-40dc-bc8e-01434728ec5a",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "bf313903-1b79-40dc-bc8e-01434728ec5a",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 0,
                      "subsectionNo": null,
                      "type": "Bool",
                      "useText": false,
                      "title": "6-18 years old",
                      "condition": null,
                      "length": 1,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "9242313a-ae29-4a1b-8a70-0f707d56697e",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "9242313a-ae29-4a1b-8a70-0f707d56697e",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 0,
                      "subsectionNo": null,
                      "type": "Bool",
                      "useText": false,
                      "title": "3-12 months",
                      "condition": null,
                      "length": 1,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "e6097740-ac7b-4db5-a3d5-125fe6ef2865",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "e6097740-ac7b-4db5-a3d5-125fe6ef2865",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 0,
                      "subsectionNo": null,
                      "type": "Bool",
                      "useText": false,
                      "title": "1+ year old",
                      "condition": null,
                      "length": 1,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "f34f7f1e-ac56-49db-826f-139076df83d6",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "f34f7f1e-ac56-49db-826f-139076df83d6",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 0,
                      "subsectionNo": null,
                      "type": "Bool",
                      "useText": false,
                      "title": "How many children live at home with you?",
                      "condition": null,
                      "length": 1,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "ff764e65-16f2-4ea9-902d-22c2a72a105b",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "ff764e65-16f2-4ea9-902d-22c2a72a105b",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 0,
                      "subsectionNo": null,
                      "type": "TextArea",
                      "useText": true,
                      "title": "Any comments on your Children and possible influences on your Energy Health",
                      "condition": null,
                      "length": 250,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "c18f545e-579d-4a5d-b53a-2325973a6140",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "c18f545e-579d-4a5d-b53a-2325973a6140",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 0,
                      "subsectionNo": null,
                      "type": "Scale",
                      "useText": false,
                      "title": "As a parent, I give my energy to my children to the detriment/neglect of my own recovery/self-care",
                      "condition": null,
                      "length": 4,
                      "items": [
                        {
                          "value": 0,
                          "title": "not at all"
                        },
                        {
                          "value": 1,
                          "title": "somewhat"
                        },
                        {
                          "value": 2,
                          "title": "moderately"
                        },
                        {
                          "value": 3,
                          "title": "strongly"
                        },
                        {
                          "value": 4,
                          "title": "completely"
                        }
                      ]
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "9bf91efd-73f2-40b0-8a70-45a884b7ffb7",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "9bf91efd-73f2-40b0-8a70-45a884b7ffb7",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 0,
                      "subsectionNo": null,
                      "type": "Bool",
                      "useText": false,
                      "title": "Do you have any children?",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "f28111a4-57a5-4259-882d-4989cef1a053",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "f28111a4-57a5-4259-882d-4989cef1a053",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 0,
                      "subsectionNo": null,
                      "type": "Bool",
                      "useText": false,
                      "title": "How many children do you have?",
                      "condition": null,
                      "length": 1,
                      "items": [
                        {
                          "value": 0,
                          "title": "0\n1\n2\n3\n4\n5\n6\n7\n8 or more"
                        }
                      ]
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "3ccd2927-94f1-42f8-8917-5feb06f20eb6",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "3ccd2927-94f1-42f8-8917-5feb06f20eb6",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 0,
                      "subsectionNo": null,
                      "type": "Bool",
                      "useText": false,
                      "title": "3-5 years old",
                      "condition": null,
                      "length": 1,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "9718d014-dcf8-4fda-9f27-6455cd21898c",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "9718d014-dcf8-4fda-9f27-6455cd21898c",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 0,
                      "subsectionNo": null,
                      "type": "Bool",
                      "useText": false,
                      "title": "19 years old and over",
                      "condition": null,
                      "length": 1,
                      "items": [
                        {
                          "value": 0,
                          "title": "0\n1\n2\n3\n4\n5\n6\n7\n8 or more"
                        }
                      ]
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "a01227dc-9b21-4e87-80ff-96d074759c07",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "a01227dc-9b21-4e87-80ff-96d074759c07",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 0,
                      "subsectionNo": null,
                      "type": "Instruction",
                      "useText": false,
                      "title": "Children",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "f788c455-40ea-4384-a020-9cffa4c74335",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "f788c455-40ea-4384-a020-9cffa4c74335",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 0,
                      "subsectionNo": null,
                      "type": "Bool",
                      "useText": false,
                      "title": "Under 3 months",
                      "condition": null,
                      "length": 1,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "f6774470-0e85-469d-bc16-b19ae4ea1161",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "f6774470-0e85-469d-bc16-b19ae4ea1161",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 0,
                      "subsectionNo": null,
                      "type": "Bool",
                      "useText": false,
                      "title": "Identify how many Children you have in each of the following age groups",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "90405f06-90ae-41ce-b340-b2a847245d4c",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "90405f06-90ae-41ce-b340-b2a847245d4c",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 0,
                      "subsectionNo": null,
                      "type": "Bool",
                      "useText": false,
                      "title": "2+ year old",
                      "condition": null,
                      "length": 1,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "59ab8718-6072-48d2-879d-f97fa06db33e",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "59ab8718-6072-48d2-879d-f97fa06db33e",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 0,
                      "subsectionNo": null,
                      "type": "Bool",
                      "useText": false,
                      "title": "Rate the extent to which the following statement applies to you",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "5526ac34-fe03-470f-8a33-8d0ceb81df34",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "5526ac34-fe03-470f-8a33-8d0ceb81df34",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 1,
                      "subsectionNo": null,
                      "type": "Bool",
                      "useText": false,
                      "title": "This part of the Energy Health Diagnostic is designed to measure current symptoms of energy imbalance in your life. Read through the statements and rate those that currently apply to you.",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  }
                ]
              }, {
                "sectionNo": 2,
                "subsectionNo": 2,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "16090897-69a0-4585-a645-08cac6e9eb20",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "16090897-69a0-4585-a645-08cac6e9eb20",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 4,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel unmotivated - even for things I normally like",
                      "condition": null,
                      "length": 4,
                      "items": [
                        {
                          "value": 1,
                          "title": "Mild"
                        },
                        {
                          "value": 2,
                          "title": "Moderate"
                        },
                        {
                          "value": 3,
                          "title": "Strong "
                        },
                        {
                          "value": 4,
                          "title": "Overwhelming"
                        }
                      ]
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "edfc90e6-fd19-4c7f-b3fd-9e6d45949d16",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "edfc90e6-fd19-4c7f-b3fd-9e6d45949d16",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 5,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel irritable/frustrated - even the little things can get to me",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "39844313-33ba-4c64-b940-9b99f7494c7c",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "39844313-33ba-4c64-b940-9b99f7494c7c",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 7,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel anxious - worried about things",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "c7f36386-6cb3-4b2e-a9a4-238bab68cda2",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "c7f36386-6cb3-4b2e-a9a4-238bab68cda2",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 8,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel not as quick, clear or confident in my thinking",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "f2d5cbb5-1608-4a0a-8063-2cc2ab3adc00",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "f2d5cbb5-1608-4a0a-8063-2cc2ab3adc00",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 10,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel stress/conflict in relationships at work",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "44c79e46-69f1-408a-b5cf-1f002ac427c8",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "44c79e46-69f1-408a-b5cf-1f002ac427c8",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 11,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel stress/conflict in relationships at home or with friends (NOT work related)",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "241c0c15-cd06-45a4-8500-816e1c1b4c24",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "241c0c15-cd06-45a4-8500-816e1c1b4c24",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 13,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel distressed - find myself getting upset, feeling emotional",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "9facf5ab-0201-46cc-8c3f-a55f3539a585",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "9facf5ab-0201-46cc-8c3f-a55f3539a585",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 14,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel angry/reactive - even little things set me off",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "760eea48-beef-41ca-860a-d44ce8e0351e",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "760eea48-beef-41ca-860a-d44ce8e0351e",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 16,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel panicky and/or experience panic attacks",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "9f4974e5-8a7f-4df9-86ba-3abbf921ffc8",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "9f4974e5-8a7f-4df9-86ba-3abbf921ffc8",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 17,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I don’t like my life at times",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "5930c6b1-7e79-4933-959b-4289ade09bae",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "5930c6b1-7e79-4933-959b-4289ade09bae",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 19,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel a bit lost",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "0efd9705-f5fc-48a4-ab9e-46f0824500ef",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "0efd9705-f5fc-48a4-ab9e-46f0824500ef",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": null,
                      "sequence": 20,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel numb/empty",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  }
                ]
              }, {
                "sectionNo": 3,
                "subsectionNo": 3,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "bf174e67-131a-41ca-bccd-88efb0f54b55",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "bf174e67-131a-41ca-bccd-88efb0f54b55",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 0,
                      "sequence": 2,
                      "subsectionNo": null,
                      "type": "SectionPart",
                      "useText": false,
                      "title": "Energy Level",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "e569d57c-59e8-42a1-9efa-ceddfae5d447",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "e569d57c-59e8-42a1-9efa-ceddfae5d447",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 0,
                      "sequence": 3,
                      "subsectionNo": null,
                      "type": "Scale",
                      "useText": false,
                      "title": "Rate your current energy level",
                      "condition": null,
                      "length": 5,
                      "items": [
                        {
                          "value": 1,
                          "title": "Totally Burnt Out"
                        },
                        {
                          "value": 3,
                          "title": "Very low on energy"
                        },
                        {
                          "value": 4,
                          "title": "Moderately low on energy"
                        },
                        {
                          "value": 5,
                          "title": "Moderately up on energy"
                        },
                        {
                          "value": 7,
                          "title": "Totally energised"
                        }
                      ]
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "922757c2-95f2-4d7b-93df-7eba14c95c2f",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "922757c2-95f2-4d7b-93df-7eba14c95c2f",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 0,
                      "sequence": 4,
                      "subsectionNo": null,
                      "type": "Scale",
                      "useText": false,
                      "title": "How often have you been experiencing this level of energy?",
                      "condition": null,
                      "length": 5,
                      "items": [
                        {
                          "value": 1,
                          "title": "few days per year"
                        },
                        {
                          "value": 2,
                          "title": "1-3 days/month"
                        },
                        {
                          "value": 3,
                          "title": "1-3 days/week"
                        },
                        {
                          "value": 4,
                          "title": "4-5 days/week"
                        },
                        {
                          "value": 5,
                          "title": "Daily"
                        }
                      ]
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "5880b643-ebc1-423b-ba44-6ad31e97956c",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "5880b643-ebc1-423b-ba44-6ad31e97956c",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 0,
                      "sequence": 5,
                      "subsectionNo": null,
                      "type": "Scale",
                      "useText": false,
                      "title": "Since when have you been experiencing this level of energy?",
                      "condition": null,
                      "length": 5,
                      "items": [
                        {
                          "value": 1,
                          "title": "1-5 days"
                        },
                        {
                          "value": 2,
                          "title": "1-3 weeks"
                        },
                        {
                          "value": 3,
                          "title": "3 weeks to 3 months"
                        },
                        {
                          "value": 4,
                          "title": "3-12 months"
                        },
                        {
                          "value": 5,
                          "title": "more than 12 months"
                        }
                      ]
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "233625a0-f674-428c-803c-734a5faebe8e",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "233625a0-f674-428c-803c-734a5faebe8e",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 0,
                      "sequence": 6,
                      "subsectionNo": null,
                      "type": "TextArea",
                      "useText": true,
                      "title": "Any Comments on current energy level?",
                      "condition": null,
                      "length": 250,
                      "items": []
                    }
                  }
                ]
              },
              {
                "sectionNo": 4,
                "subsectionNo": 4,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "da46250c-eeee-42e0-83ce-2f46f1625960",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "da46250c-eeee-42e0-83ce-2f46f1625960",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 1,
                      "subsectionNo": null,
                      "type": "SectionPart",
                      "useText": false,
                      "title": "Mental/Emotional Symptoms of Energy Imbalance",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "23b6fbf6-cc65-484e-a723-513a7c7dc0fd",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "23b6fbf6-cc65-484e-a723-513a7c7dc0fd",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 1,
                      "subsectionNo": null,
                      "type": "SectionPart",
                      "useText": false,
                      "title": "Mental/Emotional Symptoms of Energy Imbalance",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "939ec052-7c5f-4861-9516-c559f4b7c4f9",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "939ec052-7c5f-4861-9516-c559f4b7c4f9",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 1,
                      "subsectionNo": null,
                      "type": "SectionPart",
                      "useText": false,
                      "title": "Mental/Emotional Symptoms of Energy Imbalance",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "8676278e-5d78-4a28-a3b9-c78936184531",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "8676278e-5d78-4a28-a3b9-c78936184531",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 1,
                      "subsectionNo": null,
                      "type": "SectionPart",
                      "useText": false,
                      "title": "Mental/Emotional Symptoms of Energy Imbalance",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  }
                ]
              },
              {
                "sectionNo": 5,
                "subsectionNo": 5,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "0689c265-a46a-4e92-a117-c327f6ac75b4",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "0689c265-a46a-4e92-a117-c327f6ac75b4",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 2,
                      "subsectionNo": 0,
                      "type": "Instruction",
                      "useText": false,
                      "title": "A. Applicable statements",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "71793657-1541-45c4-b47b-89c49a62a9a6",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "71793657-1541-45c4-b47b-89c49a62a9a6",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 3,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "Still tick YES, even if only SOMETIMES and only SOMEWHAT applicable",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "394849ae-9673-4793-bae3-33e80caadebc",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "394849ae-9673-4793-bae3-33e80caadebc",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 4,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel unmotivated - even for things I normally like",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "93451fb6-6933-4854-955b-4b19d99f22cd",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "93451fb6-6933-4854-955b-4b19d99f22cd",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 5,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel irritable/frustrated - even the little things can get to me",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "20d90598-8d55-4740-87b1-afbcdf934287",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "20d90598-8d55-4740-87b1-afbcdf934287",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 6,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel flat - mentally and emotionally tired",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "19e640e7-2e67-4a3f-8b33-fd13935c872b",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "19e640e7-2e67-4a3f-8b33-fd13935c872b",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 7,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel anxious - worried about things",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "73b4e06a-2067-4555-88b3-35f521ee8bf7",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "73b4e06a-2067-4555-88b3-35f521ee8bf7",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 8,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel not as quick, clear or confident in my thinking",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "463f13b3-aa6f-4ea5-b8e1-a887f7e3eaf6",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "463f13b3-aa6f-4ea5-b8e1-a887f7e3eaf6",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 9,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel like I never have enough time to get anything done properly",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "e33c489c-a6b9-4851-bb01-216c5c5d0a9d",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "e33c489c-a6b9-4851-bb01-216c5c5d0a9d",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 10,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel stress/conflict in relationships at work",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "2014a30a-0381-49e4-8f9d-f0c784a702ec",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "2014a30a-0381-49e4-8f9d-f0c784a702ec",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 11,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel stress/conflict in relationships at home or with friends (NOT work related)",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "de007f72-b341-479c-a82c-3121a8640b00",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "de007f72-b341-479c-a82c-3121a8640b00",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 12,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel overwhelmed - like I have too many demands to handle",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "4aa43418-a5da-41e7-862f-5985bb3d4807",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "4aa43418-a5da-41e7-862f-5985bb3d4807",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 13,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel distressed - find myself getting upset, feeling emotional",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "522ea937-8ad6-4e50-b4e6-c870c39ab5b3",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "522ea937-8ad6-4e50-b4e6-c870c39ab5b3",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 14,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel angry/reactive - even little things set me off",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "5402353d-7e13-4d00-9521-3d7f7e7aa8f4",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "5402353d-7e13-4d00-9521-3d7f7e7aa8f4",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 15,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel depressed, down, or unhappy",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "e3cd3fdc-5a9b-432e-8104-5ba00439a6d9",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "e3cd3fdc-5a9b-432e-8104-5ba00439a6d9",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 16,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel panicky and/or experience panic attacks",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "550cfdb7-080a-47a2-868d-d32705d5228e",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "550cfdb7-080a-47a2-868d-d32705d5228e",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 17,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I don’t like my life at times",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "e14f20aa-1d36-40c1-a03f-3a56bac2f82f",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "e14f20aa-1d36-40c1-a03f-3a56bac2f82f",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 18,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I have repetitive negative thoughts and feelings about myself",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "0f1ccab0-2a99-4f7d-b6f5-74c58f100d20",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "0f1ccab0-2a99-4f7d-b6f5-74c58f100d20",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 19,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel a bit lost",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "7d5d7478-a8f6-4e0c-bfa1-0f07efd1885e",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "7d5d7478-a8f6-4e0c-bfa1-0f07efd1885e",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 20,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel numb/empty",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "95c9292c-209f-4704-b63f-67360be2ced3",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "95c9292c-209f-4704-b63f-67360be2ced3",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 21,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel like giving up - my life is not really worth the effort",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  }
                ]
              }
            ],
            "items": []
          },
          {
            "articleSubheading": "Mental & Emotional",
            "sectionNo": 2,
            "subsectionNo": 2,
            "vertical": [
              {
                "sectionNo": 1,
                "subsectionNo": 1,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "ebfee462-668e-4379-ae08-eedb59984c31",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "ebfee462-668e-4379-ae08-eedb59984c31",
                      "article": "Symptom",
                      "articleSubheading": 0,
                      "sectionNo": 0,
                      "sequence": 8,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I work outside scheduled work hours (after hours, weekends)",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  }
                ]
              },
              {
                "sectionNo": 2,
                "subsectionNo": 2,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "38141d69-7349-4c2c-8ab5-71edada30eff",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "38141d69-7349-4c2c-8ab5-71edada30eff",
                      "article": "Symptom",
                      "articleSubheading": 0,
                      "sectionNo": 1,
                      "sequence": 7,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "physical exertion in career/work",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  }
                ]
              },
              {
                "sectionNo": 3,
                "subsectionNo": 3,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "043510c0-f11e-4d51-8a11-032f3d9b074a",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "043510c0-f11e-4d51-8a11-032f3d9b074a",
                      "article": "Symptom",
                      "articleSubheading": 0,
                      "sectionNo": 2,
                      "sequence": 7,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I experience energy demands from relationship/interactions with partner/spouse",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  }
                ]
              }
            ],
            "items": []
          },
          {
            "articleSubheading": "Physical",
            "sectionNo": 3,
            "subsectionNo": 3,
            "vertical": [
              {
                "sectionNo": 1,
                "subsectionNo": 1,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "d5915ea1-35b6-4e20-88e6-b9984c3bffc8",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "d5915ea1-35b6-4e20-88e6-b9984c3bffc8",
                      "article": "Symptom",
                      "articleSubheading": 1,
                      "sectionNo": 0,
                      "sequence": 8,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I listen to relaxing music during the day",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  }
                ]
              },
              {
                "sectionNo": 2,
                "subsectionNo": 2,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "8038c889-1323-4b73-90b3-37cbf11f1280",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "8038c889-1323-4b73-90b3-37cbf11f1280",
                      "article": "Symptom",
                      "articleSubheading": 1,
                      "sectionNo": 1,
                      "sequence": 7,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I practice progressive muscle relaxation or other breathing/relaxation techniques",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  }
                ]
              },
              {
                "sectionNo": 3,
                "subsectionNo": 3,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "bfff3f5a-d40b-4e69-8534-131e38b4bf1c",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "bfff3f5a-d40b-4e69-8534-131e38b4bf1c",
                      "article": "Symptom",
                      "articleSubheading": 1,
                      "sectionNo": 2,
                      "sequence": 7,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I have positive, energising catch ups with a close friend",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  }
                ]
              },
              {
                "sectionNo": 4,
                "subsectionNo": 4,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "0971e8f3-5dc9-490a-bd1b-472f9add5ca3",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "0971e8f3-5dc9-490a-bd1b-472f9add5ca3",
                      "article": "Symptom",
                      "articleSubheading": 1,
                      "sectionNo": 3,
                      "sequence": 7,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I get outside as soon as there is a good weather day, following a run of poor weather cycles",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  }
                ]
              },
              {
                "sectionNo": 5,
                "subsectionNo": 5,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "61704d82-285b-4f17-9d84-924ae0d6a0cd",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "61704d82-285b-4f17-9d84-924ae0d6a0cd",
                      "article": "Symptom",
                      "articleSubheading": 1,
                      "sectionNo": 4,
                      "sequence": 7,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "If I struggle to fall asleep, I write out my concerns or worries and give myself permission to let go of them for the night",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  }
                ]
              }
            ],
            "items": []
          }
        ]
      },
      answers: []
    }
  },
  filters: {
    decNum(amount) {
      const amt = Number(amount)
      return amt && amt.toFixed(2) || '0.00';
      //return amt && amt.toLocaleString(undefined, {maximumFractionDigits:3}) || '0'
    }  
  },
  computed: {
    ...mapGetters("app", {
      getAnswersData: "getSymptomAnswersData"
    }),
  },
  methods: {
    ...mapActions("app", {
      _getQuestionsAnswers: "getAnswersData",
    }),
    compId(type, id) {
      return "comp"+type+id;
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
    nextVerticalStep(verticalNo, horizontalNo, verticalMaxSteps, horizontalMaxSteps) {
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
  watch: {
    getAnswersData(newprops, oldprops) {
    }
  },
  mounted() {
    if (window.innerWidth < 500 && window.innerWidth > 0) this.isMobile = true;
    else this.isMobile = false;
    let params = {
      params: '?Article=Symptom',
      article: "symptom"
    }

    this._getQuestionsAnswers(params)
      .then(data => {
        this.questions = data;
        console.log(this.questions);
      });
  }

  
}
</script>

<style lang="stylus" scoped>
>>>.v-stepper__content
  padding 0
  margin-right 0
</style>
