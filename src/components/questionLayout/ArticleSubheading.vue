<template>
 <v-flex xs12>
  <h1>
    {{title}}
  </h1>
  <p></p>
</v-flex>
</template>

<script>
export default {
  name: "ArticleSubheading",
  props: {
    title: String,
    id: String,
    disabled: [String, Boolean]
  }
}
</script>