<template>
 <v-flex xs12>
    <v-text-field
        v-bind:name="id"
        v-bind:label="title"
        v-bind:placeholder="title"
        v-model="textValue"
        :rules="rules"
        counter
        v-bind:maxLength="length"
        @input="updateValue"
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
      this.$emit('updateValue', this.textValue, this.id)
    }, 500),
  },
  computed: {
    rules() {
      return [v => this.textValue.length <= this.length || `Max ${this.length} characters`]
    }
  },
  mounted() {
    console.log(this.length);
  }
}
</script>