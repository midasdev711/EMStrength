<template>
 <v-flex xs12>
    <span class="title"><strong>{{title}}</strong>(ArticleSubheading)</span>
</v-flex>
</template>

<script>
export default {
  name: "ArticleSubheading",
  props: {
    title: String,
    id: String,
    disabled: Boolean,
    //items:
    //length: ,
  }
}
</script>