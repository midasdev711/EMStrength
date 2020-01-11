<template>
  <v-flex xs12>
    <span class="caption">{{title}}</span>

    <v-slider
      v-model="sliderValue"
      :track-color="themeColourSeconary_Dark"
      :color="themeColourSeconary_Mid"
      :thumb-color="themeColourSeconary_Dark"
      thumb-label="always"
      :max="items.length"
      step="1"
      ticks="always"
      tick-size="7"
      :change="$emit('updateValue', sliderValue, questionId, answerId, useText)"
    >
      <template v-slot:thumb-label="props">
        <span>
          {{ getTickLabel(props.value) }}
        </span>
      </template>
    </v-slider>
  </v-flex>
</template>

<script>
export default {
  name: "Scale",
  props: {
    title: String,
    id: String,
    disabled: Boolean,
    value: {
      type: Number,
      default: 1
    },
    items: {
      type: Array,
      default: [{
        "value":2,"title":"Medium"
      }]
    },
    questionId: String,
    answerId: String,
    useText: Boolean
  },
  data () {
    return {
      themeColourSeconary_Dark: '#213060',
      themeColourSeconary_Mid: '#00a38a',
      sliderValue: this.value ? this.value : 0
    }
  },
  methods: {
    getTickLabel(val) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value == val) {
          return this.items[i].title;
        }
      }
    }
  }
}
</script>