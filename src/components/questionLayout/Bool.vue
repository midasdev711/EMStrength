<template>
  <v-flex xs12 sm10>
    <span>{{title}}</span>
    <v-radio-group v-model="valueStatus" :disabled="disabled" row>
      <v-radio
        :label="'Yes'"
        :value="true"
      ></v-radio>
      <v-radio
        :label="'No'"
        :value="false"
      ></v-radio>
    </v-radio-group>
  </v-flex>
</template>

<script>
export default {
  name: "Bool",
  props: {
    title: String,
    id: String,
    disabled: Boolean,
    value: Number,
    questionId: String,
    answerId: String,
    useText: Boolean,
    section: Number,
    subsection: Number
  },
  data () {
    return {
      valueStatus: this.value == null ? null : this.value == 1 ? true : false,
    }
  },
  watch: {
    valueStatus(newProps, oldProps) {
      if (newProps != oldProps) {
        this.$emit('update-value', newProps, this.questionId, this.answerId, this.useText, this.section, this.subsection);
      }
    }
  }
}
</script>