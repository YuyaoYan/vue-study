import home from "./../components/router/sourceRouter/home.vue";
import edit from "./../components/router/sourceRouter/edit.vue";
import Vue from "vue";
class VueRouter {
  constructor(options) {
    console.log("options", options);
    this.$options = options;
    this.routeMap = {};

    //路由响应式
    this.app = new Vue({
      data: {
        current: "/"
      }
    });
  }
  init() {
    console.log("1");

    this.bindEvents();
    this.createRouteMap(this.$options);
    this.initComponent();
  }
  bindEvents() {
    console.log("2");
    window.addEventListener("load", this.onHashChange.bind(this));
    window.addEventListener("hashchange", this.onHashChange.bind(this));
  }
  onHashChange() {
    console.log("3", this.app);
    this.app.current = window.location.hash.slice("1") || "/";
  }
  createRouteMap(options) {
    console.log("4");
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.component;
    });
  }
  initComponent() {
    //router-link ,
    //<router-link to="">fff</>
    Vue.component("router-link", {
      props: { to: String },
      render(h) {
        console.log("5",h);
        //h(tag,data,children)
        //生成a标签

        return h("a", { attrs: { href: "#" + this.to } }, [
          this.$slots.default
        ]);
      }
    });
    //router-view
    Vue.component("router-view", {
      render: h => {
        console.log("6");
        const comp = this.routeMap[this.app.current];
        return h(comp);
      }
    });
  }
}
VueRouter.install = function(Vue) {
  console.log("000");
  Vue.mixin({
    beforeCreate() {
      //this是vue实例
      console.log("this.$options", this.$options);
      if (this.$options.sourceCodeOfRouter) {
        //仅在根组件执行一次
        Vue.prototype.$router = this.$options.sourceCodeOfRouter;
        this.$options.sourceCodeOfRouter.init();
      }
    }
  });
};

Vue.use(VueRouter);
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
