<template>
 <v-flex xs12 v-if="!popup">
  <p>
    <span class="caption"><strong>{{title}}</strong></span><span class="dev-hint">(SECTION Instr.)</span>
  </p>
</v-flex>
</template>

<script>
export default {
  name: "SectionInstruction",
  props: {
    title: String,
    id: String,
    disabled: [String, Boolean],
    popup: Boolean
    //items:
    //length: ,
  }
}
</script>