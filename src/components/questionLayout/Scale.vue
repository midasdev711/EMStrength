<template>
  <v-flex xs10 sm11 class="scale" v-bind:class="{unAnswered: (sliderValue == 0) && showBorder}">
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
      :change="$emit('update-value', sliderValue, questionId, answerId, useText, section, subsection, 'Scale')"
      :readonly="disabled ? true : false"
    >
      <template v-slot:thumb-label="props">
        <span>{{ getTickLabel(props.value) }}</span>
      </template>
    </v-slider>
    <p class="text-xs-right">{{ getTickLabel(this.sliderValue) }}</p>
  </v-flex>
</template>

<script>
export default {
  name: "Scale",
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
      default: [
        {
          value: 2,
          title: "Medium"
        }
      ]
    },
    questionId: String,
    answerId: String,
    useText: Boolean,
    section: Number,
    subsection: Number,
    showBorder: Boolean
  },
  data() {
    return {
      themeColourSeconary_Dark: "#213060",
      themeColourSeconary_Mid: "#00a38a",
      sliderValue: this.value ? this.value : 0,
      tickLabels: [
        "one",
        "two",
        "three"
        ////this.getTickLabels()
      ]
    };
  },
  methods: {
    getTickLabel(val) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value == val) {
          return this.items[i].title.replace(/\u00a0/g, " ");
        }
      }
    },
    getTickLabels() {
      //tickLabels = {};
      // add back to v-slider :tick-labels="tickLabels"
      for (let i = 0; i < this.items.length; i++) {
        let tmp = this.items[i].title.replace(/\u00a0/g, " ");
        this.tickLabels.push(tmp);
      }
    }
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped>
>>>.v-input--slider {
  margin-top: 6em;
}

>>>.v-slider__thumb-label {
  height: 78px !important;
  width: 78px !important;
  text-align: center;
  border-radius: 60% 27% 0;
  white-space: pre-wrap;
}

.scale {
  margin: 0 auto;
  padding-left 50px!important
}
</style>