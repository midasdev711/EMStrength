<template>
  <v-container grid-list-xl class="terms">
    <v-btn class="v-btn--back-link" @click="back()">Back to Account</v-btn>
    <v-card>
      <h2>Terms & Conditions</h2>
      <hr />

    

<h3>GENERAL</h3>
<p>This website (the “Site”) is owned and operated by NuStrength PTY LTD. By using the Site, you agree to be bound by these Terms of Service and to use the Site in accordance with these Terms of Service, our Privacy Policy and any additional terms and conditions that may apply to specific sections of the Site or to products and services available through the Site or from NuStrength PTY LTD. Accessing the Site, in any manner, whether automated or otherwise, constitutes use of the Site and your agreement to be bound by these Terms of Service.
</p>
<p>We reserve the right to change these Terms of Service or to impose new conditions on use of the Site, from time to time, in which case we will post the revised Terms of Service on this website. By continuing to use the Site after we post any such changes, you accept the Terms of Service, as modified. Intellectual Property Rights
</p>
<h3>OUR LIMITED LICENSE TO YOU</h3>
<p>This Site and all the materials available on the Site are the property of us and/or our affiliates or licensors, and are protected by copyright, trademark, and other intellectual property laws. The Site is provided solely for your personal noncommercial use. You may not use the Site or the materials available on the Site in a manner that constitutes an infringement of our rights or that has not been authorised by us. More specifically, unless explicitly authorised in these Terms of Service or by the owner of the materials, you may not modify, copy, reproduce, republish, upload, post, transmit, translate, sell, create derivative works, exploit, or distribute in any manner or medium (including by email or other electronic means) any material from the Site. You may, however, from time to time, download and/or print one copy of individual pages of the Site for your personal, non-commercial use, provided that you keep intact all copyright and other proprietary notices.
</p>
<h3>YOUR LICENSE TO US</h3>
<p>By posting or submitting any material (including, without limitation, comments, blog entries, Facebook postings, photos and videos) to us via the Site, internet groups, social media venues, or to any of our staff via email, text or otherwise, you are representing: (i) that you are the owner of the material, or are making your posting or submission with the express consent of the owner of the material; and (ii) that you are thirteen years of age or older. In addition, when you submit, email, text or deliver or post any material, you are granting us, and anyone authorized by us, a royalty-free, perpetual, irrevocable, non-exclusive, unrestricted, worldwide license to use, copy, modify, transmit, sell, exploit, create derivative works from, distribute, and/or publicly perform or display such material, in whole or in part, in any manner or medium, now known or hereafter developed, for any purpose. The foregoing grant shall include the right to exploit any proprietary rights in such posting or submission, including, but not limited to, rights under copyright, trademark, service mark or patent laws under any relevant jurisdiction. Also, in connection with the exercise of such rights, you grant us, and anyone authorized by us, the right to identify you as the author of any of your postings or submissions by name, email address or screen name, as we deem appropriate.
</p>
<p>You acknowledge that NuStrength PTY LTD has the right but not the obligation to use and display any postings or contributions of any kind and that NuStrength PTY LTD may elect to cease the use and display of any such materials (or any portion thereof), at any time for any reason whatsoever.
</p>

<h3>LIMITATION OF LIABILITY</h3>
<p>UNDER NO CIRCUMSTANCES, INCLUDING, BUT NOT LIMITED TO, NEGLIGENCE, SHALL WE, OUR SUBSIDIARY AND PARENT COMPANIES OR AFFILIATES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES THAT RESULT FROM THE USE OF, OR THE INABILITY TO USE, THE SITE, INCLUDING OUR MESSAGING, BLOGS, COMMENTS OF OTHERS, BOOKS, EMAILS, PRODUCTS, OR SERVICES, OR THIRD-PARTY MATERIALS, PRODUCTS, OR SERVICES MADE AVAILABLE THROUGH THE SITE OR BY US IN ANY WAY, EVEN IF WE ARE ADVISED BEFOREHAND OF THE POSSIBILITY OF SUCH DAMAGES. (BECAUSE SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN CATEGORIES OF DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IN SUCH STATES, OUR LIABILITY AND THE LIABILITY OF OUR SUBSIDIARY AND PARENT COMPANIES OR AFFILIATES IS LIMITED TO THE FULLEST EXTENT PERMITTED BY SUCH STATE LAW.) YOU SPECIFICALLY ACKNOWLEDGE AND AGREE THAT WE ARE NOT LIABLE FOR ANY DEFAMATORY, OFFENSIVE OR ILLEGAL CONDUCT OF ANY USER. IF YOU ARE DISSATISFIED WITH THE SITE, ANY MATERIALS, PRODUCTS, OR SERVICES ON THE SITE, OR WITH ANY OF THE SITE’S TERMS AND CONDITIONS, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SITE AND THE PRODUCTS, SERVICES AND/OR MATERIALS.
</p>
<h3>RESULTS</h3>
<p>Results May Vary: the weight loss/body recomposition results and testimonials are in no way a guarantee of results. Individual weight loss/fat loss results, including amount and time, will vary. Whether genetic or environmental, it should be noted that food intake, rates of metabolism and experience strength training will vary from person to person. This means weight loss/fat loss results will also vary from person to person. No individual result should be seen as typical, email info@nustrength.com.au if you have any questions.
</p>
<h3>TERMINATION</h3>
<p>Should you choose to purchase any product or service, NuStrength PTY LTD may cancel or terminate your right to use the Site or any part of the Site at any time without notice. In the event of cancellation or termination, you are no longer authorised to access the part of the Site affected by such cancellation or termination. The restrictions imposed on you with respect to material downloaded from the Site, and the disclaimers and limitations of liabilities set forth in these Terms of Service, shall survive.
</p>
<h3>REFUND POLICY</h3>
<p>We at NuStrength PTY LTD want you to be satisfied with your purchase with any of our products.
</p>
<p>If you have any questions or problems, please let us know by contacting our support team directly: info@nustrength.com.au
  </p>
<h3>DISCLAIMER</h3>
<p>Although it is highly unlikely, This policy may be changed at any time at our discretion. If we should update this policy, we will post the updates to this page on our Website. If you have any questions or concerns regarding our privacy policy please direct them to: info@nustrength.com.au.
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