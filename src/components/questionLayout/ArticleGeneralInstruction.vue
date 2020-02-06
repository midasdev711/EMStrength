<template>
 <v-flex xs10>
  <p>
    {{title}} <span class="dev-hint">(ArtGenInstr)</span>
  </p>
</v-flex>
</template>

<script>
export default {
  name: "ArticleGeneralInstruction",
  props: {
    title: String,
    id: String,
    disabled: Boolean,
    //items:
    //length: ,
  }
}
</script>