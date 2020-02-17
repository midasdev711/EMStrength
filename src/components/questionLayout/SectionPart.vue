<template>
 <v-flex xs12>
  <p>
    <v-chip :color="$vuetify.theme.subheading3" :disabled="disabled">
      <span class="white--text subheading">{{prefix(title)}}</span>
    </v-chip>
    <span class="subheading">{{heading(title)}}</span>
  </p>
</v-flex>
</template>

<script>
export default {
  name: "SectionPart",
  props: {
    title: String,
    id: String,
    disabled: Boolean,
    //items:
    //length: ,
  },
  methods: {
    prefix(title)
    {
      let pre = title.split('.');
      return pre[0];
    },
    heading(title)
    {
      let pre = title.split('.');
      if (pre.length > 1)
        return pre[1];

      return pre[0];
    },
  },
  mounted() {
    //console.log(this.title);
  }
}
</script>