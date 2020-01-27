import { set, toggle } from "@/util/vuex";
import moment from 'moment'
import APIService from '@/apiService/apiService.js';

const API = new APIService();

const state = {
  questions: [],
  answersData: [],
  recoveryData: [],
  recoveryCheck: false,
  diagnosticAnswers: [],
  decisionAnswers: {
    horizontal: [{
      sectionNo: 0,
      vertical: [{
        items: [],
        sectionNo: 0,
        subsectionNo: 0
      }]
    }],
  },
  symptomAnswers: {
    horizontal: [{
      sectionNo: 0,
      vertical: [{
        items: [],
        sectionNo: 0,
        subsectionNo: 0
      }]
    }],
    
  },
// EXAMPLES
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
  questions: [],
  diagnosticAnswers: [],
  decisionAnswers: {
    horizontal: []
  },
  symptomAnswers: {
    horizontal: []
  },
// EXAMPLES
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
  getQuestions: state => state.questions,
  getDiagnosticAnswersData: state => state.diagnosticAnswers && state.diagnosticAnswers.horizontal ? state.diagnosticAnswers.horizontal : [],
  getDecisionAnswersData: state => state.decisionAnswers,
  getDecisionHorizontalData: state => state.decisionAnswers.horizontal ? state.decisionAnswers.horizontal : [],
  getSymptomAnswersData: state => state.symptomAnswers,
  getSymptomHorizontalData: state => state.symptomAnswers && state.symptomAnswers.horizontal ? state.symptomAnswers.horizontal : [],
  getRecoveryCheck: state => state.recoveryCheck,
  getRecoveryData: state => state.recoveryData,

  // EXAMPLES
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

  setRecoveryCheck: ({commit}) => {
    commit("setRecoveryCheck");
  },

  getQuestions: ({ commit }, data) => {
    return API.get(`api/questions?Article=${data.article}`)
      .then(result => {
        commit("setQuestions", result['data']);
        return result['data'];
      })
      .catch(err => {
        throw err;
      });
  },

  getAnswersData: ({ commit }, data) => {
    return API.get(`api/user/answers/layout${data.params}`)
      .then(result => {
        switch (data.article) {
          case "Diagnostic":
            commit("setDiagnosticAnswers", result['data']);
            break;
          case "Symptom":
            commit("setSymptomAnswers", result['data']);
            break;
          case "Decision":
            commit("setDecisionAnswers", result['data']);
            break;
          default:
            break;
        }
        return result['data'];
      })
      .catch(err => {
        throw err;
      });
  },

  saveAnswers: ({ commit }, data) => {
    var headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post('api/user/answers', data, headers).then(result => {
      // commit("setAnswers", data);
    }).catch(err => {
      throw err;
    });
  },

  getAllRecovery: ({commit}) => {
    return API.get(`api/user/recovery`)
      .then(result => {
        commit("setRecovery", result['data']);
        return result['data'];
      })
      .catch(err => {
        throw err;
      });
  },

  saveRecovery: ({commit}, data) => {
    let headers = {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
    };



    return API.put(`api/user/recovery`, data, headers)
      .then(result => {
        commit("saveRecovery", data);
        return data;
      })
      .catch(err => {
        throw err;
      });
  },

//EXAMPLE CALLS

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

  setQuestions: set("questions"),
  setDiagnosticAnswers: (state, data) => {
    state.diagnosticAnswers = Object.assign({}, data);
  },
  setDecisionAnswers: (state, data) => {
    state.decisionAnswers = Object.assign({}, data);
  },
  setSymptomAnswers: (state, data) => {
    // state.diagnosticAnswers = Object.assign([], data);
    state.symptomAnswers = Object.assign({}, data);
  },
  setRecoveryCheck: (state) => {
    state.recoveryCheck = !state.recoveryCheck;
  },
  setRecovery: set('recoveryData'),
  saveRecovery: (state, data) => {
    console.log("mutation saveRecovery called");
  },

  // EXAMPLES
  setDrawer: set("showDrawer"),
  setImage: set("image"),
  setColor: set("color"),
  toggleDrawer: toggle("showDrawer"),
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
