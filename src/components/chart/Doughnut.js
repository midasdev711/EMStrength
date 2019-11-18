import { Doughnut, mixins } from 'vue-chartjs'

export default {
  name: 'ChartDoughnut',
  extends: Doughnut,
  props: {
    chartData: Object
  },
  data() {
    return {
      options: {
        cutoutPercentage: 80,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        hover: {
          mode: null
        },
        elements: {
          arc: {
            borderWidth: 1
          }
        }
      }
    }
  },
  watch: {
    chartData: function(newProps, oldProps) {
      this.renderChart(this.chartData, this.options);
    }
  },
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}