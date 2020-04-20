<template>
 <v-flex xs12>
  <h2>
    <span >{{title}}</span>
  </h2>
</v-flex>
</template>

<script>
export default {
  name: "SectionHeading",
  props: {
    title: String,
    id: String,
    disabled: [String, Boolean],
    //items:
    //length: ,
  }
}
</script>