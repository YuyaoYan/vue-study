<template>
  <div>
    <div>child component</div>
    <div>
      <div class="title">
        <slot name="slot-first" :foo="foo"></slot>
      </div>
      <div class="content">
        <slot name="slot-second"></slot>
      </div>
      <div class="footer">
        <slot name="default"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Slot",
  data() {
    return {
      foo: {
        subFoo: "abc"
      }
    };
  }
};
</script>
<style lang="css" scope>
.title {
  background: lightblue;
}
.content {
  background: lightsalmon;
}
.footer {
  background: pink;
}
</style>