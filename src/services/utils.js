// 数据流通用方法
const pipeM = method => (...fns) => fns.reduce((f, g) => x => g(x)[method](f));

// 数据流
export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

// promise数据流
export const pipeThen = pipeM("then");

// 字符转对象
export const strToObj = k => ({ [k]: "" });

// 转换为驼峰命名
export const wrapCamelName = (str = "") =>
  str
    .split("_")
    .map((o, i) => (i > 0 ? o.replace(/^./, s => s.toUpperCase()) : o))
    .join("");

// 秒转iso时制
export const secondsToHMS = (seconds = 0) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

// 转iso日期
export const secondsToDate = (seconds = 0) =>
  new Date(seconds * 1000).toISOString().slice(0, 10);
