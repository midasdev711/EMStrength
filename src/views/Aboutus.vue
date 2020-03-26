<template>
  <v-container grid-list-xl class="terms">
    <v-card>
      <h2>The Energy Health Diagnostic</h2>
      <hr />
      <p>
        Welcome to the first steps in making a positive change to your Energy Health!
          <br><br>
        Based in  research, this Diagnostic measures stress and recovery levels, providing information necessary to build a foundation of health for Mental and Physical Wellbeing &amp; Performance.
        <br><br>
        We are thrilled to go on this journey with you, sharing insights on how to get the best out of yourself and your life! 
        <br><br>
        We look forward to seeing you create positive change through improving recovery!
        <br><br>
        Dr Sean &amp; Kate Richardson<br>
        Founders, Energy Health Inc
      </p>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "Aboutus",
  computed: {
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    })
  },
  methods: {
    back() {
      if (this.getDataUserProfile.userRoles.length > 0 ) {
        console.log("admin");
      }
      else {
      }
    }
  },
  mounted() {
    window.scrollTo(0,0);
  }
}
</script>

<style lang="stylus" scoped>
.terms
  @media (max-width 600px) {
    margin-top 5em
  }
</style>