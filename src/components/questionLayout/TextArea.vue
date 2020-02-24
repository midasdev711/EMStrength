<template>
  <v-flex xs12 sm10>
    <v-textarea
      v-bind:name="id"
      v-bind:label="title"
      v-bind:placeholder="title"
      v-model="textValue"
      v-validate="'required'"
      @input="updateValue"
      :disabled="disabled"
    ></v-textarea>
  </v-flex>
</template>

<script>

import debounce from "debounce"

export default {
  name: "TextArea",
  props: {
    title: String,
    id: String,
    disabled: Boolean,
    text: String,
    questionId: String,
    answerId: String,
    useText: Boolean
  },
  data () {
    return {
      textValue: this.text ? this.text : ""
    }
  },
  methods: {
    updateValue: debounce(function (e) {
      console.log(e);
      this.textValue = e;
      this.$emit('updateValue', this.textValue, this.questionId, this.answerId, this.useText)
    }, 500),
  }
}
</script>