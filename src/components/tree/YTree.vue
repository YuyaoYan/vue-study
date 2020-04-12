<template>
  <div class="tree-container">
    <YItem :treeData="treeData"></YItem>
  </div>
</template>
<script>
import YItem from "./YItem";
export default {
  components: { YItem },
  data() {
    return {
      treeData: {
        title: "Web全栈架构师",
        children: [
          {
            title: "Java架构师"
          },
          {
            title: "JS高级",
            children: [
              {
                title: "ES6"
              },
              {
                title: "动效"
              }
            ]
          },
          {
            title: "Web全栈",
            children: [
              {
                title: "Vue训练营",
                expand: true,
                children: [
                  {
                    title: "组件化"
                  },
                  {
                    title: "源码"
                  },
                  {
                    title: "docker部署"
                  }
                ]
              },
              {
                title: "React",
                children: [
                  {
                    title: "JSX"
                  },
                  {
                    title: "虚拟DOM"
                  }
                ]
              },
              {
                title: "Node"
              }
            ]
          }
        ]
      }
    };
  }
};
</script>
<style scoped>
.tree-container {
  text-align: left;
}
</style>
