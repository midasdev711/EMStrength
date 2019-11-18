<template>
  <v-layout wrap date-weight>
    <v-flex xs12 sm4>
      <date-field 
        placeholder="DD/MM/YYYY"
        @update="dateUpdate"
        :value="date"
        :disabled="disabledInput" />
    </v-flex>
    <v-flex xs10 sm3 class="date-weight__number">
      <v-text-field
        data-vv-name="kgs"
        v-model="kgs"
        oninput="if(Number(this.value) < 0) this.value = 0;"
        placeholder="Enter number"
        type="number"
        :error-messages="errors.collect('kgs')"
        :disabled="disabledInput"></v-text-field>
    </v-flex>
    <v-flex xs2 align-self-center sm1 >kgs</v-flex>
  </v-layout>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: "Intake",
  data() {
    return {
      loading: false,
      saved: false,
      kgs: '',
      date: '',
      disabledInput: false
    }
  },
  computed: {
    ...mapGetters("app", {
      checkoutStatus: "getCheckoutStatus",
      getWeightofWeek: "getWeightofWeek"
    })
  },
//   watch: {
//     weightData (newData, oldData) {
//       if (newData && newData.date) {
//         if (!oldData || newData.date != oldData.date) {
//           this.date = newData.date;
//           this.kgs = newData.weight;
//           this.saved = newData.weight > 0 ? true : false;
//           this.loading = false;
//           this.disabledInput = true;
//         }
//       }
//     },
//   },
  mounted () {
    this.loading = true;
    this.disabledInput = false;
  },
  methods: {
    ...mapActions("app", {
      saveDataWeight: "saveDataWeight"
    }),
    dateUpdate(date) {
      if (moment(date).isoWeek() == moment().isoWeek()) {
        var dateofWeek = moment().isoWeekday();
        for (let i = 0; i < this.getWeightofWeek.length; i++) {
          let element = moment(this.getWeightofWeek[i]['date']).isoWeekday();
          if (element == dateofWeek) {
            this.$toast.warning('Already saved', {
              // override the global option
              position: 'top-right'
            });
            return;
          }
        }
        this.date = date;
      }
    },
  }
}
</script>

<style lang="stylus">
.date-weight
  &__number input
    text-align right
  th
    font-weight: bold
  .v-btn
    width: 140px
  .lightgrey
    background-color #676767 !important
    border-color #676767 !important
</style>