import { set, toggle } from "@/util/vuex";
import moment from 'moment'
import APIService from '@/apiService/apiService.js';

const API = new APIService();

const state = {
  dateWeight: null,
  checkoutStatus: null,
  showDrawer: null,
  weightofWeek: [],
  dataTempPulse: null,
  diets: [],
  measureData: null,
  allMeasures: [],
  weeklySummary: [],
  checkinData: [],
  messageThread: [],
}

const initialState = {
  dateWeight: null,
  checkoutStatus: null,
  showDrawer: null,
  weightofWeek: [],
  dataTempPulse: null,
  diets: [],
  measureData: null,
  allMeasures: [],
  weeklySummary: [],
  checkinData: [],
  messageThread: [],
}

// getters
const getters = {
  getCheckoutStatus: state => state.checkoutStatus,
  getDataWeight: state => state.dataWeight,
  getWeightofWeek: state => state.weightofWeek,
  getDataTempPulse: state => state.dataTempPulse,
  getDataDiets: state => state.diets,
  getDataAllMeasures: state => state.allMeasures,
  getDataMeasure: state => state.measureData,
  getDataTodayDiet: state => state.todayDiet,
  getDataFoods: state => state.foods,
  getWeeklySummary: state => state.weeklySummary,
  getCheckinData: state => state.checkinData,
  getMessageThread: state => state.messageThread
}

// actions
const actions = {
  resetState: ({ commit }) => {
    commit("resetState");
  },
  getCheckinData: ({ commit }) => {
    var headers = { 'Accept': 'application/json' };
    return API.get('api/user/checkin/20', headers).then(result => {
      commit("saveCheckinData", result['data']);
      return result['data'];
    }).catch(err => {
      throw err;
    });
  },
  getWeeklySummary: ({ commit }, params) => {
    var headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post('api/user/summary/week/filter' + params.params, {}, headers).then(result => {
      if(!result['data'] || result['data'].length === 0){
        return;
      }
      let tempArray = Object.assign([], result['data']);
      tempArray[0]['date'] = params.date;
      commit("saveWeeklySummary", tempArray);
      return tempArray;
    }).catch(err => {
      throw err;
    });
  },
  getTempPulse: ({ commit }, date) => {
    var headers = { accept: 'application/json' };
    return API.get('api/user/temp/' + date, headers).then(result => {
      commit("saveTempPulse", result['data']);
      return result['data'];
    }).catch(err => {
      throw err;
    });
  },
  saveTempPulse: ({ commit }, data) => {
    var headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post('api/user/temp', data, headers).then(result => {
      commit("saveTempPulse", data);
    }).catch(err => {
      throw err;
    });
  },
  saveDataWeight: ({ commit }, data) => {
    return API.post('api/user/weight', data).then(result => {
      commit("setDateWeight", data)
    }).catch(err => {
      throw err;
    });
  },
  saveMeasureData: ({ commit }, data) => {
    return API.post('api/user/week', data).then(result => {
      commit("setDateMeasure", result['data'])
    }).catch(err => {
      throw err;
    });
  },
  getMeasureData: ({ commit }, params) => {
    var headers = { accept: 'application/json' };
    return API.get('api/user/week' + params, headers).then(result => {
      commit("setDateMeasure", result['data'])
    }).catch(err => {
      throw err;
    });
  },
  getWeightofWeek: ({ commit }, weekNo) => {
    var headers = { accept: 'application/json' };
    return API.get('api/user/weight/week?weekNo=' + weekNo, headers).then(result => {
      commit("setWeightofWeek", result['data']);
      return result;
    }).catch(err => {
      throw err;
    });
  },
  getAllMeasures: ({ commit }) => {
    var headers = { accept: 'application/json' };
    return API.get('api/measures/all', headers).then(result => {
      commit("setAllMeasures", result['data']);
      return result['data'];
    }).catch(err => {
      throw err;
    });
  },
  getDiets: ({ commit }, params) => {
    var startDate = moment(params.startDate).format('YYYY-MM-DD');
    var endDate = moment(params.endDate).format('YYYY-MM-DD');
    return API.get(`api/user/diet/${startDate}/${endDate}/${params.pageSize}/${params.currentPage}`)
      .then(result => {
        commit("setDiets", result['data']);
        return result['data'];
      })
      .catch(err => {
        throw err;
      });
  },
  getTodayDiet: ({ commit }) => {
    return API.get(`api/user/diet/today`)
      .then(result => {
        commit("setTodayDiet", result['data']);
        return result['data'];
      })
      .catch(err => {
        throw err;
      });
  },
  getFoods: ({ commit }, params) => {
    var data = {
      "hasFilter": true,
      "filters": [{
        "fieldName": "Title",
        "value": params.params.Search,
        "operator": 3,
        "tablePrefix": "FT"
      }]
    };

    if (params.params.Search == "" || params.params.Search == null)
    {
      data.filters[0].fieldName = "RECENT";
    }
    console.log(params.params.Search);
    return API.post(`api/user/food/filter?Count=${params.params.Count}&Page=${params.params.Page}&Sort=${params.params.Sort}`, data)
    .then(resp => {
      commit("setDataFoods", resp);
      return resp;
    }).catch(err => {

      throw err;
    });
  },

  getRecipes: ({ commit }, params) => {
    var data = {
      "hasFilter": true,
      "filters": [{
        "fieldName": "Title",
        "value": params.params.Search,
        "operator": 3,
        "tablePrefix": "FT"
      }]
    };

    if (params.params.Search == "")
    {
      data.fieldName = "RECENT";
    }

    return API.post(`api/user/recipe/filter?Count=${params.params.Count}&Page=${params.params.Page}&Sort=${params.params.Sort}`, data)
    .then(resp => {
      //commit("setDataFoods", resp);
      return resp;
    }).catch(err => {

      throw err;
    });
  },
  getIngredients: ({commit}, foodId) => {
    let reqURL = `api/user/recipe/ingredients/${foodId}`;
    console.log("request" + reqURL);
    return API.get(reqURL)
    .then(resp => {
      console.log("resp..." );
      console.log(resp);
      
      return resp.data;
    })
    .catch(err => {
      throw err;
    });
  },
  getMeals: ({commit}, date) => {
    var formatDate = moment(date).format("YYYY-MM-DD");
    return API.get(`api/user/intake/${formatDate}`)
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      throw err;
    });
  },
  updateMeals: ({commit}, data) => {
    return API.post(`api/user/intake?date=` + data.date, data.data)
    .then(resp => {
      return resp;
    })
    .catch(err => {
      throw err;
    });
  },
  copyMeal: ({commit}, meal) => {
    var headers = {
      'Content-Type': 'application/json-patch+json',
      'Accept': 'application/json'
    };
    return API.post(`api/user/intake/copy`, meal, headers)
    .then(resp => {
      return resp;
    })
    .catch(err => {
      throw err;
    });
  },
  saveRecipe: ({commit}, recipe) => {
    return API.post(`api/user/recipe`, recipe)
    .then(resp => {
      //commit("recipeData", resp['data']);
      return resp['data'];
    })
    .catch(err => {

      throw err;
    });
  },
  uploadImage: ({commit}, image) => {
    return API.uploadBlob(image);
  },
  updateAvatar: ({commit}, data) => {
    var headers = {
      'Content-Type': 'application/json-patch+json',
      'Accept': 'application/json'
    };
    return API.patch(`api/users/current/updateAvatar`, data, headers)
    .then(resp => {
      return resp;
    })
    .catch(err => {
      throw err;
    });
  },
  getMessages: ({ commit }, params) => {
    let requestPath = `api/user/messages`;
    if (params.weekNo)
    {
      requestPath = `api/user/messages/${params.weekNo}`;
    }
    console.log(requestPath);
    return API.get(requestPath)
      .then(result => {
        commit("setMessageThread", result['data']);
        console.log("DATE from MessageThread");
        console.log(result['data']);
        return result['data'];
      })
      .catch(err => {
        throw err;
      });
  },
  sendMessage: ({ commit }, data) => {
    var headers = {
      'Content-Type': 'application/json-patch+json',
      'Accept': 'application/json'
    };
    return API.post('api/user/message', data, headers).then(result => {
      result.data['me'] = true;
      commit("addMessage", result.data);
    }).catch(err => {
      throw err
    });
  },
}

