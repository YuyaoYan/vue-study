import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
const route = [
  {
    path: "/navigationGuard",
    name: "navigationGuard",
    component: function(resolve) {
      require(["./../components/router/advanced/navigationGuard.vue"], resolve);
    }
  },
  {
    path: "/navigationGuard/login",
    name: "login",
    component: () => import("./../components/router/advanced/login.vue")
  },
  {
    path: "/navigationGuard/home",
    name: "navigationGuardHome",
    component: function(resolve) {
      require(["./../components/router/advanced/home.vue"], resolve);
    }
  },
  {
    path: "/navigationGuard/commodityOne",
    name: "commodityOne",
    component: () => import("./../components/router/advanced/commodityOne.vue"),

    //表示这个页面需要登陆后才能查看
    meta: { auth: true }
  },
  {
    path: "/navigationGuard/commodityTwo",
    name: "commodityTwo",
    component: function(resolve) {
      require(["./../components/router/advanced/commodityTwo.vue"], resolve);
    }
  }
];

export default route;

//全局守卫
export const globalGuard = function(routeList) {
  routeList.beforeEach((to, from, next) => {
    next();
    console.log("to", to);
    // console.log("from",from);
    // console.log("next",next);
    if (to.meta.auth && !window.isLogin) {
      if (window.confirm("请登录")) {
        window.isLogin = true;
        next(); // 登录成功，继续
      } else {
        next("/navigationGuard/login"); // 放弃登录，回首页
      }
    } else {
      next(); // 不需登录，继续
    }
  });
};
