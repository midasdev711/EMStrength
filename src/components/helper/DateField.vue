<template>
  <v-menu
    ref="showCalendar"
    v-model="showCalendar"
    :close-on-content-click="false"
    :return-value.sync="date"
    lazy
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on }">
      <div class="date-field">
        <v-text-field
          prepend-icon="date_range"
          v-model="date"
          :label="label"
          readonly
          color="disabled"
          v-on="on"
          :placeholder="placeholder"
          :disabled="disabled"></v-text-field>
      </div>
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn flat @click="showCalendar = false">Cancel</v-btn>
      <v-btn depressed color="primary" @click="$refs.showCalendar.save(date); $emit('update', date)">Apply</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "DateField",
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
      showCalendar: false,
      date: null,
    }
  },
  watch: {
    value (newProps, oldProps) {
      if (newProps != oldProps) {
        this.date = newProps.split('T')[0]
      }
    }
  }
}
</script>
