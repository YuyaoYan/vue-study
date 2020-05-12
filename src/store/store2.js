import Vue from "vue";
// import Vuex from "./storeResourceCode";
// Vue.use(Vuex)
const count = {
  namespaced: true,
  state: {
    count: 0
    // input: ""
  },
  //只有mutations能改state
  mutations: {
    increment(state, n = 1) {
      state.count += n;
    },
    updateValue(state, { val, key }) {
      debugger;
      Vue.set(state, key, val);
      console.log(state, val, key);
    }
  },
  getters: {
    score(state) {
      return `共扔出：${state.count}`;
    }
  },
  //复杂的业务逻辑，用dispatch调用
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit("increment", 2);
      }, 1000);
    }
  }
};

export default count;
