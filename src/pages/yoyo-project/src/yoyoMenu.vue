<template>
  <div class="yoyo-home-container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" @click="goToNewPage('home')">Home Page</el-menu-item>
      <el-submenu index="2">
        <template slot="title">Practice</template>
        <el-submenu index="2-1">
          <template slot="title">markdown plugin</template>
          <el-menu-item index="2-1-1" @click="goToNewPage(1)">add md file</el-menu-item>
          <el-menu-item index="2-1-2" @click="goToNewPage(2)">display md file</el-menu-item>
        </el-submenu>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>

    <!-- 路由配置 -->
    <div class="yoyo-container">
      <!-- <components is="yoyoHome"></components> -->
      <router-view name="yoyoHome"></router-view>
      <router-view name="markdown"></router-view>
      <router-view name="displayMarkdownFile"></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "yoyoMenu",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    goToNewPage(page) {
      switch (page) {
        case 1:
          this.$router.push({
            path: "/markdown"
          });
          break;
        case "home":
          this.$router.push({
            path: "/yoyoHome"
          });
          break;
        case 2:
          this.$router.push({
            path: "/displayMarkdownFile"
          });
          break;

        default:
          break;
      }
    }
  }
};
</script>
<style lang="css" scoped>
.yoyo-home-container .menu-content {
  display: inline-block;
}
</style>