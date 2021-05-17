import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";
import VueTailwind from "vue-tailwind";
import { settings } from "./vue-tailwind";

Vue.use(VueTailwind, settings);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
