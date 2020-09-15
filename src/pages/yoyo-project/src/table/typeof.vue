<template>
  <!-- 1. 险种汇总表 -->
  <div class="trans">
    <div class="transPage">
      <div class="tools-panel">
        <!-- toolbar start -->
        <div class="tools-bar">
          <!-- 查询 start -->
          <div class="tools-search">
            <el-form
              :inline="true"
              :model="queryParams"
              class="demo-form-inline"
              v-show="!clearShow"
            >
              <el-form-item>
                <el-select
                  clearable
                  v-model="queryParams.statisticalDimension"
                  placeholder="请选择统计维度"
                >
                  <el-option label="出单日期" value="issueDate"></el-option>
                  <el-option label="起保日期" value="policyBegindate"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item>
                <el-select clearable clear-icon="el-icon-circle-close" v-model="queryParams.premiumLatitude" placeholder="请选择保费纬度">
                  <el-option label="原保费" value="1"></el-option>
                  <el-option label="当前保费" value="2"></el-option>
                </el-select>
              </el-form-item>-->
              <el-form-item>
                <el-date-picker
                  :clearable="clearShow"
                  v-model="queryParams.dateSearch"
                  type="month"
                  format="yyyy-MM"
                  placeholder="请选择年月"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="resetSearch">重置</el-button>
                <el-button type="primary" @click="exportFun">导出</el-button>
              </el-form-item>
            </el-form>
            <div v-show="clearShow" class="clearIcon">
              <span @click="clearSelection">x</span>
            </div>
          </div>
          <!-- 查询 end -->
        </div>
        <!-- 报表区域 start -->
        <div class="report-section">
          <handsontable
            ref="ComprehensiveBusinessStatistics"
            v-if="dataSource.length"
            :key="timer"
            id="ComprehensiveBusinessStatistics"
            tableTitle="保险板块业务数据统计表"
            :dataSource="dataSource"
            :columns="columns"
            :nestedHeaders="nestedHeaders"
            :columnSummaryList="columnSummaryList"
            :mergeCellOps="mergeCellOps"
            :customSettings="customSettings"
            :exportHead="head"
            :keyMap="keyMap"
            :rowHeaderNum="4"
          ></handsontable>
        </div>
        <!-- 报表区域 end -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import api from "../../../assets/js/api.js";
