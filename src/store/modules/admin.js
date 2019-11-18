import { set, toggle } from "@/util/vuex";
import { Items, groups } from "@/api/user"
import  APIService  from '@/apiService/apiService.js';
import moment from 'moment'

const API = new APIService ();

const state = {
  checkoutStatus: null,
  showDrawer: null,
  users: Items,
  userGroups: groups,
  group: null,
  group_data: [],
  user_data: [],
  diets: [],
  checkinData: [],
  // Coach
  review_list: [],
  message_thread: [],
  message_list: [],
  weeklySummary: [],
  selectedUser: "",
  checkinData: [],
}

// getters
const getters = {
  getCheckoutStatus: state => state.checkoutStatus,
  getGroupData: state => state.group_data,
  getUserData: state => state.user_data,
  getDataDiets: state => state.diets,
  getCheckinData: state => state.checkinData,
  //Coach
  getReviewData: state => state.review_list,
  getMessages: state => state.message_thread, //TODO: bind from UI
  getMessageList: state => state.message_list,
  getCoachGroups: state => state.group_data,
  getWeeklySummary: state => state.weeklySummary,
  getCheckinData: state => state.checkinData,
  getSelectedUser: state => state.selectedUser
}

// actions
const actions = {
  createGroup: ({ commit }, data) => {
    return API.post('api/admin/group', data ).then(result => {
      if(result.data) {
        commit("addGroup", result.data);
      }
      return result;
    }).catch(err => {
      throw err
    });
  },
  deleteGroup: ({ commit }, groupId) => {
    return API.delete('api/admin/group/' + groupId ).then(result => {
      commit("removeGroup", groupId)
      return "success";
    }).catch(err => {
      throw err
    });
  },
  createUser: ({ commit }, newUser) => {
    var userParams = `?FullName=${newUser.fullName}&Email=${newUser.email}&password=${newUser.password}&Gender=${newUser.gender}&UserType=${newUser.userType}&Measure=${newUser.unit}`;
    if (newUser.group) {
      userParams += '&GroupId=' + newUser.group;
    }
    return API.post('api/admin/user' + userParams).then(result => {
      if(result.data){
        var user = {
          email: newUser.email,
          fullName: newUser.fullName,
          gender: newUser.gender,
          id: result.data.id,
          groupID: newUser.group,
          userType: newUser.userType == 0 ? 'User' : 'Coach'
        }
        commit("addUser", user);
      }
      
      return result;
    }).catch(err => {
      throw err;
    });
  },
  deleteUser: ({ commit }, userId) => {
    return API.delete('api/admin/user/'+userId).then(result => {
      commit("removeUser", userId)
    }).catch(err => {
      throw err
    });
  },
  getCoachGroups: ({commit}) => {
    var headers = {
      "Accept": "application/json"
    };
    return API.get(`api/coach/groups`, headers).then(resp => {
      commit("get_group_success", resp['data']);
      return resp;
    }).catch(err => {
      return err;
    });
  },
  getgroups: ({commit}, params ) => {
    commit("get_group_request");
    var headers = {
      "Content-Type": "application/json"
    };
    var data = {
      "hasFilter": true,
      "filters": [{
        "fieldName": "Id",
        "value": params.Search,
        "operator": 3,
        "tablePrefix": "FT"
      }]
    };
    return API.post(`api/admin/groups/filter?Count=${params.Count}&Page=${params.Page}&Sort=${params.Sort}`, data, headers).then(resp => {
      commit("get_group_success", resp['data']);
      return resp;
    }).catch(err => {
      commit("get_group_failed");
      return err;
    });
  },
  getusers: ({ commit }, params ) => {
    commit("get_user_request");
    var data = {
      "hasFilter": true,
      "filters": [{
        "fieldName": "Id",
        "value": params.params.Search,
        "operator": 3,
        "tablePrefix": "FT"
      }]
    };
    var headers = {
      "Content-Type": "application/json"
    };
    return API.post(`api/admin/users/filter?Count=${params.params.Count}&Page=${params.params.Page}&Sort=${params.params.Sort}`, data, headers).then(resp => {
      commit("get_user_success", resp.data);
      return resp.data;
    }).catch(err => {
      commit("get_user_failed");
      return err;
    });
  },
  getReviewList: ({ commit }, params) => {
    let requestPath = `api/coach/review?`;
    if (params.weekNo)
    {
      requestPath += `weekNo=${params.weekNo}`;
    }
    if (params.groupId)
    {
      requestPath += `groupId=${params.groupId}`;
    }
    return API.get(requestPath)
      .then(result => {
        commit("setReviewList", result['data']);
        return result['data'];
      })
      .catch(err => {
        throw err;
      });
  },
  getMessageList: ({ commit }, params) => {
    let requestPath = `api/coach/messages?`;
    if (params.weekNo)
    {
      requestPath += `weekNo=${params.weekNo}`;
    }
    if (params.groupId)
    {
      requestPath += `&groupId=${params.groupId}`;
    }
    return API.get(requestPath)
      .then(result => {
        commit("setMessageList", result['data']);
        return result['data'];
      })
      .catch(err => {
        throw err;
      });
  },
  getMessageThread: ({ commit }, params) => {
    let requestPath = `api/coach/messages/thread?userId=${params.userId}`;
    if (params.weekNo)
    {
      requestPath += `&weekNo=${params.weekNo}`;
    }
    return API.get(requestPath)
      .then(result => {
        commit("setMessageThread", result['data']);
        return result['data'];
      })
      .catch(err => {
        throw err;
      });
  },
  /*getmessagesthread: ({commit}, params ) => {
    commit("get_messages_request");
    var headers = {
      "Content-Type": "application/json"
    };
    var data = {
      "hasFilter": true,
      "filters": [{
        "fieldName": "Id",
        "value": params.params.Search,
        "operator": 3,
        "tablePrefix": "FT"
      }]
    };
    return API.post(`/api/coach/message/thread?UserId=${params.params.userId}&Count=${params.params.Count}&Page=${params.params.Page}&Sort=${params.params.Sort}`, data, headers).then(resp => {
      commit("get_messages_success", resp);
      return resp;
    }).catch(err => {
      commit("get_messages_failed");
      return err;
    });
  },*/
  sendMessage: ({ commit }, data) => {
    //{ "userId": "3c2692a0-8768-4472-b9de-3fcb57fde1d9", "weekno": "DA00AD5C-5F3B-446D-B8B9-9A7932047185", "message": "Good week, keep going"}
    var headers = {
      'Content-Type': 'application/json-patch+json',
      'Accept': 'application/json'
    };
    return API.post('api/coach/message', data, headers).then(result => {
      commit("addMessage", result.data)
    }).catch(err => {
      throw err
    });
  },
  messagesArchive: ({ commit }, userId) => {
    var headers = {
      "Accept": "application/json"
    };
    return API.get('api/coach/message/thread/archive/'+userId).then(result => {
      commit("messages_archive_success", userId)
    }).catch(err => {
      throw err
    });
  },
  submitReview: ({ commit }, data) => {
    console.log("submitReview called. for userId: " + data.userId + " Message:" + data.message);
    var headers = {
      'Content-Type': 'application/json-patch+json',
      'Accept': 'application/json'
    };
    return API.post('api/coach/review/weekly', data, headers).then(result => {
      commit("removeFromToReviewList", result.data)
      commit("addMessage", result.data)
    }).catch(err => {
      throw err
    });
  },
  // account features
  getUser: ({ commit }, userId) => {
    return API.get(`api/users/${userId}`)
      .then(result => {
        // commit("setUser", result['data']);
        return result['data'];
      })
      .catch(err => {
        throw err;
      });
  },
  updateMacros: ({ commit }, params) => {
    console.log("updateMacros called. for userId:"+params.userId + " Macro fat:" + params.fat);
    var headers = {
      'Content-Type': 'application/json-patch+json',
      'Accept': 'application/json'
    };
    return API.post(`api/coach/macros?UserId=${params.userId}&Protein=${params.protein}&Carbohydrate=${params.carbohydrate}&Fat=${params.fat}&Calories=${params.calories}`).then(result => {
      commit("updatedMacros", result.data)
    }).catch(err => {
      throw err
    });
  },
  resetPassword: ({ commit }, email) => {
    console.log("resetPassword called. for user Email:"+email);
    var headers = {
      'Content-Type': 'application/json-patch+json',
    };
    var data = {
      email: email
    };
    return API.post(`api/users/resetpass`, data, headers).then(result => {
      commit("passwordResetUser", result.data)
    }).catch(err => {
      throw err
    });
  },
  updateAvatar: ({ commit }, data) => {
    var headers = {
      'Content-Type': 'application/json-patch+json',
      'Accept': 'application/json'
    };
    return API.patch(`api/admin/user/updateAvatar`, data, headers).then(result => {
      console.log(result);
    }).catch(err => {
      throw err
    });
  },
  getWeeklySummary: ({ commit }, params) => {
    var headers = { 'Content-Type': 'application/json-patch+json' };
    return API.post('api/coach/summary/week/filter' + params.params, {}, headers).then(result => {
      let tempArray = Object.assign([], result['data']);
      if(tempArray && tempArray.length > 0){
        tempArray[0]['date'] = params.date;
        commit("saveWeeklySummary", tempArray);
      }
      return tempArray;
    }).catch(err => {
      throw err;
    });
  },
  getCheckinData: ({ commit }, userId) => {
    var headers = { 'Content-Type': 'application/json-patch+json', 'Accept': 'application/json' };
    return API.get(`api/coach/checkin/${userId}/20`, headers).then(result => {
      commit("saveCheckinData", result['data']);
      return result['data'];
    }).catch(err => {
      throw err;
    });
  },
  getDiets: ({ commit }, params) => {
    var startDate = moment(params.startDate).format('YYYY-MM-DD');
    var endDate = moment(params.endDate).format('YYYY-MM-DD');
    return API.get(`api/coach/diet/${params.userId}/${startDate}/${endDate}/${params.pageSize}/${params.currentPage}`)
      .then(result => {
        // commit("setDiets", result['data']);
        return result['data'];
      })
      .catch(err => {
        throw err;
      });
  },
  updateUnit: ({ commit }, data) => {
    var headers = {
      'Accept': 'application/json'
    };
    return API.patch(`api/admin/user/updateUnit`, data, headers).then(result => {
      console.log(result);
    }).catch(err => {
      throw err
    });
  },
  setSelectedUser: ({ commit }, userId) => {
    commit("setSelectedUser", userId);
  },
}

