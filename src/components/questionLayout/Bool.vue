<template>
 <v-flex xs10>
    <v-switch v-model="switchValue" v-bind:label="title" :change="$emit('updateValue', switchValue, questionId, answerId, useText)"></v-switch>
</v-flex>
</template>

<script>
export default {
  name: "Bool",
  props: {
    title: String,
    id: String,
    disabled: Boolean,
    value: Boolean,
    questionId: String,
    answerId: String,
    useText: Boolean
  },
  data () {
    return {
      switchValue: this.value ? this.value : false
    }
  },
  mounted() {
  }
}
</script>