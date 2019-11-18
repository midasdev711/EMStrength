<template>
  <v-layout wrap>
    <v-flex xs12 mt-4>
      <v-btn icon>
        <v-icon>chevron_left</v-icon>
      </v-btn>
      TODAY
      <v-btn icon>
        <v-icon>chevron_right</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs12 sm6 v-for="(micronutrient, index) in tableData" :key="index">
      <v-card>
        <table class="v-table theme--light">
          <caption>{{ micronutrient.title }}</caption>
          <tbody>
          <tr v-for="item in micronutrient.items">
            <th class="text-xs-left">{{ item.title }}</th>
            <td class="text-xs-center">{{ parseFloat(item.amount).toFixed(2) }}</td>
          </tr>
          </tbody>
        </table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

  export default {
    name: "Micronutrient",
    props: {
      tableData: Array
    }
  }
</script>