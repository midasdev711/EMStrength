<template>
  <v-container grid-list-xl>
    <v-stepper v-model="e6" vertical class="weekly-data">
      <v-stepper-step :complete="e6 > 1" step="1" editable>
        Recipe
      </v-stepper-step>
      <v-stepper-content step="1" class="stepper-content">
        <v-layout wrap>
          <v-flex xs12 sm12 pr-5>
            <v-text-field label="Title" placeholder="Enter title" type="text" v-model="recipeSearch" @input="recipeSearchInput" :loading="recipeLoading" append-icon="search" clearable></v-text-field>
            
            <v-data-table
              v-if="!title"
              :items="recipeItems"
              :pagination.sync="recipePagination"
              :loading="recipeLoading"
              :total-items="totalRecipeItems"
              v-model="selectedRecipes"
              hide-actions
              hide-headers
              class="add-item__table">
              <template v-slot:items="props">
                <tr @click="selectRecipe(props.item)">
                  <td class="item-name">
                    <span class="item-name" :title="props.item.food.title">{{ props.item.food.title }}</span>
                  </td>
                  <td>
                      <button icon @click="recipeCopy(props.item)"><v-icon>add_to_photos</v-icon> </button> 
                      <button icon @click="recipeEdit(props.item)"><v-icon>edit</v-icon> </button> 
                  </td>
                </tr>
              </template>
              <template slot="no-data">
                <div v-if="title==null && recipeSearch.length>2" class="text-xs-center">New recipe 
                  <button @click="recipeNew()" ><v-icon>note_add</v-icon> </button> 
                </div>
                <div v-if="totalRecipeItems==0 && recipeSearch.length>0" class="text-xs-center">
                   Enter recipe name to search 
                </div>
                
              </template>
            </v-data-table>
            
            
            <v-text-field v-if="title" label="Servings" placeholder="Enter servings" type="number" v-model="servings"></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn v-if="title" color="primary" @click="e6 = 2;selectedRecipe.food.title=title; selectedRecipe.food.serves=servings;">Continue</v-btn>
        <v-btn v-if="title" color="default" @click="title = '';servings = ''; recipeIngredients = []">Clear</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2" editable>{{addEditIngredients}} Ingredients</v-stepper-step>
      <v-stepper-content step="2">
        <v-layout wrap>
          <v-flex xs12 sm6 pr-1>
            <h3 v-if="selectedRecipe.food" class="mb-0">Search to add items to {{selectedRecipe.food.title}}</h3>
          </v-flex>
          <v-flex xs11 sm12 class="pt-0">
            <v-card class="pa-0">
              <v-card-title class="pa-0">
                <div class="flex-grow-1"></div>
                <v-text-field
                  v-model="foodSearch"
                  append-icon="search"
                  label="Search ingredient"
                  single-line
                  hide-details
                  
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :items-per-page="15"
                item-key="Id"
                :items="foodItems"
                :pagination.sync="foodPagination"
                :headers="headers"
                :loading="foodLoading"
                :total-items="totalFoodItems"
                v-model="selectedFoods"
                class="ingredient-table"
                v-if="!isMobile"
              >
              <template v-slot:items="props">
                <tr @click="selectItem(props.item)" class="ingredient-row">
                  <td :title="props.item.title">
                    <span>{{ props.item.title }}</span>
                  </td>
                  <td> 
                    {{ props.item.calories }}
                  </td>
                  <td>
                    {{ props.item.fat }}
                  </td>
                  <td>
                    {{ props.item.carbohydrate }}
                  </td>
                  <td>
                    {{ props.item.protein }}
                  </td>
                
                </tr>
              </template>
              </v-data-table>
              <v-data-table
                :items-per-page="15"
                item-key="Id"
                :items="foodItems"
                :pagination.sync="foodPagination"
                :headers="mobileHeaders"
                :loading="foodLoading"
                :total-items="totalFoodItems"
                v-model="selectedFoods"
                class="ingredient-table"
                v-else
              >
              <template v-slot:items="props">
                <tr @click="selectItem(props.item)" class="ingredient-row">
                
                  <td :title="props.item.title">
                    <span>{{ props.item.title }}</span>
                  </td>
                  <td> 
                    {{ props.item.calories }}
                  </td>
                
                </tr>
              </template>
              </v-data-table>
            </v-card>
            <v-divider></v-divider>
      
            <v-card v-if="selectedFood" name="add-serve">
              <v-card-title class="headline">Add: {{ selectedFood.title }}&nbsp;<small> ({{selectedFood.isLiquid ? 'Liquid' : 'Solid'}}) </small> </v-card-title>
                <v-card-text>
                  <v-layout align="center">
                    <v-flex class="d-flex" cols="12" sm="6" md="4" lg="4">
                      <v-select
                        v-model="serveRatio"
                        :items="selectedFood.serveSizeOptions"
                        item-value="size"
                        item-text="option"
                        label="Serving size"
                      >
                        <template slot='selection' slot-scope='{ item }'>
                          {{ item.option }} - {{ item.size * 100 }} {{selectedFood.isLiquid ? 'ml' : 'g'}}
                        </template>
                        <template slot='item' slot-scope='{ item }'>
                          {{ item.option }} - {{ item.size * 100 }} {{selectedFood.isLiquid ? 'ml' : 'g'}}
                        </template>
                      </v-select>
                    </v-flex>
                    <v-flex class="d-flex" cols="12" sm="6" md="4" lg="4">
                      <v-text-field
                        label="Number of Servings" type="number" 
                        v-model="selectedServes"
                      ></v-text-field>
                    </v-flex>
                    <v-flex class="d-flex" cols="12" sm="6" md="4" lg="4">
                      <v-btn color="primary"  
                      @click="addSelected(serveRatio)">
                      Add</v-btn>   
                    </v-flex>
                  </v-layout>
                </v-card-text>
            </v-card>
            <v-card class="pa-0">
              <v-card-title class="headline">Ingredients</v-card-title>
                <v-data-table
                  :headers="headersIngredients"
                  :items="recipeIngredients"
                  :items-per-page="20"
                  class="elevation-1 ingredient-table"
                  hide-actions
                  v-if="!isMobile"
                >
                
                <template v-slot:items="props">
                  <tr @click="selectIngredient(props.item)" class="ingredient-row">

                    <!--td>
                      {{ props.item.foodId }}  
                    </td-->
                    <td :title="props.item.title">
                      <span>{{ props.item.title }}</span>
                    </td>
                    <td> 
                      {{ props.item.calories }}
                    </td>
                    <td>
                      {{ props.item.fat }}
                    </td>
                    <td>
                      {{ props.item.carbohydrate }}
                    </td>
                    <td>
                      {{ props.item.protein }}
                    </td>
                    <td>
                       {{ props.item.serves}} 
                    </td>
                    <td>
                      {{ props.item.serveSize * 100}} {{props.item.isLiquid ? 'ml' : 'g'}}
                    </td>
                    <td>
                        <v-btn
                          color="default darken-1"
                          class="add-selected"
                          fab small dark
                          @click="removeSelected(props.item)">
                          <v-icon dark>highlight_off</v-icon>
                        </v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>
              <v-data-table
                  :headers="mobileHeadersIngredients"
                  :items="recipeIngredients"
                  :items-per-page="10"
                  class="elevation-1 ingredient-table"
                  hide-actions
                  v-else
                >
                
                <template v-slot:items="props">
                  <tr @click="selectIngredient(props.item)" class="ingredient-row">

                    <!--td>
                      {{ props.item.foodId }}  
                    </td-->
                    <td :title="props.item.title">
                      
                      <span>{{ props.item.title }}</span>
                    </td>
                    <td> 
                      {{ props.item.calories }}
                      <v-btn
                        fab small dark
                        @click="removeSelected(props.item)">
                        <v-icon color="grey">highlight_off</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>

          </v-flex>
        </v-layout>
        <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
        <v-btn flat @click="e6 = 1">Back</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3">Review</v-stepper-step>
      <v-stepper-content step="3">
        <v-layout wrap>
          <v-flex xs12 sm12 pr-5>
            <v-text-field v-if="selectedRecipe.food" label="Title" placeholder="Enter title" type="text" v-model="selectedRecipe.food.title"></v-text-field>
            <v-text-field v-if="selectedRecipe.food" label="Servings" placeholder="Enter servings" type="number" v-model="selectedRecipe.food.serves"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout wrap>
          <v-flex xs11 sm12>
            <v-card>
              <v-card-title class="subheading font-weight-bold">Nutrition Facts <small> &nbsp;(per 1 Serving / Total)</small></v-card-title>

              <v-divider></v-divider>

              <v-list>
      
                 <v-list-tile>
                  <v-list-tile-content class='label'>Calories:</v-list-tile-content>
                  <v-list-tile-content class="align-end"><strong>{{totalRecipeColumn('caloriesTotal')/(selectedRecipe.food.serves||1) | decNum}}</strong> / {{totalRecipeColumn('calories') | decNum}}</v-list-tile-content>
                </v-list-tile>
                
                <v-list-tile>
                  <v-list-tile-content class='label'>Fat:</v-list-tile-content>
                  <v-list-tile-content class="align-end"><strong>{{totalRecipeColumn('fatTotal')/(selectedRecipe.food.serves||1) | decNum}}</strong>/ {{totalRecipeColumn('fatTotal') | decNum}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content class='label'>Carbs:</v-list-tile-content>
                  <v-list-tile-content class="align-end"><strong>{{totalRecipeColumn('carbohydrateTotal')/(selectedRecipe.food.serves||1) | decNum}}</strong> / {{totalRecipeColumn('carbohydrateTotal') | decNum}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content class='label'>Protein:</v-list-tile-content>
                  <v-list-tile-content class="align-end"><strong>{{totalRecipeColumn('proteinTotal')/(selectedRecipe.food.serves||1) | decNum}}</strong>{{totalRecipeColumn('proteinTotal') | decNum}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content class='label'>Sodium:</v-list-tile-content>
                  <v-list-tile-content class="align-end"><strong>{{totalRecipeColumn('sodiumTotal')/(selectedRecipe.food.serves||1) | decNum}}</strong>{{totalRecipeColumn('sodiumTotal') | decNum}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content class='label'>Calcium:</v-list-tile-content>
                  <v-list-tile-content class="align-end"><strong>{{totalRecipeColumn('calciumTotal')/(selectedRecipe.food.serves||1) | decNum}}</strong>{{totalRecipeColumn('calciumTotal') | decNum}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content class='label'>Iron:</v-list-tile-content>
                  <v-list-tile-content class="align-end"><strong>{{totalRecipeColumn('ironTotal')/(selectedRecipe.food.serves||1) | decNum}}</strong>{{totalRecipeColumn('ironTotal') | decNum}}</v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
     
          <v-flex xs11 sm12>
            <v-card class="pa-0">

              <v-card-title class="subheading font-weight-bold">Ingredients</v-card-title>

              <v-divider></v-divider>
                <v-data-table
                  :headers="headersRecipeIngredients"
                  :items="recipeIngredients"
                  :items-per-page="50"
                  class="elevation-1 ingredient-table"
                  hide-actions
                  v-if="!isMobile"
                >
                <template v-slot:items="props">
                <!--td>
                  {{ props.item.foodId }}  
                </td-->
                <td :title="props.item.Title">
                  <span>{{ props.item.title }}</span>
                </td>
                <td> 
                  {{ props.item.calories | decNum}}
                </td>
                <td>
                  {{ props.item.fat | decNum}}
                </td>
                <td>
                  {{ props.item.carbohydrate | decNum }}
                </td>
                <td>
                  {{ props.item.protein | decNum }}
                </td>
                <td>
                  {{ props.item.serves }}
                </td>
                <td>
                  {{ props.item.serveSize * 100}} {{props.item.isLiquid ? 'ml' : 'g'}}
                </td>
              </template>
              <template slot="footer">
                  <td class="text-xs-right"><strong>Totals </strong></td>
                  <td class="text-xs-center">{{ totalRecipeColumn('caloriesTotal') | decNum }} </td>
                  <td class="text-xs-center">{{ totalRecipeColumn('fatTotal') | decNum }}</td> 
                  <td class="text-xs-center">{{ totalRecipeColumn('carbohydrateTotal') | decNum }}</td> 
                  <td class="text-xs-center">{{ totalRecipeColumn('proteinTotal') | decNum }}</td> 
                  <td class="text-xs-right"></td> 
                  <td class="text-xs-right"></td> 
              </template>
              </v-data-table>
              <v-data-table
                  :headers="mobileHeadersRecipeIngredients"
                  :items="recipeIngredients"
                  :items-per-page="10"
                  class="elevation-1 ingredient-table"
                  hide-actions
                  v-else
                >
                <template v-slot:items="props">
                <!--td>
                  {{ props.item.foodId }}  
                </td-->
                <td :title="props.item.Title">
                  <span>{{ props.item.title }}</span>
                </td>
                <td> 
                  {{ props.item.calories | decNum}}
                </td>
              </template>
              <template slot="footer">
                  <td class="text-xs-right"><strong>Totals </strong></td>
                  <td class="text-xs-center">{{ totalRecipeColumn('caloriesTotal') | decNum }} </td>
              </template>
              </v-data-table>
            </v-card>
          </v-flex>
            
        </v-layout>

        <v-btn color="primary" @click="submit()" :loading="savingRecipe">Save</v-btn>
        <v-btn color="default" @click="title = '';servings = ''; recipeIngredients = []; el=1;">Clear</v-btn>
      </v-stepper-content>


    </v-stepper>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import debounce from "debounce";
import DateField from "@/components/helper/DateField"

export default {
  name: "RecipeBuilder",
  components: {
    DateField
  },
  data() {
    return {
      isMobile: false,
      selectedRecipes: [],
      selectedRecipe: {},
      //caloriesTotal: 0,
      //fatTotal: 0,
      //carbsTotal: 0,
      //proteinTotal: 0,
      addItemDialog: false,
      mobileHeaders: [{
        text: 'Title',
        sortable: true,
        value: 'Title'
      },{
        text: 'Calories',
        sortable: true,
        value: 'Calories'
      }],
      headers: [{
        text: 'Title',
        sortable: true,
        value: 'Title'
      },{
        text: 'Calories',
        sortable: true,
        value: 'Calories'
      },{
        text: 'Fat (g)',
        sortable: true,
        value: 'Fat'
      },{
        text: 'Carbs (g)',
        sortable: true,
        value: 'Carbohydrate'
      },{
        text: 'Protein (g)',
        sortable: true,
        value: 'Protein'
      }],

//headersRecipeIngredients
      mobileHeadersRecipeIngredients: [{
        text: 'Title',
        sortable: true,
        value: 'Title'
      },{
        text: 'Calories',
        sortable: true,
        value: 'Calories',
        width: "20%"
      }],
      headersRecipeIngredients: [{
        text: 'Title',
        sortable: true,
        value: 'Title'
      },{
        text: 'Calories',
        sortable: true,
        value: 'Calories'
      },{
        text: 'Fat (g)',
        sortable: true,
        value: 'Fat'
      },{
        text: 'Carbs (g)',
        sortable: true,
        value: 'Carbohydrate'
      },{
        text: 'Protein (g)',
        sortable: true,
        value: 'Protein'
      },{
        text: 'Serves',
        sortable: false,
        value: 'Serves'
      },{
        text: 'Serve Size',
        sortable: false,
        value: 'ServeSize'
      }],
// ingredients
      mobileHeadersIngredients: [{
        text: 'Title',
        value: 'Title'
      },{
        text: 'Calories',
        value: 'Calories',
        width: "20%"
      }],
      headersIngredients: [{
        text: 'Title',
        value: 'Title'
      },{
        text: 'Calories',
        value: 'Calories'
      },{
        text: 'Fat (g)',
        value: 'Fat'
      },{
        text: 'Carbs (g)',
        value: 'Carbohydrate'
      },{
        text: 'Protein (g)',
        value: 'Protein'
      },{
        text: 'Serves',
        value: 'Serves'
      },{
        text: 'Serve Size',
        value: 'ServeSize'
      },{
        text: 'Actions',
        value: 'action'
      }],

      items: [{
        title: "Coles - Light Milk",
        calories: 8,
        fat: 16,
        carbs: 10,
        protein: 15
      }],
// search ingredients
      foodSearch: "",
      foodLoading: true,
      foodItems: [],
      totalFoodItems: 0,
      foodPagination: {
        sortBy: "Title",
        rowsPerPage: 5
      },
      selectedFoods: [],
//ingredients
      selectedFood: null,
      selectedRecipeIngredient: null,
      selectedServes: 1,
      recipeIngredients: [],
//foodServeSizes
      serveRatio: 1.0,
      serveSizes: [
        { 
          option: "100g/ml",
          size: 1.00
        },
        { 
          option: "1 Cup",
          size: 2.50
        },
        { 
          option: "1/2 Cup",
          size: 1.25
        }
      ],

// final nutrition
      col: [
        {
          name:"Ingredients" ,
          items: [
            {
              name: "Calories",
              value: "188"
            },
            {
              name: "Fat",
              value: "188"
            },
            {
              name: "Carbs",
              value: "188"
            },
            {
              name: "Protein",
              value: "188"
            }
          ]
        }
      ],

      // recipe lookup
      recipeSearch: "",
      recipeLoading: true,
      recipeItems: [],
      totalRecipeItems: 0,
      recipePagination: {
        sortBy: "Title",
        rowsPerPage: 10
      },
      selectedRecipe: {  //this.selectedRecipe.food.
        food: 
        {
          title: "",
          serves: null
        }
      },
      recipeId: null, 
      headersReceipe: [
        { value: "name", width: "80%" },
        { value: "actions", width: "20%" },
      ],


      e6: 1,
      title: null,
      servings: "",
      measure: [{value: '', text: "Select"}, {value: 'cms', text: "cms"}, {value: 'inches', text: "inches"}],
      howMuch: ["Select", "Yes - please provide details in Notes below", "No"],
      heightExist: false,
      savingRecipe: false
    }
  },
  watch:{
    title(newTitle, oldTitle){
    }
  },
  filters: {
    decNum(amount) {
      const amt = Number(amount)
      return amt && amt.toFixed(2) || '0.00';
      //return amt && amt.toLocaleString(undefined, {maximumFractionDigits:3}) || '0'
    }  
  },
  computed: {
    addEditIngredients()
    {
      if (this.recipeIngredients.length > 0)
      {
        return "Edit "+ this.recipeIngredients.length;
      }
      else
      {
        return "Add";        
      }
    }
  },
  methods: {
    ...mapActions("app", {
      _getFoods: "getFoods",
      _saveRecipe: "saveRecipe",
      _getRecipes: "getRecipes",
      _getIngredients: "getIngredients"
    }),

    recipeSearchInput: debounce(function (e) {
      this.recipeSearch = e;
      this.getRecipes();
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
      this.foodLoading = false;
      if (!this.foodSearch || this.foodSearch.length < 2) return; 
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
          this.foodItems = resp.data;//? resp.data.map((food) => {return {food: food, serves: 0};}) : [];
          this.totalFoodItems = resp.pagination.total;
          this.foodLoading = false;
        })
        .catch(err => {
          this.foodLoading = false;
          console.log(err);
        });
    },

    getIngredients(foodId) {
      this._getIngredients(foodId)
      .then(data =>
      {
          this.recipeIngredients = data ? data.map((i) => {return { foodId: i.foodId, serves: i.serves, serveType: i.serveType, title: i.food.title, serveSize: i.serveSize, isLiquid: i.food.isLiquid,

              calories: i.food.calories, carbohydrate: i.food.carbohydrate, fat: i.food.fat, protein: i.food.protein, sodium: i.food.sodium, calcium: i.food.calcium, iron: i.food.iron,
              caloriesTotal: i.food.calories * (i.serveSize * i.serves),// * apply, 
              carbohydrateTotal: i.food.carbohydrate * (i.serveSize * i.serves),// * apply, 
              fatTotal: i.food.fat * (i.serveSize * i.serves),
              proteinTotal: i.food.protein * (i.serveSize * i.serves), 
              sodiumTotal: i.food.sodium * (i.serveSize * i.serves),
              calciumTotal: i.food.calcium * (i.serveSize * i.serves), 
              ironTotal: i.food.iron * (i.serveSize * i.serves),
            };
          }) : [];
          this.totalRecipeItems = this.recipeIngredients.length;
          this.$toast.success(`${this.recipeIngredients.length} Ingredients loaded`, {});
      });
    },

    getRecipes() {
      this.recipeLoading = false;
      this.title = null;
      if (!this.recipeSearch || this.recipeSearch.length < 2) return; 
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

    selectRecipe(a){
      this.selectedRecipe = a;
      this.title = this.selectedRecipe.title;
      this.servings = this.selectRecipe.serves;
    },

    recipeNew(){
      //Add action
      console.log(this.recipeSearch);
      this.title = this.recipeSearch;
      this.selectedRecipe.food.title = this.title;
      this.selectedRecipe.food.serves = this.servings;

      this.recipeSearch = this.title;

      this.recipeIngredients = [];
    },

    recipeEdit(recipe){
      this.recipeId = recipe.food.id;
      this.selectedRecipe = recipe;
      this.title = recipe.food.title;
      //this.recipeSearch = this.selectedRecipe.food.title;
      this.servings = this.selectedRecipe.food.serves;

      this.getIngredients(this.recipeId);
      this.e6 = 2;
      
    },
    
    recipeCopy(recipe){
      console.log(this.selectedRecipe);
      this.selectedRecipe = recipe;
      // this.selectedRecipe = {
      //   food:  Object.assign({}, recipe.food ),
      //   serveRatio: recipe.serveRatio,
      //   serves: recipe.serves,
      // }

      //this.selectedRecipe = JSON.parse(JSON.stringify(recipe));

      this.selectedRecipe.food.title = recipe.food.title + " COPY";
      this.title = this.selectedRecipe.food.title;
      //this.recipeSearch = this.selectedRecipe.food.title;
      this.getIngredients(recipe.food.id);
      this.recipeId = null;
      this.selectedRecipe.food.id = null;
      this.e6 = 2;
    },


    showAlert(a){
      //if (event.target.classList.contains('btn__content')) return;
      alert('Alert! \n' + a.Title);
    },

    selectItem(a){
      //if (event.target.classList.contains('btn__content')) return;
      this.selectedFood = a;
      //alert('selected: \n' + a.Title);
      //var el = this.$el.getElementsByClassName("addServe")[0];
      //el.scrollIntoView();
    },

    addSelected(sizeItem) {
      /*var selectedItems = this.foodItems.filter(item => item.selected); 
      console.log(selectedItems); 
      this.selectedFoods = selectedItems;
      let food = selectedItems[0];*/
      let food = this.selectedFood;
      let qty = this.selectedServes;
      console.log(sizeItem); 

      let ratio = this.serveRatio; // = size eg: 0.250 for a cup
      let serveType = this.selectedFood.serveSizeOptions.find((i) => i.size == this.serveRatio).option;
      let apply = qty * ratio;
      this.recipeIngredients.push( { 
        foodId: food.id, serves: qty, serveType: serveType, title: food.title, serveSize: ratio, isLiquid: food.isLiquid,
        calories: food.calories, carbohydrate: food.carbohydrate, fat: food.fat, protein: food.protein, sodium: food.sodium, calcium: food.calcium, iron: food.iron,
        caloriesTotal: food.calories * apply, carbohydrateTotal: food.carbohydrate * apply, fatTotal: food.fat * apply, proteinTotal: food.protein * apply, sodiumTotal: food.sodium * apply, calciumTotal: food.calcium * apply, ironTotal: food.iron * apply
        }
      );
      //this.$emit("addedIntakes", {dialogId: this.dialogId, intakes: selectedItems});
      this.addItemDialog = false;
    },

    selectIngredient(a){
      this.selectedRecipeIngredient = a;
      this.serveSizes = a.serveSizeOptions;
      this.serveRatio = 1.00;
      alert('selected ingredient: \n' + a.foodId);
    },

    removeSelected(item) {
      var found = this.recipeIngredients.findIndex(f => (f.foodId == item.foodId));
      this.recipeIngredients.splice(found[0], 1);
    },

    submit() {
      this.heightExist = true;
      this.savingRecipe = true;
      let recipe = {
        title: this.selectedRecipe.food.title,
        type: "Recipe",
        isLiquid: false,
        serves: this.selectedRecipe.food.serves,
        calories: this.totalRecipeColumn('caloriesTotal'),
        protein: this.totalRecipeColumn('proteinTotal'),
        carbohydrate: this.totalRecipeColumn('carbohydrateTotal'),
        fat: this.totalRecipeColumn('fatTotal'),
        ingredients: this.recipeIngredients
      };
      console.log("RECIPE:"); 
      console.log(recipe);
      
      this._saveRecipe(recipe).then((resp) => {
        this.$toast.success("Recipe saved to the database", {});
        this.getRecipes();
        this.e6 = 1;
        this.savingRecipe = false;
      });
    },

    sumMultiply(items, prop, multi) {
      return items.reduce( function(a, b){
          return a + (b[prop] * b[multi]);
      }, 0);
    },

    sum(items, prop) {
      return items.reduce( function(a, b){
          return a + (b[prop]);
      }, 0);
    },
    
    totalRecipeColumn(column) {
      if (this.recipeIngredients && this.recipeIngredients.length > 0) 
        return this.sum(this.recipeIngredients, column);     
      else
        return 0;
    }

  },

  watch: {
    foodPagination: {
      handler() {
        this.getFoods();
      },
      deep: true
    },
    recipePagination: {
      handler() {
        this.getRecipes();
      },
      deep: true
    },
    foodSearch: {
      handler() {
        this.getFoods();
      }
    },
    // recipeSearch: {
    //   handler() {
    //     this.getRecipes();
    //   }
    // },

  },
  mounted() {
    if (window.innerWidth < 500 && window.innerWidth > 0) this.isMobile = true;
    else this.isMobile = false;
  }

  
}
</script>

<style lang="stylus" scoped>
.add-item__table
  margin-top 0
.ingredient-table
    >>>th
      padding 1em!important
      text-align center!important
    >>>td
      padding 2px!important
      text-align center
.weekly-data {
  overflow hidden
  clear both
  &__short-selector {
    width 100px
    margin-right 15px
    float left
  }
  &__table {
    td, th {
      padding 10px
      text-align: center
      @media (max-width: 500px) {
        padding 3px
        &, * {
          font-size 12px !important
        }
      }
    }
  }
  .label {
    width 50%
  }
}
@media (max-width: 600px)
  .theme--light.v-stepper--vertical
    .v-stepper__content:not(:last-child)
      padding-left 4px
      margin-left 17px

  .ingredient-row
    td
      padding 4px!important
      text-align center
  .weekly-data {
    margin-left 0 
    margin-right 0
    padding 0
    padding-top 1em
    .container {
      margin-left 0 
      margin-right 0
      padding: 0px;
    }
    .v-card {
      margin-left 0 
      margin-right 0
      padding: 0px;
    }
  }
  .v-stepper--vertical .v-stepper__step
    margin-left 0 
    margin-right 0
    padding: 5px 5px 5px 5px;
  .v-stepper--vertical .v-stepper__content{
    padding: 16px 10px 16px 5px;
  }
  .v-list__tile__content {
    white-space nowrap
  }
  .v-btn--floating.v-btn--small
    width 2em
    height 2em
    float right
    margin-top 0
    margin-bottom 0

  .ingredient-table
    >>>th
      padding 1em!important
      text-align center!important
    >>>td
      padding 2px!important
      text-align center
</style>
