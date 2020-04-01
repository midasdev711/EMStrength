import { set, toggle } from "@/util/vuex";
import APIService from '@/apiService/apiService.js';

const API = new APIService()

const state = {

  isLogined: false,
  isAdmin: false,
  userProfile: {
    id: "",
    email: "",
    userAccessCode: "",
    userRoles: [],
    recoveryChecked: false
  }
}

// getters
const getters = {
  getIsLogined: state => state.isLogined,
  getUserType: state => state.userProfile.userType,
  getDataUserProfile: state => state.userProfile,
  getCurrentUserCode: state => state.userProfile.userAccessCode,
  getSymptomUpdated: state => state.userProfile.symptomCompleted,
  getRecoveryUpdated: state => state.userProfile.recoveryCompleted
}

// actions
const actions = {
  updateUser: ({commit}, data) => {
    var headers = { 'Accept': 'application/json' };
    return API.put(`api/users/current/update`, data, headers).then(result => {
      commit("updateUserProfile", data);
      return result['data'];
    }).catch(err => {
      throw err;
    });
  },
  getUserCode: ({commit}, accessCode) => {
    var headers = { 'Accept': 'application/json' };
    return API.get(`api/user/userCode/${accessCode}`, headers).then(result => {
      commit("validUserCode", accessCode);
      return result['data'];
    }).catch(err => {
      throw err;
    });
  },
  getMe: ({ commit }) => {
    if(!localStorage.getItem("token")) {
      return;
    }
    var headers = {accept: 'application/json'};
    return API.get('api/users/current', headers).then(result => {
      var data = result.data;
      var roles = data.userRoles;
      var isAdmin = (roles && roles.length > 0) ? (roles.indexOf("admin") > -1) : false;
      commit("setLogined", true);
      commit("setAdmin", isAdmin);
      commit("setUserProfile", data)
      return result['data'];
    }).catch(e => {
      localStorage.removeItem('token');
      console.log(e);
      // commit("setLogined", false);
      // commit("setAdmin", false);
    });
  },
  login: ({ commit }, data) => {
    return API.post('api/token', data).then(result => {
      var status;
      if (result.data == null) {
        status = {status: false, error: result.errors[0].errorMessage}; 
      }
      else {
        var token = result.data.access_token;
        localStorage.setItem("token", token);
        status = {status: true}
        commit("setUserProfile", result.data.user);
        commit("setLogined", true);
        commit("setAdmin", false);
      }
      return status;
    }).catch(e => {
      console.log(e);
      return e;
      // commit("setLogined", false);
      // commit("setAdmin", false);
    });
  },
  adminLogin: ({ commit }, data) => {
    return API.post('api/users/admin/login', data).then(result => {
      var token = result.data.access_token;
      localStorage.setItem("token", token);
      commit("setUserProfile", result.data.user);
      commit("setLogined", true);
      commit("setAdmin", true);
      return result.data;
    }).catch(e => {
      console.log(e);
      throw e;
      // commit("setLogined", false);
      // commit("setAdmin", false);
    });
  },
}

// mutations
const mutations = {
  setDrawer: set("showDrawer"),
  setImage: set("image"),
  setColor: set("color"),
  setLogined: set("isLogined"),
  setAdmin: set("isAdmin"),
  toggleDrawer: toggle("showDrawer"),
  setUserProfile: set("userProfile"),
  validUserCode: (state, code) => {
    state.userProfile.userAccessCode = code;
  },
  updateUserProfile: (state, data) => {
    state.userProfile.firstName = data.firstName;
    state.userProfile.lastName = data.lastName;
    state.userProfile.occupation = data.occupation;
    state.userProfile.postCode = data.postCode;
    state.userProfile.age = data.age;
    state.userProfile.gender = data.gender;
    state.userProfile.email = data.email;
    state.userProfile.userType = data.userType;
  },
  visitRecovery: (state) => {
    state.userProfile.recoveryChecked = true;
  },
  setRecoveryCompleted: (state) => {
    state.userProfile.recoveryCompleted = true;
  },
  setArticleCompleted: (state, data) => {
    state.userProfile[data.article.toLowerCase() + 'Completed'] = true;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
