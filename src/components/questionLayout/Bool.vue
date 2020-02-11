<template>
  <v-flex xs10>
    <v-checkbox :label="title" :indeterminate="indeterminate" v-model="valueStatus" :disabled="disabled"></v-checkbox>
  </v-flex>
</template>

<script>
export default {
  name: "Bool",
  props: {
    title: String,
    id: String,
    disabled: Boolean,
    value: Number,
    questionId: String,
    answerId: String,
    useText: Boolean
  },
  data () {
    return {
      valueStatus: this.value == 1 ? true : false,
      indeterminate: this.value == null ? true : false,
    }
  },
  methods: {
    changeValue(status) {
      if (status) {
        this.valueStatus = 'true';
      } else {
        this.valueStatus = 'false';
      }
      this.$emit('updateValue', status, this.questionId, this.answerId, this.useText);
    }
  },
  watch: {
    valueStatus(newProps, oldProps) {
      if (newProps == true) {
        this.indeterminate = false;
      }
    }
  },
  mounted() {
    console.log(this.value);
  }
}
</script>