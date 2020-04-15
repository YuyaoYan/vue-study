import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import routerTest from "./yrouter";
import navigationGuard,{globalGuard} from "./navigationGuard"
Vue.use(Router);
const route = [
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld
  },
  {
    path: "/SlotTest",
    name: "SlotTest",
    component: function(resolve) {
      require(["./../components/slot/SlotTest.vue"], resolve);
    }
  },
  {
    //表单
    path: "/FormTest",
    name: "FormTest",
    component: function(resolve) {
      require(["./../components/form/index.vue"], resolve);
    }
  },
  {
    //弹窗
    path: "/NoticeTest",
    name: "NoticeTest",
    component: function(resolve) {
      require(["./../components/notice/NoticeTest.vue"], resolve);
    }
  },
  {
    //弹窗
    path: "/treeTest",
    name: "treeTest",
    component: function(resolve) {
      require(["./../components/tree/treeTest.vue"], resolve);
    }
  },
  {
    //过度动画
    path:"/transition",
    name: "transition",
    component: function(resolve) {
      require(["./../components/transition.vue"], resolve);
    }
  }
];

const routes = route.concat(routerTest,navigationGuard);
const finalRoute = new Router({ routes });

globalGuard(finalRoute)
export default finalRoute;