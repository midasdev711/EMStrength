<template>
 <v-flex xs12>
      <v-switch v-model="value" v-bind:label="title"></v-switch>
</v-flex>
</template>

<script>
export default {
  name: "Bool",
  props: {
    title: String,
    id: String,
    disabled: Boolean,
    //items:
    //length: ,
    value: Boolean,
  }
}
</script>