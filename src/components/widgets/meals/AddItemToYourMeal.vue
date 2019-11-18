<template>
  <v-dialog v-model="addItemDialog" :lazy="true" persistent max-width="900">
    <template v-slot:activator="{ on }">
      <v-btn fab dark small v-on="on">
        <v-icon dark>add</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-btn icon class="right" @click="addItemDialog = false">
        <v-icon>close</v-icon>
      </v-btn>
      <v-card-title v-if="!isMobile" class="headline">ADD TO YOUR MEAL</v-card-title>
      <v-card-text>
        <v-flex xs12 md6>
          <v-text-field v-if="currentTab === 0"
            @input="foodSearchInput"
            append-icon="search"
            label="Search food item"
            single-line
            hide-details
            clearable
            class="add-item__search">
          </v-text-field>
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field v-if="currentTab === 1"
            @input="recipeSearchInput"
            append-icon="search"
            label="Search recipe item"
            single-line
            hide-details
            class="add-item__search">
          </v-text-field>
        </v-flex>
        <v-flex sm12 md6 class="d-sm-show">
          <h4 class="mt-3" id="tab-statement">Or, select &amp; add from the list below to Meal #{{dialogId+1}}:</h4>
        </v-flex>
        <v-tabs slider-color="black" class="mt-2" v-model="currentTab">
          <v-flex sm12 md6 class="d-sm-none">
            <h4
              class="mt-3"
              id="tab-statement"
            >Or, select and add items from the list below to Meal #{{dialogId+1}}:</h4>
          </v-flex>
          <v-flex sm12 md6 class="tab-header">
            <v-tab>{{recentName}}</v-tab>
            <v-tab>Recipes</v-tab>
          </v-flex>
          <v-tab-item>
            <v-btn
              color="default darken-1"
              class="add-selected"
              text
              @click="addSelected()">
              Add Selected
            </v-btn>
            <v-data-table
              :items="foodItems"
              :pagination.sync="foodPagination"
              :headers="headers"
              :loading="foodLoading"
              :total-items="totalFoodItems"
              hide-actions
              hide-headers
              v-model="selectedFoods"
              class="add-item__table">
              <template v-slot:items="props">
                <td @click="selectItem(props.item)" class="first-item">
                  <v-checkbox color="primary" v-model="props.item.selected" />
                </td>
                <td :title="props.item.food.title" class="item-name">
                  <span class="item-name" :title="props.item.food.title">{{ props.item.food.title }}</span>
                </td>
                <td class="label">
                  <span>Qty:</span>
                </td>
                <td>
                  <v-text-field
                    solo full-width
                    v-model="props.item.serves"
                    oninput="if(Number(this.value) < 0) this.value = 0;"
                    name="quantity"
                    type="number">
                  </v-text-field>
                </td>
                <td class="label">
                  <span>of</span>
                </td>
                <td>
                  <v-select
                    v-model="props.item.serveRatio"
                    :items="props.item.food.serveSizeOptions"
                    item-value="size"
                    item-text="option"
                    label="Serving size"
                  >
                  </v-select>
                </td>
              </template>
              <template slot="no-data">
                <div class="text-xs-center">No matches</div>
              </template>
            </v-data-table>
          </v-tab-item>
          <v-tab-item>
            <v-btn
              color="default darken-1"
              class="add-selected"
              text
              @click="dialog = false"
            >Add Selected</v-btn>


            <v-data-table
              :items="recipeItems"
              :pagination.sync="recipePagination"
              :headers="headers"
              :loading="recipeLoading"
              :total-items="totalRecipeItems"
              hide-actions
              hide-headers
              v-model="selectedRecipes"
              class="add-item__table">
              <template v-slot:items="props">
                <td>
                  <v-checkbox color="primary" v-model="props.item.selected" />
                </td>
                <td class="item-name">
                  <span class="item-name" :title="props.item.food.title">{{ props.item.food.title }}</span>
                </td>
                <td class="label" v-if="isMobile">
                  <span>Qty:</span>
                </td>
                <td>
                  <v-text-field
                    solo
                    :value="props.item.serves"
                    oninput="if(Number(this.value) < 0) this.value = 0;"
                    name="quantity"
                    type="number"
                    @keypress="isNumber($event)"
                  ></v-text-field>
                </td>
                <td class="label" v-if="isMobile"><span>of</span></td>
                <td>
                  <v-select
                    v-model="props.item.serveRatio"
                    :items="props.item.food.serveSizeOptions"
                    item-value="size"
                    item-text="option"
                    label="Serving"
                  >
                  </v-select>
                </td>
              </template>
              <template slot="no-data">
                <div class="text-xs-center">0 items</div>
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import debounce from "debounce";

