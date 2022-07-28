<template>
  <div>
    <li>
      {{treeData.title}}
      <span v-if="treeData.children" @click="onShow">[{{onExpand?'-':'+'}}]</span>
      <ul v-for="children in treeData.children" :key="children.title">
        <YItem v-if="onExpand" :treeData="children"></YItem>
      </ul>
    </li>
  </div>
</template>
<script>
export default {
  name: "YItem",
  props: {
    treeData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      onExpand: false
    };
  },
  methods: {
    onShow() {
      this.onExpand = !this.onExpand;
    }
  }
};
</script>
