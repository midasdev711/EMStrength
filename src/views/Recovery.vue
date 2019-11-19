<template>
<v-layout justify-center>
    <v-flex xs12 sm6>
        <v-card color="#47bbe9" >
        <v-card-title>
            <span class="title">Physical</span>
        </v-card-title>  
        <v-container fluid>
            <v-checkbox v-model="checkbox1" :label="`Checkbox 1: ${checkbox1.toString()}`"></v-checkbox>
            <v-checkbox v-model="checkbox2" :label="`Checkbox 2: ${checkbox2.toString()}`"></v-checkbox>
        </v-container>

        </v-card>
    </v-flex>
</v-layout>
</template>

<script>
  export default {
    data () {
      return {
        checkbox1: true,
        checkbox2: false
      }
    }
  }
</script>