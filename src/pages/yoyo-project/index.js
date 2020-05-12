import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
const route = [
  {
    path: "/",
    name: "yoyoMenu",
    component:  function(resolve) {
        require(["./src/yoyoMenu.vue"], resolve);
    },
    children: [
      {
        path: "/yoyoHome",
        name:"yoyoHome",
        components: {
          yoyoHome: function(resolve) {
            require(["../yoyo-project/src/yoyoHome.vue"], resolve);
          }
        }
      },
      {
        path: "/markdown",
        name: "useMavonEditor",
        components: {
          markdown: function(resolve) {
            require([
              "../yoyo-project/src/markdown/useMavonEditor.vue"
            ], resolve);
          }
        }
      },
      {
        path: "/displayMarkdownFile",
        name: "displayMarkdownFile",
        components: {
          displayMarkdownFile: function(resolve) {
            require([
              "../yoyo-project/src/markdown/displayMarkdownFile.vue"
            ], resolve);
          }
        }
      }
    ]
  }
];

export default route;
