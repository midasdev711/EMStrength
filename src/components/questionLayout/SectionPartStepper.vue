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
  }
}
</script>