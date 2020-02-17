<template>
 <v-flex xs12>
    <!--v-chip :color="$vuetify.theme.subheading3">
      <span class="white--text subheading">{{prefix(title)}}</span>
    </v-chip-->
    <span :color="$vuetify.theme.subheading2">{{heading(title)}}</span>
</v-flex>
</template>
<script>
export default {
  name: "SectionPartStepper",
  props: {
    data: Array,
    disabled: Boolean,
  },
  data: () => ({
    title: "",
    id: "",
  }),
  methods: {
    sectionPartHead(list) {
        var item = list.find(x => x.question.type == 'SectionPart');
        console.log("Question Item", item);
        if (item) {
          this.id = 'SectionPart-H-' + item.question.id;
          this.title = item.question.title;
        } else {

        }
    },
    prefix(title) {
      let pre = title.split('.');
      return pre[0];
    },
    heading(title) {
      let pre = title.split('.');
      if (pre.length > 1)
        return pre[1];

      return pre[0];
    },
  },
  mounted() {
    this.sectionPartHead(this.data);
  }
}
</script>