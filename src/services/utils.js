import urlParse from "url-parse";
import { globalHistory } from "@reach/router";

const PATH = "http://api.haetek.com:9191";

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
  seconds ? new Date(seconds * 1000).toISOString().slice(0, 10) : "";

export const secondsToMouth = (seconds = 0) =>
  new Date(seconds * 1000).toISOString().slice(5, 10);

export const remotePath = path => `${PATH}/${path}`;

export const getIdFromHref = () =>
  urlParse(globalHistory.location.href, true).query;

// 用于pipe追踪
export const track = label => value => {
  console.log(`${label}: `, value);
  return value;
};

// 根据后台数据修饰某些字符
export const decoratedStr = (who = "", subs = []) => {
  const explore = (arr, fn) => arr.reduce(fn, "");
  const concatStr = (acc, cur) => acc.concat(cur[0]);
  const span = ([c, r]) =>
    `<span style='color: rgb(${r.toString()})'>${c}</span>`;
  const concatColorStr = (acc, cur) => acc.concat(span(cur));
  const subStr = explore(subs, concatStr);
  const result = explore(subs, concatColorStr);
  return who.replace(subStr, result);
};
