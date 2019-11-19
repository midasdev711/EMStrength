<template>
  <v-stepper v-model="hStepper">
    <v-stepper-header>

      <v-stepper-step editable v-for="step in steppers" :key="step.title" :complete="hStepper > step.id" v-bind:step="step.id">{{step.title}}
      </v-stepper-step>

    </v-stepper-header>

    <v-stepper-items v-for="stepp in steppers" :key="stepp.title">
      <v-stepper-content v-bind:step="stepp.id">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="200px"
        >{{stepp.title}}
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

        steppers: [
            {title: "Step1", id: 1},
            {title: "Step2", id: 2},
            {title: "Step3", id: 3}
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