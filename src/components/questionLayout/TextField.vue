<template>
 <v-flex xs12>
    <v-text-field
        v-bind:name="id"
        v-bind:label="title"
        v-bind:placeholder="title"
        v-model="value"
        :rules="rules"
        counter
        v-bind:maxLength="length"
    ></v-text-field>
</v-flex>
</template>

<script>
export default {
  name: "TextField",
  props: {
    title: String,
    id: String,
    disabled: Boolean,
    value: String,
    //items:
    length: Number,
  },
  data () {
    return {
        rules: [v => v.length <= props.length || `Max ${props.length} characters`],
    }
  }
}
</script>