// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import store from "./store/index";
import showdown from "showdown"; // 引入md文件
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import router from "./router";
// import sourceCodeOfRouter from "./router/sourceCodeOfRouter";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(mavonEditor);

// 使用md文件
Vue.prototype.md2html = md => {
  let converter = new showdown.Converter();
  let text = md.toString();
  let html = converter.makeHtml(text);
  return html;
};
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  // sourceCodeOfRouter,
  store,
  components: { App },
  template: "<App/>"
});
