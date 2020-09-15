<template>
  <div class="handson-wrapper">
    <div class="report-title">{{tableTitle}}</div>
    <div id="handsonContainer"></div>
  </div>
</template>
<script>
import "handsontable/dist/handsontable.full.css";
var XLSX = window.XLSX;
var xlsxUtils = {
  Binary: {
    fixdata(data) {
      //文件流转BinaryString
      var o = "",
        l = 0,
        w = 10240;
      for (; l < data.byteLength / w; ++l)
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        );
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    },
    s2ab(s) {
      //字符串转字符流
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
  },
  _wb: null,
  _rABS: false,
  /**
   * @desc  导入根据文件
   * @param {File} f 文件
   * @param {Function} c 回调
   * @return {Object} 回调值
   */
  import(f, c) {
    this.wb = null;
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      xlsxUtils._wb = xlsxUtils._rABS
        ? XLSX.read(btoa(xlsxUtils.Binary.fixdata(data)), { type: "base64" })
        : XLSX.read(data, { type: "binary" });
      if (typeof c == "function") {
        c(xlsxUtils._wb);
      }
    };
    if (xlsxUtils._rABS) {
      reader.readAsArrayBuffer(f);
    } else {
      reader.readAsBinaryString(f);
    }
  },
  /**
   * @desc  根据表Sheet名获取数据
   * @param {String} name
   * @return {Object}
   */
  getSheetByName(name) {
    //
    return XLSX.utils.sheet_to_json(xlsxUtils._wb.Sheets[name]);
  },
  /**
   * @desc  根据表Sheet索引获取数据
   * @param {Number} index
   * @return {Object}
   */
  getSheetByIndex(index = 0) {
    return xlsxUtils.getSheetByName(xlsxUtils._wb.SheetNames[index]);
  },
  /**
   * @desc 导出
   * @param {Array} data 数据{title1:dataList,title2:dataList....}
   * @param {String} type
   * @return {Blob}
   */
  export(data, type) {
    var tmpWB = null;
    for (var title in data) {
      var tmpdata = xlsxUtils.format2Sheet(data[title]);
      tmpWB = xlsxUtils.format2WB(tmpdata, title, tmpWB);
    }
    return xlsxUtils.format2Blob(tmpWB, type);
  },
  /**
   * 从数据数组或对象中根据key生成相同key值的对象
   * @param {Object|Array} data
   * @return {Object}
   */
  readDataHead(data) {
    var o = {},
      d = Array.isArray(data) ? Object.keys(data[0]) : data;
    for (var i of d) o[i] = i;
    return o;
  },
  /**
   * @desc 格式化数据为Sheet格式
   * @param {Array} json 数据
   * @param {Number} n 列偏移
   * @param {Number} r 行偏移
   * @param {Array} keyMap 对象键数组
   * @param {Function|Boolean} t 数据
   */
  format2Sheet(json, n, r, keyMap, t) {
    keyMap = keyMap || Object.keys(json[0]);
    var types =
      t == undefined
        ? v =>
            ({ number: "n", undefined: "s", boolean: "b", string: "s" }[
              typeof v
            ] || "s")
        : t;
    n = n || 0;
    r = r || 0;
    var tmpdata = {}; //用来保存转换好的json
    var t1 = json
      .map((v, i) =>
        keyMap.map((k, j) =>
          Object.assign(
            {},
            {
              v: v[k],
              position:
                (j + n > 25
                  ? xlsxUtils.getCharCol(j + n)
                  : String.fromCharCode(65 + (j + n))) +
                (i + 1 + r)
            }
          )
        )
      )
      .reduce((prev, next) => prev.concat(next))
      .forEach(
        (v, i) =>
          (tmpdata[v.position] = {
            v: v.v,
            t: types ? types(v.v) : "s"
          })
      );
    return tmpdata;
  },
  /**
   * @desc 格式化数据为Sheet格式
   * @param {Array} sheetData
   * @param {String} title
   * @param {Object} wb
   * @param {Object} ref
   */
  format2WB(sheetData, title, wb, ref) {
    title = title || "mySheet";
    var outputPos = Object.keys(sheetData);
    if (!wb) wb = { Sheets: {}, SheetNames: [] };
    wb.SheetNames.push(title);
    wb.Sheets[title] = Object.assign({}, sheetData, {
      "!ref":
        ref ||
        outputPos[0] + ":" + outputPos.reverse().find(_ => _.indexOf("!") == -1) //设置填充区域
    });
    return wb;
  },
  /**
   * @desc 将xlsx Workbook 转为blob
   * @param {Array} wb
   * @param {String} type 类型
   */
  format2Blob(wb, type) {
    return new Blob(
      [
        xlsxUtils.Binary.s2ab(
          XLSX.write(
            wb,
            {
              bookType: type == undefined ? "xlsx" : type,
              bookSST: false,
              type: "binary"
            } //这里的数据是用来定义导出的格式类型
          )
        )
      ],
      { type: "" }
    );
  },
  /**
   * @desc 匹配单元格对应的标识
   * @param {Number} n
   */
  getCharCol(n) {
    let temCol = "",
      s = "",
      m = 0;
    while (n > 0) {
      m = (n % 26) + 1;
      s = String.fromCharCode(m + 64) + s;
      n = (n - m) / 26;
    }
    return s;
  }
};
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
    },
    id: {
      type: String,
      default: ""
    },
    exportHead: {
      type: Object,
      default: null
    },
    keyMap: {
      //通过设置数组让导出时可以按顺序显示
      type: Array
    },
    rowHeaderNum: {
      //表头行数
      type: Number
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
      },
      vmTbl: null
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
      hotSettings.readOnly = true;
      hotSettings.exportFile = true;
      hotSettings.rowHeaders = true;
      hotSettings.contextMenu = true;
      // 合并setting对象的个性化参数;
      if (!!this.customSettings) {
        hotSettings = Object.assign(hotSettings, this.customSettings);
      }

      // 初始化实例;
      var hot = new Handsontable(hotElement, hotSettings);
      this.vmTbl = hot;
    },
    caculateWindowInnerheight() {
      this.defaultSettings.height = window.innerHeight - 230;
    },

    exportFun(date) {
      var wopts = { bookType: "xlsx", bookSST: false, type: "binary" };
      this.downloadExl(date);
    },
    downloadExl(date) {
      var data = xlsxUtils.format2Sheet(
        this.dataSource,
        0,
        this.rowHeaderNum,
        this.keyMap
      ); //偏移2行按keyMap顺序转换
      var dataKeys = Object.keys(data);

      for (var k in this.exportHead) {
        data[k] = this.exportHead[k]; //追加列头
      }
      data.A1.v = date.slice(0, 7);

      var wb = xlsxUtils.format2WB(
        data,
        undefined,
        undefined,
        "A1:" + dataKeys[dataKeys.length - 1]
      );
      this.saveAs(xlsxUtils.format2Blob(wb), `${this.tableTitle}.xlsx`);
    },
    saveAs(obj, fileName) {
      var tmpa = document.createElement("a");
      tmpa.download = fileName || "下载";
      tmpa.href = URL.createObjectURL(obj); //绑定a标签
      tmpa.click(); //模拟点击实现下载
      setTimeout(function() {
        //延时释放
        URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
      }, 100);
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
