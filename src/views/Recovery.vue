<template>
  <v-layout justify-center class="pa-2">
    <div class="text-xs-center" v-if="isLoading">
      <vue-circle
        :progress="100"
        :size="300"
        :reverse="false"
        line-cap="round"
        :fill="fill"
        empty-fill="rgba(200, 200, 200, .8)"
        :animation="{ duration: 1000, easing: 'circleProgressEasing' }"
        :animation-start-value="0.0"
        :start-angle="0"
        insert-mode="append"
        :thickness="12"
        :show-percent="false"
      >
        <img src="/img/Eden-4.png" width="80%" />
      </vue-circle>
    </div>
    <v-flex xs12 sm6 v-else>
      <v-card v-if="getSymptomUpdated == null">
        <v-card-title align-center justify-center>
          <h2 class="text-center">Building your Energy Health through Recovery</h2>
          <img src="/img/Eden-2.png" width="60%" />
        </v-card-title>
        <v-container fluid align-center text-center >
          <h3
            class="text-left"
          >
            There are 2 essential steps in balancing your Energy Health to sustain Wellbeing and ensure you can Perform at your Best:
            <br><br>
            1. Diagnosing your current Energy Health<br>
            2. Responding to energy imbalances with Increased Recovery
            <br><br>
            Get started with the Diagnostic by going through the Energy Health Symptom Checklist, and then kickstart your Energy Wellbeing and Performance with our guided Recovery To DO-List.
          </h3>
          <v-btn color="success" @click="$router.push({ name: 'Symptom Checklist'})">Get started</v-btn>
          <h3>The Energy Health Symptom Checklist typically takes 5-10 minutes to complete.</h3>
        </v-container>
      </v-card>
      <v-card
        color
        class="black--text mt-2"
        v-if="getSymptomUpdated != null & !getDataUserProfile.recoveryChecked & getRecoveryData.length > 0"
      >
        <v-card-title primary-title>
          <div>
            <p>
              These are Recovery Activity Lists for
              <br><br>
              (1) Mental/Emotional Recovery<br>
              (2) Physical Recovery<br><br>

              The lists are 30 items long, presented 6 items at a time, in order of positive impact on your Energy Health, Stress-Recovery balance. 
              <br><br>
              Adopt 1-3 activities at a time to improve your energy levels. Maintain as many recovery activities as possible to sustain energy health and to reach for higher performance. If, at any time, your symptoms become concerning or are experienced as unmanageable, consult a physician and other relevant health care providers (e.g. psychologist).
            </p>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat @click="visitRecovery">Got it!</v-btn>
        </v-card-actions>
      </v-card>
      <template v-if="getSymptomUpdated != null & getRecoveryData.length > 0">
        <v-card
          dark
          v-bind:color="questions.rating | shadeBackgroundColor(colorRating)"
          v-for="(questions, index) in getRecoveryData"
          :key="index + '-recoverysection'"
          class="question-box mb-2 mt-2"
        >
          <v-card-title>
            <span class="title">{{questions.category}}</span>
            <v-layout align-center justify-end>
              <v-icon
                large
                @click="showHelpDialog(questions.category, questions.rating, questions.lastCompleted)"
              >help</v-icon>
            </v-layout>
          </v-card-title>
          <v-container fluid>
            <v-checkbox
              :key="question.recoveryId"
              v-model="question.done"
              v-if="(question.done == null ? true : false) | !getRecoveryCheck"
              :label="question.remedy"
              v-for="question in questions.items"
              @change="updateComponentValue(question.recoveryId, question.done)"
            ></v-checkbox>
          </v-container>
        </v-card>
      </template>

      <v-dialog v-model="dialog">
        <v-card>
          <v-card-title class="headline">{{dialogData.category}} Recovery</v-card-title>

          <v-card-text>
            <v-layout>
              <v-icon medium :color="dialogData.rating | shadeBackgroundColor(colorRating)">label</v-icon>
              <span class="pl-10">{{dialogData.rating | ratingFilter}}</span>
            </v-layout>
            <p>Last assessed {{ getSymptomUpdated | daysAgo }}</p>
            <p v-html="dialogData.content"></p>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="green darken-1"
              flat="flat"
              @click="dialog = false; commenceQuestionnaire();"
            >RE-RUN</v-btn>

            <v-btn color="green darken-1" flat="flat" @click="dialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import VueCircle from "vue2-circle-progress";
