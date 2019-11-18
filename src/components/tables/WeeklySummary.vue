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
          <td
            class="transition-td"
            :key="props.item.title"
            v-bind:class="{ 'total_record': props.item.is_total, 'is_indent': props.item.is_indent }"
            v-bind:style="{'fontWeight': props.item.is_bold ? 600 : 400 }"
          >{{ props.item.title }}</td>
          <td
            :key="props.item.title + 'latest'"
            class="text-xs-center transition-td"
            v-bind:class="{ 'total_record': props.item.is_total }"
          >{{ props.item.latest }}</td>

          <td
            :key="props.item.title + value"
            class="text-xs-center common-td transition-td"
            v-bind:class="{ 'total_record': props.item.is_total }"
            v-for="value in props.item.count"
          >{{ props.item['date' + value] }}</td>
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
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "WeeklySummary",
  props:{
    unitLabels: Object
  },
  data() {
    return {
      weeklyData: [],
      keys: {
        headers: [
          {
            text: "",
            sortable: false,
            value: "title"
          },
          { text: "Latest", sortable: false, value: "latest" }
        ],
        summary: []
      },
      currentPage: 1,
      columnCount: 3,
      windowWidth: 0,
      originData: [],
      latest: null,
      dateStart: new Date(),
      dateEnd: new Date(),
      loading: true
    };
  },
  computed: {
    ...mapGetters("admin", {
      checkoutStatusAdmin: "getCheckoutStatus",
      getWeeklyDataAdmin: "getWeeklySummary"
    }),
    ...mapGetters("app", {
      checkoutStatus: "getCheckoutStatus",
      getWeeklyData: "getWeeklySummary"
    }),

  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  watch: {
    getWeeklyData(newData, oldData) {
      this.onWeekDataChange(newData, oldData);
    },
    getWeeklyDataAdmin(newData, oldData) {
      this.onWeekDataChange(newData, oldData);
    }
  },
  methods: {
    ...mapActions("app", {
      getWeeklySummary: "getWeeklySummary"
    }),
    onWeekDataChange(newData, oldData) {
      this.weeklyData = newData;
      this.loading = false;
      if (newData != oldData && newData.length > 0) {
        var measure = [];
        function compare(a, b) {
          if (a.date < b.date) {
            return 1;
          }
          if (a.date > b.date) {
            return -1;
          }
          return 0;
        }
        this.originData = Object.assign([], newData);
        this.originData.sort(compare);
        var dataFromAPI = [];
        for (let i = 0; i < this.originData.length; i++) {
          let element = this.originData[i];
          var total = 0;
          total +=
            parseFloat(element.Height) +
            parseFloat(element.Bicep) +
            parseFloat(element.Neck) +
            parseFloat(element.WaistSmall) +
            parseFloat(element.WaistBelly) +
            parseFloat(element.Hips) +
            parseFloat(element.Glutes) +
            parseFloat(element.Thigh);
          var weightUnit = element.AvgWeight >= 0 && element.AvgWeight <= 1 ?  this.unitLabels.weight.singular : this.unitLabels.weight.plural;
          dataFromAPI.push({
            date: moment(element.date).format("DD MMM"),
            "Weight": parseFloat(element.AvgWeight).toFixed(2) + weightUnit,
            Height: element.Height + this.unitLabels.height.plural,
            "Bicep (Right)": element.Bicep + this.unitLabels.height.plural,
            Neck: element.Neck + this.unitLabels.height.plural,
            "Waist (Small)": element.WaistSmall + this.unitLabels.height.plural,
            "Waist (Belly button)": element.WaistBelly + this.unitLabels.height.plural,
            Hips: element.Hips + this.unitLabels.height.plural,
            Glutes: element.Glutes + this.unitLabels.height.plural,
            Thigh: element.Thigh + this.unitLabels.height.plural,
            "Total": total + this.unitLabels.height.plural,
            "Temperature": parseFloat(element.AvgTemp).toFixed(2) + this.unitLabels.temperature,
            "Pulse bpm": parseFloat(element.AvgPulse).toFixed(2)
          });
        }
        this.originData = Object.assign([], dataFromAPI);
        this.displayData();
      }
    },
    displayData() {
      var measure = this.originData.slice(
        (this.currentPage - 1) * this.columnCount,
        this.currentPage * this.columnCount
      );
      var keys = [];
      var headers = [
        {
          text: "",
          sortable: false,
          value: "title"
        },
        { text: "Latest", sortable: false, value: "latest" }
      ];
      var start = (this.currentPage - 1) * this.columnCount;
      for (var i = 0; i < measure.length; i++) {
        headers.push({
          text: measure[i]["date"],
          sortable: false,
          value: "date" + (i + 1)
        });
      }
      var body = [];
      keys = Object.keys(measure[0]);
      keys.splice(0, 1);
      keys.splice(1, 0, "Measurements");
      var is_bold = true;
      var is_indent = false;
      for (var key of keys) {
        var temp = {};
        temp["title"] = key;
        temp["latest"] = this.originData[0][key];
        for (var i = 0; i < measure.length; i++) {
          temp["date" + (i + 1)] = measure[i][key];
          if (key == "Total cm") {
            // temp["date" + (i + 1)] += "cm";
            temp["is_total"] = true;
            // temp["latest"] = this.originData[0][key] + "cm";
          }
        }
        temp["is_bold"] = is_bold;
        temp["is_indent"] = is_indent;
        var count = [];
        for (var j = 1; j <= this.columnCount; j++) {
          count.push(j);
        }
        temp["count"] = count;

        body.push(temp);
        if (key == "Measurements") {
          is_bold = false;
          is_indent = true;
        } else if (key == "Thigh") {
          is_bold = true;
          is_indent = false;
        }
      }
      this.keys.headers = [];
      this.keys.summary = [];
      this.keys.headers.push(...headers);
      this.keys.summary.push(...body);
    },
    moment() {
      return moment();
    },
    getWeekNumber(d) {
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
      var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
      return [d.getUTCFullYear(), weekNo];
    },
    getWeekData(start) {
      var weeks = [];
      for (let i = 0; i < 6; i++) {
        var element = start - 86400000 * 7;
        var tmp = new Date(start - 86400000 * 7 * i);
        var weekinfo = this.getWeekNumber(tmp);
        tmp = moment(tmp).format("DD MMM");
        weeks.push({ week: weekinfo[1], year: weekinfo[0], date: tmp });
      }
      return Promise.all(
        weeks.map(week => {
          var params = `?week=${week.week}&year=${week.year}&Sort=1&Count=10`;
          return this.getWeeklySummary({ params: params, date: week.date })
            .then(res => {
              // console.log(res);
            })
            .catch(e => {
              console.log(e);
            });
        })
      ).then(res => {});
    },
    animate(direction, duration) {
      let endPosition = direction ? 100 : -100;
      // thead animation
      let nodeIndex = 0;
      let nodeIndexJ = 0;
      for (nodeIndex = 2; nodeIndex < this.$refs.dataTable.$el.children[0].children[0].children[0].children[0].childElementCount; nodeIndex++) {
        console.log(nodeIndex);
        this.$refs.dataTable.$el.children[0].children[0].children[0].children[0].children[nodeIndex].animate(
          [
            // keyframes
            { transform: "translateX(0px)" },
            { transform: `translateX(${endPosition}px)` }
          ],
          {
            // timing options
            duration: duration,
            iterations: 1
          }
        );
      }
      // tbody animation
      for (nodeIndex = 0; nodeIndex < this.$refs.dataTable.$el.children[0].children[0].children[1].childElementCount; nodeIndex++) {
        for (nodeIndexJ = 2; nodeIndexJ < this.$refs.dataTable.$el.children[0].children[0].children[1].children[nodeIndex].childElementCount; nodeIndexJ++) {
          this.$refs.dataTable.$el.children[0].children[0].children[1].children[nodeIndex].children[nodeIndexJ].animate(
            [
              // keyframes
              { transform: `translateX(${endPosition}px)` },
              { transform: "translateX(0px)" }
            ],
            {
              // timing options
              duration: duration,
              iterations: 1
            }
          );
        }
      }
    },
    next() {
      if (this.windowWidth > 500) {
        this.animate(true, 100);
      }
      this.currentPage =
        this.currentPage >= Math.ceil(this.originData.length / this.columnCount)
          ? this.currentPage
          : this.currentPage + 1;
      this.displayData();
    },
    prev() {
      if (this.windowWidth > 500) {
        this.animate(false, 100);
      }
      this.currentPage =
        this.currentPage == 1 ? this.currentPage : this.currentPage - 1;
      this.displayData();
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth < 500 && this.windowWidth > 0) this.columnCount = 1;
      else if (this.windowWidth < 1000 && this.windowWidth >= 500)
        this.columnCount = 2;
      else this.columnCount = 3;
      if (this.weeklyData.length > 0) this.displayData();
    }
  },
  mounted() {
    
    if (this.weeklyData.length > 0) {
      this.loading = false;
      this.displayData();
    }
    this.windowWidth = window.innerWidth;
  }
};
</script>

<style scoped>
.total_record {
  background-color: lightgrey;
}

.summary > .v-table__overflow > .v-table td:first-child {
  min-width: 150px;
}

.summary > .v-table__overflow > .v-table td.is_indent {
  padding-left: 2em;
}

#prev_page {
  position: absolute;
  top: 50%;
  left: 0%;
}

#next_page {
  position: absolute;
  top: 50%;
  right: 0%;
}
</style>