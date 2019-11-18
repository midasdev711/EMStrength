<template>
  <v-card>
    <v-data-table
      :headers="keys.headers"
      :items="keys.summary"
      class="summary"
      hide-actions
      ref="dataTable"
    >
      <template v-slot:items="props">
        <transition-group name="transition-td" tag="tr">
          <td class="transition-td" :key="props.item.title" v-bind:class="{ 'total_record': props.item.is_total, 'is_indent': props.item.is_indent }" v-bind:style="{'fontWeight': props.item.is_bold ? 600 : 400 }" :title="props.item.title">{{ props.item.title }}</td>
          <td :key="props.item.title + 'latest'" class="text-xs-center transition-td" v-bind:class="{ 'total_record': props.item.is_total }" v-if="'latest' in props.item">{{ props.item.latest }}</td>
          <td :key="props.item.title + value" class="text-xs-center common-td transition-td" v-bind:class="{ 'total_record': props.item.is_total }" v-for="value in props.item.count">
            {{ props.item['date' + value] }}
          </td>
        </transition-group>
      </template>
    </v-data-table>
    
    <v-btn text icon color="transparent" @click="prev" id="prev_page">
      <v-icon color="grey">chevron_left</v-icon>
    </v-btn>
    <v-btn text icon color="transparent" @click="next" id="next_page">
      <v-icon color="grey">chevron_right</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: "WeeklyMeasuresSummary",
  data: () => ({
    keys: {
      headers: [{
          text: '',
          sortable: false,
          value: 'title'
        },{
          text: 'Latest',
          sortable: false,
          value: 'latest'
        }],
      summary: []
    },
    currentPage: 1,
    columnCount: 3,
    windowWidth: 0,
    originData: [],
    loading: true
  }),
  watch: {
    getWeeklyDataAdmin(newData, oldData) {
      this.onDataChange(newData, oldData);
    },
    getWeeklyData (newData, oldData) {
      this.onDataChange(newData, oldData);
    }
  },
  computed: {
    ...mapGetters("admin", {
      getWeeklyDataAdmin: "getWeeklySummary"
    }),
    ...mapGetters("app", {
      getWeeklyData: "getWeeklySummary"
    })
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions("app", {
      getWeeklySummary: "getWeeklySummary"
    }),
    onDataChange(newData, oldData) {
      if (newData != oldData && newData.length > 0) {
        this.loading = false;
        var measure = [];
        function compare( a, b ) {
          if ( a.date < b.date ){
            return 1;
          }
          if ( a.date > b.date ){
            return -1;
          }
          return 0;
        }
        this.originData = Object.assign([], newData);
        this.originData.sort( compare );
        var dataFromAPI = [];
        for (let i = 0; i < this.originData.length; i++) {
          let element = this.originData[i];
          var total = 0;
          dataFromAPI.push({
            date: moment(element.date).format('DD MMM'),
            'Alcohol consumption': element['AlcoholTitle'],
            'Training adherence': element['TrainingAdherenceTitle'],
            'Stress': element['StressTitle'],
            'Sleep amount': element['SleepAmountTitle'],
            'Sleep quality': element['SleepQualityTitle'],
            'Digestion (poo)': element['DigestionStoolTitle'],
            'Digestion (gas/bloating)': element['DigestionGasTitle'],
            'Hunger': element['HungerTitle'],
            'Mood': element['MoodTitle'],
            'Energy': element['EnergyTitle'],
            'Skin': element['SkinTitle'],
            'Libido': element['LibidoTitle'],
            'Training recovery': element['TrainingRecoveryTitle'],
            'Menstrual cycle information': element['MenstrualCycleTitle']
          });
        }
        this.originData = Object.assign([], dataFromAPI);
        this.displayData()
      }
    },
    displayData() {
      if(!this.originData || this.originData.length === 0){
        return;
      }
      var measure = [];
      var dataFromAPI = Object.assign([], this.originData);
      if ( this.currentPage == 1 && this.columnCount < 3)
        measure = dataFromAPI.slice((this.currentPage - 1) * this.columnCount, this.currentPage * this.columnCount - 1);
      else if ( this.currentPage > 1 && this.columnCount < 3)
        measure = dataFromAPI.slice((this.currentPage - 1) * this.columnCount - 1, this.currentPage * this.columnCount - 1);
      else if (this.columnCount == 3)
        measure = dataFromAPI.slice((this.currentPage - 1) * this.columnCount, this.currentPage * this.columnCount);
      var keys = [];
      var headers = [
        {
          text: '',
          sortable: false,
          value: 'title'
        }
      ];
      if ( this.currentPage == 1 || this.columnCount == 3)
        headers.push({
          text: 'Latest',
          sortable: false,
          value: 'latest'
        });
      var headerCount = this.columnCount == 3 ? this.columnCount : (this.currentPage == 1 ? this.columnCount - 1 : this.columnCount);
      headerCount = headerCount > measure.length ? measure.length : headerCount;
      for (var i = 0; i < headerCount; i ++) {
        headers.push({ text: measure[i]['date'], sortable: false, value: "date" + (i + 1) });
      }
      var body = [];
      keys = Object.keys(dataFromAPI[0]);
      keys.splice(0, 1);
      keys.splice(2, 0, "");
      keys.splice(3, 0, "Subjective measures");
      var is_bold = true;
      var is_indent = false;
      for(var key of keys)
      {
        var temp = {};
        temp["title"] = key;
        if ( this.currentPage == 1 || this.columnCount == 3)
          temp["latest"] = key == "Subjective measures" ? "" : dataFromAPI[0][key];
        for (var i = 0; i < headerCount; i ++) {
          temp["date" + (i + 1)] = key == "Subjective measures" ? "" : measure[i][key];
        }
        temp['is_bold'] = is_bold;
        temp['is_indent'] = is_indent;
        if (key == "Subjective measures") {
          is_indent = true;
          is_bold = false;
        }
        var count = [];
        for (var j = 1; j <= headerCount; j++) {
          count.push(j);
        }
        temp['count'] = count;
        
        body.push(temp);
      }
      this.keys.headers = [];
      this.keys.summary = [];
      this.keys.headers.push(...headers);
      this.keys.summary.push(...body);
    },
    animate(direction, duration) {
      let endPosition = direction? 200: -200;
      // thead animation
      for (var i = 2; i < this.$refs.dataTable.$el.children[0].children[0].children[0].children[0].childElementCount; i ++) {
        this.$refs.dataTable.$el.children[0].children[0].children[0].children[0].children[i].animate([
          // keyframes
          { transform: 'translateX(0px)' }, 
          { transform: `translateX(${endPosition}px)` }
        ], { 
          // timing options
          duration: duration,
          iterations: 1
        });
        
      }
      // tbody animation
      for (var i = 0; i < this.$refs.dataTable.$el.children[0].children[0].children[1].childElementCount; i ++) {
        for (var j = 2; j < this.$refs.dataTable.$el.children[0].children[0].children[1].children[i].childElementCount; j ++) {
          this.$refs.dataTable.$el.children[0].children[0].children[1].children[i].children[j].animate([
            // keyframes
            { transform: `translateX(${endPosition}px)` },
            { transform: 'translateX(0px)' }
          ], { 
            // timing options
            duration: duration,
            iterations: 1
          });
        }
      }
    },
    next() {
      let limit = Math.ceil(this.originData.length / this.columnCount);
      if (this.windowWidth > 500) {
        this.animate(true, 100);
      } else {
        limit ++;
      }
      this.currentPage = this.currentPage >= limit ? this.currentPage : this.currentPage + 1;
      this.displayData();
    },
    prev() {
      if (this.windowWidth > 500) {
        this.animate(false, 100);
      }
      this.currentPage = this.currentPage == 1 ? this.currentPage : this.currentPage - 1;
      this.displayData();
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth < 600 && this.windowWidth > 0)
        this.columnCount = 1;
      else if (this.windowWidth < 1000 && this.windowWidth >= 600)
        this.columnCount = 2;
      else 
        this.columnCount = 3;
      if (this.getWeeklyData.length > 0)
        this.displayData();  
    },
    moment() {
      return moment();
    },
    getWeekNumber(d) {
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
      var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
      var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
      return [d.getUTCFullYear(), weekNo];
    },
    getWeekData(start) {
      var weeks = [];
      for (let i = 0; i < 6; i++) {
        var element = start - 86400000 * 7;
        var tmp = new Date(start - 86400000 * 7 * i)
        var weekinfo = this.getWeekNumber(tmp)
        tmp = moment(tmp).format('DD MMM')
        weeks.push({week: weekinfo[1], year: weekinfo[0], date: tmp});
      }
      return Promise.all(weeks.map(week => {
        var params = `?week=${week.week}&year=${week.year}&Sort=1&Count=10`;
        return this.getWeeklySummary({params: params, date: week.date}).then(res => {
          // console.log(res);
        }).catch(e => {
          console.log(e);
        });
      })).then(res => {
      });
    },
  },
  mounted() {
    if (this.getWeeklyData.length > 0) {
      this.loading = false;
      this.displayData();
    }
    this.windowWidth = window.innerWidth;
  }
}
</script>