import { mapActions, mapGetters } from "vuex";

import moment from "moment";

export default {
  data() {
    return {
      firstTime: true,
      dialog: false,
      dialogData: {
        category: "",
        rating: "",
        lastCompleted: "",
        content: ""
      },
      topNotification: true,
      colorRating: {
        Default: "#c3e2ef",
        Poor: "#f94e83",
        NeedsImproving: "#ff9d00",
        CouldBeImproved: "#8fcb64",
        Excellent: "#47bbe9"
      },
      questionLists: [],
      checkbox1: true,
      checkbox2: false,
      hidden: false,
      isLoading: true,
      fill: { gradient: ["#48cba2", "#47bbe9"] },
    };
  },
  components: {
    VueCircle
  },
  computed: {
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile",
      getSymptomUpdated: "getSymptomUpdated"
    }),
    ...mapGetters("app", {
      getRecoveryCheck: "getRecoveryCheck",
      getRecoveryData: "getRecoveryData"
    }),
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav;
    }
  },
  filters: {
    daysAgo(when) {
      if (when == undefined) return "never";
      const date = moment(when);
      return date.fromNow();
    },
    shadeBackgroundColor(rating, colorRating) {
      return colorRating[rating];
    },
    ratingFilter(rating) {
      if (rating == 'CouldBeImproved') {
        return 'Keep it going'
      } else if (rating == 'NeedsImproving') {
        return 'Needs improving'
      } else if (rating == 'Poor') {
        return 'Urgent action'
      }
    }
  },
  methods: {
    ...mapActions('auth', {getMe: "getMe"}),
    ...mapActions("app", {
      resetState: "resetState",
      setRecoveryCheck: "setRecoveryCheck",
      getAllRecovery: "getAllRecovery",
      saveRecovery: "saveRecovery",
      _visitRecovery: "visitRecovery"
    }),

    visitRecovery() {
      this.topNotification = false
      this._visitRecovery()
    },

    commenceQuestionnaire() {
      this.isLoading = true;
      this.getAllRecovery().then(res => {
        this.isLoading = false;
        this.firstTime = true;
      });  
    },

    showHelpDialog(category, rating, lastCompleted) {
      this.dialogData.category = category;
      this.dialogData.rating = rating;
      this.dialogData.lastCompleted = lastCompleted;
      if (category == 'Physical' && rating == 'CouldBeImproved') {
        this.dialogData.content = `From last assessment, your Energy Health Symptoms look OK. Keep up your current Recovery Activities. 
        <br><br>
        Every time you feel your energy levels change, it is helpful to re-run the diagnostic. If energy is balanced and you want to reach for higher performance, adopt 2-3 extra activities from the Recovery To-DO List.
        `
      } else if (category == 'Physical' && rating == 'Poor') {
        this.dialogData.content = `On last assessment, your Energy Health Symptoms suggest a significant energy imbalance. Ensure you have adopted 3-5 activities from the Recovery To-DO List. 
          <br><br>
          Also, postpone any demanding activities that are not high priority, and let go of stressors that are beyond your control.
          <br><br>
          Re-run the diagnostic regularly and continue to adopt Recovery Activities until your Symptoms suggest your energy is balanced again. Consult a physician for any Physical health concerns.
        `
      } else if (category == 'Physical' && rating == 'NeedsImproving') {
        this.dialogData.content = `On last assessment, your Energy Health Symptoms suggest a moderate energy imbalance. Ensure you have adopted 1-3 activities from the Recovery To-DO List. 
          <br><br>
          Re-run the diagnostic regularly and continue to adopt Recovery Activities until your Symptoms suggest your energy is balanced again. Consult a physician for any Physical health concerns.
        `
      } else if ((category == 'Mental' || category == 'Emotional') && rating == 'CouldBeImproved') {
        this.dialogData.content = `From last assessment, your Energy Health Symptoms look OK. Keep up your current Recovery Activities. 
        <br><br>
        Every time you feel your energy levels change, you can re-run the diagnostic and adopt Recovery Activities to re-establish energy balance. If energy is balanced and you want to reach for higher performance, adopt 2-3 extra activities from the Recovery To-DO List.
        `
      } else if ((category == 'Mental' || category == 'Emotional') && rating == 'Poor') {
        this.dialogData.content = `On last assessment, your Energy Health Symptoms suggest a significant energy imbalance. Ensure you have adopted 3-5 activities from the Recovery To-DO List. 
          <br><br>
          Also, postpone any demanding activities in your life that are not high priority, and where you can, let go of stressors that are beyond your control.
          <br><br>
          Re-run the diagnostic regularly and continue to adopt Recovery Activities until your Symptoms suggest your energy is balanced again. Consult a physician and psychologist for any Mental Health concerns.
        `
      } else if ((category == 'Mental' || category == 'Emotional') && rating == 'NeedsImproving') {
        this.dialogData.content = `On last assessment, your Energy Health Symptoms suggest a moderate energy imbalance. Ensure you have adopted at least 2-3 activities from the Recovery To-DO List. 
          <br><br>
          Re-run the diagnostic regularly and continue to adopt Recovery Activities until your Symptoms suggest your energy is balanced again. Consult a physician and psychologist for any Mental Health concerns.
        `
      }

      
      
      this.dialog = true;
      console.log(category)
    },

    hex2(c) {
      c = Math.round(c);
      if (c < 0) c = 0;
      if (c > 255) c = 255;

      var s = c.toString(16);
      if (s.length < 2) s = "0" + s;

      return s;
    },

    color(r, g, b) {
      return "#" + this.hex2(r) + this.hex2(g) + this.hex2(b);
    },

    shade(col, light) {
      // TODO: Assert that col is good and that -1 < light < 1

      var r = parseInt(col.substr(1, 2), 16);
      var g = parseInt(col.substr(3, 2), 16);
      var b = parseInt(col.substr(5, 2), 16);

      if (light < 0) {
        r = (1 + light) * r;
        g = (1 + light) * g;
        b = (1 + light) * b;
      } else {
        r = (1 - light) * r + light * 255;
        g = (1 - light) * g + light * 255;
        b = (1 - light) * b + light * 255;
      }

      return this.color(r, g, b);
    },

    adjustCol(color, amount) {
      return this.shade(color, 0.7);
    },
    updateComponentValue(id, done) {
      if (done == false) {
        return;
      }
      let currentTime = new Date().toISOString();
      let data = {
        itemId: id,
        done: currentTime
      };
      return this.saveRecovery(data)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          throw err;
        });
    }
  },
  mounted() {
    this.getMe().then(res => {
      this.getAllRecovery().then(res => {
        this.isLoading = false;
        this.firstTime = true;
      });  
    })
    
  }
};
</script>

<style lang="stylus" scoped>
>>>.accent--text {
  color: #fff !important;
  caret-color: #fff !important;
}

.v-card__actions {
  justify-content: flex-end;
}

.v-card__title img {
  margin 0 auto
}

.text-justified {
  text-align: justify;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.justify-center {
  justify-content: center
}

.pl-10 {
  padding-left: 10px;
}

>>>.v-dialog
  max-width 50%
  @media (max-width: 500px) {
    max-width 90%
    line-height 18px
    .v-card {
      padding 10px
    }

    .v-card__title, .v-card__text {
      padding 5px
    }

    .v-card__title {
      padding-bottom 15px
    }
  }

  @media (max-width: 500px) {
    max-width 90%
    line-height 18px

    .v-card__title {
      padding-bottom 15px
      font-size 20px!important
    }
  }
</style>