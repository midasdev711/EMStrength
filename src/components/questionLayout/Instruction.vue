<template>
 <v-flex xs12>
    <span class="caption">{{title}}</span>
</v-flex>
</template>

<script>
export default {
  name: "Instruction",
  props: {
    title: String,
    id: String,
    disabled: Boolean,
    //items:
    //length: ,
  }
}
</script>