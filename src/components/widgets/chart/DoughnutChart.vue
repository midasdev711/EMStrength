<template>
  <v-container class="chart">
    <h3>{{ chartData.datasets[0].label }}</h3>
    <div class="chart-doughnut">
      <div class="chart-doughnut__wrapper">
        <chart-doughnut :chart-data="chartData"></chart-doughnut>
        <div class="chart-doughnut__inside">
          <div>{{ chartData.datasets[0].data[0] }}g</div>
          {{ total }}g
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import ChartDoughnut from '@/components/chart/Doughnut'

export default {
  name: "DoughnutChart",
  components: {
    ChartDoughnut
  },
  props: {
    chartData: Object
  },
  computed: {
    total() {
      // let total = this.chartData.datasets[0].data.reduce((a, b) => a + b, 0); // Find the sum of the chart's data
      let total = this.chartData.datasets[0].data[1]; // Find the sum of the chart's data
      return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Put comas in the number
    }
  }
}
</script>

<style lang="stylus">
.chart
  h3
    font-weight bold
    text-align: center
  &-doughnut
    position: relative
    margin -50px auto
    max-width: 90%
    &__inside
      position absolute
      top: 50%
      left: 50%
      transform translate(-50%, -50%)
      font-size: 16px
      font-weight: 500
      text-align: center
      div
        border-bottom 1px solid black
        padding: 5px
        margin-bottom: 5px
@media (max-width: 800px) 
  #doughnut-chart
    height 200px!important
  .chart-doughnut__inside
    top 100%!important
@media (max-width: 500px) 
  #doughnut-chart
    height 80px!important
  .chart-doughnut__inside
    top 130%!important
</style>