// mutations
const mutations = {
  setDrawer: set("showDrawer"),
  setImage: set("image"),
  setColor: set("color"),
  toggleDrawer: toggle("showDrawer"),
  setGroup: set('group'),
  setMessages: set('messages'),
  setUser: set('user'),
  setDiets: set("diets"),
  updatedMacros: set('macros'),
  passwordResetUser: set('passwordReset'),
  saveCheckinData: set("checkinData"),
  addGroup: (state, group) => {
    state.group_data.push(group);
  },
  setSelectedUser: (state, userId) => {
    state.selectedUser = userId;
  },
  removeGroup: (state, group) => {
    var index;
    for (let i = 0; i < state.group_data.length; i++) {
      const element = state.group_data[i];
      if (element.id == group)
        index = i;
    }
    state.group_data.splice(index, 1);
  },
  get_group_request(state) {
    state.status = "sending_group_request";
  },
  get_group_success(state, group_data) {
    state.status = "get_group_success";
    state.group_data = group_data;
  },
  get_group_failed(state) {
    state.status = "get_group_failed";
  },
  setReviewList(state, list) {
    state.status = "reviewList";
    state.review_list = list;
  },
  //messages
  setMessageList(state, list) {
    state.status = "messageList";
    state.message_list = list;
  },
  setMessageThread(state, list) {
    state.status = "messageThread";
    state.message_thread = list;
  },
  get_messages_request(state) {
    state.status = "sending_messages_request";
  },
  get_messages_success(state, messages_thread) {
    state.status = "get_messages_success";
    state.messages_thread = messages_thread;
  },
  get_messages_failed(state) {
    state.status = "get_messages_failed";
  },
  addMessage: (state, message) => {
    state.message_thread.push(message);
  },
  removeFromToReviewList: (state, data) => {
    var tmp = state.review_list;
    for (var i = 0; i < tmp.length; i ++) {
      if (tmp[i].weeklyDataId == data.weeklyDataId && tmp[i].userId == data.recipientUserId) {
        tmp[i].reviewed = data.time;
      }
    }
    state.review_list = tmp;
    console.log(state.review_list);
  },
  messages_archive_success(state, userId) {
    var tmp = state.message_list;
    console.log(userId);
    for (var i = 0; i < tmp.length; i ++) {
      if (tmp[i]['userId'] == userId) {
        console.log(userId);
        var date = new Date();
        tmp[i]['archived'] = date.toDateString();
      }
    }
    state.message_list = tmp;
    state.status = "messages_archived";
  },
  // user
  setUser: set('user'),
  get_user_request(state) {
    state.status = "sending_user_request";
  },
  get_user_success: (state, user_data) => {
    state.status = "get_user_success";
    state.user_data = user_data;
  },
  get_user_failed(state) {
    state.status = "get_user_failed";
  },
  addUser: (state, user) => {
    var groupName = "";
    for (let i = 0; i < state.group_data.length; i ++) {
      if (state.group_data[i].id == user.groupID) {
        groupName = state.group_data[i].title;
      }
    }
    user['groupName'] = groupName;
    state.user_data.push(user);
  },
  removeUser: (state, user) => {
    var index;
    for (let i = 0; i < state.user_data.length; i++) {
      const element = state.user_data[i];
      if (element.id == user)
        index = i;
    }
    state.user_data.splice(index, 1);
  },
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
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
