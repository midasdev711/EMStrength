<template>
 <v-flex xs12>
    <v-chip color="teal">
      <span class="white--text subheading">{{prefix(title)}}</span>
    </v-chip>
    <span class="subheading">{{heading(title)}}</span>
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
  }
}
</script>