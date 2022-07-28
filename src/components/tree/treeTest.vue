<template>
  <div class="treeTest-container">
    <Tree></Tree>
    <p>------------------------------------------------</p>
    <YTree></YTree>
  </div>
</template>
<script>
import Tree from "./Tree";
import YTree from "./YTree";
export default {
  components: { Tree, YTree }
};
</script>
<style lang="css" scope>
.treeTest-container {
  text-align: left;
}
</style>