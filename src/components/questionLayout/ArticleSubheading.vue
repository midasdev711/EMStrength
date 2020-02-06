<template>
 <v-flex xs12>
  <h1>
    {{title}}
    <!--span class="title"><strong></strong>(ArticleSubheading)</span-->
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
    disabled: Boolean,
    //items:
    //length: ,
  }
}
</script>