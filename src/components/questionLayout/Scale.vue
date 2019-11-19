<template>
<v-flex xs12>
    <span class="caption">{{title}}</span>

     <v-slider xs12
      v-model="value"
      :track-color="themeColourSeconary_Dark"
      :color="themeColourSeconary_Mid"
      :thumb-color="themeColourSeconary_Dark"
      thumb-label="always"

      :tick-labels="items"
        :max="3"
        step="1"
        ticks="always"
        tick-size="4"
    ></v-slider>
</v-flex>
</template>

<script>
export default {
  name: "Scale",
  props: {
    title: String,
    id: String,
    disabled: Boolean,
    value: String,
    items: []
    //length:,
    
  },
  data () {
      return {
          themeColourSeconary_Dark: '#213060',
          themeColourSeconary_Mid: '#00a38a',
          /*ticksLabels: [
            'Figs',
            'Lemon',
            'Pear',
            'Apple',
            ],*/
        }
  }
}
</script>