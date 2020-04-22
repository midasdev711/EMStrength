import { set, toggle } from "@/util/vuex";
import moment from 'moment'
import APIService from '@/apiService/apiService.js';

const API = new APIService();

const state = {
  showNotification: false,
  questions: [],
  answersData: [],
  recoveryData: [],
  recoveryCheck: true,
  diagnosticAnswers: [{}, {}],
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
  summaryAnswers: [],
  userSummaryData: {
    articles: [],  // Horiz 1
    sections: [],  // Horiz 2 (filter 1)
    items: [],  // all data with Tuple key of article, section, date
  },

  decisionLimit: {
    sectionNo: 0,
    subsectionNo: 0
  },

  diagnosticLimit: [{
    sectionNo: 0,
    subsectionNo: 0
  }, {
    sectionNo: 0,
    subsectionNo: 0
  }],

  symptomLimit: {
    sectionNo: 0,
    subsectionNo: 0
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
  userSummaryData: [],

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
  getNotificationStatus: state => state.showNotification,
  getQuestions: state => state.questions,
  getDiagnosticAnswersData: state => state.diagnosticAnswers,
  getSymptomLastAnswered: state => state.symptomAnswers && state.symptomAnswers.lastAnswered ? state.symptomAnswers.lastAnswered : { sectionNo: 0, subsectionNo: 0 },
  getDecisionLastAnswered: state => state.decisionAnswers && state.decisionAnswers.lastAnswered ? state.decisionAnswers.lastAnswered : { sectionNo: 0, subsectionNo: 0 },

  getSummaryAnswersData: state => state.summaryAnswers && state.summaryAnswers.horizontal ? state.summaryAnswers.horizontal : [],
  getDecisionAnswersData: state => state.decisionAnswers,
  getDecisionHorizontalData: state => state.decisionAnswers.horizontal ? state.decisionAnswers.horizontal : [],
  getSymptomAnswersData: state => state.symptomAnswers,
  getSymptomHorizontalData: state => state.symptomAnswers && state.symptomAnswers.horizontal ? state.symptomAnswers.horizontal : [],
  getRecoveryCheck: state => state.recoveryCheck,
  getRecoveryData: state => state.recoveryData,
  getUserSummaryData: state => state.userSummaryData,

  getDecisionLimit: state => state.decisionLimit,
  getStressRecoveryLimit: state => state.diagnosticLimit,
  getSymptomLimit: state => state.symptomLimit,

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
  enableNotification: ({ commit }) => {
    commit("enableNotification");
  },

  disableNotification: ({ commit }) => {
    commit("disableNotification");
  },

  setArticleLimit: ({commit}, data) => {
    commit("setAnswerLimit", data);
  },

  visitRecovery: ({ commit }) => {
    var headers = {
      'Content-Type': 'application/json-patch+json',
      'Accept': 'application/json'
    };
    return API.get(`api/user/recovery/recoveryChecked`, headers)
      .then(res => {
        commit("auth/visitRecovery", {}, { root: true });
        return true;
      })
      .catch(err => {
        throw err;
      });
  },

  setSymptomLastAnswered: ({ commit }, data) => {
    commit("setSymptomLastAnswered", data);
  },

  setDiagnosticLastAnswered: ({ commit }, data) => {
    commit("setDiagnosticLastAnswered", data);
  },

  setDecisionLastAnswered: ({ commit }, data) => {
    commit("setDecisionLastAnswered", data);
  },

  setAnswerData: ({ commit }, data) => {
    commit("setAnswerData", data);
  },

  clearAnswersData: ({ commit }) => {
    commit("setSummaryAnswers", []);
  },

  resetState: ({ commit }) => {
    commit("resetState");
  },

  setRecoveryCheck: ({ commit }) => {
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
            commit("setDiagnosticAnswers", { active: data.active, data: result['data']});
            break;
          case "Symptom":
            commit("setSymptomAnswers", result['data']);
            break;
          case "Decision":
            commit("setDecisionAnswers", result['data']);
            break;
          case "Summary":
            commit("setSummaryAnswers", result['data']);
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
    let lastAnswered = {
      sectionNo: data.sectionNo,
      subsectionNo: data.subsectionNo
    };

    let verticalMaxSteps = data.verticalMaxSteps
    let horizontalMaxSteps = data.horizontalMaxSteps

    if (data.subsectionNo < verticalMaxSteps - 1) {
      data.subsectionNo++;
    } else {
      if (data.sectionNo < horizontalMaxSteps - 1) {
        data.sectionNo++;
      }
      data.subsectionNo = 0;
    }

    var headers = { 'Content-Type': 'application/json-patch+json' };
    return API.patch('api/user/answers', data, headers).then(result => {
      if (data.complete) {
        commit("auth/setArticleCompleted", { article: data.article }, { root: true });
        lastAnswered = {
          sectionNo: null,
          subsectionNo: null
        };
      }
      commit("setArticleAnswer", { active: data.active ? data.active : null, article: data.article, sectionNo: data.sectionNo, subsectionNo: data.subsectionNo, ...result.data });
      commit("set" + data.article + "LastAnswered", lastAnswered);
      commit("setAnswerLimit", { active: data.active ? data.active : null, article: data.article, sectionNo: data.sectionNo, subsectionNo: data.subsectionNo });
    }).catch(err => {
      throw err;
    });
  },

  getUserSummaryData: ({ commit }, data) => {
    return API.get(`api/user/summary/layout${data.params}`)
      .then(result => {
        commit("setUserSummaryData", result['data']);
        return result['data'];
      })
      .catch(err => {
        throw err;
      });
  },

  reRunArticle: ({ commit }, data) => {
    return API.get(`api/user/answers/rerun/${data.article}`)
      .then(result => {
        commit("auth/reRunArticle", { article: data.article }, { root: true });
        // commit("set" + data.article + "LastAnswered", lastAnswered);
        return result['data'];
      })
      .catch(err => {
        throw err;
      });
  },

  getGroupSummaryData: ({ commit }, data) => {
    return API.get(`api/group/summary/layoutV2${data.params}`)
      // return API.get(`api/group/summary/layout${data.params}`)
      .then(result => {
        commit("setUserSummaryData", result['data']);
        return result['data'];
      })
      .catch(err => {
        throw err;
      });
  },

  getAllRecovery: ({ commit }) => {
    return API.get(`api/user/recovery`)
      .then(result => {
        commit("setRecovery", result['data']);
        return result['data'];
      })
      .catch(err => {
        throw err;
      });
  },

  saveRecovery: ({ commit }, data) => {
    let headers = {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
    };

    commit("auth/setRecoveryCompleted", {}, { root: true });

    return API.put(`api/user/recovery`, data, headers)
      .then(result => {
        commit("auth/setRecoveryCompleted", {}, { root: true });
        return data;
      })
      .catch(err => {
        throw err;
      });
  },

  postForgotPassword: ({ commit }, data) => {
    var headers = {
      'Content-Type': 'application/json-patch+json',
      'Accept': 'application/json'
    };
    return API.post(`api/users/forgotPassword`, data, headers)
      .then(resp => {
        return resp;
      })
      .catch(err => {
        throw err;
      });
  },

  postResetPassword: ({ commit }, data) => {
    var headers = {
      'Content-Type': 'application/json-patch+json',
      'Accept': 'application/json'
    };
    return API.post(`api/users/resetPassword`, data, headers)
      .then(resp => {
        return resp;
      })
      .catch(err => {
        throw err;
      });
  },

  postUser: ({ commit }, data) => {
    var headers = { 'Accept': 'application/json' };
    return API.post(`api/user/userCode/user`, data, headers).then(result => {
      console.log(result['data']);
      return result['data'];
    }).catch(err => {
      throw err;
    });
  },

  updateUser: ({ commit }, data) => {
    var headers = { 'Accept': 'application/json' };
    return API.put(`api/user/userCode/user`, data, headers).then(result => {
      console.log(result['data']);
      return result['data'];
    }).catch(err => {
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
      if (!result['data'] || result['data'].length === 0) {
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
  uploadImage: ({ commit }, image) => {
    return API.uploadBlob(image);
  },
  updateAvatar: ({ commit }, data) => {
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
    if (params.weekNo) {
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
    let tmp = Object.assign([], state.diagnosticAnswers);
    tmp[data.active] = Object.assign({}, data.data);
    state.diagnosticAnswers = Object.assign([], tmp);

    let tmpLimit = Object.assign([], state.diagnosticLimit);
    tmpLimit[data.active] = Object.assign({}, data.data.lastAnswered);
    state.diagnosticLimit = Object.assign([], tmpLimit);
  },

  setDecisionAnswers: (state, data) => {
    state.decisionAnswers = Object.assign({}, data);
    state.decisionLimit = Object.assign({}, data.lastAnswered);
  },

  setSymptomAnswers: (state, data) => {
    state.symptomAnswers = Object.assign({}, data);
    state.symptomLimit = Object.assign({}, data.lastAnswered);
  },

  setSummaryAnswers: (state, data) => {
    state.summaryAnswers = Object.assign({}, data);
  },

  setRecoveryCheck: (state) => {
    state.recoveryCheck = !state.recoveryCheck;
  },

  setRecovery: set('recoveryData'),
  setUserSummaryData: (state, data) => {
    state.userSummaryData = Object.assign({}, data);
  },

  clearSummaryAnswers: (state) => {
    state.summaryAnswers = [];
  },

  setSymptomLastAnswered: (state, data) => {
    state.symptomAnswers.lastAnswered = Object.assign({}, data);
  },

  setDiagnosticLastAnswered: (state, data) => {
    state.diagnosticAnswers.lastAnswered = Object.assign({}, data);
  },

  setDecisionLastAnswered: (state, data) => {
    state.decisionAnswers.lastAnswered = Object.assign({}, data);
  },

  setSymptomAnswerData: (state, data) => {
    state.symptomAnswers.lastAnswered = Object.assign({}, data);
  },

  setDiagnosticAnswerData: (state, data) => {
    state.diagnosticAnswers.lastAnswered = Object.assign({}, data);
  },

  setAnswerData: (state, data) => {
    let sectionNo = data.nextSectionNo;
    let subsectionNo = data.nextSubsectionNo;

    let answerIndex = data.article.toLowerCase() + 'Answers';

    if (data.article == 'Diagnostic') {
      for (let i = 0; i < state[answerIndex][data.active].horizontal[sectionNo].vertical[subsectionNo].items.length; i++) {
        let tmp = state[answerIndex][data.active].horizontal[sectionNo].vertical[subsectionNo].items[i];
        for (let j = 0; j < data.answers.length; j++) {
          if (tmp.questionId == data.answers[j].questionId) {
            state[answerIndex][data.active].horizontal[sectionNo].vertical[subsectionNo].items[i].value = data.answers[j].value;
            state[answerIndex][data.active].horizontal[sectionNo].vertical[subsectionNo].items[i].text = data.answers[j].text;
          }
        }
      }
    } else {
      for (let i = 0; i < state[answerIndex].horizontal[sectionNo].vertical[subsectionNo].items.length; i++) {
        let tmp = state[answerIndex].horizontal[sectionNo].vertical[subsectionNo].items[i];
        for (let j = 0; j < data.answers.length; j++) {
          if (tmp.questionId == data.answers[j].questionId) {
            state[answerIndex].horizontal[sectionNo].vertical[subsectionNo].items[i].value = data.answers[j].value;
            state[answerIndex].horizontal[sectionNo].vertical[subsectionNo].items[i].text = data.answers[j].text;
          }
        }
      }
    }
  },

  setArticleAnswer: (state, data) => {
    let sectionNo = data.sectionNo;
    let subsectionNo = data.subsectionNo;
    let answerIndex = data.article.toLowerCase() + 'Answers';
    
    if (data.article == 'Diagnostic') {
      for (let i = 0; i < state[answerIndex][data.active].horizontal[sectionNo].vertical[subsectionNo].items.length; i++) {
        let tmp = state[answerIndex][data.active].horizontal[sectionNo].vertical[subsectionNo].items[i];
        for (let j = 0; j < data.nextSubsection.length; j++) {
          if (tmp.questionId == data.nextSubsection[j].questionId) {
            state[answerIndex][data.active].horizontal[sectionNo].vertical[subsectionNo].items[i].isConditionQuestionMet = data.nextSubsection[j].isConditionQuestionMet;
          }
        }
      }
    } else {
      for (let i = 0; i < state[answerIndex].horizontal[sectionNo].vertical[subsectionNo].items.length; i++) {
        let tmp = state[answerIndex].horizontal[sectionNo].vertical[subsectionNo].items[i];
        for (let j = 0; j < data.nextSubsection.length; j++) {
          if (tmp.questionId == data.nextSubsection[j].questionId) {
            state[answerIndex].horizontal[sectionNo].vertical[subsectionNo].items[i].isConditionQuestionMet = data.nextSubsection[j].isConditionQuestionMet;
          }
        }
      }
    }
  },

  setAnswerLimit: (state, data) => {
    let index = data.article.toLowerCase() + 'Limit';
    if (data.article == "Diagnostic") {
      let tmp = Object.assign([], state[index]);
      if (tmp[data.active].sectionNo <= data.sectionNo) {
        if (tmp[data.active].subsectionNo < data.subsectionNo) {
          tmp[data.active] = Object.assign({}, data);
        }
      } 
      state[index] = Object.assign([], tmp);
    } else {
      if (state[index].sectionNo <= data.sectionNo) {
        if (state[index].subsectionNo < data.subsectionNo) {
          state[index] = Object.assign({}, data);
        }
      } 
    }
    
  },

  enableNotification: (state) => {
    state.showNotification = true;
  },

  disableNotification: (state) => {
    state.showNotification = false;
  },

  // EXAMPLES
  setDrawer: set("showDrawer"),
  setImage: set("image"),
  setColor: set("color"),
  toggleDrawer: toggle("showDrawer"),
  saveWeeklySummary: (state, weekData) => {
    let tempArray = Object.assign([], state.weeklySummary);
    let dataExist = false;
    for (let i = 0; i < tempArray.length; i++) {
      let element = tempArray[i];
      if (moment(element.date).format('DD MMM') == moment(weekData[0]['date']).format('DD MMM')) {
        dataExist = true;
      }
    }
    if (!dataExist) {
      tempArray.push(...weekData);
    }
    state.weeklySummary = Object.assign([], tempArray);
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
