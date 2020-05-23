<template>
 <v-flex xs12 sm10>
  <p>
    {{title}}
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