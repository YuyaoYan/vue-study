<template>
  <div class="table-validate-container">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
        <template slot-scope="scope">
          <el-date-picker
            v-if="scope.row.isEdit"
            v-model="scope.row.date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
          <span v-else>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
        <template slot-scope="scope">
          <el-input v-if="scope.row.isEdit" v-model="scope.row.name">
          </el-input>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" width="180"
        ><template slot-scope="scope">
          <el-input v-if="scope.row.isEdit" v-model="scope.row.address">
          </el-input>
          <span v-else>{{ scope.row.address }}</span>
        </template></el-table-column
      >
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
        </template>
      </el-table-column>
    </el-table>
    <el-button class="btn-style" size="small" @click="handleAdd"
      >增行</el-button
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
export default {
  data() {
    return {
      isEdit: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "江路",
        },
      ],
      initObj: {
        date: "",
        name: "",
        address: "",
        isEdit: true,
      },
    };
  },
  created() {
    this.tableData.forEach((i) => (i.isEdit = false));
  },
  methods: {
    handleEdit(scope, flag) {
      console.log(scope);
      let _tableData = _.cloneDeep(this.tableData);
      this.$set(_tableData[scope.$index], "isEdit", flag);
      this.tableData = _tableData;
    },
    handleAdd() {
      this.tableData.push(_.cloneDeep(this.initObj));
    },
    handleSubmit() {
      console.log(this.tableData);
    },
  },
};
</script>
<style>
.table-validate-container {
  width: 50%;
  padding: 16px;
}
.btn-style {
  margin-top: 16px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>