<template>
  <div class="navigation-container">
    <div>Navigation Guard Page</div>
    <p>
      commodityOne已登陆
      commodityTwo未登陆
    </p>
    <p>
      navigationGuard跳转commodityOne需登陆
      <br />navigationGuard跳转commodityTwo不需登陆
    </p>
    <div class="button-style">
      <button @click="beforeEachClick('One')">全局前置守卫 --> go to the commodityOne</button>
      <button @click="beforeEachClick('Two')">全局前置守卫 --> go to the commodityTwo</button>
      <button @click="click">Normal Jump</button>
      <button @click="beforeEachClick">全局前置守卫</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "navigationGuard",
  methods: {
    beforeEachClick(type) {
      this.$router.push(
        {
          path: "/navigationGuard/commodity" + `${type}`
        },
        //onComplete 在导航成功完成 (在所有的异步钩子被解析之后) 调用
        // onAbort 在终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候调用
        onComplete => {},
        onAbort => {}
      );
    },
    click() {
      this.$router.push({
        path: "/navigationGuard/home"
      });
    }
  }
};
</script>
<style lang="css">
.navigation-container > p {
  /* text-align: left; */
}
.button-style > button {
  margin: 10px auto;
  display: block;
}
</style>