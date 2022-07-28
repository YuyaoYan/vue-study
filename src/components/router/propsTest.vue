<template>
  <div>
    <div>Boolean props's value is: {{ id+" and "+rr }}</div>
    <div>Object props's value is: {{ ddd }}</div>
    <!-- 函数模式没有做出来，下面不做参考 -->
    <div>Function props's value is: {{ q }}{{this.$route.query }}</div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String
    },
    rr: {
      type: String
    },
    ddd: {
      type: String
    },
    q: {
      type: String
    }
  }
};
</script>