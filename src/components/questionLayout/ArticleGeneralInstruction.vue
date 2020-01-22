<template>
 <v-flex xs12>
    {{title}}(ArtGenInstr)
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