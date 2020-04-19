// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import store from "./store/index";
console.log("store",store);

import router from './router'
// import sourceCodeOfRouter from "./router/sourceCodeOfRouter";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  // sourceCodeOfRouter,
  store,
  components: { App },
  template: "<App/>"
});
