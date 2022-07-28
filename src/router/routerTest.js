import home from "./../components/router/sourceRouter/home.vue";
import edit from "./../components/router/sourceRouter/edit.vue";
import Vue from "vue";

class VueRouter {
  constructor(options) {
    this.$options = options;
    this.routeMap = {};
    this.app = new Vue({
      data: {
        current: "/"
      }
    });
  }
  init() {
    this.bindEvent();
    this.createRouteMap(this.$options);
    this.initComponent();
  }
  bindEvent() {
    window.addEventListener("load", this.hashChange.bind(this));
    window.addEventListener("hashchange", this.hashChange.bind(this));
  }
  hashChange() {
    this.app.current = window.location.hash.slice("1") || "/";
  }
  createRouteMap(options) {
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.compontent;
    });
  }
  initComponent() {
    Vue.component("router-link", {
      props: {
        to: String
      },
      render(h) {
        return h("a", { attrs: { href: "#" + this.to } }, [
          this.$slots.default
        ]);
      }
    });
    Vue.component("router-view", {
      render: h => {
        const comp = this.routeMap[this.app.current];
        return h(comp);
      }
    });
  }
}
VueRouter.install = function(Vue) {
  Vue.mixin({
    beforeCreate() {
      if (this.$options.sourceCodeOfRouter) {
        Vue.prototype.$router = this.$options.sourceCodeOfRouter;
        this.$options.sourceCodeOfRouter.init();
      }
    }
  });
};

export default new VueRouter({
  routes: [
    {
      path: "/sourceRouter/home",
      component: home
    },
    {
      path: "/sourceRouter/edit",
      component: edit
    }
  ]
});
