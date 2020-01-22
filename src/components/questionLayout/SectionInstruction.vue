<template>
 <v-flex xs12>
    <span class="caption"><strong>{{title}}</strong>(SECTION)</span>
</v-flex>
</template>

<script>
export default {
  name: "SectionInstruction",
  props: {
    title: String,
    id: String,
    disabled: Boolean,
    //items:
    //length: ,
  }
}
</script>