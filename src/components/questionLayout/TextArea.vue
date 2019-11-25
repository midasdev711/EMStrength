<template>
 <v-flex xs12>
    <v-textarea
        v-bind:name="id"
        v-bind:label="title"
        v-bind:placeholder="title"
        v-model="text"
    ></v-textarea>
</v-flex>
</template>

<script>
export default {
  name: "TextArea",
  props: {
    title: String,
    id: String,
    disabled: Boolean,
    text: String
    //items:
    //length: ,
  }
}
</script>