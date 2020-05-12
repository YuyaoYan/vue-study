// router部分的测试路由文件
const A = {
  template: `<div>template</div>`
};
const User = {
  props: ["id"],
  template: `<div>User{{$route.params.id}} <div>`
};
const router = [
  {
    //router测试
    path: "/home",
    name: "home",
    component: function(resolve) {
      require(["./home.vue"], resolve);
    },
    children: [
      {
        path: "edit",
        alias: "alias", //别名
        components: {
          list: function(resolve) {
            require(["./list.vue"], resolve);
          },
          edit: function(resolve) {
            require(["./edit.vue"], resolve);
          },
          default: function(resolve) {
            require(["./edit"], resolve);
          }
        }
      }
    ]
  },
  {
    //router测试
    path: "/home/list",
    name: "list",
    redirect: "/home/alias", //重定向
    component: function(resolve) {
      require(["./list.vue"], resolve);
    }
  },
  {
    //router测试
    path: "/home/edit",
    name: "edit",
    component: function(resolve) {
      require(["./edit.vue"], resolve);
    }
  },
  {
    path: "/home/redirect",
    name: "redirect",
    component: function(resolve) {
      require(["./redirect.vue"], resolve);
    }
  },
  {
    path: "/home/A",
    name: "A",
    component: A
  },
  {
    //路由传参 - 布尔值写法
    path: "/user/:id/:rr",
    component: function(resolve) {
      require(["./propsTest.vue"], resolve);
    },
    props: true,
  },
  {
    //路由传参 - 对象写法
    path: "/user",
    component: function(resolve) {
      require(["./propsTest.vue"], resolve);
    },
    props: {
      ddd: "ee"
    }
  },
  {
    //路由传参 - 函数写法
    path: "/user",
    component: function(resolve) {
      require(["./propsTest.vue"], resolve);
    },
    props: (route) => ({ query: route.query.q }),
  },
  
];
export default router;
