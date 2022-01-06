<template>
  <div class="form-validate-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="身高" prop="height">
        <el-input v-model="ruleForm.height"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="idNumber">
        <el-input v-model="ruleForm.idNumber"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { valiRange, valiAccuracy, valiPhoneNum, valiIDNumber } from "./mixin";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        age: "",
        height: "",
        phone: "",
        idNumber: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "change" },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "change",
          },
        ],
        age: [
          { validator: valiAccuracy.bind(this, [1]), trigger: "change" },
          {
            validator: valiRange.bind(this, [3, 5, true]),
            trigger: "change",
          },
        ],
        height: [
          { validator: valiAccuracy.bind(this, [1]), trigger: "change" },
        ],
        phone: [{ validator: valiPhoneNum, trigger: "change" }],
        idNumber: [{ validator: valiIDNumber, trigger: "change" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style>
.form-validate-container {
  width: 30%;
  padding: 20px;
}
</style>