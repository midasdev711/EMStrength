<template>
  <v-container grid-list-xl>
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
                <v-stepper-step editable v-bind:step="stepl.sectionNo">
                  {{stepl.subsectionNo}}
                </v-stepper-step>

                <v-stepper-content v-bind:step="stepl.sectionNo">
                  <v-card class="mb-5">
                    Hi there {{stepl.subsectionNo}}
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
        "horizontal": [
          {
            "articleSubheading": "Energy",
            "sectionNo": 1,
            "subsectionNo": 1,
            "vertical": [
              {
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
              },
              {
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
              },
              {
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
              },
              {
                "sectionNo": 6,
                "subsectionNo": 6,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "c77c2d7c-4100-4b88-9ca8-091a33945814",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "c77c2d7c-4100-4b88-9ca8-091a33945814",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 2,
                      "subsectionNo": 1,
                      "type": "Instruction",
                      "useText": false,
                      "title": "B. Intensity of Symptoms",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "50b6abf8-5984-4920-9aa6-8d6e62223dec",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "50b6abf8-5984-4920-9aa6-8d6e62223dec",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 3,
                      "subsectionNo": 1,
                      "type": "Bool",
                      "useText": false,
                      "title": "With what level of intensity do you experience each symptom?",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "d5967083-6af9-406f-b1e5-8cc157c130f1",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "d5967083-6af9-406f-b1e5-8cc157c130f1",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 6,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel flat - mentally and emotionally tired",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "b096e5ab-1336-4565-9c59-1d8137c50ceb",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "b096e5ab-1336-4565-9c59-1d8137c50ceb",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 9,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel like I never have enough time to get anything done properly",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "c6bbf0a5-0d6b-4346-96d5-9dedecdaa655",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "c6bbf0a5-0d6b-4346-96d5-9dedecdaa655",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 12,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel overwhelmed - like I have too many demands to handle",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "77fd5fea-1546-462c-a494-315ff4f21b97",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "77fd5fea-1546-462c-a494-315ff4f21b97",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 15,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel depressed, down, or unhappy",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "92564b8b-95b4-41d1-bb04-ac0ec4d140a8",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "92564b8b-95b4-41d1-bb04-ac0ec4d140a8",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 18,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I have repetitive negative thoughts and feelings about myself",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "591991e0-863f-4b5b-81ce-09ba03a311f8",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "591991e0-863f-4b5b-81ce-09ba03a311f8",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 21,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel like giving up - my life is not really worth the effort",
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
                  }
                ]
              },
              {
                "sectionNo": 7,
                "subsectionNo": 7,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "540bedcb-7d8b-4688-b62d-1d7fb5c9e447",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "540bedcb-7d8b-4688-b62d-1d7fb5c9e447",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 2,
                      "subsectionNo": 2,
                      "type": "Instruction",
                      "useText": false,
                      "title": "C. Frequency of Symptoms",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "005368b9-4978-4dd9-b4d1-674d42e68c89",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "005368b9-4978-4dd9-b4d1-674d42e68c89",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 3,
                      "subsectionNo": 2,
                      "type": "Bool",
                      "useText": false,
                      "title": "How often do you experience each symptom?",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "3b21dda5-9779-4af7-a7a4-e7ad3bd0f210",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "3b21dda5-9779-4af7-a7a4-e7ad3bd0f210",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 4,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel unmotivated - even for things I normally like",
                      "condition": null,
                      "length": 4,
                      "items": [
                        {
                          "value": 1,
                          "title": "1-3 days/month"
                        },
                        {
                          "value": 2,
                          "title": "1-3 days/week"
                        },
                        {
                          "value": 3,
                          "title": "4-5 days/week"
                        },
                        {
                          "value": 4,
                          "title": "Daily"
                        }
                      ]
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "cfd95e83-f951-4b71-addd-875acbc62ca7",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "cfd95e83-f951-4b71-addd-875acbc62ca7",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 5,
                      "subsectionNo": 2,
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
                    "questionId": "62963e5f-f989-448d-8291-6b529353bcad",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "62963e5f-f989-448d-8291-6b529353bcad",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 6,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel flat - mentally and emotionally tired",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "6fb06411-ee51-4e0b-812a-c7e96bff21df",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "6fb06411-ee51-4e0b-812a-c7e96bff21df",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 7,
                      "subsectionNo": 2,
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
                    "questionId": "1248fc81-bce3-47ba-a80b-7cd53c3085e4",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "1248fc81-bce3-47ba-a80b-7cd53c3085e4",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 8,
                      "subsectionNo": 2,
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
                    "questionId": "e3aafbdf-ccc0-4a2d-9150-42b837f11218",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "e3aafbdf-ccc0-4a2d-9150-42b837f11218",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 9,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel like I never have enough time to get anything done properly",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "25c046d5-ea61-45d4-bb13-1d5ac605515a",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "25c046d5-ea61-45d4-bb13-1d5ac605515a",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 10,
                      "subsectionNo": 2,
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
                    "questionId": "b8dd51b4-a374-486e-8413-28840726f724",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "b8dd51b4-a374-486e-8413-28840726f724",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 11,
                      "subsectionNo": 2,
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
                    "questionId": "7c44cb51-3a6d-4d72-b0d0-00fa0ea7708e",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "7c44cb51-3a6d-4d72-b0d0-00fa0ea7708e",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 12,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel overwhelmed - like I have too many demands to handle",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "bb2c99dc-f788-4cbe-ac0c-0e5762cf40e2",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "bb2c99dc-f788-4cbe-ac0c-0e5762cf40e2",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 13,
                      "subsectionNo": 2,
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
                    "questionId": "62fb69e2-10fe-43ac-a7fa-f91471dbd757",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "62fb69e2-10fe-43ac-a7fa-f91471dbd757",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 14,
                      "subsectionNo": 2,
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
                    "questionId": "696b9a2f-b2d7-468c-94b1-530891965670",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "696b9a2f-b2d7-468c-94b1-530891965670",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 15,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel depressed, down, or unhappy",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "9394c75d-9aa7-4f65-a400-d25239abf934",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "9394c75d-9aa7-4f65-a400-d25239abf934",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 16,
                      "subsectionNo": 2,
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
                    "questionId": "b4f341af-f8c2-4289-a4aa-8261182934bb",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "b4f341af-f8c2-4289-a4aa-8261182934bb",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 17,
                      "subsectionNo": 2,
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
                    "questionId": "8b59fc28-9752-4fb1-ad61-332fe0958dca",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "8b59fc28-9752-4fb1-ad61-332fe0958dca",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 18,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I have repetitive negative thoughts and feelings about myself",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "3a921b9e-05b5-4c35-95d9-b106f6a10c17",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "3a921b9e-05b5-4c35-95d9-b106f6a10c17",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 19,
                      "subsectionNo": 2,
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
                    "questionId": "147d23bc-d9fe-4e9d-b45d-5005dd04c6b6",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "147d23bc-d9fe-4e9d-b45d-5005dd04c6b6",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 20,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel numb/empty",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "0d4b62b4-a348-4a6f-a95f-12e1a1216554",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "0d4b62b4-a348-4a6f-a95f-12e1a1216554",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 21,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel like giving up - my life is not really worth the effort",
                      "condition": null,
                      "length": 4,
                      "items": [
                        {
                          "value": 1,
                          "title": "1-3 days/month"
                        },
                        {
                          "value": 2,
                          "title": "1-3 days/week"
                        },
                        {
                          "value": 3,
                          "title": "4-5 days/week"
                        },
                        {
                          "value": 4,
                          "title": "Daily"
                        }
                      ]
                    }
                  }
                ]
              },
              {
                "sectionNo": 8,
                "subsectionNo": 8,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "e52a66d4-fdb0-43d1-a310-2da3ce6f7275",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "e52a66d4-fdb0-43d1-a310-2da3ce6f7275",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 2,
                      "subsectionNo": 3,
                      "type": "Instruction",
                      "useText": false,
                      "title": "C. Timeframe of Symptoms",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "3329a230-3228-4492-8b34-b34110a979ff",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "3329a230-3228-4492-8b34-b34110a979ff",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 3,
                      "subsectionNo": 3,
                      "type": "Bool",
                      "useText": false,
                      "title": "Since when have you experienced each symptom?",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "1a784322-bdf8-46b3-bf9c-15726f4ef936",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "1a784322-bdf8-46b3-bf9c-15726f4ef936",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 4,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel unmotivated - even for things I normally like",
                      "condition": null,
                      "length": 5,
                      "items": [
                        {
                          "value": 1,
                          "title": "1-3 weeks"
                        },
                        {
                          "value": 2,
                          "title": "3 weeks to 3 months"
                        },
                        {
                          "value": 3,
                          "title": "3-12 months"
                        },
                        {
                          "value": 3,
                          "title": "multiple years"
                        },
                        {
                          "value": 3,
                          "title": "most of my life"
                        }
                      ]
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "015e69a5-19e9-45eb-a094-8dc35a76b761",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "015e69a5-19e9-45eb-a094-8dc35a76b761",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 5,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel irritable/frustrated - even the little things can get to me",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "56dabc5c-a248-48e0-b3ba-ff36d07aceb2",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "56dabc5c-a248-48e0-b3ba-ff36d07aceb2",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 6,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel flat - mentally and emotionally tired",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "7bf64217-d9ac-4efb-860b-f9a0417931f0",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "7bf64217-d9ac-4efb-860b-f9a0417931f0",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 7,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel anxious - worried about things",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "7ccd7697-5a25-4096-a965-c1ad1a7d06a3",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "7ccd7697-5a25-4096-a965-c1ad1a7d06a3",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 8,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel not as quick, clear or confident in my thinking",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "44ecc1ca-0f60-44d2-a60e-9d064498296f",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "44ecc1ca-0f60-44d2-a60e-9d064498296f",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 9,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel like I never have enough time to get anything done properly",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "43c8ae0e-3137-4fca-aeea-4da434e99505",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "43c8ae0e-3137-4fca-aeea-4da434e99505",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 10,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel stress/conflict in relationships at work",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "3fce1de7-bcb8-49c8-b87e-17779420eaa1",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "3fce1de7-bcb8-49c8-b87e-17779420eaa1",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 11,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel stress/conflict in relationships at home or with friends (NOT work related)",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "43b8833a-e0c5-459a-bc90-a12e2f4c444f",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "43b8833a-e0c5-459a-bc90-a12e2f4c444f",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 12,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel overwhelmed - like I have too many demands to handle",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "e58bb9bb-ce89-4687-aa0f-66da199f9b0e",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "e58bb9bb-ce89-4687-aa0f-66da199f9b0e",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 13,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel distressed - find myself getting upset, feeling emotional",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "8c245062-e8f9-49e4-8b08-890eab36d8c2",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "8c245062-e8f9-49e4-8b08-890eab36d8c2",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 14,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel angry/reactive - even little things set me off",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "1084514c-95a8-4c98-8a0b-beb05e8698b9",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "1084514c-95a8-4c98-8a0b-beb05e8698b9",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 15,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel depressed, down, or unhappy",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "07888850-8aa6-433a-b691-b5569706ecd6",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "07888850-8aa6-433a-b691-b5569706ecd6",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 16,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel panicky and/or experience panic attacks",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "0fb7e6b2-3959-4eb9-88c8-0de25a591f0d",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "0fb7e6b2-3959-4eb9-88c8-0de25a591f0d",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 17,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I don’t like my life at times",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "0d1b09b7-af39-494e-a9d8-dc248483e5f2",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "0d1b09b7-af39-494e-a9d8-dc248483e5f2",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 18,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I have repetitive negative thoughts and feelings about myself",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "88565535-d5cb-439b-9f6c-d4acfabf50ca",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "88565535-d5cb-439b-9f6c-d4acfabf50ca",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 19,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel a bit lost",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "a3ae39c0-c72b-41e4-b879-0fb98f91eec6",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "a3ae39c0-c72b-41e4-b879-0fb98f91eec6",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 20,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel numb/empty",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "4b10efcc-e99e-4c67-b6df-c98022b09638",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "4b10efcc-e99e-4c67-b6df-c98022b09638",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 21,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel like giving up - my life is not really worth the effort",
                      "condition": null,
                      "length": 5,
                      "items": [
                        {
                          "value": 1,
                          "title": "1-3 weeks"
                        },
                        {
                          "value": 2,
                          "title": "3 weeks to 3 months"
                        },
                        {
                          "value": 3,
                          "title": "most of my life"
                        },
                        {
                          "value": 3,
                          "title": "multiple years"
                        },
                        {
                          "value": 3,
                          "title": "3-12 months"
                        }
                      ]
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "d461a668-086f-4441-a358-477f7c04a1fa",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "d461a668-086f-4441-a358-477f7c04a1fa",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 1,
                      "sequence": 22,
                      "subsectionNo": 3,
                      "type": "TextArea",
                      "useText": true,
                      "title": "Any comments on Mental/Emotional symptoms of energy imbalance?",
                      "condition": null,
                      "length": 250,
                      "items": []
                    }
                  }
                ]
              },
              {
                "sectionNo": 9,
                "subsectionNo": 9,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "000891a5-096c-42e4-b9c5-08a7bfa87000",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "000891a5-096c-42e4-b9c5-08a7bfa87000",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 1,
                      "subsectionNo": null,
                      "type": "SectionPart",
                      "useText": false,
                      "title": "Physical Symptoms of Energy Imbalance",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "af10184e-0403-4f01-a41c-4e01fc18c72a",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "af10184e-0403-4f01-a41c-4e01fc18c72a",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 1,
                      "subsectionNo": null,
                      "type": "SectionPart",
                      "useText": false,
                      "title": "Physical Symptoms of Energy Imbalance",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "1d17e2c4-2515-4533-9f15-9a3b0a2a7c6b",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "1d17e2c4-2515-4533-9f15-9a3b0a2a7c6b",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 1,
                      "subsectionNo": null,
                      "type": "SectionPart",
                      "useText": false,
                      "title": "Physical Symptoms of Energy Imbalance",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "a4e9e649-2695-4dd2-a632-fa45aba19c9e",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "a4e9e649-2695-4dd2-a632-fa45aba19c9e",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 1,
                      "subsectionNo": null,
                      "type": "SectionPart",
                      "useText": false,
                      "title": "Physical Symptoms of Energy Imbalance",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  }
                ]
              },
              {
                "sectionNo": 10,
                "subsectionNo": 10,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "91780eb5-59dd-4d22-bcb0-9a06c158c902",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "91780eb5-59dd-4d22-bcb0-9a06c158c902",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
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
                    "questionId": "1604a7bc-9d5f-4fcd-a57a-884a8155b4e2",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "1604a7bc-9d5f-4fcd-a57a-884a8155b4e2",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
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
                    "questionId": "cd3be71f-6110-4c2d-8255-87b617a57e32",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "cd3be71f-6110-4c2d-8255-87b617a57e32",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 4,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel physically tired; I don't have the energy to exert myself",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "e5fa663e-17c2-49cf-9c0e-9c3825597de8",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "e5fa663e-17c2-49cf-9c0e-9c3825597de8",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 5,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel nauseous/sick in my stomach",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "6a9123b1-a05d-406d-885c-db52765d9d5c",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "6a9123b1-a05d-406d-885c-db52765d9d5c",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 6,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I have a racing pulse/elevated heart-rate",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "ffe2afcd-3674-42c1-8b79-53c57c8101e0",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "ffe2afcd-3674-42c1-8b79-53c57c8101e0",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 7,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I experience headaches",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "e8846970-2a5b-480e-ad3f-d1ccf62f7478",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "e8846970-2a5b-480e-ad3f-d1ccf62f7478",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 8,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel tightness in my chest or throat",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "64917729-6311-4e5c-ad78-52ed6e14e0bb",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "64917729-6311-4e5c-ad78-52ed6e14e0bb",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 9,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I am experiencing muscle soreness/aches",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "d10c2e94-00d8-494f-b991-dc1e5c36299a",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "d10c2e94-00d8-494f-b991-dc1e5c36299a",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 10,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I experience dizziness or being light headed",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "2b1c9fb7-3424-45e4-8c06-e05518bc92a1",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "2b1c9fb7-3424-45e4-8c06-e05518bc92a1",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 11,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I have one or more chronic injuries (ongoing for more than 3 months)",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "70ba1574-2eaf-4b19-83f4-31579ce8747e",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "70ba1574-2eaf-4b19-83f4-31579ce8747e",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 12,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I have one or more chronic illnesses/conditions (ongoing for more than 3 months)",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "4c64b939-9ea6-4b46-95b1-eec37a6432e6",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "4c64b939-9ea6-4b46-95b1-eec37a6432e6",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 13,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I am experiencing acute injury (less than 3 months)",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "f7f76956-e527-4177-a649-54cc9ddd4d60",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "f7f76956-e527-4177-a649-54cc9ddd4d60",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 14,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I am experiencing acute illnesses (colds, flu, etc - less than 3 months)",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "620914af-0e01-4d5d-bdc6-291f9422d77c",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "620914af-0e01-4d5d-bdc6-291f9422d77c",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 15,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I am not getting enough sleep",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "40c97ce9-a92e-4838-9205-40a44c283ef3",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "40c97ce9-a92e-4838-9205-40a44c283ef3",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 16,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I have trouble falling asleep",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "db3754ce-9f2e-45ec-a779-99fbb6657f23",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "db3754ce-9f2e-45ec-a779-99fbb6657f23",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 17,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "my sleep quality is not great (restless, wake up during the night)",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "dccb4a5a-e38f-4231-89ff-ad7ab132df92",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "dccb4a5a-e38f-4231-89ff-ad7ab132df92",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 18,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "my performance has dropped",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "d27e6d5b-6ca5-495c-90af-58036625ae03",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "d27e6d5b-6ca5-495c-90af-58036625ae03",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 19,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel that I am under-performing according to my potential",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "440e8bdc-4283-4797-a3fc-b0533560783e",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "440e8bdc-4283-4797-a3fc-b0533560783e",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 20,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "other people would notice that I am under-performing",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "3db94a3d-5e50-4b98-ae8a-c9bc7845317b",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "3db94a3d-5e50-4b98-ae8a-c9bc7845317b",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 21,
                      "subsectionNo": 0,
                      "type": "Bool",
                      "useText": false,
                      "title": "I feel I need to eat constantly to keep my energy up",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  }
                ]
              },
              {
                "sectionNo": 11,
                "subsectionNo": 12,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "e20c0e2c-8ed9-4d65-bb5f-ba703c8e524a",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "e20c0e2c-8ed9-4d65-bb5f-ba703c8e524a",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 2,
                      "subsectionNo": 1,
                      "type": "Instruction",
                      "useText": false,
                      "title": "B. Intensity of Symptoms",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "37ef8a3d-c7cf-4b0c-8eab-199ca2916e43",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "37ef8a3d-c7cf-4b0c-8eab-199ca2916e43",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 3,
                      "subsectionNo": 1,
                      "type": "Bool",
                      "useText": false,
                      "title": "With what level of intensity do you experience each symptom?",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "86560d15-2ce5-48d0-afc5-9b45320c7df5",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "86560d15-2ce5-48d0-afc5-9b45320c7df5",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 4,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel physically tired; I don't have the energy to exert myself",
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
                    "questionId": "014c993c-eee4-45b9-9ee1-645c48113498",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "014c993c-eee4-45b9-9ee1-645c48113498",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 5,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel nauseous/sick in my stomach",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "c6458715-879a-4494-b065-07449b522b56",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "c6458715-879a-4494-b065-07449b522b56",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 6,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I have a racing pulse/elevated heart-rate",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "f4ec45aa-6321-4ed5-94e0-53bcf9dedd41",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "f4ec45aa-6321-4ed5-94e0-53bcf9dedd41",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 7,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I experience headaches",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "d6095b97-b451-43de-b9cb-e29e8805eb0c",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "d6095b97-b451-43de-b9cb-e29e8805eb0c",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 8,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel tightness in my chest or throat",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "10ad6d51-389a-44e3-a1bb-b939a01aaf41",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "10ad6d51-389a-44e3-a1bb-b939a01aaf41",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 9,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I am experiencing muscle soreness/aches",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "60c71cd9-2f36-467f-884c-39d5675f670c",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "60c71cd9-2f36-467f-884c-39d5675f670c",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 10,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I experience dizziness or being light headed",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "d15fecdc-4f09-4526-a74e-cf84de628ae2",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "d15fecdc-4f09-4526-a74e-cf84de628ae2",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 11,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I have one or more chronic injuries (ongoing for more than 3 months)",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "1b93e1ca-b5ce-45eb-b9a2-cc593583a1e7",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "1b93e1ca-b5ce-45eb-b9a2-cc593583a1e7",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 12,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I have one or more chronic illnesses/conditions (ongoing for more than 3 months)",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "3ae7bd78-5ef9-48da-a6f6-3af795f4479d",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "3ae7bd78-5ef9-48da-a6f6-3af795f4479d",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 13,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I am experiencing acute injury (less than 3 months)",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "124a7d53-84a4-4c05-9ba1-e6a9dd322cce",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "124a7d53-84a4-4c05-9ba1-e6a9dd322cce",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 14,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I am experiencing acute illnesses (colds, flu, etc - less than 3 months)",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "37a03af0-9b59-458f-b867-23a6a95c4733",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "37a03af0-9b59-458f-b867-23a6a95c4733",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 15,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I am not getting enough sleep",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "7358fd11-195f-4265-bc54-7f37792298e5",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "7358fd11-195f-4265-bc54-7f37792298e5",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 16,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I have trouble falling asleep",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "f9567dc3-c667-433b-9782-682cc49c1cd9",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "f9567dc3-c667-433b-9782-682cc49c1cd9",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 17,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "my sleep quality is not great (restless, wake up during the night)",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "a57da3f7-f703-4509-82c4-b45106ecf5aa",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "a57da3f7-f703-4509-82c4-b45106ecf5aa",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 18,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "my performance has dropped",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "25a96730-2199-4a30-af0c-7b1cfd514e1b",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "25a96730-2199-4a30-af0c-7b1cfd514e1b",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 19,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel that I am under-performing according to my potential",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "b7cc745d-2372-485a-8a3f-cc5cc25c4652",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "b7cc745d-2372-485a-8a3f-cc5cc25c4652",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 20,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "other people would notice that I am under-performing",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "9d1021d9-301a-480a-ac02-61d49f0bbf92",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "9d1021d9-301a-480a-ac02-61d49f0bbf92",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 21,
                      "subsectionNo": 1,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel I need to eat constantly to keep my energy up",
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
                  }
                ]
              },
              {
                "sectionNo": 13,
                "subsectionNo": 13,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "2d0f84d7-81c8-469e-8f45-9c991ff2bfe0",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "2d0f84d7-81c8-469e-8f45-9c991ff2bfe0",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 2,
                      "subsectionNo": 2,
                      "type": "Instruction",
                      "useText": false,
                      "title": "C. Frequency of Symptoms",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "fe7d88af-1bd3-4b0a-ae72-2ddda3d9b02f",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "fe7d88af-1bd3-4b0a-ae72-2ddda3d9b02f",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 3,
                      "subsectionNo": 2,
                      "type": "Bool",
                      "useText": false,
                      "title": "How often do you experience each symptom?",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "0db63811-a8cc-422b-8457-8218300f1212",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "0db63811-a8cc-422b-8457-8218300f1212",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 4,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel physically tired; I don't have the energy to exert myself",
                      "condition": null,
                      "length": 4,
                      "items": [
                        {
                          "value": 1,
                          "title": "1-3 days/month"
                        },
                        {
                          "value": 2,
                          "title": "1-3 days/week"
                        },
                        {
                          "value": 3,
                          "title": "4-5 days/week"
                        },
                        {
                          "value": 4,
                          "title": "Daily"
                        }
                      ]
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "c5b33665-6691-420c-9f92-8f6fe574080f",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "c5b33665-6691-420c-9f92-8f6fe574080f",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 5,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel nauseous/sick in my stomach",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "ea1b5f36-8577-42ea-ace4-4edcd57d6528",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "ea1b5f36-8577-42ea-ace4-4edcd57d6528",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 6,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I have a racing pulse/elevated heart-rate",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "1fc634eb-2a1c-4800-b579-bbf4b5903944",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "1fc634eb-2a1c-4800-b579-bbf4b5903944",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 7,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I experience headaches",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "f3645ee3-5e8e-4695-96f7-2bf0d7d59fa6",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "f3645ee3-5e8e-4695-96f7-2bf0d7d59fa6",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 8,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel tightness in my chest or throat",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "4fef3a35-33d5-4d26-82a1-ce5dfc91b998",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "4fef3a35-33d5-4d26-82a1-ce5dfc91b998",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 9,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I am experiencing muscle soreness/aches",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "087fedb7-e6d0-40bd-9a3c-df03be18a796",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "087fedb7-e6d0-40bd-9a3c-df03be18a796",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 10,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I experience dizziness or being light headed",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "80649cb6-e3ab-4c16-b7b8-f6272fd136ae",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "80649cb6-e3ab-4c16-b7b8-f6272fd136ae",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 11,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I have one or more chronic injuries (ongoing for more than 3 months)",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "35d6d7da-671f-4f79-b46f-f931da8a7a5f",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "35d6d7da-671f-4f79-b46f-f931da8a7a5f",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 12,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I have one or more chronic illnesses/conditions (ongoing for more than 3 months)",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "1b4612e4-9e68-4bdd-821c-92fb7f79a009",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "1b4612e4-9e68-4bdd-821c-92fb7f79a009",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 13,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I am experiencing acute injury (less than 3 months)",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "07954e74-c89f-4181-a267-3c9a6b4f4c38",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "07954e74-c89f-4181-a267-3c9a6b4f4c38",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 14,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I am experiencing acute illnesses (colds, flu, etc - less than 3 months)",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "0fa2e4fa-c6b4-4768-9311-9aa4eda18350",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "0fa2e4fa-c6b4-4768-9311-9aa4eda18350",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 15,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I am not getting enough sleep",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "83e4a350-cc7a-4ddb-b879-b72f901d6ddf",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "83e4a350-cc7a-4ddb-b879-b72f901d6ddf",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 16,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I have trouble falling asleep",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "a9d1a0e6-f32f-4eae-863a-5ffd19ebb4b4",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "a9d1a0e6-f32f-4eae-863a-5ffd19ebb4b4",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 17,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "my sleep quality is not great (restless, wake up during the night)",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "6526d920-24e0-4e82-9013-67233a5bc150",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "6526d920-24e0-4e82-9013-67233a5bc150",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 18,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "my performance has dropped",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "79cb76e0-a86a-44e1-bbbb-9fb56c30fd65",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "79cb76e0-a86a-44e1-bbbb-9fb56c30fd65",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 19,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel that I am under-performing according to my potential",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "3ad2f7cc-c883-47c1-8982-1c7a55e1cfa8",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "3ad2f7cc-c883-47c1-8982-1c7a55e1cfa8",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 20,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "other people would notice that I am under-performing",
                      "condition": null,
                      "length": 4,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "1ee5bf2a-72cf-4c63-b6d7-e640c4cea9d2",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "1ee5bf2a-72cf-4c63-b6d7-e640c4cea9d2",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 21,
                      "subsectionNo": 2,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel I need to eat constantly to keep my energy up",
                      "condition": null,
                      "length": 4,
                      "items": [
                        {
                          "value": 1,
                          "title": "1-3 days/month"
                        },
                        {
                          "value": 2,
                          "title": "1-3 days/week"
                        },
                        {
                          "value": 3,
                          "title": "4-5 days/week"
                        },
                        {
                          "value": 4,
                          "title": "Daily"
                        }
                      ]
                    }
                  }
                ]
              },
              {
                "sectionNo": 14,
                "subsectionNo": 14,
                "items": [
                  {
                    "answerId": null,
                    "questionId": "5cd15bda-196b-46ac-b05b-d38a98aa918c",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "5cd15bda-196b-46ac-b05b-d38a98aa918c",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 2,
                      "subsectionNo": 3,
                      "type": "Instruction",
                      "useText": false,
                      "title": "C. Timeframe of Symptoms",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "7fefe6b9-f091-47ce-a242-c9154bbbc0ad",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "7fefe6b9-f091-47ce-a242-c9154bbbc0ad",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 3,
                      "subsectionNo": 3,
                      "type": "Bool",
                      "useText": false,
                      "title": "Since when have you experienced each symptom?",
                      "condition": null,
                      "length": null,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "7ead69a6-70bf-43d4-9f7a-da9a28432d73",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "7ead69a6-70bf-43d4-9f7a-da9a28432d73",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 4,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel physically tired; I don't have the energy to exert myself",
                      "condition": null,
                      "length": 5,
                      "items": [
                        {
                          "value": 1,
                          "title": "1-3 weeks"
                        },
                        {
                          "value": 2,
                          "title": "3 weeks to 3 months"
                        },
                        {
                          "value": 3,
                          "title": "most of my life"
                        },
                        {
                          "value": 3,
                          "title": "3-12 months"
                        },
                        {
                          "value": 3,
                          "title": "multiple years"
                        }
                      ]
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "294734f2-2430-4aac-bb55-b749ca1dfd68",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "294734f2-2430-4aac-bb55-b749ca1dfd68",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 5,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel nauseous/sick in my stomach",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "c7136681-1474-4532-bdfd-a30bfab298ff",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "c7136681-1474-4532-bdfd-a30bfab298ff",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 6,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I have a racing pulse/elevated heart-rate",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "b8643bf1-07c0-41be-96da-b815dbc6538a",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "b8643bf1-07c0-41be-96da-b815dbc6538a",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 7,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I experience headaches",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "d25a7bdc-35e0-4c18-bb80-b9462b89fa93",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "d25a7bdc-35e0-4c18-bb80-b9462b89fa93",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 8,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel tightness in my chest or throat",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "97912e10-b629-4f90-929a-41a7cd536229",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "97912e10-b629-4f90-929a-41a7cd536229",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 9,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I am experiencing muscle soreness/aches",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "a6fed60f-20b5-4b40-bbee-391eb4d55f96",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "a6fed60f-20b5-4b40-bbee-391eb4d55f96",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 10,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I experience dizziness or being light headed",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "bfdbe3e1-c3b1-4210-b0c7-934bbc042594",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "bfdbe3e1-c3b1-4210-b0c7-934bbc042594",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 11,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I have one or more chronic injuries (ongoing for more than 3 months)",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "5010fb84-2860-4431-a3fa-c764bfbf91f5",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "5010fb84-2860-4431-a3fa-c764bfbf91f5",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 12,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I have one or more chronic illnesses/conditions (ongoing for more than 3 months)",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "a1ae5037-c45b-4ec3-80ac-ca6ef96df468",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "a1ae5037-c45b-4ec3-80ac-ca6ef96df468",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 13,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I am experiencing acute injury (less than 3 months)",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "8db8cd52-d92d-4a10-959c-69eeee15dbd5",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "8db8cd52-d92d-4a10-959c-69eeee15dbd5",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 14,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I am experiencing acute illnesses (colds, flu, etc - less than 3 months)",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "7f87f40c-f4b7-4191-bd63-bc306df8f540",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "7f87f40c-f4b7-4191-bd63-bc306df8f540",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 15,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I am not getting enough sleep",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "e5c70cb1-54bb-43f1-87e1-165b8f0d8b98",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "e5c70cb1-54bb-43f1-87e1-165b8f0d8b98",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 16,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I have trouble falling asleep",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "6695354a-1b83-4829-9964-88debade3028",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "6695354a-1b83-4829-9964-88debade3028",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 17,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "my sleep quality is not great (restless, wake up during the night)",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "9fedcf11-cb3a-4da2-8849-1c3c9c088f95",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "9fedcf11-cb3a-4da2-8849-1c3c9c088f95",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 18,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "my performance has dropped",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "fc9c3a76-86f8-4914-bb7f-5afcb1019529",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "fc9c3a76-86f8-4914-bb7f-5afcb1019529",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 19,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel that I am under-performing according to my potential",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "a65300d5-9357-42dc-84f5-ee613d7cc173",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "a65300d5-9357-42dc-84f5-ee613d7cc173",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 20,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "other people would notice that I am under-performing",
                      "condition": null,
                      "length": 5,
                      "items": []
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "2b267381-25f5-4147-9e27-be83bd63906c",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "2b267381-25f5-4147-9e27-be83bd63906c",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 21,
                      "subsectionNo": 3,
                      "type": "Scale",
                      "useText": false,
                      "title": "I feel I need to eat constantly to keep my energy up",
                      "condition": null,
                      "length": 5,
                      "items": [
                        {
                          "value": 1,
                          "title": "1-3 weeks"
                        },
                        {
                          "value": 2,
                          "title": "3 weeks to 3 months"
                        },
                        {
                          "value": 3,
                          "title": "3-12 months"
                        },
                        {
                          "value": 3,
                          "title": "most of my life"
                        },
                        {
                          "value": 3,
                          "title": "multiple years"
                        }
                      ]
                    }
                  },
                  {
                    "answerId": null,
                    "questionId": "da8ed153-0c45-4f3c-a705-2ae0e8b21e0b",
                    "value": null,
                    "text": null,
                    "question": {
                      "id": "da8ed153-0c45-4f3c-a705-2ae0e8b21e0b",
                      "article": "Symptom",
                      "articleSubheading": null,
                      "sectionNo": 2,
                      "sequence": 22,
                      "subsectionNo": 3,
                      "type": "TextArea",
                      "useText": true,
                      "title": "Any comments on Physical symptoms of energy imbalance?",
                      "condition": null,
                      "length": 250,
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
        // this.questions = data;
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
