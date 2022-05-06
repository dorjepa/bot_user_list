import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    nextPageUrl: "",
    previousPageUrl: ""
  },
  mutations: {
    updateUsers(state, usersData) {
      state.users = usersData.result;
      state.nextPageUrl = String(usersData["nextPageUrl?"]);
      state.previousPageUrl = String(usersData["previousPageUrl?"]);
    }
  },
  actions: {
    async fetchUsers(ctx, responceData) {
      console.log("responceData: ", responceData);
      let responceUrl =
          responceData.url +
          "?name=" +
          responceData.name +
          "&limit=" +
          responceData.limit +
          "&offset=" +
          responceData.offset;

      console.log("responceUrl: ", responceUrl);
      const res = await fetch(responceUrl);
      const users = await res.json();

      let usersData = {
        result: users,
        "nextPageUrl?":
            "name=" +
            responceData.name +
            "&limit=" +
            responceData.limit +
            "&offset=" +
            responceData.offset +
            responceData.limit,
        "previousPageUrl?":
            "name=" +
            responceData.name +
            "&limit=" +
            responceData.limit +
            "&offset=" +
            responceData.offset -
            responceData.limit
      };

      ctx.commit("updateUsers", usersData);
    }
  },
  getters: {
    allUsers(state) {
      return state.users;
    },
    nextPageUrl(state) {
      return state.nextPageUrl;
    },
    previousPageUrl(state) {
      return state.previousPageUrl;
    }
  }
});