// import qs from "qs";
import handsontable from "./HandsonTable";
export default {
  name: "ComprehensiveBusinessStatistics",
  components: {
    handsontable
  },
  props: {},
  data() {
    return {
      timer: "",
      //清除查询框
      clearShow: false,
      msg: "hello",
      //已选择条数
      selectlength: 0,
      //表格查询绑定的参数
      queryParams: {
        id: "",
        enterName: "",
        //年月选择框
        dateSearch: "",
        //统计纬度
        statisticalDimension: "issueDate",
        //保费纬度
        premiumLatitude: ""
      },
      currentDate: "",
      // 根据返回值动态配置租户
      tenant: [],
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
          data: "sum_current_month_premium",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "sum_current_month_growthValue",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "sum_current_month_growthRate",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "sum_current_year_premium",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "sum_current_year_growthValue",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "sum_current_year_growthRate",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "qdgbxjj_current_month_premium",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "qdgbxjj_current_month_growthValue",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "qdgbxjj_current_year_premium",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "qdgbxjj_current_year_growthValue",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "qdgbxjj1_current_month_premium",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "qdgbxjj1_current_month_growthValue",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "qdgbxjj1_current_year_premium",
          type: "numeric",
          numericFormat: {
            pattern: "0.00"
          }
        },
        {
          data: "qdgbxjj1_current_year_growthValue",
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
            label: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
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
            label: "其中：保代",
            colspan: 4
          },
          {
            label: "其中：保经",
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
      },
      // === 报表的配置 结束 ===
      sortByEmployeeList: [
        "企业财产险",
        "责任险",
        "其中：码责险",
        "其中：雇主责任险",
        "车险",
        "船舶险",
        "货运险",
        "企业其他险种",
        "小计"
        // 家财险
        // 健康险
        // 意外险
        // 个人寿险
      ],
      sortByPersonal: [
        "车险",
        "人身险",
        "个人其他险种",
        "小计"
        // 意外险、健康险、个人寿险
        // 货运险、家财险、企业财产险、责任险、船舶险
      ],

      bussiness: {
        ensureName: "企业财产险",
        ensureType: "企业险"
      },
      response: {
        ensureName: "责任险",
        ensureType: "企业险"
      },
      amongCodeLiability: {
        ensureName: "其中：码责险",
        ensureType: "企业险"
      },
      amongEmployersLiability: {
        ensureName: "其中：雇主责任险",
        ensureType: "企业险"
      },
      car: {
        ensureName: "车险",
        ensureType: "企业险"
      },
      ship: {
        ensureName: "船舶险",
        ensureType: "企业险"
      },
      cargins: {
        ensureName: "货运险",
        ensureType: "企业险"
      },
      bussinessOthers: {
        ensureName: "企业其他险种", // 健康险、意外险、个人寿险、家财险的和
        ensureType: "企业险"
      },
      // 下面是合并部分
      family: {
        ensureName: "家财险",
        ensureType: "企业险"
      },
      health: {
        ensureName: "健康险",
        ensureType: "企业险"
      },
      accident: {
        ensureName: "意外险",
        ensureType: "企业险"
      },
      age: {
        ensureName: "个人寿险",
        ensureType: "企业险"
      },

      //personal
      personalcar: {
        ensureName: "车险",
        ensureType: "个人险"
      },
      personalLifeInsurance: {
        ensureName: "人身险", // 意外险、健康险、个人寿险 的和
        ensureType: "个人险"
      },
      personalOthers: {
        ensureName: "个人其他险种", // 货运险、家财险、企业财产险、责任险、船舶险 的和
        ensureType: "个人险"
      },
      // 下面是合并部分
      personalhealth: {
        ensureName: "健康险",
        ensureType: "个人险"
      },
      personalaccident: {
        ensureName: "意外险",
        ensureType: "个人险"
      },
      personalage: {
        ensureName: "个人寿险",
        ensureType: "个人险"
      },

      personalcargins: {
        ensureName: "货运险",
        ensureType: "个人险"
      },
      personalfamily: {
        ensureName: "家财险",
        ensureType: "个人险"
      },
      personalbussiness: {
        ensureName: "企业财产险",
        ensureType: "个人险"
      },
      personalresponse: {
        ensureName: "责任险",
        ensureType: "个人险"
      },
      personalship: {
        ensureName: "船舶险",
        ensureType: "个人险"
      },

      personalamongCodeLiability: {
        ensureName: "码责险",
        ensureType: "个人险"
      },
      personalamongEmployersLiability: {
        ensureName: "雇主责任险",
        ensureType: "个人险"
      },
      // head: {
      //   A1: { v: "2019年   9月  30日" },
      //   B1: { v: "" },
      //   C1: { v: "" },
      //   D1: { v: "" },
      //   E1: { v: "" },
      //   F1: { v: "" },
      //   G1: { v: "" },
      //   H1: { v: "" },
      //   I1: { v: "" },
      //   J1: { v: "" },
      //   K1: { v: "" },
      //   L1: { v: "" },
      //   M1: { v: "" },
      //   N1: { v: "" },
      //   O1: { v: "" },
      //   P1: { v: "" },
      //   Q1: { v: "" },
      //   R1: { v: "" },
      //   S1: { v: "单位：万元" },
      //   T1: { v: "" },
      //   U1: { v: "" },
      //   V1: { v: "" },
      //   W1: { v: "" },
      //   X1: { v: "" },
      //   Y1: { v: "" },
      //   Z1: { v: "" },
      //   A2: { v: "险类" },
      //   B2: { v: "业务来源" },
      //   C2: { v: "保险板块" },
      //   D2: { v: "" },
      //   E2: { v: "" },
      //   F2: { v: "" },
      //   G2: { v: "" },
      //   H2: { v: "" },
      //   I2: { v: "" },
      //   J2: { v: "" },
      //   K2: { v: "其中：保代" },
      //   L2: { v: "" },
      //   M2: { v: "" },
      //   N2: { v: "" },
      //   O2: { v: "" },
      //   P2: { v: "" },
      //   Q2: { v: "" },
      //   R2: { v: "" },
      //   S2: { v: "其中：保经" },
      //   T2: { v: "" },
      //   U2: { v: "" },
      //   V2: { v: "" },
      //   W2: { v: "" },
      //   X2: { v: "" },
      //   Y2: { v: "" },
      //   Z2: { v: "" },
      //   A3: { v: "" },
      //   B3: { v: "" },
      //   C3: { v: "本月保费" },
      //   D3: { v: "本月保额" },
      //   E3: { v: "去年同期保费" },
      //   F3: { v: "去年同期保额" },
      //   G3: { v: "今年累计保费" },
      //   H3: { v: "今年累计保额" },
      //   I3: { v: "去年同期累计保费" },
      //   J3: { v: "去年同期累计保额" },
      //   K3: { v: "本月保费" },
      //   L3: { v: "本月保额" },
      //   M3: { v: "去年同期保费" },
      //   N3: { v: "去年同期保额" },
      //   O3: { v: "今年累计保费" },
      //   P3: { v: "今年累计保额" },
      //   Q3: { v: "去年同期累计保费" },
      //   R3: { v: "去年同期累计保额" },
      //   S3: { v: "本月保费" },
      //   T3: { v: "本月保额" },
      //   U3: { v: "去年同期保费" },
      //   V3: { v: "去年同期保额" },
      //   W3: { v: "今年累计保费" },
      //   X3: { v: "今年累计保额" },
      //   Y3: { v: "去年同期累计保费" },
      //   Z3: { v: "去年同期累计保额" },
      //   "!merges": [
      //     // s: start  e: end  c: col  r: row
      //     { s: { c: 0, r: 0 }, e: { c: 18, r: 0 } },
      //     { s: { c: 19, r: 0 }, e: { c: 26, r: 0 } },

      //     { s: { c: 0, r: 1 }, e: { c: 0, r: 2 } },
      //     { s: { c: 1, r: 1 }, e: { c: 1, r: 2 } },

      //     { s: { c: 2, r: 1 }, e: { c: 9, r: 2 } },
      //     { s: { c: 10, r: 1 }, e: { c: 18, r: 2 } },
      //     { s: { c: 19, r: 1 }, e: { c: 16, r: 2 } }
      //   ]
      // },
      // keyMap: [
      //   "ensureType",
      //   "ensureName",
      //   "sum_current_month_premium",
      //   "sum_current_month_growthValue",
      //   "sum_current_month_growthRate",
      //   "sum_current_year_premium",
      //   "sum_current_year_growthValue",
      //   "sum_current_year_growthRate",
      //   "qdgbxjj_current_month_premium",
      //   "qdgbxjj_current_month_growthValue",
      //   "qdgbxjj_current_year_premium",
      //   "qdgbxjj_current_year_growthValue",
      //   "qdgbxjj1_current_month_premium",
      //   "qdgbxjj1_current_month_growthValue",
      //   "qdgbxjj1_current_year_premium",
      //   "qdgbxjj1_current_year_growthValue",
      //   "",
      //   "",
      //   "",
      //   "",
      //   "",
      //   "",
      //   "",
      //   "",
      //   "",
      //   ""
      // ]
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
          { s: { c: 0, r: 13 }, e: { c: 0, r: 16 } },
        ]
      },
      keyMap: [
        "ensureType",
        "ensureName",
        "sum_current_month_premium",
        "sum_current_month_growthValue",
        "sum_current_month_growthRate",
        "sum_current_year_premium",
        "sum_current_year_growthValue",
        "sum_current_year_growthRate",
        "qdgbxjj_current_month_premium",
        "qdgbxjj_current_month_growthValue",
        "qdgbxjj_current_year_premium",
        "qdgbxjj_current_year_growthValue",
        "qdgbxjj1_current_month_premium",
        "qdgbxjj1_current_month_growthValue",
        "qdgbxjj1_current_year_premium",
        "qdgbxjj1_current_year_growthValue",
      ],
    };
  },
  created() {
    this.currentDate = this.formatDate("tableshow", "");
    this.queryParams.dateSearch = this.formatDate("paramType", "");
  },
  mounted() {
    let param = {
      queryType: this.queryParams.statisticalDimension,
      startDate: this.queryParams.dateSearch
    };
    this.initDataSource(param);
  },
  methods: {
    /**
     * 重置查询表单
     */
    resetSearch() {
      for (var attr in this.queryParams) {
        this.queryParams[attr] = "";
      }
      let param = {
        queryType: "",
        startDate: ""
      };
    },
    /**
     * 查询表格数据
     */
    searchData() {
      let param = {
        queryType: this.queryParams.statisticalDimension,
        startDate: this.formatDate("paramType", this.queryParams.dateSearch)
      };
      this.initDataSource(param);
    },
    /**
     * @description 格式化搜索日期，参数要求格式：yyyy-mm-01，表格显示为：yyyy-mm
     */
    formatDate(type, date) {
      let foramtedDate = "";
      if ("" == date) {
        foramtedDate = new Date();
      } else {
        foramtedDate = date;
      }
      if (foramtedDate instanceof Date) {
        let Y = foramtedDate.getFullYear() + "-";
        let M =
          foramtedDate.getMonth() + 1 < 10
            ? "0" + (foramtedDate.getMonth() + 1)
            : foramtedDate.getMonth() + 1;

        if ("tableshow" == type) {
          // 表格格式
          foramtedDate = Y + M;
        } else if ("paramType" == type) {
          // 参数格式
          foramtedDate = Y + M + "-01";
        }
      }
      return foramtedDate;
    },
    /**
     * @description 清除选中
     */
    clearSelection() {
      this.$refs.childTable.clearSelection();
    },
    /**
     * @description 请求报表数据
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
     *  @description 获取合并列配置;
     */

    formatDataSource(dataSource) {
      if (dataSource) {
        var dataObj = {
          employeeList:
            this.formatData(
              dataSource.value.enterprise,
              "enterprise",
              "企业险"
            ) || [], // 企财险
          personalList:
            this.formatData(dataSource.value.personal, "personal", "个人险") ||
            [], //个人险
          otherList: [] //合计row;
        };

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

        // 合并
        dataObj.employeeList = this.mergeSpecifiedRow(
          dataObj.employeeList,
          "employeeList"
        );
        dataObj.personalList = this.mergeSpecifiedRow(
          dataObj.personalList,
          "personalList"
        );

        // 排序
        dataObj.employeeList = this.sortByName(
          dataObj.employeeList,
          this.sortByEmployeeList
        );
        dataObj.personalList = this.sortByName(
          dataObj.personalList,
          this.sortByPersonal
        );

        //合并单元格
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
     * @description 整理后端返回格式
     */
    formatData(dataSource, type, ensureType) {
      dataSource[`${this.tenant[0]}`].month.map((item, index) => {
        let obj = this.setValue(item, "qdgbxjjMonth");
        this.setType(item, obj, type);
      });
      dataSource[`${this.tenant[0]}`].year.map(item => {
        let obj = this.setValue(item, "qdgbxjjYear");
        this.setType(item, obj, type);
      });
      dataSource[`${this.tenant[1]}`].month.map(item => {
        let obj = this.setValue(item, "qdgbxjj1Month");
        this.setType(item, obj, type);
      });
      dataSource[`${this.tenant[1]}`].year.map(item => {
        let obj = this.setValue(item, "qdgbxjj1Year");
        this.setType(item, obj, type);
      });
      dataSource.sum.month.map(item => {
        let obj = this.setValue(item, "sumMonth");
        this.setType(item, obj, type);
      });
      dataSource.sum.year.map(item => {
        let obj = this.setValue(item, "sumYear");
        this.setType(item, obj, type);
      });
      let arr = [];
      if ("enterprise" == type) {
        arr.push(
          this.bussiness,
          this.response,
          this.ship,
          this.car,
          this.cargins,
          this.amongCodeLiability,
          this.amongEmployersLiability,
          this.family,
          this.health,
          this.accident,
          this.age
        );
      } else {
        arr.push(
          this.personalbussiness,
          this.personalresponse,
          this.personalship,
          this.personalcar,
          this.personalcargins,
          this.personalfamily,
          this.personalhealth,
          this.personalaccident,
          this.personalage
        );
      }
      return arr;
    },
    /**
     * @description 根据不同库名和年月为表头字段赋值
     */
    setValue(item, objName) {
      switch (objName) {
        case "qdgbxjjMonth":
          return {
            qdgbxjj_current_month_growthValue: item.growthValue,
            qdgbxjj_current_month_premium: item.premium
          };
          break;
        case "qdgbxjjYear":
          return {
            qdgbxjj_current_year_growthValue: item.growthValue,
            qdgbxjj_current_year_premium: item.premium
          };
          break;
        case "qdgbxjj1Month":
          return {
            qdgbxjj1_current_month_growthValue: item.growthValue,
            qdgbxjj1_current_month_premium: item.premium
          };
          break;
        case "qdgbxjj1Year":
          return {
            qdgbxjj1_current_year_growthValue: item.growthValue,
            qdgbxjj1_current_year_premium: item.premium
          };
          break;
        case "sumMonth":
          return {
            sum_current_month_growthRate: item.growthRate,
            sum_current_month_growthValue: item.growthValue,
            sum_current_month_premium: item.premium
          };
          break;
        case "sumYear":
          return {
            sum_current_year_growthRate: item.growthRate,
            sum_current_year_growthValue: item.growthValue,
            sum_current_year_premium: item.premium
          };
          break;
        default:
          break;
      }
    },
    /**
     * @description 根据不同保单将值整理到对应对象中
     */
    setType(item, obj, ensureType) {
      if ("enterprise" == ensureType) {
        this.setEnterpriseType(item, obj);
      } else if ("personal" == ensureType) {
        this.setPersonalType(item, obj);
      }
    },
    setEnterpriseType(item, obj) {
      switch (item.reportName) {
        case "企业财产险":
          this.bussiness = Object.assign(this.bussiness, obj);
          break;
        case "责任险":
          this.response = Object.assign(this.response, obj);
          break;
        case "码责险":
          this.amongCodeLiability = Object.assign(this.amongCodeLiability, obj);
          break;
        case "雇主责任险":
          this.amongEmployersLiability = Object.assign(
            this.amongEmployersLiability,
            obj
          );
          break;
        case "车险":
          this.car = Object.assign(this.car, obj);
          break;
        case "船舶险":
          this.ship = Object.assign(this.ship, obj);
          break;
        case "货运险":
          this.cargins = Object.assign(this.cargins, obj);
          break;
        case "家财险":
          this.family = Object.assign(this.family, obj);
          break;
        case "短期健康险":
          this.health = Object.assign(this.health, obj);
          break;
        case "短期意外险":
          this.accident = Object.assign(this.accident, obj);
          break;
        case "个人寿险":
          this.age = Object.assign(this.age, obj);
          break;
        case "企业其他险种":
          this.bussiness = Object.assign(this.bussiness, obj);
          break;
        default:
          break;
      }
    },
    setPersonalType(item, obj) {
      switch (item.reportName) {
        case "企业财产险":
          this.personalbussiness = Object.assign(this.personalbussiness, obj);
          break;
        case "责任险":
          this.personalresponse = Object.assign(this.personalresponse, obj);
          break;
        case "码责险":
          this.personalamongCodeLiability = Object.assign(
            this.personalamongCodeLiability,
            obj
          );
          break;
        case "雇主责任险":
          this.personalamongEmployersLiability = Object.assign(
            this.personalamongEmployersLiability,
            obj
          );
          break;
        case "车险":
          this.personalcar = Object.assign(this.personalcar, obj);
          break;
        case "船舶险":
          this.personalship = Object.assign(this.personalship, obj);
          break;
        case "货运险":
          this.personalcargins = Object.assign(this.personalcargins, obj);
          break;
        case "企业其他险种":
          this.personalbussiness = Object.assign(this.personalbussiness, obj);
          break;
        case "家财险":
          this.personalfamily = Object.assign(this.personalfamily, obj);
          break;
        case "短期健康险":
          this.personalhealth = Object.assign(this.personalhealth, obj);
          break;
        case "短期意外险":
          this.personalaccident = Object.assign(this.personalaccident, obj);
          break;
        case "个人寿险":
          this.personalage = Object.assign(this.personalage, obj);
          break;
        default:
          break;
      }
    },
    /**
     * @description 合并指定行为“企业其他险种”
     * @description 合并指定行为“个人其他险种”
     * @description 并对合并的行求和
     */
    mergeSpecifiedRow(dataList, type) {
      let dataListClone = this.clone(dataList);
      let sumObjE = this.clone(dataList[0]);
      let sumObjList = [];
      let sumObjPList = [];
      let sumObjP1 = this.clone(dataList[0]);
      let sumObjP2 = this.clone(dataList[0]);

      dataListClone.forEach((item, index) => {
        // 求和后的结果对象
        let obj = item;
        if (type == "employeeList") {
          if (
            item.ensureName == "家财险" ||
            item.ensureName == "健康险" ||
            item.ensureName == "意外险" ||
            item.ensureName == "个人寿险"
          ) {
            Object.keys(item).forEach(keyitem => {
              sumObjE[keyitem] =
                (parseFloat(sumObjE[keyitem]) * 100 +
                  parseFloat(item[keyitem]) * 100) /
                100;
            });
          } else {
            sumObjList.push(item);
          }
        }
        if (type == "personalList") {
          if (
            item.ensureName == "健康险" ||
            item.ensureName == "意外险" ||
            item.ensureName == "个人寿险"
          ) {
            Object.keys(item).forEach(keyitem => {
              sumObjP1[keyitem] =
                (parseFloat(sumObjP1[keyitem]) * 100 +
                  parseFloat(item[keyitem]) * 100) /
                100;
            });
          } else if (
            item.ensureName == "货运险" ||
            item.ensureName == "家财险" ||
            item.ensureName == "企业财产险" ||
            item.ensureName == "责任险" ||
            item.ensureName == "船舶险"
          ) {
            Object.keys(item).forEach(keyitem => {
              sumObjP2[keyitem] =
                (parseFloat(sumObjP2[keyitem]) * 100 +
                  parseFloat(item[keyitem]) * 100) /
                100;
            });
          } else {
            sumObjPList.push(item);
          }
        }
      });

      if (type == "employeeList") {
        sumObjE.ensureName = "企业其他险种";
        sumObjList.splice(sumObjList.length - 1, 0, sumObjE);
        return sumObjList;
      } else if (type == "personalList") {
        sumObjP1.ensureName = "人身险";
        sumObjP2.ensureName = "个人其他险种";
        sumObjPList.splice(sumObjPList.length - 1, 0, sumObjP1, sumObjP2);
        return sumObjPList;
      }
    },
    /**
     * @description 深拷贝
     */
    clone(obj) {
      var o;
      // 如果  他是对象object的话  , 因为null,object,array  也是'object';
      if (typeof obj === "object") {
        // 如果  他是空的话
        if (obj === null) {
          o = null;
        } else {
          // 如果  他是数组arr的话
          if (obj instanceof Array) {
            o = [];
            for (var i = 0, len = obj.length; i < len; i++) {
              o.push(this.clone(obj[i]));
            }
          }
          // 如果  他是对象object的话
          else {
            o = {};
            for (var j in obj) {
              o[j] = this.clone(obj[j]);
            }
          }
        }
      } else {
        o = obj;
      }
      return o;
    },
    /**
     * @description 根据给定数组的顺序重新排列
     */
    sortByName(dataSource, sortList) {
      let narr = [];
      debugger;
      for (var p = 0; p < dataSource.length; p++) {
        let o = sortList.findIndex(val => val == dataSource[p].ensureName);
        if (o > -1) {
          narr[o] = dataSource[p];
        }
      }
      return narr;
    },
    /**
     * @description  获取需要计算单元格配置;
     * @param destinationRow 在第几行展示
     * @param destinationColumn 在第几列展示
     * @param ranges 需要求和列的范围
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
          ranges: [[0, 7]]
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
            [0, 7],
            [9, 11]
          ]
        };
        retSummaryCfg.push(tempCfg3);
      }

      return retSummaryCfg;
    },
    exportFun() {
      this.$refs.ComprehensiveBusinessStatistics.exportFun(
        this.queryParams.dateSearch
          ? this.formatDate("paramType", this.queryParams.dateSearch)
          : this.currentDate
      );
    }
  }
};
</script>
<style scope>
.trans .transPage .tools-panel .el-form-item__content {
  width: 100%;
}
</style>
