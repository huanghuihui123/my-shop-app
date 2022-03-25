// 使用策略模式封装表单校验

class Validator {
  constructor() {
    this.cache = [];
  }
  add(value, rules, errMsg) {
    rules.forEach((item) => {
      let ary = item.rule.split(":"); // 将strategy和参数分开来
      let strategy = ary[0];
      let min = ary[1];
      this.cache.push(function () {
        return ary.length == 1
          ? validateStrategies[strategy](value, item.errMsg)
          : validateStrategies[strategy](value, min, item.errMsg);
      });
    });
  }
  start() {
    for (let i = 0; i < this.cache.length; i++) {
      let fn = this.cache[i];
      let msg = fn();
      if (msg) {
        return msg;
      }
    }
  }
}

// 将校验逻辑封装成策略对象，可拓展
const validateStrategies = {
  isNoEmpty: function (value, errMsg) {
    console.log(value);
    if (value.trim() === "") return errMsg;
  },
  minLength: function (value, length, errMsg) {
    if (value.length < length) return errMsg;
  },
  isPhone: function (value, errMsg) {
    if (value) {
      let reg = /^1(3|4|5|7|8|9|6)\d{9}$/i;
      if (!reg.test(value)) return errMsg;
    }
  },
  isNoChecked: function (value, errMsg) {
    if (!value) return errMsg;
  },
};

/**
 * @param  rules  {{value: String, rules: Array, errMsg: String}}
 */
export const validate = (rules) => {
  const validator = new Validator();
  rules.forEach((item) => {
    validator.add(item.value, item.rules, item.errMsg);
  });
  let errMsg = validator.start();
  return errMsg;
};

// 校验手机号码
export function chs_phone(str) {
  let reg = /^1(3|4|5|7|8|9|6)\d{9}$/i;
  return reg.test(str);
}
