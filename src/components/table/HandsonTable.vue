<template>
  <div class="handson-wrapper">
    <div class="report-title">{{tableTitle}}</div>
    <div id="handsonContainer"></div>
  </div>
</template>
<script>
import "handsontable/dist/handsontable.full.css";

export default {
  name: "HandsonTable",
  props: {
    dataSource: {
      // 数据源;
      type: Array
    },
    columns: {
      // 定义列;
      type: Array
    },
    nestedHeaders: {
      // 合并表头;
      type: Array
    },
    columnSummaryList: {
      // 统计数据的配置对象集合;
      type: Array,
      default: function() {
        return [];
      }
    },
    mergeCellOps: {
      // 合并单元格的配置对象集合;
      type: Array
    },
    customSettings: {
      // 自定义的配置项;
      type: Object
    },
    tableTitle: {
      type: String,
      default: "业务数据统计表"
    }
  },
  data: function() {
    return {
      defaultSettings: {
        licenseKey: "non-commercial-and-evaluation",
        stretchH: "all",
        width: "100%",
        autoWrapRow: true,
        height: 400,
        maxRows: 14,
        rowHeaders: true,
        columnSorting: false, //排序属性;
        // colHeaders: colHeaders || [],
        colWidths: 80,
        className: "htRight htMiddle",
        data: [],
        mergeCells: [],
        columns: [],
        nestedHeaders: [],
        columnSummary: []
      }
    };
  },
  mounted() {
    this.caculateWindowInnerheight();
    //初始化组件;
    this.renderDashboard(
      this.dataSource,
      this.columns,
      this.nestedHeaders,
      this.mergeCellOps,
      this.columnSummaryList
    );
  },
  methods: {
    /**
     *  @description 生成报表;
     *  @param {object} dataSource; 表格渲染的数据源;
     *  @param {array}  columns  列定义;
     *  @param {array}  colHeaders 表格头标签; 如果有合并表头的需求,失效,使用 nestedHeaders;
     *  @param {array}  nestedHeaders  合并表头时配置对象;
     *  @param {array}  mergeCells 合并行标题配置对象;
     */
    renderDashboard(
      dataSource,
      columns,
      nestedHeaders,
      mergeCells,
      columnSummaryList
    ) {
      var hotElement = document.getElementById("handsonContainer");
      var hotElementContainer = hotElement.parentNode;
      // 设置setting对象;
      let hotSettings = JSON.parse(JSON.stringify(this.defaultSettings));
      hotSettings.data = dataSource;
      hotSettings.columns = columns;
      hotSettings.mergeCells = mergeCells;
      hotSettings.nestedHeaders = nestedHeaders;
      hotSettings.columnSummary = columnSummaryList;

      // 合并setting对象的个性化参数;
      if (!!this.customSettings) {
        hotSettings = Object.assign(hotSettings, this.customSettings);
      }
      

      // 初始化实例;
      var hot = new Handsontable(hotElement, hotSettings);
    },
    caculateWindowInnerheight() {
      this.defaultSettings.height = window.innerHeight - 230;
    }
  }
};
</script>
<style type="text/css" scope>
.handsontable td,
.handsontable th {
  font-size: 12px;
}
.handson-wrapper {
  overflow: auto;
}
.report-title {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0;
}
</style>
