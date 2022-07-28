<template>
  <div class="trans">
    <div class="transPage">
      <div class="tools-panel">
        <!-- 报表区域 start -->
        <div class="report-section">
          <HandsonTable
            ref="exportTable"
            v-if="dataSource.length"
            tableTitle="险种汇总表"
            :dataSource="dataSource"
            :columns="columns"
            id="exportTable"
            :nestedHeaders="nestedHeaders"
            :columnSummaryList="columnSummaryList"
            :mergeCellOps="mergeCellOps"
            :customSettings="customSettings"
            :exportHead="head"
            :keyMap="keyMap"
            :rowHeaderNum="4"
          ></HandsonTable>
        </div>
        <el-button type="primary" @click="exportFun">导出</el-button>
        <!-- 报表区域 end -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import HandsonTable from "./HandsonTable";
import mockDataObj from "./mock.js";

export default {
  name: "exportTable",
  components: {
    HandsonTable
  },
  props: {},
  data() {
    return {
      //清除查询框
      clearShow: false,
      msg: "hello",
      //隐藏更多查询项，true为隐藏，false为显示
      hideMore: true,
      //已选择条数
      selectlength: 0,
      //表格查询绑定的参数
      queryParams: {
        id: "",
        enterName: "",
        //年月选择框
        dateSearch: "",
        //统计纬度
        statisticalDimension: "",
        //保费纬度
        premiumLatitude: ""
      },

      //===关于报表的配置===;
      // 定义列;
      columns: [
        {
          data: "ensureType",
          type: "text",
          width: 50,
          className: "htCenter htMiddle"
        },
        {
          data: "ensureName",
          type: "text",
          width: 110,
          className: "htCenter htMiddle"
        },
        {
          data: "monthFee",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "monthIncreaseNum",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "monthIncreaseRadio",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "yearFee",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "yearIncreaseNum",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "yearIncreaseRadio",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "agencyMonthFee",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "agencyMonthIncreaseNum",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "agencyYearFee",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "agencyYearIncreaseNum",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "manageMonthFee",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "manageMonthIncreaseNum",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "manageYearFee",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "manageYearIncreaseNum",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        }
      ],
      // 合并表头;
      nestedHeaders: [
        [
          {
            label: "2019年   9月  30日",
            colspan: 12
          },
          {
            label: "单位:万元",
            colspan: 4
          }
        ],
        [
          "",
          "",
          {
            label: "保险板块",
            colspan: 6
          },
          {
            label: "其中：代理费",
            colspan: 4
          },
          {
            label: "其中：经纪费",
            colspan: 4
          }
        ],
        [
          "",
          "",
          {
            label: "本月",
            colspan: 3
          },
          {
            label: "本年",
            colspan: 3
          },
          {
            label: "本月",
            colspan: 2
          },
          {
            label: "本年",
            colspan: 2
          },
          {
            label: "本月",
            colspan: 2
          },
          {
            label: "本年",
            colspan: 2
          },
          {
            label: "本月",
            colspan: 2
          },
          {
            label: "本年",
            colspan: 2
          }
        ],
        [
          "险类",
          "险种名称",
          "保费",
          "同比增长值",
          "同比增长率",
          "保费",
          "同比增长值",
          "同比增长率",
          "保费",
          "同比增长值",
          "保费",
          "同比增长值",
          "保费",
          "同比增长值",
          "保费",
          "同比增长值"
        ]
      ],
      head: {
        A1: { v: "2019年   9月  30日" },
        B1: { v: "" },
        C1: { v: "" },
        D1: { v: "" },
        E1: { v: "" },
        F1: { v: "" },
        G1: { v: "" },
        H1: { v: "" },
        I1: { v: "" },
        J1: { v: "" },
        K1: { v: "" },
        L1: { v: "" },
        M1: { v: "单位：万元" },
        N1: { v: "" },
        O1: { v: "" },
        P1: { v: "" },

        A2: { v: "险类" },
        B2: { v: "险种名称" },
        C2: { v: "保险板块" },
        D2: { v: "" },
        E2: { v: "" },
        F2: { v: "" },
        G2: { v: "" },
        H2: { v: "" },
        I2: { v: "其中：保代" },
        J2: { v: "" },
        K2: { v: "" },
        L2: { v: "" },
        M2: { v: "其中：保经" },
        N2: { v: "" },
        O2: { v: "" },
        P2: { v: "" },

        A3: { v: "" },
        B3: { v: "" },
        C3: { v: "本月" },
        D3: { v: "" },
        E3: { v: "" },
        F3: { v: "本年" },
        G3: { v: "" },
        H3: { v: "" },
        I3: { v: "本月" },
        J3: { v: "" },
        K3: { v: "本年" },
        L3: { v: "" },
        M3: { v: "本月" },
        N3: { v: "" },
        O3: { v: "本年" },
        P3: { v: "" },

        A4: { v: "" },
        B4: { v: "" },
        C4: { v: "保费" },
        D4: { v: "同比增长值" },
        E4: { v: "同比增长率" },
        F4: { v: "保费" },
        G4: { v: "同比增长值" },
        H4: { v: "同比增长率" },
        I4: { v: "保费" },
        J4: { v: "同比增长值" },
        K4: { v: "保费" },
        L4: { v: "同比增长值" },
        M4: { v: "保费" },
        N4: { v: "同比增长值" },
        O4: { v: "保费" },
        P4: { v: "同比增长值" },

        "!merges": [
          // s: start  e: end  c: col  r: row
          { s: { c: 0, r: 0 }, e: { c: 11, r: 0 } },
          { s: { c: 12, r: 0 }, e: { c: 15, r: 0 } },

          { s: { c: 0, r: 1 }, e: { c: 0, r: 3 } },
          { s: { c: 1, r: 1 }, e: { c: 1, r: 3 } },

          { s: { c: 2, r: 1 }, e: { c: 7, r: 1 } },
          { s: { c: 8, r: 1 }, e: { c: 11, r: 1 } },
          { s: { c: 12, r: 1 }, e: { c: 15, r: 1 } },

          { s: { c: 2, r: 2 }, e: { c: 4, r: 2 } },
          { s: { c: 5, r: 2 }, e: { c: 7, r: 2 } },
          { s: { c: 8, r: 2 }, e: { c: 9, r: 2 } },
          { s: { c: 10, r: 2 }, e: { c: 11, r: 2 } },
          { s: { c: 12, r: 2 }, e: { c: 13, r: 2 } },
          { s: { c: 14, r: 2 }, e: { c: 15, r: 2 } },

          { s: { c: 0, r: 4 }, e: { c: 0, r: 12 } },
          { s: { c: 0, r: 13 }, e: { c: 0, r: 15 } },
          { s: { c: 0, r: 16 }, e: { c: 1, r: 16 } },
          { s: { c: 0, r: 17 }, e: { c: 1, r: 17 } }
        ]
      },
      keyMap: [
        "ensureType",
        "ensureName",
        "monthFee",
        "monthIncreaseNum",
        "monthIncreaseRadio",
        "yearFee",
        "yearIncreaseNum",
        "yearIncreaseRadio",
        "agencyMonthFee",
        "agencyMonthIncreaseNum",
        "agencyYearFee",
        "agencyYearIncreaseNum",
        "manageMonthFee",
        "manageMonthIncreaseNum",
        "manageYearFee",
        "manageYearIncreaseNum"
      ],

      // 数据源;
      dataSource: [],
      // 合计数据的配置对象集合;
      columnSummaryList: [],
      // 合并单元格的配置对象集合;
      mergeCellOps: [],
      // 自定义setting;
      customSettings: {
        // height: 440
      }
      // === 报表的配置 结束 ===
    };
  },
  created() {
    this.initDataSource();
  },
  methods: {
    /**
     * 获取报表的数据源;
     */
    initDataSource() {
      var that = this;
      axios
        .post("/getData1", {
          params: {
            pk: "23424"
          }
        })
        .then(res => {
          if (res.status == "200" && res.data.length) {
            let resData = res.data;
            // 过滤数据源,获取 数据源及分组数据;
            let retDataSource = that.formatDataSource(resData);
            that.dataSource = retDataSource.dataSource;
            that.mergeCellOps = retDataSource.mergeCellOps;
            that.columnSummaryList = that.getColumnSummary();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     *  @param 获取合并列配置;
     */

    formatDataSource(dataSource) {
      if (!!dataSource && dataSource.length) {
        var dataObj = {
          employeeList: [], // 企财险
          personalList: [], //个人险
          otherList: [] //合计row;
        };
        dataSource.forEach(function(item, key) {
          if (item.ensureType == "企业险") {
            dataObj.employeeList.push(item);
          } else if (item.ensureType == "个人险") {
            dataObj.personalList.push(item);
          } else {
            dataObj.otherList.push(item);
          }
        });
        let tempEmployeeObj = {
          ensureType: "企业险",
          ensureName: "小计"
        };
        let tempPersonalObj = {
          ensureType: "个人险",
          ensureName: "小计"
        };
        let tempOtherObj = {
          ensureType: "汇总",
          ensureName: "合计"
        };
        dataObj.employeeList.push(tempEmployeeObj);
        dataObj.personalList.push(tempPersonalObj);
        dataObj.otherList.push(tempOtherObj);
        let num = 0;
        var mergeCellOps = [];
        for (var key in dataObj) {
          var itemNum = dataObj[key].length;
          if (itemNum) {
            var tempOps = {
              row: num,
              col: 0,
              rowspan: itemNum,
              colspan: 1
            };
            mergeCellOps.push(tempOps);
            num += itemNum;
          }
        }
        let retData = dataObj.employeeList.concat(
          dataObj.personalList,
          dataObj.otherList
        );
        let retObj = {
          dataSource: retData,
          mergeCellOps: mergeCellOps
        };
        return retObj;
      }
    },
    /**
     * @param 获取需要计算单元格配置;
     */

    getColumnSummary() {
      let retSummaryCfg = [];
      let columnList = [2, 3, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15]; // 需要计算的列的索引的集合;
      for (var i = 0; i < columnList.length; i++) {
        var tempCfg1 = {
          destinationRow: 8,
          destinationColumn: columnList[i],
          type: "sum",
          forceNumeric: true,
          ranges: [
            [0, 1],
            [4, 7]
          ]
        };
        retSummaryCfg.push(tempCfg1);
        var tempCfg2 = {
          destinationRow: 12,
          destinationColumn: columnList[i],
          type: "sum",
          forceNumeric: true,
          ranges: [[9, 11]]
        };
        retSummaryCfg.push(tempCfg2);
        var tempCfg3 = {
          destinationRow: 13,
          destinationColumn: columnList[i],
          type: "sum",
          forceNumeric: true,
          ranges: [
            [0, 1],
            [4, 7],
            [9, 11]
          ]
        };
        retSummaryCfg.push(tempCfg3);
      }

      return retSummaryCfg;
    },
    // 导出
    exportFun() {
      this.$refs.exportTable.exportFun(
        // this.queryParams.dateSearch
        //   ? this.formatDate("paramType", this.queryParams.dateSearch)
        //   : this.currentDate
        "2020-06-01"
      );
    }
  }
};
</script>
<style scope></style>