const RowsPerPage = 5;

export default {
  name: "AddItemToYourMeal",
  props: ['dialogId'],
  data() {
    return {
      isMobile: false,
      addItemDialog: false,
      headers: [
        { value: "", width: "10%"},
        { value: "name", width: "50%" },
        { value: "", width: "10%" },
        { value: "quantity", width: "10%" },
        { value: "", width: "10%" },
        { value: "of", width: "10%" },
      ],

      currentTab: 0,
      recentName: "RECENT",

      foodSearch: "",
      foodLoading: true,
      foodItems: [],
      totalFoodItems: 0,
      foodPagination: {
        sortBy: "Title",
        rowsPerPage: 10
      },
      title: "",
      selectedFoods: [],
      //foodServeSizes
      serveRatio: 1.0,
      serveSizes: [
        { 
          text: "100g/ml",
          value: 1.00
        },
        { 
          text: "1 Cup",
          value: 2.50
        },
        { 
          text: "1/2 Cup",
          value: 1.25
        }
      ],
      
      recipeSearch: "",
      recipeLoading: true,
      recipeItems: [],
      totalRecipeItems: 0,
      recipePagination: {
        sortBy: "Title",
        rowsPerPage: 10
      },
      selectedRecipes: [],

    };
  },
  computed: {
    // ...mapGetters("app", {
    //   getDataFoods: "getDataFoods",
    // }),
  },
  methods: {
    ...mapActions("app", {
      _getFoods: "getFoods",
      _getRecipes: "getRecipes"
    }),

    foodSearchInput: debounce(function (e) {
      this.foodSearch = e;
    }, 500),

    recipeSearchInput: debounce(function (e) {
      this.recipeSearch = e;
    }, 500),

    isNumber: function(evt) {
      if ((parseFloat(this.kgs) * 10) % 1 > 0 || parseFloat(this.kgs) < 0) {
        evt.preventDefault();
      }
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    getFoods() {
      this.foodLoading = true;
      this._getFoods({
        params: {
          Count: this.foodPagination.rowsPerPage,
          Page: this.foodPagination.page,
          Search: this.foodSearch,
          Sort:
            this.foodPagination.descending === true
              ? "-" + this.foodPagination.sortBy
              : this.foodPagination.sortBy
        }
      })
        .then(resp => {
          this.foodItems = resp.data ? resp.data.map((food) => {return {food: food, serves: 0, serveRatio: 1.0};}) : [];
          this.totalFoodItems = resp.pagination.total;
          this.foodLoading = false;
        })
        .catch(err => {
          this.foodLoading = false;
        });
    },

    getRecipes() {
      this.recipeLoading = true;
      this._getRecipes({
        params: {
          Count: this.recipePagination.rowsPerPage,
          Page: this.recipePagination.page,
          Search: this.recipeSearch,
          Sort:
            this.recipePagination.descending === true
              ? "-" + this.recipePagination.sortBy
              : this.recipePagination.sortBy
        }
      })
        .then(resp => {
          this.recipeItems = resp.data ? resp.data.map((recipe) => {return {food: recipe, serves: 0, serveRatio: 1.0};}) : [];
          this.totalRecipeItems = resp.pagination.total;
          this.recipeLoading = false;
        })
        .catch(err => {
          this.recipeLoading = false;
          console.log(err);
        });
    },

    selectItem(item){
      this.serveSizes = item.food.serveSizeOptions;
      for (var i = 0; i < this.foodItems.length; i ++) {
        console.log("foodITem", this.foodItems[i].food.id);
        console.log("item", item.food.id);
        // console.log(this.foodItems[i].food.id, item.food.id);
        if (this.foodItems[i].food.id == item.food.id && item.selected && item.serves == 0) {
          this.foodItems[i].serves = 1;
        }
        if (this.foodItems[i].food.id == item.food.id && !item.selected) {
          this.foodItems[i].serves = 0;
        }
      }
    },

    addSelected() {
      var selectedItems = this.currentTab === 0 
        ? this.foodItems.filter(item => item.selected) 
        : this.recipeItems.filter(item => item.selected);
      this.$emit("addedIntakes", {dialogId: this.dialogId, intakes: selectedItems});
      this.addItemDialog = false;
    },
  },
  watch: {
    foodPagination: {
      handler() {
        this.getFoods();
      },
      deep: true
    },
    foodSearch: {
      handler() {
        // this.delay()
        if (this.foodSearch.length > 0) 
          this.recentName = "RESULTS";
        else
          this.recentName = "RECENT";
        
        this.getFoods();
      }
    },

    recipePagination: {
      handler() {
        this.getRecipes();
      },
      deep: true
    },
    recipeSearch: {
      handler() {
        this.getRecipes();
      }
    },

  },
  mounted() {
    if (window.innerWidth < 800 && window.innerWidth > 0) this.isMobile = true;
    else this.isMobile = false;

    if (this.isMobile)
    {
      this.headers = [ 
        { value: "", width: "5%"},
        { value: "name", width: "65%" },
        { value: "quantity", width: "15%" },
        { value: "serve", width: "15%" }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
.layout
  flex-wrap wrap

.add-item
  &__search
   @media screen and (max-width: 500px)
      width 100%

  &__table
    margin-top 15px
    white-space nowrap
    table
      table-layout fixed
      width 100%

    >>>td.first-item  
      padding 0!important

    td 
      white-space: -o-pre-wrap; 
      word-wrap: break-word;
      white-space: pre-wrap; 
      white-space: -moz-pre-wrap; 
      white-space: -pre-wrap; 

    td:last-child
      padding 0!important
    
    thead
      //display: none;
      th
        white-space normal
      th:last-child
        padding 0

    .v-input
      margin-top 8px
      margin-bottom -20px

.v-tabs__div {
  height: 100%;

  h4 {
    padding-top: 1em;
  }
}

.d-sm-show {
  display: none;
}

@media (max-width: 900px) {
  .temp-space {
    display: none;
  }

  // .v-tabs
  // margin-top 4em!important
  td {
    padding-left 10px !important
    padding-right 10px !important
  }
}

@media (max-width: 800px) 
  .add-item__table
    table
      table-layout fixed
      span.label
        display none
      td
        padding-left 2px !important
        padding-right 2px !important
  .d-sm-show
    display block
    text-align center
  .d-sm-none
    display none
  .add-selected
    margin-top 1em
  .v-tabs__slider-wrapper
    display none

  .tab-header
    text-align center


@media (max-width: 500px)
  .v-card
    padding 1em
  .v-card__text
    padding 0
  .add-item__table
    thead
      display none
    td.label
      display none
    >>>td
      padding 0!important
      .v-text-field 
        width 50px
      &:first-child
        width 32px
    >>>td.item-name
      max-width 70px!important
      text-overflow ellipsis
      overflow hidden
  .add-item 
    &__search 
      width 100%
  .v-list__tile
    padding 0
  .v-list__tile__title
    font-size 11px
 
</style>