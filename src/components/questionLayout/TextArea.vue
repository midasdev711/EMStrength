<template>
  <v-flex xs12 sm10>
    <label for="">{{title}}
      <textarea :name="id" 
        placeholder="enter here..." 
        v-validate="'required'"
        @input="updateValue"
        :readonly="disabled ? true : false" 
        v-model="textValue"
        rows="4">
      </textarea>
    </label>
  </v-flex>
</template>

<script>
import debounce from "debounce";

export default {
  name: "TextArea",
  props: {
    title: String,
    id: String,
    disabled: [String, Boolean],
    text: String,
    questionId: String,
    answerId: String,
    useText: Boolean,
    section: Number,
    subsection: Number
  },
  data() {
    return {
      textValue: this.text ? this.text : ""
    };
  },
  methods: {
    updateValue: debounce(function(e) {
      this.$emit(
        "update-value",
        this.textValue,
        this.questionId,
        this.answerId,
        this.useText,
        this.section,
        this.subsection
      );
    }, 500)
  }
};
</script>

<style lang="stylus" scoped>
textarea 
  font-size 14px
  width 100%
  border-bottom 1px solid grey
  outline none
  padding-top 5px
</style>