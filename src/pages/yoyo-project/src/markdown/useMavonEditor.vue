<template>
  <div class="read-file-container">
      Header:
    <div class="header">
      <el-input v-model="header" placeholder="请输入内容"></el-input>
    </div>
    <mavon-editor v-model="value" />
    <div class="button-group">
      <el-button type="info" plain @click="value = ''">清空</el-button>
      <el-button type="info" @click="save">保存</el-button>
    </div>
  </div>
</template>
<script>
import saveAs from "./../../assets/js/fileSaver";
import marked from "marked";
export default {
  name: "useMavonEditor",
  data() {
    return {
      value: "",
      header: ""
    };
  },
  methods: {
    save() {
      console.log(marked("###hello"));
      //mobileCode 为写入文件的内容，可以通过获取文本框的value写入
      var file = new File([this.value], `${this.header}.md`, {
        type: "text/plain;charset=utf-8"
      });
      saveAs(file);
    }
  }
};
</script>
<style lang="css">
.read-file-container{
  padding: 10px;
}
.read-file-container .button-group {
  width: 155px;
  margin: 20px auto;
}
.read-file-container .header{
  padding: 10px 0 20px 10px;
  display: inline-block;
  width: 30%;
}
</style>