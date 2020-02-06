<template>
 <v-flex xs10>
  <p>
    <span class="caption">{{title}}</span>
  </p>
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