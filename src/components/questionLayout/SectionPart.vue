<template>
 <v-flex xs12>
    <span class="subheading">{{title}}</span>
</v-flex>
</template>

<script>
export default {
  name: "SectionPart",
  props: {
    title: String,
    id: String,
    disabled: Boolean,
    //items:
    //length: ,
  }
}
</script>