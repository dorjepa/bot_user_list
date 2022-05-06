import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify"
import axios from "axios"
import _ from 'lodash';
const range = _.range(1, 3); // [1, 2]
const random = _.random(0, 5); // an integer between 0 and 5

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
  vuetify,
  axios,
  _,
}).$mount("#app");
