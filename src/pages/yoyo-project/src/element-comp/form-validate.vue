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
export default {
  data() {
    /**
     * @param {Boolean} isIncludeBoundary 是否包含边界
     */
    let valiRange = (param, rules, value, callback) => {
      let [min, max, isIncludeBoundary = false] = param;
      let res = false;
      let _value = Number(value);
      let msg = ''
      if (value == null || value == "" || value == undefined) {
        callback();
      } else if (!_value) {
        callback(new Error(`请输入数字`));
      } else {
        if (isIncludeBoundary) {
          res = _value >= min && _value <= max;
          msg = `请输入[${min}，${max}]之间的数字`
        } else {
          res = _value > min && _value < max;
          msg = `请输入(${min}，${max})之间的数字`
        }
        !res && callback(new Error(msg));
      }
    };
    return {
      ruleForm: {
        name: "",
        age: "",
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
          {
            validator: valiRange.bind(this, [3, 5, true]),
            trigger: "change",
          },
        ],
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