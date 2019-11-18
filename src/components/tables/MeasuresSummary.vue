<template>
  <v-container fluid>
    <v-data-table
      :headers="items.headers"
      :items="items.measures"
      class="summary"
      hide-actions
    >
      <template v-slot:items="props">
        <td v-bind:class="{ 'bold_record': props.item.is_bold }">{{ props.item.date1 }}</td>
        <td v-bind:class="{ 'bold_record': props.item.is_bold }">{{ props.item.date2 }}</td>
        <td v-bind:class="{ 'bold_record': props.item.is_bold }">{{ props.item.date3 }}</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "MeasuresSummary",
  props: {
    items: Object
  }
}
</script>

<style lang="stylus">
.v-table__overflow
  overflow-x: hidden;
.summary>.v-table__overflow>.v-table
  thead tr
    height: 36px;
    th
      text-align: center !important;
      font-weight bold;
  td, th
    padding: 5px 10px;
    height: 30px;
  td
    box-sizing: border-box;
    border-right: 1px solid lightgrey;
  .bold_record
    font-weight: bold
.v-carousel__prev
  display: none

</style>