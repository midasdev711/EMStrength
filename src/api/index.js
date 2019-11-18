// implement your own methods in here, if your data is coming from A rest API

import * as User from "./user"
import * as Chat from "./chat"
import * as Chart from "./chart"
import * as Measures from "./measures"
import { summary } from "./weeklysummary"
import { mealItems, recentMealItems } from "./meal-items"
import { micronutrients } from "./micronutrients"
import * as Diets from "./diet-history"
export default {
  // user
  getUser: User.getUser,
  getUserById: User.getUserById,
  // chat
  getChatMenu: Chat.Menu,
  getChatGroup: Chat.Groups,
  getChatGroupById: Chat.getChatById,
  // chart data
  getProtein: Chart.proteinData,
  getCarbohydrates: Chart.carbohydratesData,
  getFat: Chart.fatData,
  getCampaign: Chart.campaignData,
  getLocation: Chart.locationData,
  // Weekly measures summary
  getMeasures: Measures.measures,
  getMeasures1: Measures.measures1,
  getMeasures2: Measures.measures2,
  // Food Tracker: Items for Meal and Micronutrients
  getMealItems: mealItems,
  getRecentMealItems: recentMealItems,
  getMicronutrients: micronutrients,
  // Diet History
  getDiets: Diets.diets,
  // Weekly summary
  getSummary: summary
}
