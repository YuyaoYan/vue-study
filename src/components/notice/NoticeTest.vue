<template>
  <div>
    <button @click="showNotice" >show</button>
    <Notice></Notice>
  </div>
</template>
<script>
import Notice from "./Notice";
import create from "./../../utils/create";

export default {
  components: { Notice },
  methods: {
    showNotice() {
      const notice = create(Notice, {
        title: "Notice",
        message: "Come on",
        duration: 1000
      });
      notice.show();
    }
  }
};
</script>