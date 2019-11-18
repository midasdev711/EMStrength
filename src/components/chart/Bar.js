import { Bar } from 'vue-chartjs'
import chartjsPluginAnnotation from "chartjs-plugin-annotation";

export default {
  extends: Bar,
  props: {
    chartData: Object,
    standard: Number,
    unitLabels: Object
  },
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          id: 'y-axis-0',
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: false,
            labelString: 'Weight ()'
          }
        }]
      },
      legend: {
        display: false
      },
      annotation: {
        annotations: [{
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: 0,
          borderColor: 'tomato',
          borderWidth: 2
        }],
        drawTime: "afterDraw" // (default)
      }
    }
  }),
  watch: {
    chartData (newData) {
      var value = this.standard;
      this.options.annotation.annotations[0].value = value;
      
      var label = (this.unitLabels && this.unitLabels.weight.plural) ? this.unitLabels.weight.plural : '';
      this.options.scales.yAxes[0].scaleLabel.labelString = `Weight (${label})`;

      this.renderChart(newData, this.options);
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}