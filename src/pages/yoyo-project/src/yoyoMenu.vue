<template>
  <div class="yoyo-home-container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" @click="goToNewPage('/yoyoHome')">Home Page</el-menu-item>
      <el-submenu index="2">
        <template slot="title">Plugin</template>
        <el-submenu index="2-1">
          <template slot="title">markdown plugin</template>
          <el-menu-item index="2-1-1" @click="goToNewPage('/markdown')">add md file</el-menu-item>
          <el-menu-item index="2-1-2" @click="goToNewPage('/displayMarkdownFile')">display md file</el-menu-item>
        </el-submenu>
        <el-submenu index="2-2">
          <template slot="title">handsontable & xlsx</template>
          <el-menu-item index="2-4-1" @click="goToNewPage('/hotTableComp')">use handsontable</el-menu-item>
          <el-menu-item index="2-4-2" @click="goToNewPage('/exportTable')">export table by xlsx</el-menu-item>
          <el-menu-item index="2-4-3" @click="goToNewPage('')">xlsx new version</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">Practice</template>
        <el-submenu index="3-1">
          <template slot="title">el-dialog</template>
          <el-menu-item index="3-1-1" @click="goToNewPage('/dialog')">append el-dialog</el-menu-item>
        </el-submenu>
        <el-submenu index="3-2">
          <template slot="title">CSS</template>
          <el-menu-item index="3-2-1" @click="goToNewPage('/triangle')">triangle</el-menu-item>
        </el-submenu>
        <el-submenu index="3-3">
          <template slot="title">element-comp</template>
          <el-menu-item index="3-3-1" @click="goToNewPage('/form-validate')">form-validate</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>

    <!-- 路由配置 -->
    <div class="yoyo-container">
      <!-- <components is="yoyoHome"></components> -->
      <router-view name="yoyoHome"></router-view>
      <router-view name="markdown"></router-view>
      <router-view name="displayMarkdownFile"></router-view>
      <router-view name="dialog"></router-view>
      <router-view name="hotTableComp"></router-view>
      <router-view name="exportTable"></router-view>
      <router-view name="triangle"></router-view>
      <router-view name="formValidate"></router-view>
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
    goToNewPage(page) {
      this.$router.push({
        path: page
      });
    }
  }
};
</script>
<style lang="css" scoped>
.yoyo-home-container .menu-content {
  display: inline-block;
}
</style>