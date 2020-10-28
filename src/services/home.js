import { videoApis, searchPartApis } from "./api";
import { pipeThen } from "./utils";
import { observer } from "./observable";

const apisVideo = videoApis();
const apisSearch = searchPartApis();

const errorMessageNotice = (odata = {}) => {
  const { data = {} } = odata;
  if (![0, "0"].includes(data.err)) {
    observer(data);
  }
  return Promise.resolve(odata);
};

const getResultData = ({ data = {} } = {}) =>
  Promise.resolve(data.result_data || []);

const getFirstResultData = ([data = {}] = []) => Promise.resolve(data);

const getCountResultData = ({ data = {} } = {}) =>
  Promise.resolve({ resultData: data.result_data, count: data.count });

// 获取最新订阅的最终数据
export const getLatestSubscription = pipeThen(
  getResultData,
  apisSearch.latestSubscription,
);

// 获取热门视频的最终数据
export const getHotVideos = pipeThen(
  getResultData,
  errorMessageNotice,
  apisVideo.hotVideo,
);

// 获取热门作者的最终数据
export const getHotAuths = pipeThen(
  getResultData,
  errorMessageNotice,
  apisVideo.hotAuthor,
);

// 全局搜索
export const searchGlobal = pipeThen(
  getCountResultData,
  apisVideo.globalSearch,
);

// 获取作者信息
const extraAuth = ({ data, ...auth } = {}) =>
  Promise.resolve({ auth, list: data });

export const getCreatorInfo = pipeThen(
  extraAuth,
  getFirstResultData,
  getResultData,
  errorMessageNotice,
  apisSearch.getAuthorInformation,
);

// 作者首页搜索
const extroData = (data = []) =>
  Promise.resolve(data.reduce((a, c) => [...a, c.data], []));

export const creatorHomeSearch = pipeThen(
  extroData,
  getResultData,
  apisVideo.userSearch,
);

// 获取频道
export const getChannelList = pipeThen(
  getResultData,
  apisVideo.categoryInformation,
);

// 获取系列详情
const concatSeries = (arr, sour) =>
  arr.reduce((acc, cur) => acc.concat({ data: cur, source: sour }), []);

const extraSeries = ({ video_data = [], document_data = [], ...info } = {}) => {
  const videos = concatSeries(video_data, "video");
  const doc = concatSeries(document_data, "document");
  return Promise.resolve({ info, series: [...videos, ...doc] });
};

export const getSeriesInfo = pipeThen(
  extraSeries,
  getFirstResultData,
  getResultData,
  errorMessageNotice,
  apisSearch.getSeriesDetails,
);

// 系列详情页搜索
export const seriesSearch = pipeThen(getResultData, apisVideo.seriesSearch);

// 获取文本系列详情页接口
const extraDocSeries = ({ document_data = [], ...info }) => {
  const dData = document_data.reduce(
    (a, c) => [...a, { data: c, source: "document" }],
    [],
  );
  return Promise.resolve({ info, series: dData });
};
export const getDocumentSeriesInfo = pipeThen(
  extraDocSeries,
  getFirstResultData,
  getResultData,
  errorMessageNotice,
  apisSearch.getDocumentSeriesDetails,
);

// 文本系列详情页搜索
export const docSeriesSearch = pipeThen(
  getResultData,
  apisVideo.documentsSearch,
);

// 获取频道列表栏
export const getCategoryList = pipeThen(getResultData, apisSearch.getCategory);

// 全局搜索数据上传接口
export const globalSearchResultUpdate = pipeThen(apisSearch.globalSearch);

// 文本内容搜索
export const documentSearch = pipeThen(getResultData, apisSearch.localSearch);

// 文本搜索页内容
export const documentContent = pipeThen(
  getFirstResultData,
  getResultData,
  errorMessageNotice,
  apisSearch.getImage,
);
