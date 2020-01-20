<template>
<v-layout justify-center class="pa-2">
  <v-flex xs12 sm6>
    <v-card color="" class="black--text" v-if="topNotification & recoveryData.length > 0">
      <v-card-title primary-title>
        <div>
          <h3>Adopt one of these activities each week. When you have mastered it ... Lorem ipsum dolor sit amet</h3>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat @click="topNotification = false">Got it!</v-btn>
      </v-card-actions>
    </v-card>
    <v-card :color="color" v-for="questions in recoveryData" v-if="recoveryData.length > 0" class="question-box mb-2 mt-2">
      <v-card-title>
        <span class="title">{{questions.title}}</span>
        <v-toolbar-side-icon @click="dialog = true"></v-toolbar-side-icon>
      </v-card-title>  
      <v-container fluid>
        <v-checkbox v-model="question.done" v-if="question.done | !getRecoveryCheck" :label="question.remedy" v-for="question in questions.questions"></v-checkbox>
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
    <v-card v-if="recoveryData.length == 0">
      <v-card-title>
        <h2>Your recovery Do list is empty</h2>
        <img src="/img/Eden-2.png" width="100%"/>
      </v-card-title>  
      <v-container fluid align-center text-center>
        <h3 class="text-justified">To identify imbalances in your life and the ways to recover we will guide you though questions.</h3>
        <v-btn color="success" @click="$router.push({ name: 'Symptom Checklist'})">Get started</v-btn>
        <h3>allow up to 15 mins to complete</h3>
      </v-container>
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
      questionLists: [],
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
    },
    recoveryData() {
      let result = [];
      let categories = [];
      for (let i = 0;i < this.getRecoveryData.length;i ++) {
        let category = this.getRecoveryData[i].category;
        // if it's a new category, add new questions Object to questionList
        if (categories.indexOf(category) < 0) {
          categories.push(category);
          result.push({
            title: category,
            questions: [this.getRecoveryData[i]]
          });
        } else {
          // if it's an existing category
          for (let j = 0; j < result.length; j ++) {
            if (result[j].title == category) {
              result[j].questions.push(this.getRecoveryData[i]);
            }
          }
        }
      }
      return result;
    }
  },
  methods: {
    ...mapActions("app", {
      resetState: "resetState",
      setRecoveryCheck: "setRecoveryCheck",
      getAllRecovery: "getAllRecovery",
      saveRecovery: "saveRecovery"
    }),
    commenceQuestionnaire() {
      
    },
    postAnswer() {

    }
  },
  mounted() {
    this.getAllRecovery();
  }
}
</script>

<style lang="stylus" scoped>
.v-card__actions
  justify-content flex-end
.text-justified
  text-align justify
.text-center
  text-align center
</style>