// mutations
const mutations = {
  resetState: (state) => {
    state = Object.assign({}, initialState);
  },
  setDrawer: set("showDrawer"),
  setImage: set("image"),
  setColor: set("color"),
  setAllMeasures: set('allMeasures'),
  setDateWeight: (state, weightData) => {
    let tempArray = Object.assign([], state.weightofWeek)
    tempArray.push(weightData)
    state.weightofWeek = Object.assign([], tempArray)
  },
  saveTempPulse: set("dataTempPulse"),
  setWeightofWeek: set("weightofWeek"),
  setDateMeasure: set("measureData"),
  toggleDrawer: toggle("showDrawer"),
  setDiets: set("diets"),
  setTodayDiet: set("todayDiet"),
  setDataFoods: set("foods"),
  saveCheckinData: set("checkinData"),
  //saveRecipe: set("recipeData"),
  saveWeeklySummary: (state, weekData) => {
    let tempArray = Object.assign([], state.weeklySummary)
    let dataExist = false;
    for (let i = 0; i < tempArray.length; i++) {
      let element = tempArray[i];
      if (moment(element.date).format('DD MMM') == moment(weekData[0]['date']).format('DD MMM')) {
        dataExist = true;
      }
    }
    if (!dataExist) {
      tempArray.push(...weekData)
    }
    state.weeklySummary = Object.assign([], tempArray)
  },
  setMessageThread: (state, data) => {
    state.status = "get_messages_succeeded";
    state.messageThread = data;
  },
  addMessage: (state, message) => {
    state.messageThread.push(message);
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
