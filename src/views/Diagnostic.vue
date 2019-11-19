<template>
  <v-stepper v-model="hStepper">
    <v-stepper-header>

      <v-stepper-step v-for="step in steppers" :key="step.title" :complete="hStepper > step.id" v-bind:step="step.id">{{step.title}}
      </v-stepper-step>

    </v-stepper-header>

    <v-stepper-items v-for="stepp in steppers" :key="stepp.title">
      <v-stepper-content v-bind:step="stepp.id">
        <v-card
          
        >


            <v-stepper vertical v-model="vStepper">
                <v-div v-for="stepl in vSteppers" :key="stepl.title" >
                    <v-stepper-step editable :complete="vStepper > stepl.id" v-bind:step="stepl.id">
                        {{stepl.title}}
                    </v-stepper-step>

                    <v-stepper-content v-bind:step="stepl.id">
                        <v-card color="grey lighten-1" class="mb-5" height="200px">
                            Hi there {{stepl.title}}
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
  export default {
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

    }),
    methods: {
        nextStep(step)
        {
            this.hStepper = step + 1;
        }
    } 
  }
</script>