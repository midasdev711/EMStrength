<template>
  <div>
    <v-select
      :items="customSelectItems"
      v-model="rangeSelectSwitcher"
      @change="$emit('update', rangeSelectSwitcher)"
      class="range__selector">
      <template v-slot:append-item>
        <v-divider class="mb-2"></v-divider>
        <v-text-field 
          v-model="customrange"
          type='number' />
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  name: "SelectDateRange",
  data() {
    return {
      rangeSelect: [{text: 'Last 7 days', value: 7}, {text: 'Last 14 days', value: 14}, {text: 'Last 30 days', value: 30}, {text: 'Last 60 days', value: 60}, {text: 'Last 90 days', value: 90}],
      customSelect: [{text: 'Last 7 days', value: 7}, {text: 'Last 14 days', value: 14}, {text: 'Last 30 days', value: 30}, {text: 'Last 60 days', value: 60}, {text: 'Last 90 days', value: 90}],
      rangeSelectSwitcher: 7,
      customrange: ''
    }
  },
  computed: {
    customSelectItems() {
      let customItem = {text: 'Last ' + this.customrange + ' days', value: this.customrange}
      this.customSelect = []
      this.customSelect.push(...this.rangeSelect)
      if(this.customrange != undefined && this.customrange != '')
        this.customSelect.push(customItem);
      return this.customSelect;
    }
  }
}
</script>

<style lang="stylus">
.range {
  &__selector {
    width: 50%
    margin-top: -18px
  }
  canvas {
    height: 366px !important;
  }
}
</style>