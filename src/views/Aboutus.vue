<template>
  <v-container grid-list-xl class="terms">
    <v-card sm6>
      <h2>About the Energy Health Team</h2>
      <p>
        Sean &amp; Kate have worked tirelessly for over a decade to create the Energy Health Diagnostic, integrating the scientific research and practical, applied wisdom around energy management, within a tool for measuring human health, helping people to identify stress-recovery imbalances to which they can respond with effective strategies to get back in balance.  
        <br><br>
        Sean &amp; Kate have further developed a comprehensive program around the Diagnostic that provides the insights ,coaching support, and practical tools to help people get the best out of themselves - in health, performance &amp; life!
      </p>
      <v-layout wrap>
        <v-flex xs12 sm3>
          <img src="/static/avatar/Sean Headshot EM App.jpeg" width="100%">
        </v-flex>
        <v-flex xs12 sm9>
          <h2>Dr Sean Richardson</h2>
          <p>
            Sean’s unique experience working with leaders to the best out of their teams in high pressure environments positions him at the forefront of behavioural high performance. A PhD in performance psychology, examining burnout and energy management in elite performers, Sean intuitively understands what starts and stops people from succeeding. 
            <br><br>
            Combining an understanding of brain science and function, with a track record of delivering successful behavioural change strategies, and culture development programs to small and large organisations, and experience in mentoring professional sports and corporate teams to achieve excellence, Sean facilitates high performance development to get teams to optimum energy health and wellbeing, communicating and collaborating effectively, adhering to the highest standards of compliance, executing with maximum accountability, and achieving both individual and organisational goals. 
            <br><br>
            As a registered psychologist, Sean also brings a distinctly human, compassionate side to his work, helping individuals in need to navigate the more challenging personal and emotional roadblocks that arise in managing stress and mental health.
          </p>
        </v-flex>
      </v-layout>
      <v-layout wrap>
        <v-flex xs12 sm3>
          <img src="/static/avatar/Kate Headshot EM App.jpeg" width="100%">
        </v-flex>
        <v-flex xs12 sm9>
          <h2>Kate Richardson BA/Bcs </h2>
          <p>
            Having started working life as a Business Analyst and Strategic marketer, Kate made a significant practical and mindset shift to pursue her career in Health &amp; Fitness. Combining her passion for health, fitness and nutrition, with a strong business orientation, and a keen interest in personal development, Kate has developed a unique skillset for helping people achieve transformational changes in their mental and physical wellbeing.   
            <br><br>
            Combining an understanding of brain science and function, with a track record of delivering successful behavioural change strategies, and culture development programs to small and large organisations, and experience in mentoring professional sports and corporate teams to achieve excellence, Sean facilitates high performance development to get teams to optimum energy health and wellbeing, communicating and collaborating effectively, adhering to the highest standards of compliance, executing with maximum accountability, and achieving both individual and organisational goals.
            <br><br>
            As a registered psychologist, Sean also brings a distinctly human, compassionate side to his work, helping individuals in need to navigate the more challenging personal and emotional roadblocks that arise in managing stress and mental health.
          </p>
        </v-flex>
      </v-layout>
      
      
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

h2
  color #1c4698

p 
  font-size 18px
</style>