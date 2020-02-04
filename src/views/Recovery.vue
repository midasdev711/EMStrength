<template>
<v-layout justify-center class="pa-2">
  <v-flex xs12 sm6 v-if="isLoading" justify-center>
    <v-progress-circular
      :size="70"
      :width="7"
      color="orange"
      indeterminate
    ></v-progress-circular>
  </v-flex>
  <v-flex xs12 sm6 v-else>
    <v-card color="" class="black--text" v-if="topNotification & getRecoveryData.length > 0">
      <v-card-title primary-title>
        <div>
          <h3>Adopt one of these activities each week. When you have mastered it ... Lorem ipsum dolor sit amet</h3>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat @click="topNotification = false">Got it!</v-btn>
      </v-card-actions>
    </v-card>
    <v-card :color="questions.rating | shadeBackgroundColor(colorRating)" v-for="questions in getRecoveryData" v-if="getRecoveryData.length > 0" class="question-box mb-2 mt-2">
      <v-card-title>
        <span class="title">{{questions.category}}</span>
        <v-toolbar-side-icon @click="dialog = true"></v-toolbar-side-icon>
      </v-card-title>  
      <v-container fluid>
        <v-checkbox :key="question.recoveryId" v-model="question.done" v-if="(question.done ? true : false) | !getRecoveryCheck" :label="question.remedy" v-for="question in questions.items" @change="updateComponentValue(question.recoveryId, question.done)"></v-checkbox>
      </v-container>
      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">{{questions.category}} Recovery</v-card-title>

          <v-card-text>
            <v-layout justify-space-around>
              <v-icon large color="green darken-2">label</v-icon>
              <h4>{{questions.rating}}</h4>
            </v-layout>
            <p>Last assessed {{questions.lastCompleted | daysAgo }} </p>
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
    <v-card v-if="getRecoveryData.length == 0">
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

import moment from 'moment'

export default {
  data () {
    return {
      dialog: false,
      topNotification: true,
      colorRating: {
        Default: '#c3e2ef',
        Poor: '#f94e83', 
        NeedsImproving: '#ff9d00',
        CouldBeImproved: '#8fcb64',
        Excellent: '#47bbe9'
      },
      questionLists: [],
      checkbox1: true,
      checkbox2: false,
      hidden: false,
      isLoading: true,
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
  filters: {
    daysAgo(when) {
      if (when == undefined) return "never";
      const date = moment(when);
      return date.fromNow();
    },
    shadeBackgroundColor(rating, colorRating){
      return colorRating[rating]
      //adjustCol(col, -20); //this.colorRating.default; // // "#c3e2ef";// this.color.default;
    },
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
    adjustCol(color, amount) {
      return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    },
    updateComponentValue(id, done) {
      if (done == false) {
        return;
      }
      console.log(id, done);
      let currentTime = new Date().toISOString();
      let data = {
        itemId: id,
        done: currentTime
      }
      console.log(data);
      return this.saveRecovery(data).then(res => {
        console.log(res);
      }).catch(err => {
        throw err;
      })
    },
  },
  mounted() {
    this.getAllRecovery().then(res => {
      this.isLoading = false;

      
      //this.colorRating.default = '#c3e2ef';
      //this.colorRating.poor = '#f94e83';
      
      //console.log(this.colorRating);
      /*  needsImproving: '#ff9d00',
        couldBeImproved: '#8fcb64',
        excellent: '#47bbe9'
      };*/

    });
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