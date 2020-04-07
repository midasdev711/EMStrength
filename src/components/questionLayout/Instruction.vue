<template>
 <v-flex xs12 sm10>
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
    disabled: Boolean
  }
}
</script>