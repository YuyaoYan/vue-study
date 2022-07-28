<template>
  <div class="table-validate-container">
    <el-form :model="formData" :rules="ruleList" ref="form">
      <el-table :data="formData.tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
          <template slot-scope="scope">
            <el-form-item
              :prop="`tableData.${scope.$index}.date`"
              :rules="ruleList.date"
            >
              <el-date-picker
                v-if="scope.row.isEdit"
                v-model="scope.row.date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
              <span v-else>{{ scope.row.date }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
          <template slot-scope="scope">
            <el-form-item
              :prop="`tableData.${scope.$index}.name`"
              :rules="ruleList.name"
            >
              <el-input
                v-if="scope.row.isEdit"
                v-model="scope.row.name"
                clearable
              >
              </el-input>
              <span v-else>{{ scope.row.name }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址" width="180">
          <template slot-scope="scope">
            <el-form-item
              :prop="`tableData.${scope.$index}.address`"
              :rules="ruleList.address"
            >
              <el-input
                v-if="scope.row.isEdit"
                v-model="scope.row.address"
                clearable
              >
              </el-input>
              <span v-else>{{ scope.row.address }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.isEdit"
              @click="handleEdit(scope, false)"
              type="text"
              size="small"
              >取消</el-button
            >
            <el-button
              v-else
              @click="handleEdit(scope, true)"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button @click="handleDelete(scope)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button class="btn-style" size="small" @click="handleAddValiLine"
      >增行（只校验上一行）</el-button
    >
    <el-button class="btn-style" size="small" @click="handleAddValiHoleTable"
      >增行（全表校验）</el-button
    >
    <el-button class="btn-style" size="small" @click="handleAddNotVali"
      >增行（不校验）</el-button
    >
    <el-button
      class="btn-style"
      type="primary"
      size="small"
      @click="handleSubmit"
      >提交</el-button
    >
  </div>
</template>
<script>
import _ from "lodash";
import { valiDate } from "./../form-validate/validators";
export default {
  data() {
    return {
      isEdit: false,
      formData: {
        tableData: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市",
          },
          {
            date: "2022-01-03",
            name: "王小虎",
            address: "江路",
          },
        ],
      },
      ruleList: {
        date: [
          // { required: true, trigger: "blur", message: "请输入日期" },
          { validator: valiDate.bind(this, ["2022-01-01", "2022-01-10"]) },
        ],
        name: [{ required: true, trigger: "blur", message: "请输入姓名" }],
        address: [{ required: true, trigger: "blur", message: "请输入地址" }],
      },
      initObj: {
        date: "",
        name: "",
        address: "",
        isEdit: true,
      },
    };
  },
  created() {
    this.formData.tableData.forEach((i) => (i.isEdit = false));
  },
  methods: {
    handleEdit(scope, flag) {
      let _tableData = _.cloneDeep(this.formData.tableData);
      this.$set(_tableData[scope.$index], "isEdit", flag);
      this.formData.tableData = _tableData;
    },
    // 单行校验并增行
    handleAddValiLine() {
      if (!this.validateSigleRow("form", this.formData.tableData.length - 1))
        return;
      this.formData.tableData.push(_.cloneDeep(this.initObj));
    },
    // 整表校验并增行
    async handleAddValiHoleTable() {
      const res = await this.validateHoleTable("form");
      if (!res) return;
      this.formData.tableData.push(_.cloneDeep(this.initObj));
    },
    // 不校验直接增行
    handleAddNotVali() {
      this.formData.tableData.push(_.cloneDeep(this.initObj));
    },
    // 删除行
    handleDelete(scope) {
      this.formData.tableData.splice(scope.$index, 1);
    },
    // 提交
    async handleSubmit() {
      const res = await this.validateHoleTable("form");
      if (res) {
        this.$message.success("提交成功！");
      } else {
        this.$message.error("请修正表格字段。");
      }
    },

    // 行校验 返回false校验未通过
    validateSigleRow(form, index) {
      let result = true;
      for (let item of this.$refs[form].fields) {
        if (item.prop.split(".")[1] == index) {
          this.$refs[form].validateField(item.prop, (error) => {
            if (error != "") {
              result = false; // 校验未通过
            }
          });
        }
        if (!result) break;
      }
      return result;
    },
    // 全表校验 返回false校验未通过
    validateHoleTable(form) {
      let valiRes = this.formData.tableData.map((i, idx) => {
        return this.validateSigleRow(form, idx);
      });
      return valiRes.every((i) => !!i);
    },
  },
};
</script>
<style>
.table-validate-container {
  width: 700px;
  padding: 16px;
}
.btn-style {
  margin-top: 16px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.el-form-item {
  margin-bottom: 0;
}
.el-table .el-table__cell {
  padding: 0;
}
.el-form-item__error {
  bottom: 0;
  top: unset;
}
.el-form-item__content::after,
.el-form-item__content::before {
  height: 12px;
}
</style>