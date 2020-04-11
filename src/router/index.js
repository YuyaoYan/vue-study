import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

export default new Router({
  routes: [
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
    }
  ]
});
