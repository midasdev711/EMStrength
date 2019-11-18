<template>
  <v-container grid-list-xl>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="secondary right mb-3"
          dark
          v-on="on">
          <v-icon class="mr-2">accessibility_new</v-icon>
          <template v-if="$vuetify.breakpoint.smAndUp">View body guide</template>
        </v-btn>
      </template>
      <h3 class="text-xs-center pt-4 pb-4 mb-0 white">Body Guide</h3>
      <div class="white"><img src="/img/body-guide1.png" class="img-responsive body-guide" alt="Body Guide"></div>
    </v-menu>
    <h2>Weekly average body weight: {{weekAvgWeight || "n/a"}} {{weightUnitLabel}}</h2>
    <v-alert
      :value="dataExist"
      color="warning"
      icon="priority_high"
      outline>
      Data for this week was already inputed, please wait until next week to input new data
    </v-alert>
    <v-stepper v-model="e6" vertical class="weekly-data">
      <v-stepper-step :complete="e6 > 1" step="1">
        Enter your weekly measurements below (in {{measurementUnitLabel}}):
        <small>(This should always be done on the same day each week, and weight done first thing in the morning after going to the toilet)</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-layout wrap>
          <v-flex xs12 sm4 pr-5>
            <v-text-field label="Height" placeholder="Enter number" type="number" :disabled="heightExist" oninput="if(Number(this.value) < 0) this.value = 0;" v-model="height"></v-text-field>
            <v-text-field label="Bicep (Right)" placeholder="Enter number" type="number" oninput="if(Number(this.value) < 0) this.value = 0;" v-model="bicep" :disabled="dataExist"></v-text-field>
            <v-text-field label="Neck" placeholder="Enter number" type="number" oninput="if(Number(this.value) < 0) this.value = 0;" v-model="neck" :disabled="dataExist"></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 pr-5>
            <v-text-field label="Waist (Small)" placeholder="Enter number" type="number" oninput="if(Number(this.value) < 0) this.value = 0;" v-model="waistsmall" :disabled="dataExist"></v-text-field>
            <v-text-field label="Waist (Belly button)" placeholder="Enter number" type="number" oninput="if(Number(this.value) < 0) this.value = 0;" v-model="waistbelly" :disabled="dataExist"></v-text-field>
            <v-text-field label="Hips" placeholder="Enter number" type="number" oninput="if(Number(this.value) < 0) this.value = 0;" v-model="hips" :disabled="dataExist"></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 pr-5>
            <v-text-field label="Glutes" placeholder="Enter number" type="number" oninput="if(Number(this.value) < 0) this.value = 0;" v-model="glutes" :disabled="dataExist"></v-text-field>
            <v-text-field label="Thigh (Right)" placeholder="Enter number" type="number" oninput="if(Number(this.value) < 0) this.value = 0;" v-model="thigh" :disabled="dataExist"></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2">Subjective measures of metabolism - Select an option from each of the drop downs:</v-stepper-step>
      <v-stepper-content step="2">
        <v-layout wrap>
          <v-flex xs12 sm6 md4 lg3>
            <v-select label="Stress" :items="measures['Stress']" v-model="measuresData['Stress']" :disabled="dataExist"></v-select>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <v-select label="Mood" :items="measures['Mood']" v-model="measuresData['Mood']" :disabled="dataExist"></v-select>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <v-select label="Skin" :items="measures['Skin']" v-model="measuresData['Skin']" :disabled="dataExist"></v-select>
          </v-flex>
          
          <v-flex xs12 sm6 md4 lg3>
            <v-select label="Energy" :items="measures['Energy']" v-model="measuresData['Energy']" :disabled="dataExist"></v-select>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <v-select label="Sleep (Quality)" :items="measures['SleepQuality']" v-model="measuresData['SleepQuality']" :disabled="dataExist"></v-select>
          </v-flex>
          
          <v-flex xs12 sm6 md4 lg3>
            <v-select label="Digestion (Poo)" :items="measures['DisgestionPoos']" v-model="measuresData['DisgestionPoos']" :disabled="dataExist"></v-select>
          </v-flex>
          
          <v-flex xs12 sm6 md4 lg3>
            <v-select label="Libido" :items="measures['Libidio']" v-model="measuresData['Libidio']" :disabled="dataExist"></v-select>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <v-select label="Training recovery" :items="measures['TrainingRecovery']" v-model="measuresData['TrainingRecovery']" :disabled="dataExist"></v-select>
          </v-flex>
          
          <v-flex xs12 sm6 md4 lg3>
            <v-select label="Sleep (Amount)" :items="measures['SleepAmount']" v-model="measuresData['SleepAmount']" :disabled="dataExist"></v-select>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <v-select label="Digestion (Gas/ bloating)" :items="measures.DisgestionGas" v-model="measuresData['DisgestionGas']" :disabled="dataExist"></v-select>
          </v-flex>
          
          <v-flex xs12 sm6 md4 lg3>
            <v-select label="Hunger" :items="measures['Hunger']" v-model="measuresData['Hunger']" :disabled="dataExist"></v-select>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <v-select label="Menstrual cycle information" :items="measures['MenstrualCycleInformation']" v-model="measuresData['MenstrualCycleInformation']" :disabled="dataExist" ></v-select>
          </v-flex>
        </v-layout>
        <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
        <v-btn flat @click="e6 = 1">Back</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3">Other measures - Select an option from each of the drop downs:</v-stepper-step>
      <v-stepper-content step="3">
        <v-layout wrap>
          <v-flex xs12 sm6 pr-5>
            <v-select label="Alcohol consumption" :items="measures['Alcohol']" v-model="measuresData['Alcohol']" :disabled="dataExist"></v-select>
          </v-flex>
          <v-flex xs12 sm6 pr-5>
            <v-select label="Hormonal contraception" :items="measures['Hormonal']" v-model="measuresData['Hormonal']" :disabled="dataExist"></v-select>
          </v-flex>
          <v-flex xs12 sm6 pr-5>
            <v-select label="Training adherance" :items="measures['TrainingAdherance']" v-model="measuresData['TrainingAdherance']" :disabled="dataExist"></v-select>
          </v-flex>
          <v-flex xs12 sm6 pr-5>
            <v-select label="Any medications" :items="measures['Medication']" v-model="measuresData['Medication']" :disabled="dataExist"></v-select>
          </v-flex>
        </v-layout>
        <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
        <v-btn flat @click="e6 = 2">Back</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 4" step="4">Notes - Type any additional notes</v-stepper-step>
      <v-stepper-content step="4">
        <v-textarea solo box rows="2" v-model="note" v-bind:placeholder="notePlaceholder()"></v-textarea>
        <v-btn color="primary" @click="submit" :loading="loading" :disabled="dataExist">Submit</v-btn>
        <v-btn flat @click="e6 = 3">Back</v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import Util from '@/util'

