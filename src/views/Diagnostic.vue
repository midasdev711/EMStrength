<template>
  <v-stepper v-model="hStepper">
    <v-stepper-header>

      <v-stepper-step v-for="step in steppers" :key="step.title" :complete="hStepper > step.id" v-bind:step="step.id">{{step.title}}
      </v-stepper-step>

    </v-stepper-header>

    <v-stepper-items v-for="stepp in steppers" :key="stepp.title">
      <v-stepper-content v-bind:step="stepp.id">
        <v-card>
            <v-stepper vertical v-model="vStepper">
                <v-div v-for="stepl in vSteppers" :key="stepl.title" >
                    <v-stepper-step editable :complete="vStepper > stepl.id" v-bind:step="stepl.id">
                        {{stepl.title}}
                    </v-stepper-step>

                    <v-stepper-content v-bind:step="stepl.id">
                        <v-card color="grey lighten-1" class="mb-5" height="600px">
                            Hi there {{stepl.title}}
                            <v-container>
                            <v-row>
                            <v-col cols="12" v-for="q in questions" :key="q.id">
                                <components :is="q.type" :title="q.title" :length="q.length" :value="q.value" :items="q.items"/>
                            </v-col>
                            </v-row>
                            </v-container>
                        </v-card>
                    </v-stepper-content>
                </v-div>
            
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

  import * as components from '../components/questionLayout'

  export default {
    name: "Diagnostic",
    components,
    data: () => ({
        hStepper: 0,
        vStepper: 1,

        steppers: [
            {title: "Step1", id: 1},
            {title: "Step2", id: 2},
            {title: "Step3", id: 3}
        ],

        vSteppers: [
            {title: "VStep1", id: 1},
            {title: "VStep2", id: 2},
            {title: "VStep3", id: 3}
        ],

        questions: [
            {id: 1, value: null, type: "SectionHeading", title: "Mental Energy Demands", length: null, items: []},
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
            {id: 5, value: "fred", type: "TextField", title: "What other factors may affect your Energy wellbeing?", length: 120, items: []},
  
        ]

    }),
    methods: {
        nextStep(step)
        {
            this.hStepper = step + 1;
        }
    } 
  }
</script>