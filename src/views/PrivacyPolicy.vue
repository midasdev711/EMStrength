<template>
  <v-container grid-list-xl class="privacy">
    <v-card>
      <!-- <h2>Privacy Policy</h2> -->
      <p>Your privacy is important to us. It is Performance Synergy Pty Ltd's policy to respect your privacy regarding any information we may collect from you across our website, <a href="http://energyhealthinc.com">http://energyhealthinc.com</a>, and other sites we own and operate.
      <br><br>
      We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
      <br><br>
      We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.
      <br><br>
      We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
      <br><br>
      Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
      <br><br>
      You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
      <br><br>
      Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
      <br><br>
      This policy is effective as of 17 April 2020.
      </p>
    
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "PrivacyPolicy",
  computed: {
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    })
  },
  methods: {
    back() {
      if (this.getDataUserProfile.userRoles.length > 0 ) {
        this.$router.push({ name: 'AdminAccount' });
      }
      else {
        this.$router.push({ name: 'Account' });
      }
    }
  },
  mounted() {
    window.scrollTo(0,0);
  }
}
</script>

<style lang="stylus" scoped>
.privacy
  @media (max-width 600px) {
    margin-top 5em
  }

p 
  font-size 18px
</style>