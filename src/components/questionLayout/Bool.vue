<template>
 <v-flex xs12>
    <v-switch v-model="switchValue" v-bind:label="title" :change="$emit('updateValue', switchValue, this.id)"></v-switch>
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