import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
function getJson(url, callback, errorCallback) {
  fetch(url).then(function(response) {
    if (response.status === 401) { 
      errorCallback(response.statusText);
    } else {
      return response.json();
    }
  }).then((myJson) => {
    callback(myJson);
  }).catch(error => {
    if (errorCallback) {
      errorCallback(error);
    }
  });
}


function postJson(url, data = {}, callback, errorCallback) {

  return fetch(url, {
    method: "POST",
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
})
.then(response => {
  response.json().then(
    data => callback(data)
  );
})
.catch(error => {
  if (errorCallback) {
    errorCallback(error);
  }
});
}

export default new Vuex.Store({
  state: {
    messages: [],
    lastPollTime: 0,
    usersOnline: [],

  },
  mutations: {
    setMessage(state,data){
      state.messages = state.messages.concat(data);
    },
    setTime(state,data){
      state.lastPollTime = data

    },
    setUsersOnline(state,data){
      state.usersOnline = data

    },

  },
  actions: {
    actionFetchMessages({commit,state}){
      let url = `http://localhost:3000/message/list?createdAfter=`;
      if(state.lastPollTime !== 0) {
         url += `${state.lastPollTime}`;
      }
       
      getJson(url, (data) => {
       
        commit('setMessage',data.message);
        commit('setTime',data.lastPollTime);  
      }, () => {}) ;


    },
    actionSendMessage(_, data){
      return new Promise((resolve, reject) => {
        postJson('http://localhost:3000/message/send',data, () => {
          resolve();
        }, () => {
          reject();
        });
      });
    },
    actionGetOnlineUsers({commit},data){

      postJson('http://localhost:3000/user/get_online_users',data, (data) => {commit('setUsersOnline',data.users_online_times)});
    }

  },
})
