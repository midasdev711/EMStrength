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
        v-validate="'required'"
        @keypress="isNumber($event)"
        placeholder="Enter number"
        type="number"
        :error-messages="errors.collect('kgs')"
        :disabled="disabledInput"></v-text-field>
    </v-flex>
    <v-flex xs2 align-self-center sm1 >{{weightUnitLabel}}</v-flex>
    <v-flex xs12 sm4>
      <v-dialog v-model="dialog" persistent max-width="300">
        <template v-slot:activator="{on}">
          <v-btn v-if="saved" disabled color="primary">
            Saved
            <v-icon class="ml-2">check</v-icon>
          </v-btn>
          <v-btn v-else color="primary" v-bind:class="{ 'lightgrey': kgsvalid & datevalid}" @click="save" :loading="loading">Save</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Please input the date</v-card-title>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="green darken-1" text @click="dialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
    
  </v-layout>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import DateField from "@/components/helper/DateField"

export default {
  name: "DateWeight",
  components: {
    DateField
  },
  props: {
    weightData: Object,
    dataLoaded: false,
    weightUnitLabel: String
  },
  data() {
    return {
      loading: false,
      saved: false,
      kgs: '',
      date: '',
      disabledInput: false,
      dialog: false,
      datevalid: false,
      kgsvalid: false
    }
  },
  computed: {
    ...mapGetters("app", {
      checkoutStatus: "getCheckoutStatus",
      getWeightofWeek: "getWeightofWeek"
    })
  },
  watch: {
    weightData (newData, oldData) {
      if (newData && newData.date) {
        if (!oldData || newData.date != oldData.date) {
          this.date = newData.date;
          this.kgs = newData.weight;
          this.saved = newData.weight > 0 ? true : false;
          this.loading = false;
          this.disabledInput = true;
        }
      }
    },
    kgs (newProps, oldProps) {
      this.kgsvalid = true;
    },
    date (newProps, oldProps) {
      this.datevalid = true;
      return newProps;
    },
    dataLoaded (newProps, oldProps) {
      if (newProps != oldProps) {
        this.loading = false;
      }
    }
  },
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
            this.$toast.warning('Already saved');
            return;
          }
        }
        this.date = date;
      }
    },
    isNumber: function(evt) {
      if(parseFloat(this.kgs) * 10 % 1 > 0 || parseFloat(this.kgs) < 0)
      {
        evt.preventDefault();
      }
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    save() {
      // Validate before submit
      this.$validator.validate().then((result) => {
        if (result) {
          if (this.date == '' || this.date == undefined)
          {
            this.dialog = true;
            return;
          }
          this.dialog = false;
          this.loading = true;

          const formData = {
            "date": this.date,
            "weight": this.kgs
          };

          this.saveDataWeight(formData).then(res => {
            this.$toast.success('Successfully saved', {
              // override the global option
              // position: 'top-right'
            });
            this.saved = true;
            this.loading = false;
            this.disabledInput = true;
            this.$emit('average', this.kgs);
            // this.$router.push("/")
          }).catch(err => {
            this.$toast.error(err, {
              // override the global option
              // position: 'top-right'
            });
          })
          
        }
      }).catch((error) => {
        console.error(error);
      });
    }
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