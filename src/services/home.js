import { videoApis, searchPartApis } from "./api";
import { getUser } from "./auth";
import { pipeThen } from "./utils";

const { token } = getUser();
const apisVideo = videoApis(token);
const apisSearch = searchPartApis(token);

const getResultData = ({ data = {} }) => Promise.resolve(data.result_data);

const getCountResultData = ({ data = {} }) =>
  Promise.resolve({ data: data.result_data, count: data.count });

// 获取最新订阅的最终数据
export const getLatestSubscription = pipeThen(
  getResultData,
  apisSearch.latestSubscription
);

// 获取热门视频的最终数据
export const getHotVideos = pipeThen(getResultData, apisVideo.hotVideo);

// 获取热门作者的最终数据
export const getHotAuths = pipeThen(getResultData, apisVideo.hotAuthor);

// 全局搜索
export const searchGlobal = pipeThen(
  getCountResultData,
  apisVideo.globalSearch
);
