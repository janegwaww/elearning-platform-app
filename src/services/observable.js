import { flow, curry, isFunction, includes, reduce, toString } from "lodash/fp";

const errors = [
  { code: "5001", msg: "服务器内部错误" },
  { code: "4602", msg: "支付失败" },
  { code: "4601", msg: "等待支付" },
  { code: "400", msg: "未知错误" },
  { code: "4105", msg: "参数不全" },
  { code: "4104", msg: "用户未登陆" },
  { code: "4103", msg: "参数错误" },
  { code: "4102", msg: "token失效" },
  { code: "4101", msg: "token错误" },
  { code: "4005", msg: "数据不存在" },
  { code: "4004", msg: "数据错误" },
  { code: "4003", msg: "数据已存在" },
  { code: "4002", msg: "数据过期" },
  { code: "4001", msg: "数据库查询错误" },
];
const errorCodes = reduce((arr, val) => {
  arr.push(val.code);
  return arr;
}, [])(errors);
const errorEvents = {
  defaultEvent: "",
  idIncorrectEvent: "",
  authErrorEvent: "",
};
// 用于追踪bug方法
const track = (data = {}) =>
  console.log(`err: ${data.err}, msg: ${data.errmsg}`);

const toDataString = ({ err, errmsg }) => ({ err: toString(err), errmsg });
// 传过来的错误必须含于上述的错误代码中
const inCludesErr = (data = {}) => {
  const { err, errmsg } = data;
  if (includes(err)(errorCodes)) {
    return data;
  }
  // 如果不含于直接提示
  if (!includes(err)(errorCodes)) {
    alert(errmsg);
  }
  return {};
};

const defaultAction = (data = {}) => {
  const { errmsg } = data;
  if (isFunction(errorEvents.defaultEvent)) {
    errorEvents.defaultEvent(errmsg);
  }
  return data;
};

const actionIdNotExist = (data = {}) => {
  const { err, errmsg } = data;
  if (err === "4103") {
    if (isFunction(errorEvents.idIncorrectEvent)) {
      errorEvents.idIncorrectEvent(errmsg);
    }
  }
  return data;
};

const actionAuth = (data = {}) => {
  const { err, errmsg } = data;
  if (err === "4004" || err === "4003" || err === "4103") {
    if (isFunction(errorEvents.authErrorEvent)) {
      errorEvents.authErrorEvent(errmsg);
    }
  }
  return data;
};

const trigger = (type, callback = () => ({})) => {
  switch (type) {
    case "idNotExist":
      errorEvents.idIncorrectEvent = callback;
      break;
    case "authError":
      errorEvents.authErrorEvent = callback;
      break;
    default:
      errorEvents.defaultEvent = callback;
  }
};

export const observer = flow(
  toDataString,
  inCludesErr,
  defaultAction,
  actionIdNotExist,
  actionAuth,
  track,
);

export const subscribe = curry(trigger);

export default { observer, subscribe };
