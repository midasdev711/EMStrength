import { Line, mixins } from 'vue-chartjs'

export default {
  name: 'ChartLines',
  extends: Line,
  props: {
    chartData: Object,
    unitLabels: Object
  },
  data() {
    return {
      options: {
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
          defaultFontSize: 8,
          boxWidth: 20
        },
        bezierCurve: false,
        tooltips: {
          displayColors: false,
          callbacks: {
            label: (item, data) => {
              let prefix = ""
              //prefix = data.datasets[item.datasetIndex].label === "Weight"?"kgs":"" leave it to the axis label
              return "";
              //`${data.datasets[item.datasetIndex].label}: ${item.value} ${prefix}`
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: 10,
              suggestedMax: 110
            },
            scaleLabel: {
							display: false,
							labelString: 'Weight ()'
						}
          }]
        }
      }
    }
  },
  methods: {
    renderLineChart: function() {
      var label = (this.unitLabels && this.unitLabels.weight.plural) ? this.unitLabels.weight.plural : '';
      this.options.scales.yAxes[0].scaleLabel.labelString = `Weight (${label})`;

      this.renderChart(this.chartData, this.options);
    }
  },
  watch: {
    chartData: function(newProps, oldProps) {
      this.renderLineChart();
    }
  },
  mounted () {
    this.renderLineChart();
  }
}