<template>
  <div class="trans">
    <div class="transPage">
      <div class="tools-panel">
        <!-- 报表区域 start -->
        <div class="report-section">
          <HandsonTable
            v-if="dataSource.length"
            tableTitle="险种汇总表"
            :dataSource="dataSource"
            :columns="columns"
            :nestedHeaders="nestedHeaders"
            :columnSummaryList="columnSummaryList"
            :mergeCellOps="mergeCellOps"
            :customSettings="customSettings"
          ></HandsonTable>
        </div>
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
  name: "hotTableComp",
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
      console.log("dataSource", dataSource);
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
        console.log("retObj", retObj);
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
    }
  }
};
</script>
<style scope></style>
