import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    users: [],
    countries: [],
  },
  getters: {
    getUsers: (state) => state.users,
    getCountries: (state) => state.countries,
  },
  mutations: {
    setCountries(state, countries) {
      Vue.set(state, "countries", countries);
    },
    setUsers(state, users) {
      Vue.set(state, "users", users);
    },
    addUser(state, user) {
      state.users.push(user);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    updateUser(state, user) {
      Vue.set(
        state,
        "users",
        state.users.map((obj) => (user.id === obj.id ? user : obj))
      );
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    removeUser(state, user) {
      Vue.set(
        state,
        "users",
        state.users.filter((el) => el.id != user.id)
      );
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
});
