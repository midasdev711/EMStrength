<template>
  <v-card class="bar-chart">
    <div class="text-xs-center mb-1"><i class="bar-chart__color" :style="{ background: color }"></i>{{ label }}</div>
    <bar :chart-data="chartData" :standard="standard" :unitLabels="unitLabels"></bar>
  </v-card>
</template>

<script>
import Bar from '@/components/chart/Bar'

const allBarsColor = '#1895CB'

export default {
  name: "BarChart",
  components: {
    Bar
  },
  props: {
    values: Object,
    standard: Number,
    color: String,
    label: String,
    unitLabels: Object
  },
  computed: {
    chartData () {
      return {
        labels: this.values.labels,
        datasets: [
          {
            label: this.label,
            backgroundColor: () => {
              const colors = [];
              this.values.values.forEach(() => {
                colors.push(this.color);
              });
              return colors;
            },
            data: this.values.values
          }
        ]
      }
    }
  },
}
</script>

<style lang="stylus">
.bar-chart {
  &__color {
    display: inline-block;
    margin-right: 6px
    height: 10px;
    width: 20px;
    border-radius: 3px
  }
  canvas {
    height: 250px !important;
    width: 100% !important;
  }
}
</style>