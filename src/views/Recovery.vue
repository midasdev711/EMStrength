<template>
<v-layout justify-center class="pa-2">
  <v-flex xs12 sm6>
    <v-card color="" class="black--text" v-if="topNotification">
      <v-card-title primary-title>
        <div>
          <h3>Adopt one of these activities each week. When you have mastered it ... Lorem ipsum dolor sit amet</h3>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat @click="topNotification = false">Got it!</v-btn>
      </v-card-actions>
    </v-card>
    <v-card :color="color" v-for="questions in questionLists" class="question-box mb-2 mt-2">
      <v-card-title>
        <span class="title">{{questions.title}}</span>
        <v-toolbar-side-icon @click="dialog = true"></v-toolbar-side-icon>
      </v-card-title>  
      <v-container fluid>
        <v-checkbox v-model="question.value" v-if="question.value | !getRecoveryCheck" :label="question.questionText" v-for="question in questions.questions"></v-checkbox>
      </v-container>
      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">{{questions.title}} Recovery</v-card-title>

          <v-card-text>
            Last assessed 14 days ago
            When you feel this aspect of your life has changed, re-run the diagnostic questionnaire
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="green darken-1"
              flat="flat"
              @click="dialog = false; commenceQuestionnaire();"
            >
              RE-RUN
            </v-btn>

            <v-btn
              color="green darken-1"
              flat="flat"
              @click="dialog = false"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
    
  </v-flex>
</v-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data () {
    return {
      dialog: false,
      topNotification: true,
      color: "#c3e2ef",
      questionLists: [{
        title: "Physical",
        questions: [{
            id: "n-a",
            questionText: "Waking 5 mins stretching",
            value: false
          }, {
            id: "n-a",
            questionText: "morning 10 - 15 mins walking",
            value: false
          }, {
            id: "n-a",
            questionText: "fruit & vegetables breakfast smoothly",
            value: false
          }, {
            id: "n-a",
            questionText: "glass of water (before coffee)",
            value: false
          }]
        }, {
          title: "Mental & Emotional",
          questions:[{
            id: "n-a",
            questionText: "10 mins meditation after walking",
            value: false
          }, {
            id: "n-a",
            questionText: "review positives in your life",
            value: false
          }, {
            id: "n-a",
            questionText: "fruit & vegetables breakfast smoothly",
            value: false
          }, {
            id: "n-a",
            questionText: "glass of water (before coffee)",
            value: false
          }]}
      ],
      checkbox1: true,
      checkbox2: false,
      hidden: false
    }
  },
  computed: {
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    }),
    ...mapGetters("app", {
      getRecoveryCheck: "getRecoveryCheck",
      getRecoveryData: "getRecoveryData"
    }),
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav
    }
  },
  methods: {
    ...mapActions("app", {
      resetState: "resetState",
      setRecoveryCheck: "setRecoveryCheck",
      getAllRecovery: "getAllRecovery"
    }),
    commenceQuestionnaire() {
      
    }
  },
  mounted() {
    this.getAllRecovery();
    console.log(this.getRecoveryData);
  }
}
</script>

<style lang="stylus" scoped>
.v-card__actions
  justify-content flex-end
</style>