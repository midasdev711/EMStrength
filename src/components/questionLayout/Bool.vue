<template>
  <v-flex xs12 sm10 v-bind:class="{unAnswered: (valueStatus == null) && showBorder}">
    <span>{{title}}</span>
    <v-radio-group v-model="valueStatus" :readonly="disabled ? true : false" row>
      <v-radio :label="'Yes'" :value="true"></v-radio>
      <v-radio :label="'No'" :value="false"></v-radio>
    </v-radio-group>
  </v-flex>
</template>

<script>
export default {
  name: "Bool",
  props: {
    title: String,
    id: String,
    disabled: [String, Boolean],
    value: Number,
    questionId: String,
    answerId: String,
    useText: Boolean,
    section: Number,
    subsection: Number,
    showBorder: Boolean
  },
  data() {
    return {
      valueStatus: this.value == null ? null : this.value == 1 ? true : false
    };
  },
  watch: {
    valueStatus(newProps, oldProps) {
      if (newProps != oldProps) {
        this.$emit(
          "update-value",
          newProps,
          this.questionId,
          this.answerId,
          this.useText,
          this.section,
          this.subsection,
          'Bool'
        );
      }
    }
  }
};
</script>

<style lang="stylus">
.unAnswered
  box-shadow: -1px 4px 26px -9px #666;
</style>