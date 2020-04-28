import Mock from "mockjs";

// 111
var mockData1 = [];
var ensureNameList = [
  "财产险",
  "责任险",
  "其中:码责险",
  "其中:雇主责任险",
  "车辆险",
  "船舶险",
  "货运险",
  "企业其他险种",
  "车险",
  "人身险",
  "个人其他险"
];
for (let i = 0; i < 11; i++) {
  var temp = {
    ensureType: "企业险",
    ensureName: "财产险",
    monthFee: Mock.Random.natural(0, 100),
    monthIncreaseNum: Mock.Random.natural(0, 100),
    monthIncreaseRadio: Mock.Random.float(0, 1, 2, 2),
    yearFee: Mock.Random.natural(0, 100),
    yearIncreaseNum: Mock.Random.natural(0, 100),
    yearIncreaseRadio: Mock.Random.float(0, 1, 2, 2),
    agencyMonthFee: Mock.Random.natural(0, 100),
    agencyMonthIncreaseNum: Mock.Random.natural(0, 100),
    agencyYearFee: Mock.Random.natural(0, 100),
    agencyYearIncreaseNum: Mock.Random.natural(0, 100),
    manageMonthFee: Mock.Random.natural(0, 100),
    manageMonthIncreaseNum: Mock.Random.natural(0, 100),
    manageYearFee: Mock.Random.natural(0, 100),
    manageYearIncreaseNum: Mock.Random.natural(0, 100)
  };
  temp.ensureName = ensureNameList[i];
  if (i >= 8) {
    temp.ensureType = "个人险";
  }
  mockData1.push(temp);
}

//导出数据;
var dataSource = {
  data1: Mock.mock("/getData1", "post", mockData1)
};
export default dataSource;
