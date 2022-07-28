<template>
  <div>
    <Form :model="model" :rules="rules" ref="Form">
      <FormItem label="username" prop="username">
        <Input v-model="model.username" autocomplete="auto" />
      </FormItem>
      <FormItem label="password" prop="password">
        <Input v-model="model.password" />
      </FormItem>
      <FormItem label="password">
        <div>
          <button @click="onSubmit('Form')">signin</button>
        </div>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import Form from "./Form";
import FormItem from "./FormItem";
import Input from "./Input";
export default {
  components: { Form, FormItem, Input },
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "please input username", trigger: "blur" }
        ],
        password: [{ required: true, message: "please input password" }]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log("login");
        } else {
          console.log("fail");
        }
      });
    }
  }
};
</script>