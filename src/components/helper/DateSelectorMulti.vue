<template>
  <v-menu
    ref="showCal"
    v-model="showCal"
    :close-on-content-click="false"
    :return-value.sync="dates"
    lazy
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on }">
      <div class="date-field">
         <v-combobox
            v-model="dates"
            multiple
            chips
            small-chips
            label="Copy meal to date(s)"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-combobox>
      </div>
    </template>
    <v-date-picker v-model="dates" multiple no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn flat @click="showCal = false">Cancel</v-btn>
      <v-btn depressed color="primary" @click="$refs.showCal.save(dates);$emit('update', dates);">Apply</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>

import moment from 'moment'

export default {
  name: "DateSelectorMulti",
  props: {
    value: String,
    label: String,
    disabled: Boolean,
    placeholder: {
      type: String,
      default: "DD/MM/YYYY"
    }
  },
  data() {
    return {
      showCal: false,
      dates: null,
    }
  },
  watch: {
    value (newProps, oldProps) {
      if (newProps != oldProps) {
          if (newProps.length > 0)
          {
            this.dates = newProps.split('T')[0];
          }
          else
          {
             this.dates = newProps;
          }
      }
    }
  },
  mounted() {
    var today = moment(new Date());
    this.dates = [];
    //this.dates.push(today.format("YYYY-MM-DD"));
    var tomorrow = moment(today).add(1, "day");
    this.dates.push(tomorrow.format("YYYY-MM-DD"));
  }
}
</script>
