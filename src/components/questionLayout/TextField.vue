<template>
  <v-flex xs10>
    <v-text-field
      v-bind:name="id"
      v-bind:label="title"
      v-bind:placeholder="title"
      v-model="textValue"
      v-validate="'required|max:' + length"
      counter
      v-bind:maxLength="length"
      @input="updateValue"
      :disabled="disabled"
    ></v-text-field>
  </v-flex>
</template>

<script>
import debounce from "debounce"

export default {
  name: "TextField",
  props: {
    title: String,
    id: String,
    disabled: Boolean,
    text: {
      type: String,
      default: ''
    },
    length: {
      type: Number,
      default: 10
    },
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
  },
  computed: {
    rules() {
      return [v => this.textValue.length <= this.length || `Max ${this.length} characters`]
    }
  },
  mounted() {
    //console.log(this.length);
  }
}
</script>