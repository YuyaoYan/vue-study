import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
// Vue-router在3.1之后把$router.push()方法改为了Promise
// 会报错 Uncaught (in promise) NavigationDuplicated
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };
const route = [
  {
    path: "/",
    name: "yoyoMenu",
    component: function(resolve) {
      require(["./src/yoyoMenu.vue"], resolve);
    },
    children: [
      {
        path: "/yoyoHome",
        name: "yoyoHome",
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
      },
      {
        //hotTable
        path: "/hotTableComp",
        name: "hotTableComp",
        components: {
          hotTableComp: function(resolve) {
            require(["../yoyo-project/src/table/hotTableComp.vue"], resolve);
          }
        }
      },
      {
        //exportTable
        path: "/exportTable",
        name: "exportTable",
        components: {
          exportTable: function(resolve) {
            console.log(2);
            
            require(["../yoyo-project/src/table/exportTable.vue"], resolve);
          }
        }
      },
    ]
  }
];

export default route;
