<template>
  <v-dialog v-model="copyDialog" :lazy="true" persistent max-width="900">
    <template v-slot:activator="{ on }">
         <v-btn icon v-on="on">
            <v-icon>add_to_photos</v-icon>
         </v-btn>
    </template>
    <v-card>
      <v-btn icon class="right" @click="copyDialog = false">
        <v-icon>close</v-icon>
      </v-btn>
      <v-card-title class="headline">COPY MEAL #{{dialogId+1}}</v-card-title>
      <v-card-text>

        <DateSelectorMulti
          @update="updatesDates"
        />
        <v-btn
            color="default darken-1"
            class="copy-to-dates"
            text
            @click="copyToDates()">
            APPLY TO DATES
        </v-btn>
            
        <v-flex sm12 md6>
          <h4 class="mt-3" id="tab-statement">Warning: existing Meals on these dates will be replaced.</h4>
        </v-flex>

      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import DateSelectorMulti from "@/components/helper/DateSelectorMulti"
import moment from 'moment'
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CopyMeal",
  props: ['dialogId'],
  components: {
      DateSelectorMulti
  },
  data() {
    return {
      copyDialog: false,      
      selectedDates: [],
    };
  },
  computed: {
    // ...mapGetters("app", {
    //   getDataFoods: "getDataFoods",
    // }),
  },
  methods: {
    ...mapActions("app", {

    }),
    updatesDates(list)
    {
        this.selectedDates = list;
        console.log("updatesDates:");
        console.log(list);
    },
    copyToDates() {
      console.log("copyToDates:");
      console.log(this.selectedDates);
      this.$emit("copyMealToDates", {dialogId: this.dialogId, dates: this.selectedDates});
      this.copyDialog = false;
    },
  },
  watch: {
  },
  mounted() {
    /*  
    var today = new Date();
    this.selectedDates.push(today);
    var tomorrow = moment(today).add(1, "day");
    this.selectedDates.push(tomorrow);*/

    var today = moment(new Date());
    this.selectedDates = [];
    //this.dates.push(today.format("YYYY-MM-DD"));
    var tomorrow = moment(today).add(1, "day");
    this.selectedDates.push(tomorrow.format("YYYY-MM-DD"));
  }
};
</script>




