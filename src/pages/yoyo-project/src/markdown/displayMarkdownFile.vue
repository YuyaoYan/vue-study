<template>
  <div class="displayMarkdownFile-container">
    <!-- menu start -->
    <div class="md-file-menu">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        active-text-color="#ffd04b"
        text-color="#565c63"
      >
      <div v-for="(item,index) in fileList" :key="index">
        <el-menu-item index="2-1-1" @click="change(item.name)">{{item.name}}</el-menu-item>
      </div>
      </el-menu>
    </div>
    <!-- menu end -->

    <!-- show the content of .md file on right side -->
    <div v-html="markedIntoHTML"></div>
  </div>
</template>
<script>
import marked from "marked";
import axios from "axios";
export default {
  name: "displayMarkdownFile",
  data() {
    return {
      markedIntoHTML: "",
      fileList: []
    };
  },
  created() {
    this.fileList = this.getAllMDFile();
    console.log("0==",this.fileList);
    
  },
  methods: {
    change(fileName) {
      axios.get(`http://localhost:8080/static/md/${fileName}.md`).then(response => {
        console.log(response.data);
        this.markedIntoHTML = marked(response.data);
      });
    },
    getAllMDFile() {
      debugger;
      // 拉取该文件夹下所有文件信息
      const filesMD = require.context(
        "../../../../../static/md",
        true,
        /\.md$/
      );
      const filesMDNames = filesMD.keys();
      const tmepListDatas = [];
      filesMDNames.map(item => {
        const listObj = {};
        const listItemS = item.split("/");
        if (listItemS.length > 0) {
          listObj.name = listItemS[1].replace(".md", "");
          listObj.path = item;
          listObj.children = [];
          listObj.showChild = false;
        }
        console.log(tmepListDatas);
        
        return tmepListDatas.push(listObj);
      });
      return tmepListDatas
    }
  }
};
</script>
<style lang="css">
.md-file-menu {
  width: 10%;
}
</style>