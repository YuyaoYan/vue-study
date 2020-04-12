<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
  </div>
</template>
<script>
import Schema from "async-validator";
export default {
  inject: ["Form"],
  name: "FormItem",
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  mounted() {
    //这么写会有返回值，抛出异常时会报错
    // this.$on("validate", this.validate);

    //这么写就是只执行validate函数
    this.$on("validate", () => {
      this.validate();
    });
  },
  data() {
    return {
      errorMessage: ""
    };
  },
  methods: {
    validate() {
      const value = this.Form.model[this.prop];
      const rules = this.Form.rules[this.prop];

      const desc = { [this.prop]: rules };
      const schema = new Schema(desc);

      //return是校验结果，schema返回的是promise
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.errorMessage = errors[0].message;
        } else {
          this.errorMessage = "";
        }
      });
    }
  }
};
</script>
<style lang="css" scope>
.errorMessage {
  color: lightsalmon;
}
</style>