<style lang="stylus">
.v-table__overflow
  overflow-x hidden
.summary>.v-table__overflow>.v-table
  thead tr
    height 36px
    th
      text-align center!important
      font-weight bold
  td, th
    padding 5px 10px
    height 30px
  td
    box-sizing border-box
    border-right 1px solid lightgrey
  td.is_indent
    padding-left 2em
  .bold_record
    font-weight bold
.v-carousel__prev
  display none
.summary>.v-table__overflow>.v-table td:first-child 
  min-width 200px
#weeklymeasures
  padding 0
  background white
  >.layout
    padding 0
    margin 0
  .flex
    padding 0
  .v-carousel
    box-shadow none
#freeze .v-table__overflow
  padding 24px
  padding-right 1px
  width: 100%
  tr, td
    text-overflow ellipsis
    overflow hidden
    white-space nowrap
.v-window.v-carousel
  background: #FFF;
  height auto !important
  .container
    padding-left 0
  .v-responsive
    height auto !important
.summary__spacer
  min-height 720px
#prev_page 
  position absolute
  top 50%
  left 0%
#next_page
  position absolute
  top 50%
  right 0%
@media (max-width: 500px)
  .summary>.v-table__overflow>.v-table td:first-child
    min-width 89px
    // text-overflow ellipsis
    // white-space nowrap
    max-width 120px
  #prev_page 
    position absolute
    top 50%
    left 0%
  #next_page
    position absolute
    top 50%
    right 0%
</style>