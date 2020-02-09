<template>
 <v-flex xs12>
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
    disabled: Boolean,
    //items:
    //length: ,
  }
}
</script>