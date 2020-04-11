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
    }
  ]
});
