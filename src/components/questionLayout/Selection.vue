<template>
  <v-flex xs12 sm10 v-bind:class="{unAnswered: (sliderValue == 0) && showBorder}">
    <span class="caption">{{title}}</span>

    <v-select
      v-model="sliderValue"
      :track-color="themeColourSeconary_Dark"
      :color="themeColourSeconary_Mid"
      :thumb-color="themeColourSeconary_Dark"
      thumb-label="always"
      :max="items.length"
      step="1"
      ticks="always"
      tick-size="7"
      :items="items"
      :item-text="'title'"
      :item-value="'value'"
      :change="$emit('update-value', sliderValue, questionId, answerId, useText, section, subsection, 'Selection')"
      :readonly="disabled ? true : false"
    >
      
    </v-select>
  </v-flex>
</template>

<script>
export default {
  name: "Selection",
  props: {
    title: String,
    id: String,
    disabled: [String, Boolean],
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
    useText: Boolean,
    section: Number,
    subsection: Number,
    showBorder: Boolean
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
  },
  mounted() {
  }
  // NOTE: PLACEHOLDER ONLY - update to use QuestionItems in a drop down selector and pass back the selection index
}
</script>

<style lang="stylus" scoped>
>>>.v-input--slider 
  margin-top 3em
>>>.v-slider__thumb-label
  height 50px!important
  width 50px!important
  border-radius 60% 27% 0
</style>