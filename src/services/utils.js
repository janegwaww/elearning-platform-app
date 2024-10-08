import urlParse from "url-parse";
import { globalHistory } from "@reach/router";
import { flow } from "lodash/fp";

const PATH = "http://api.haetek.com:9191";

// promise数据流
export const pipeThen = (...fns) =>
  flow(fns.reduce((f, g) => x => g(x).then(f)));

// 字符转对象
export const strToObj = k => ({ [k]: "" });

// 转换为驼峰命名
export const wrapCamelName = (str = "") =>
  str.replace(/_+(.)/g, (x, chr) => chr.toUpperCase());

// 转换为dash命名
export const wrapDashName = (str = "") =>
  str
    .replace(/([a-z\d])([A-Z])/g, "$1_$2")
    .replace(/[A-Z]/g, m => m.toLowerCase());

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

export const searchUrlParams = ({ value = "", type = "all", page = 1 }) => {
  return `/search/?${new URLSearchParams(
    `q=${value}&type=${type}&page=${page}`,
  ).toString()}`;
};
