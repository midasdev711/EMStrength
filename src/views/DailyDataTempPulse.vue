<template>
  <v-container style="max-width: 800px;">
    <v-card class="pb-4">
      <h2 class="text-xs-center">Enter your temperature and pulse for {{formatDate(todayDate) }}:</h2>
      <v-container grid-list-xl>
        <h3 class="right"></h3>
        <v-layout wrap>
          <v-flex xs9 sm5>
            <v-text-field label="Upon waking" placeholder="Enter temperature" type="number" v-model="temp1" oninput="if(Number(this.value) < 0) this.value = 0;" :disabled="disabledInput"></v-text-field>
          </v-flex>
          <v-flex xs3 sm1>
            <p> {{tempUnitLabel}} </p>
          </v-flex>
          <v-flex xs9 sm5>
            <v-text-field label="Upon waking" placeholder="Enter pulse" type="number" v-model="pulse1" oninput="if(Number(this.value) < 0) this.value = 0;" :disabled="disabledInput"></v-text-field>
          </v-flex>
          <v-flex xs3 sm1>
            <p> bpm </p>
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs9 sm5>
            <v-text-field label="30 minutes post Meal1" placeholder="Enter temperature" type="number" v-model="temp2" oninput="if(Number(this.value) < 0) this.value = 0;" :disabled="disabledInput"></v-text-field>
          </v-flex>
          <v-flex xs3 sm1>
            <p> {{tempUnitLabel}} </p>
          </v-flex>
          <v-flex xs9 sm5>
            <v-text-field label="30 minutes post Meal1" placeholder="Enter pulse" type="number" v-model="pulse2" oninput="if(Number(this.value) < 0) this.value = 0;" :disabled="disabledInput"></v-text-field>
          </v-flex>
          <v-flex xs3 sm1>
            <p> bpm </p>
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs9 sm5>
            <v-text-field label="Early afternoon" placeholder="Enter temperature" type="number" v-model="temp3" oninput="if(Number(this.value) < 0) this.value = 0;" :disabled="disabledInput"></v-text-field>
          </v-flex>
          <v-flex xs3 sm1>
            <p> {{tempUnitLabel}} </p>
          </v-flex>
          <v-flex xs9 sm5>
            <v-text-field label="Early afternoon" placeholder="Enter pulse" type="number" v-model="pulse3" oninput="if(Number(this.value) < 0) this.value = 0;" :disabled="disabledInput"></v-text-field>
          </v-flex>
          <v-flex xs3 sm1>
            <p> bpm </p>
          </v-flex>
          
        </v-layout>

        <v-flex xs12 sm6>
            <v-btn color="primary" @click="save" :loading="loading" :disabled="disabledInput">Save</v-btn>
          </v-flex>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>

import moment from 'moment'
import Util from '@/util'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "DailyDataTempPulse",
  data() {
    return {
      todayDate: new Date(),
      loading: false,
      temp1: "",
      temp2: "",
      temp3: "",
      pulse1: "",
      pulse2: "",
      pulse3: "",
      disabledInput: true,
      tempUnitLabel: "C", 
    }
  },
  computed: {
    ...mapGetters("app", {
      getDataTempPulse: "getDataTempPulse"
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile",
    })
  },
  watch: {
    getDataTempPulse (newData, oldData) {
      if (newData) {
        this.loading = false;
        this.disabledInput = true;
        this.temp1 = newData.temp1;
        this.temp2 = newData.temp2;
        this.temp3 = newData.temp3;
        this.pulse1 = newData.pulse1;
        this.pulse2 = newData.pulse2;
        this.pulse3 = newData.pulse3;
      }
    }
  },
  methods: {
    ...mapActions("app", {
      saveTempPulse: "saveTempPulse",
      getTempPulse: "getTempPulse"
    }),
    formatDate(date) {
      if (date) {
        return moment(date).format('DD/MM/YYYY');
      }
    },
    save() {
      // Validate before submit
      const formData = {
        temp1: parseFloat(this.temp1),
        temp2: parseFloat(this.temp2),
        temp3: parseFloat(this.temp3),
        pulse1: parseFloat(this.pulse1),
        pulse2: parseFloat(this.pulse2),
        pulse3: parseFloat(this.pulse3),
        date: this.todayDate
      };
      this.loading = true;
      return this.saveTempPulse(formData).then(result => {
        this.$toast.success('Successfully saved', {
          // override the global option
          // position: 'top-right'
        });
        this.loading = false;
      }).catch( e => {
        console.log(e);
      });
    },
    getData () {
      this.todayDate = new Date();
      var today = this.todayDate.toISOString().split('T')[0];
      this.getTempPulse(today).then(result => {
        this.loading = false;
        if (result) {
          this.temp1 = result.temp1;
          this.temp2 = result.temp2;
          this.temp3 = result.temp3;
          this.pulse1 = result.pulse1;
          this.pulse2 = result.pulse2;
          this.pulse3 = result.pulse3;
        }
        else {
          this.disabledInput = false;
        }
      });
    }
  },
  mounted () {
    if (!this.getDataTempPulse) {
      this.loading = true;
      this.getData();
    }
    else {
      this.temp1 = this.getDataTempPulse.temp1;
      this.temp2 = this.getDataTempPulse.temp2;
      this.temp3 = this.getDataTempPulse.temp3;
      this.pulse1 = this.getDataTempPulse.pulse1;
      this.pulse2 = this.getDataTempPulse.pulse2;
      this.pulse3 = this.getDataTempPulse.pulse3;
    }

    var unitLabels = Util.getUnitLabels(this.getDataUserProfile.profile.measure);
    this.tempUnitLabel = unitLabels.temperature;
  }
}
</script>

<style scoped>
  h3 {
    font-weight: bold;
  }

  p {
    margin-top: 2em;
    margin-bottom: 3.5em;
  }

  .container.grid-list-xl .layout .flex {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .v-text-field .v-label--active {
    font-weight: bold;
  }

</style>