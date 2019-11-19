<template>
 <v-flex xs12>
    <span class="title">{{title}}</span>
</v-flex>
</template>

<script>
export default {
  name: "SectionHeading",
  props: {
    title: String,
    id: String,
    disabled: Boolean,
    //items:
    //length: ,
  }
}
</script>