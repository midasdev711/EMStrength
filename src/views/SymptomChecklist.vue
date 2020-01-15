<template>
  <v-container grid-list-xl>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">Name of step 3</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card
            class="mb-5"
            color="grey lighten-1"
            height="200px"
          ></v-card>

          <v-btn
            color="primary"
            @click="e1 = 2"
          >
            Continue
          </v-btn>

          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
            class="mb-5"
            color="grey lighten-1"
            height="200px"
          ></v-card>

          <v-btn
            color="primary"
            @click="e1 = 3"
          >
            Continue
          </v-btn>

          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-5"
            color="grey lighten-1"
            height="200px"
          ></v-card>

          <v-btn
            color="primary"
            @click="e1 = 1"
          >
            Continue
          </v-btn>

          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import debounce from "debounce";
import DateField from "@/components/helper/DateField"

export default {
  name: "SymptomChecklist",
  components: {
    DateField
  },
  data() {
    return {
      isMobile: false,
      e1: 1,
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
  },
  methods: {
    ...mapActions("app", {
    }),
  },
  watch: {
  },
  mounted() {
    if (window.innerWidth < 500 && window.innerWidth > 0) this.isMobile = true;
    else this.isMobile = false;
  }

  
}
</script>

<style lang="stylus" scoped>
</style>
