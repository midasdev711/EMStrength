<template>
  <v-container grid-list-xl class="terms">
    <v-card>
      <h2>Terms & Conditions</h2>
      <hr />

    

<h3>GENERAL</h3>
<p>This website (the “Site”) is owned and operated by Performance Synergy PTY LTD. By using the Site, you agree to be bound by these Terms of Service and to use the Site in accordance with these Terms of Service, our Privacy Policy and any additional terms and conditions that may apply to specific sections of the Site or to products and services available through the Site or from Performance Synergy PTY LTD. Accessing the Site, in any manner, whether automated or otherwise, constitutes use of the Site and your agreement to be bound by these Terms of Service.
</p>
<p>We reserve the right to change these Terms of Service or to impose new conditions on use of the Site, from time to time, in which case we will post the revised Terms of Service on this website. By continuing to use the Site after we post any such changes, you accept the Terms of Service, as modified. Intellectual Property Rights
</p>


<p>If you have any questions or problems, please let us know by contacting our support team directly: info@site.com.au
  </p>
<h3>DISCLAIMER</h3>
<p>Although it is highly unlikely, This policy may be changed at any time at our discretion. If we should update this policy, we will post the updates to this page on our Website. If you have any questions or concerns regarding our privacy policy please direct them to: info@site.com.au.
</p>    
    
    
    
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "TermsConditions",
  computed: {
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    })
  },
  methods: {
    back() {
      if (this.getDataUserProfile.userRoles.length > 0 ) {
        console.log("admin");
        this.$router.push({ name: 'AdminAccount' });
      }
      else {
        this.$router.push({ name: 'Account' });
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.terms
  @media (max-width 600px) {
    margin-top 5em
  }
</style>