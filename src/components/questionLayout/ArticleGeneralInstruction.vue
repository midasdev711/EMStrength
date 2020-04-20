<template>
 <v-flex xs12 sm10>
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
    disabled: [String, Boolean]
  }
}
</script>