import Vue from "vue";
// import Vuex from "./storeResourceCode";
import Vuex from "vuex";
import a from "./store";
import b from "./store2";
Vue.use(Vuex);

// 普通写法
// export default new Vuex.Store({
  // state: {
  //   count: 0
  // },
  // //只有mutations能改state
  // mutations: {
  //   increment(state, n = 1) {
  //     state.count += n;
  //   }
  // },
  // getters: {
  //   score(state) {
  //     return `共扔出：${state.count}`;
  //   }
  // },
  // //复杂的业务逻辑，用dispatch调用
  // actions: {
  //   incrementAsync({ commit }) {
  //     setTimeout(() => {
  //       commit("increment", 2);
  //     }, 1000);
  //   }
  // }
// });

// 模块化写法如下
export default new Vuex.Store({
  modules: {
    a: a,
    b: b
  }
});
