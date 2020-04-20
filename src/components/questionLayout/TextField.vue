<template>
  <v-flex xs12 sm10>
    <label for="">{{title}}
      <input type="text" :name="id" v-bind:maxLength="length" :placeholder="title" v-model="textValue" v-validate="'required|max:' + length" @input="updateValue"
      :readonly="disabled ? true : false">
    </label>
    <!-- <v-text-field
      v-bind:name="id"
      v-bind:label="title"
      v-bind:placeholder="title"
      v-model="textValue"
      v-validate="'required|max:' + length"
      counter
      v-bind:maxLength="length"
      @input="updateValue"
      :disabled="disabled"
    ></v-text-field> -->
  </v-flex>
</template>

<script>
import debounce from "debounce"

export default {
  name: "TextField",
  props: {
    title: String,
    id: String,
    disabled: [String, Boolean],
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
    useText: Boolean,
    section: Number,
    subsection: Number
  },
  data () {
    return {
      textValue: this.text ? this.text : ""
    }
  },
  methods: {
    updateValue: debounce(function (e) {
      console.log(e);
      // this.textValue = e;
      this.$emit('update-value', this.textValue, this.questionId, this.answerId, this.useText, this.section, this.subsection)
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

<style lang="stylus" scoped>
input 
  font-size 14px
  width 100%
  border-bottom 1px solid grey
  outline none
  padding-top 5px
</style>