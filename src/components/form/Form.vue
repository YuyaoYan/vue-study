<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Form",
  provide() {
    return {
      Form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(cb) {
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate());
      //所有任务都通过才算校验成功
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>
