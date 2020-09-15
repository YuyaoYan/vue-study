<template>
  <div class="displayMarkdownFile-container">
    <!-- menu start -->
    <div class="md-file-menu">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        active-text-color="#565c63"
        text-color="#565c63"
      >
        <div v-for="(item,index) in fileList" :key="index">
          <el-menu-item index="index" @click="change(item.name)">{{item.name}}</el-menu-item>
        </div>
      </el-menu>
    </div>
    <!-- menu end -->

    <!-- show the content of .md file on right side -->
    <div class="md-file-display" v-html="markedIntoHTML"></div>
  </div>
</template>
<script>
import marked from "marked";
import axios from "axios";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
export default {
  name: "displayMarkdownFile",
  data() {
    return {
      markedIntoHTML: "",
      fileList: [],
      hljs: null
    };
  },
  created() {
    this.fileList = this.getAllMDFile();
  },
  mounted() {},
  methods: {
    change(fileName) {
      console.log(111);
      debugger;
      axios
        .get(`http://localhost:8080/static/md/${fileName}.md`)
        .then(response => {
          console.log("marked", marked);
          // marked.setOptions({
          //   renderer: new marked.Renderer(),
          //   highlight: function(code) {
          //     return hljs.highlightAuto(code).value;
          //   },
          //   pedantic: false,
          //   gfm: true,
          //   tables: true,
          //   breaks: false,
          //   sanitize: false,
          //   smartLists: true,
          //   smartypants: false,
          //   xhtml: false
          // });
          this.markedIntoHTML = marked(response.data, {
            renderer: new marked.Renderer(),
            highlight: function(code) {
              return hljs.highlightAuto(code).value;
            },
            pedantic: false,
            gfm: true,
            tables: true,
            breaks: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false
          });
        });
    },
    getAllMDFile() {
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
        return tmepListDatas.push(listObj);
      });
      return tmepListDatas;
    }
  }
};
</script>
<style lang="css">
.md-file-menu {
  display: inline-block;
  width: 10%;
}
.md-file-display {
  display: inline-block;
  vertical-align: top;
}
</style>