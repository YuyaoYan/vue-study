import moment from "moment";
/**
 * @description 数值范围
 * @example valiRange.bind(this, [min, max, isIncludeBoundary])
 * @param { Boolean } isIncludeBoundary 是否包含边界
 * @
 */
const valiRange = (param, rules, value, callback) => {
  if (!param) {
    return;
  }
  let [min, max, isIncludeBoundary = false] = param;
  let res = false;
  let _value = Number(value);
  let msg = "";
  if (value == null || value == "" || value == undefined) {
    callback();
  } else if (!_value) {
    callback(new Error(`请输入数字`));
  } else {
    if (isIncludeBoundary) {
      res = _value >= min && _value <= max;
      msg = `请输入[${min}，${max}]之间的数字`;
    } else {
      res = _value > min && _value < max;
      msg = `请输入(${min}，${max})之间的数字`;
    }
    !res && callback(new Error(msg));
  }
};

/**
 * @description 精度
 * @example valiAccuracy.bind(this, [accuracy])
 * @param { Number } accuracy 小数位数
 */
const valiAccuracy = (param, rules, value, callback) => {
  if (!param) {
    return;
  }
  let [accuracy = 0] = param;
  let reg = null;

  switch (accuracy) {
    case 1:
      reg = /^-?\d+(\.\d{1,1})?$/;
      break;
    case 2:
      reg = /^-?\d+(\.\d{1,2})?$/;
      break;
    case 3:
      reg = /^-?\d+(\.\d{1,3})?$/;
      break;
    default:
      break;
  }
  if (!value) callback();
  if (accuracy && !reg.test(Number(value))) {
    callback(new Error(`最多${accuracy}位小数`));
  } else {
    callback();
  }
};

/**
 * @description 时间校验
 * @example valiDate.bind(this, ["2022-01-01", "2022-01-10"]) 时间之间
 * @example valiDate.bind(this, ["2022-01-01", ""]) 起始时间之后
 * @example valiDate.bind(this, ["", "2022-01-10"]) 截止时间之前
 * @param {String} inclusiveness (两时间之间时可传入)包容性,可传入: '()','[)','(]','[]'
 */
const valiDate = (param, rules, value, callback) => {
  if (!param) {
    return;
  }
  const [start = "", end = "", inclusiveness = "[]"] = param;
  if (!value) callback();
  if (start && end) {
    !moment(value).isBetween(start, end, null, inclusiveness) &&
      callback(new Error("时间不在规定范围"));
  } else if (start === "" && end) {
    !moment(value).isBefore(end) && callback(new Error(`时间需在${end}之前`));
  } else if (start && end === "") {
    !moment(value).isAfter(start) &&
      callback(new Error(`时间需在${start}之后`));
  } else {
    callback();
  }
};

/**
 * @description 手机号校验
 */
const valiPhoneNum = (rule, value, callback) => {
  if (!value) callback();
  var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if (!reg.test(value)) {
    callback(new Error("请输入正确手机号码"));
  } else {
    callback();
  }
};
/**
 * @description 身份证校验
 */
const valiIDNumber = (rule, value, callback) => {
  if (!value) callback();
  var _IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  var _IDRe15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;
  if (!_IDRe18.test(value) && !_IDRe15.test(value)) {
    callback(new Error("请输入正确身份证号码"));
  } else {
    callback();
  }
};

export { valiRange, valiAccuracy, valiDate, valiPhoneNum, valiIDNumber };
