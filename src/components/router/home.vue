<template>
  <div class="router-container">
    <!-- 动态路由 -->
    <div class="block">
      动态路由
      <router-link to="/list">list</router-link>
      <router-link to="/edit">edit</router-link>
    </div>

    <!-- 嵌套路由 -->
    <div class="block">
      嵌套路由
      <p>
        <span @click="nestedRouterChange('list')">list</span>
        <span @click="nestedRouterChange('edit')">edit</span>
      </p>
      <router-view></router-view>
      <router-view name="edit"></router-view>
      <router-view name="list"></router-view>
    </div>

    <!-- 重定向和别名 -->
    <div class="block">
      重定向和别名
      <div>
        <button @click="onRedrect">redirect with param</button>
      </div>
    </div>

    <!-- 使用component传入组件 -->
    <div class="block">
      使用component传入组件
      <div>
        <button @click="test">click me</button>
      </div>
    </div>

    <!-- 路由传参：解偶 -->
    <div class="block">
      路由传参：解偶
      <div>
        <button @click="onPropClick('Boolean')">布尔模式</button>
        <button @click="onPropClick('Object')">对象模式</button>
        <button @click="onPropClick('Function')">函数模式</button>
      </div>
    </div>

    <!-- 动态组件 -->
    <div @click="changeComp" class="block">
      动态组件
      <component :is="subComp">LIST</component>
    </div>

    <div class="block">
      <a
        href="https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%B8%83%E5%B0%94%E6%A8%A1%E5%BC%8F"
        target="_blank"
      >Vue Router API</a>
    </div>
  </div>
</template>
<script>
import list from "./list";
import edit from "./edit";
export default {
  name: "home",
  components: { list, edit },
  data() {
    return {
      subComp: list
    };
  },
  methods: {
    changeComp() {
      this.subComp = this.subComp == edit ? list : edit;
    },
    nestedRouterChange(i) {
      this.$router.push({
        path: "/home/" + `${i}`
      });
    },

    //重定向带参
    onRedrect() {
      this.$router.push({
        path: "/home/list",
        redirect: "/home/redirect",
        query: {
          name: "name"
        }
      });
    },
    test() {
      this.$router.push({
        path: "A"
      });
    },
    onPropClick(i) {
      if (i === "Boolean") {
        this.$router.push({
          path: "/user/99/00"
        });
      } else if (i === "Function") {
        this.$router.push({
          path: "/user",
          // props: route => ({ query: route.query.q }),
          query: {
            q: "00"
          }
        });
      } else if (i === "Object") {
        this.$router.push({
          path: "/user",
          props: {
            ddd: "ee"
          }
        });
      }
    }
  }
};
</script>
<style lang="css" scope>
.router-container {
  width: 500px;
  margin: 0 auto;
}
.block {
  border-bottom: 1px solid lightgray;
  padding: 10px 0 30px;
}
.router-container > div:last-child {
  border-bottom: none;
}
</style>