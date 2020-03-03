<template>
  <v-container grid-list-xl class="privacy">
    <v-card>
      <h2>Privacy Policy</h2>
      <hr />

<p>Performance Synergy Pty Ltd understands that your privacy is important to you. We are committed to protecting the privacy of your personally-identifiable information as you use this website. This Privacy Policy tells you how we protect and use information that we gather from you. By using this website, you consent to the terms described in the most recent version of this Privacy Policy. You should also read our Terms of Use to understand the general rules about your use of this website, and any additional terms that may apply when you access particular services or materials on certain areas of this website. “We,” “our” means Performance Synergy PTY LTD and its affiliates. “You,” “your,” visitor,” or “user” means the individual accessing this site.
</p>
<h3>PERSONAL AND NON-PERSONAL INFORMATION</h3>
<p>Our Privacy Policy identifies how we treat your personal and non-personal information.</p>

<h3>WHAT IS NON-PERSONAL INFORMATION AND HOW IS IT COLLECTED AND USED?</h3>
<p>Non personal information is information that cannot identify you. If you visit this web site to read information, such as information about one of our services, we may collect certain non-personal information about you from your computer’s web browser. Because non-personal information cannot identify you or be tied to you in any way, there are no restrictions on the ways that we can use or share non-personal information. What is personal information and how is it collected? Personal information is information that identifies you as an individual, such as your name, mailing address, e-mail address, telephone number, and fax number. We may collect personal information from you in a variety of ways:
</p>
<ol>
<li>When you send us an application or other form</li>

<li>When you conduct a transaction with us, our affiliates, or others</li>

</ol>
<h3>LINKS</h3>
<p>This site contains links to other sites that provide information that we consider to be interesting. Performance Synergy PTY LTD is not responsible for the privacy practices or the content of such web sites.
</p>
<h3>PUBLIC DISCUSSIONS</h3>
<p>This site may provide public discussions on various business valuation topics. Please note that any information you post in these discussions will become public, so please do not post sensitive information in the public discussions. Whenever you publicly disclose information online, that information could be collected and used by others. We are not responsible for any action or policies of any third parties who collect information that users disclose in any such forums on the web site. Performance Synergy PTY LTD does not agree or disagree with anything posted on the discussion board. Also remember that you must comply with our other published policies regarding postings on our public forums.
</p>
<h3>HOW CAN A USER ACCESS, CHANGE, AND/OR DELETE PERSONAL INFORMATION?</h3>
<p>You may access, correct, update, and/or delete any personally-identifiable information that you submit to the web site. You may also unsubscribe from mailing lists or any registrations on the web site. To do so, please either follow instructions on the page of the web site on which you have provided such information or subscribed or registered or contact us at [info@site.com.au]
</p>
<h3>CHILDREN’S PRIVACY</h3>
<p>Performance Synergy PTY LTD will not intentionally collect any personal information (such as a child’s name or email address) from children under the age of 13. If you think that we have collected personal information from a child under the age of 13, please contact us.
</p>
<h3>CHANGES</h3>
<p>Performance Synergy PTY LTD reserves the right to modify this statement at any time. Any changes to this Privacy Policy will be listed in this section, and if such changes are material, a notice will be included on the homepage of the web site for a period of time. If you have any questions about privacy at any websites operated by Performance Synergy PTY LTD or about our website practices, please contact us at: info@site.com.au.
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
</style>