export default {
  name: "WeeklyData",
  data() {
    return {
      e6: 1,
      measure: [{value: '', text: "Select"}, {value: 'cms', text: "cms"}, {value: 'inches', text: "inches"}],
      loading: false,
      heightExist: false,
      dataExist: false,
      //weight
      averageKgs: 0,
      addedValues: 0,
      totalKgs: 0,
      weightData: [],
      weekAvgWeight: null,
      //inputs
      height: null,
      bicep: null,
      neck: null,
      waistsmall: null,
      waistbelly: null,
      hips: null,
      glutes: null,
      thigh: null,
      measures: {
        DisgestionGas: [],
        Stress: [],
        SleepQuality: [],
        Mood: [],
        Skin: [],
        TrainingRecovery: [],
        SleepAmount: [],
        DisgestionPoos: [],
        Energy: [],
        Libidio: [],
        Hunger: [],
        MenstrualCycleInformation: [],
        Alcohol: [],
        Hormonal: [],
        TrainingAdherance: [],
        Medication: []
      },
      measuresData: {
        DisgestionGas: null,
        Stress: null,
        SleepQuality: null,
        Mood: null,
        Skin: null,
        TrainingRecovery: null,
        SleepAmount: null,
        DisgestionPoos: null,
        Energy: null,
        Libidio: null,
        Hunger: null,
        MenstrualCycleInformation: null,
        Alcohol: null,
        Hormonal: null,
        TrainingAdherance: null,
        Medication: null
      },
      note: "",
      weightUnitLabel: "kgs",
      measurementUnitLabel: "cms",
      noteText: ""
    }
  },
  methods: {
    ...mapActions("app", {
      getAllMeasures: "getAllMeasures",
      saveMeasureData: "saveMeasureData",
      getMeasureData: "getMeasureData",
      getWeightofWeek: "getWeightofWeek",
      getHeight: "getCheckinData" 
    }),
    submit() {
      this.e6 = 1;
      var today = new Date();
      var weekNum = moment().isoWeek();
      const formData = {
        "week": weekNum,
        "year": today.getFullYear(),
        "height": this.height,
        "hips": this.hips,
        "bicep": this.bicep,
        "waistSmall": this.waistsmall,
        "glutes": this.glutes,
        "neck": this.neck,
        "waistBelly": this.waistbelly,
        "thigh": this.thigh,
        "stressId": this.measuresData.Stress,
        "moodId": this.measuresData.Mood,
        "sleepAmountId": this.measuresData.SleepAmount,
        "energyId": this.measuresData.Energy,
        "sleepQualityId": this.measuresData.SleepQuality,
        "skinId": this.measuresData.Skin,
        "digestionStoolId": this.measuresData.DisgestionPoos,
        "libidoId": this.measuresData.Libidio,
        "digestionGasId": this.measuresData.DisgestionGas,
        "trainingRecoveryId": this.measuresData.TrainingRecovery,
        "hungerId": this.measuresData.Hunger,
        "menstrualCycleId": this.measuresData.MenstrualCycleInformation,
        "alcoholId": this.measuresData.Alcohol,
        "hormonalContraceptionId": this.measuresData.Hormonal,
        "trainingAdherenceId": this.measuresData.TrainingAdherance,
        "medicationsId": this.measuresData.Medication
      };
      this.loading = true;
      return this.saveMeasureData(formData).then(result => {
        this.$toast.success('Successfully saved', {
          // override the global option
          // position: 'top-right'
        });
        this.loading = false;
      }).catch( e => {
        console.log(e);
      });
    },
    notePlaceholder(){
      let placeholder = "";
      let notes = [], noteString;
      for (let i = 0; i < this.measures['Medication'].length; i ++) {
        if (this.measuresData.Medication == this.measures['Medication'][i].id && this.measures['Medication'][i].title == "Yes") {
          notes.push("Medications");
        }
      }
      for (let i = 0; i < this.measures['Hormonal'].length; i ++) {
        if (this.measuresData.Hormonal == this.measures['Hormonal'][i].id && this.measures['Hormonal'][i].title == "Yes") {
          notes.push("Hormonal Contraception");
        }
      }
      noteString = notes.join(' and ');
      if ((noteString).length > 1) 
      {
        placeholder = "Remember to enter details of ";
        return placeholder + noteString;  // only one will display
      } else { 
        return "Notes to trainer";
      }
    },
    addFieldName(oldArray) {
      var newArray = [];
      newArray = oldArray.map(each => {
        var temp = each;
        temp['value'] = each['id'];
        temp['text'] = each['title'];
        return temp;
      });
      return newArray;
    },
    addToAverage(kgs) {
      this.totalKgs = this.totalKgs + Number(kgs);
      this.addedValues = this.addedValues + 1;
      this.averageKgs = Math.round(this.totalKgs / this.addedValues);
    },
    getWeightData () {
      var week = moment().isoWeek();
      this.getWeightofWeek(week).then(result => {
        this.weightData = result['data'];
        for (let i = 0; i < this.weightData.length; i++) {
          this.addToAverage(this.weightData[i]['weight']);
        }
        
        this.weekAvgWeight = this.averageKgs;

      });
    },
    getMeasuresData () {
      this.getAllMeasures().then(result => {
        this.measures['DisgestionGas'] = this.addFieldName(result['subjectiveMeasures']['Digestion (gas/bloating)']);
        this.measures['Stress'] = this.addFieldName(result['subjectiveMeasures']['Stress']);
        this.measures['SleepQuality'] = this.addFieldName(result['subjectiveMeasures']['Sleep quality']);
        this.measures['Mood'] = this.addFieldName(result['subjectiveMeasures']['Mood']);
        this.measures['Skin'] = this.addFieldName(result['subjectiveMeasures']['Skin']);
        this.measures['TrainingRecovery'] = this.addFieldName(result['subjectiveMeasures']['Training Recovery']);
        this.measures['SleepAmount'] = this.addFieldName(result['subjectiveMeasures']['Sleep amount']);
        this.measures['DisgestionPoos'] = this.addFieldName(result['subjectiveMeasures']['Digestion (poos)']);
        this.measures['Energy'] = this.addFieldName(result['subjectiveMeasures']['Energy']);
        this.measures['Libidio'] = this.addFieldName(result['subjectiveMeasures']['Libidio']);
        this.measures['Hunger'] = this.addFieldName(result['subjectiveMeasures']['Hunger']);
        this.measures['MenstrualCycleInformation'] = this.addFieldName(result['subjectiveMeasures']['Menstraul cycle information']);
        this.measures['Alcohol'] = this.addFieldName(result['objectiveMeasures']['Alcohol consumption']);
        this.measures['Medication'] = this.addFieldName(result["objectiveMeasures"]["Are you taking any medication"]);
        this.measures['Hormonal'] = this.addFieldName(result['objectiveMeasures']['Do you take any form of hormonal contraception or HRT?']);
        this.measures['TrainingAdherance'] = this.addFieldName(result['objectiveMeasures']['Training adherence']);
      });
    },
    setMesurementUnitLabel(){
      if(this.getDataUserProfile && this.getDataUserProfile.profile) {
        var unitLabels = Util.getUnitLabels(this.getDataUserProfile.profile.measure);
        this.weightUnitLabel = unitLabels.weight.plural.toLowerCase();
        this.measurementUnitLabel = unitLabels.height.plural.toUpperCase();
      }
    },
  },
  computed: {
    ...mapGetters("app", {
      getDataAllMeasures: "getDataAllMeasures",
      getDataMeasure: "getDataMeasure",
      getCheckinData: "getCheckinData"
    }),
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile",
    },)
  },
  watch: {
    getDataMeasure (newData, oldData) {
      if (newData) {
        this.heightExist = true;
        this.dataExist = true;
        this.bicep = newData['bicep'];
        this.neck = newData['neck'];
        this.waistsmall = newData['waistSmall'];
        this.waistbelly = newData['waistBelly'];
        this.hips = newData['hips'];
        this.glutes = newData['glutes'];
        this.thigh = newData['thigh'];
        this.measuresData = {
          DisgestionGas: newData['digestionGasId'],
          Stress: newData['stressId'],
          SleepQuality: newData['sleepQualityId'],
          Mood: newData['moodId'],
          Skin: newData['skinId'],
          TrainingRecovery: newData['trainingRecoveryId'],
          SleepAmount: newData['sleepAmountId'],
          DisgestionPoos: newData['digestionStoolId'],
          Energy: newData['energyId'],
          Libidio: newData['libidoId'],
          Hunger: newData['hungerId'],
          MenstrualCycleInformation: newData['menstrualCycleId'],
          Alcohol: newData['alcoholId'],
          Hormonal: newData['hormonalContraceptionId'],
          TrainingAdherance: newData['trainingAdherenceId'],
          Medication: newData['medicationsId']
        };
      }
    }
  },
  mounted() {
    this.setMesurementUnitLabel();

    var week = moment().isoWeek();
    var year = moment().year();
    if (this.getDataMeasure == null) {
      var params = `/${week}/${year}`;
      this.getMeasureData(params).then(res => {
        console.log(this.getDataMeasure);
      });
    }
    if (this.getCheckinData.length > 0) {
      this.height = this.getCheckinData[this.getCheckinData.length - 1].height;
      this.heightExist = true;
    }
    else {
      this.getHeight().then(res => {
        if (res.length > 0) {
          this.height = res[res.length - 1].height;
          this.heightExist = true;
        }
      });
    }
    this.getMeasuresData();
  }
}
</script>

<style lang="stylus" scoped>
.white
  overflow scroll
  .body-guide
    width 200%

.weekly-data {
  overflow hidden
  clear both
  &__short-selector {
    width: 100px;
    margin-right: 15px;
    float: left;
  }
  &__table {
    td, th {
      padding 10px;
      text-align: center;
      @media (max-width: 500px) {
        padding 3px;
        &, * {
          font-size: 12px !important;
        }
      }
    }
  }
}
</style>
