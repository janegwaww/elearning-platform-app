import { now } from "lodash";
import { videoApis, searchPartApis } from "./api";
import { pipeThen } from "./utils";
import { logout } from "./auth";
import { observer } from "./observable";

const apisVideo = videoApis();
const apisSearch = searchPartApis();

// 错误信息提示
const errorMessageNotice = (odata = {}) => {
  const { data = {} } = odata;
  if (![0, "0"].includes(data.err)) {
    observer(data);
  }
  return Promise.resolve(odata);
};

// token过期退出登录
const tokenExpired = (odata = {}) => {
  const { data = {} } = odata;
  if (["4104"].includes(data.err)) {
    logout(() => ({}));
  }
  return Promise.resolve(odata);
};

// 获取后端结果字段
const getResultData = ({ data = {} } = {}) =>
  Promise.resolve(data.result_data || []);

// 获取后端错误代码
const getErrData = ({ data = {} } = {}) => Promise.resolve(data.err || "0");

// 获数组中的第一条数据
const getResultDataFirst = ([arr] = []) => Promise.resolve(arr || {});

// ----------字募搜索-------------
// 截取前端需要的字募字段
const getSubtitleFrontParam = (arr = []) =>
  arr.map(i => ({
    subtitleDist: i.subtitle_dist,
    startTime: i.start_time,
    wholeStr: i.whole_str,
  }));

const subtitleFront = ({ match_frame = [] } = {}) => {
  return Promise.resolve(getSubtitleFrontParam(match_frame));
};

export const subtitles = pipeThen(
  subtitleFront,
  getResultDataFirst,
  getResultData,
  tokenExpired,
  errorMessageNotice,
  apisVideo.localSearch,
);

// -----视频播放-----------
// 截取前端需要的字段
const extraVideoInfo = (data = {}) => ({
  videoPath: data.video_path,
  mergePath: data.merge_path,
  path: data.video_path,
  // vttPath: data.vtt_path ? `${data.vtt_path}?t=${now()}` : "",
  vttPath: "/text.vtt",
  assPath: data.ass_path,
  title: data.title,
  authName: data.user_name,
  imagePath: data.image_path,
  category: data.category,
  videoId: data.video_id,
  isLoged: data.is_login,
  description: data.description,
  data,
});

const videoInfoFront = (result = {}) => Promise.resolve(extraVideoInfo(result));

export const videoPath = pipeThen(
  videoInfoFront,
  getResultDataFirst,
  getResultData,
  tokenExpired,
  errorMessageNotice,
  apisVideo.videoPlay,
);

// -----------获取评论-------------
export const getComments = pipeThen(getResultData, apisSearch.getComment);

// ----------获取视频简介-----------
const extraFrontIntro = (data = {}) =>
  Promise.resolve({
    description: data.description,
    viewCounts: data.view_counts,
    likeCounts: data.like_counts,
    collectionCounts: data.collection_counts,
    category: data.category,
    id: data.video_id,
    isLike: data.is_like,
    isCollect: data.is_collect,
    isSubscribe: data.is_subscribe,
  });

export const getVideoIntro = pipeThen(
  extraFrontIntro,
  getResultDataFirst,
  getResultData,
  apisVideo.videoPlay,
);

// ---------视频收藏-----------
const boolErrData = err => Promise.resolve(err === "0");

export const collectTheVideo = pipeThen(
  boolErrData,
  getErrData,
  tokenExpired,
  errorMessageNotice,
  apisSearch.addCollection,
);

// --------视频点赞-----------
export const likeTheVideo = pipeThen(
  boolErrData,
  getErrData,
  tokenExpired,
  errorMessageNotice,
  apisSearch.giveLike,
);

// -------获取相关视频---------
// const seriesVideoData = data => Promise.resolve(data.video_data || []);
export const getRelativeVideos = pipeThen(
  getResultDataFirst,
  getResultData,
  apisVideo.getRelatedVideo,
);

// ----------获取推荐视频----------
export const getRecommendVideos = pipeThen(
  getResultData,
  apisVideo.getRelatedVideo,
);

// ------订阅作者---------
export const subscribeAuth = pipeThen(
  boolErrData,
  getErrData,
  errorMessageNotice,
  apisSearch.addSubscription,
);

// 获取进阶列表
export const getVideoDocument = pipeThen(
  getResultData,
  apisSearch.viewAdvanced,
);

// 获取课件详情
export const getDocumentDetail = pipeThen(
  getResultDataFirst,
  getResultData,
  errorMessageNotice,
  apisSearch.viewAdvancedInfo,
);

// 获取相关课件
export const getRelateDocs = pipeThen(
  getResultData,
  tokenExpired,
  apisSearch.viewFile,
);

// 下载课件
export const downloadDocs = pipeThen(getResultData, apisSearch.downloadFile);

// 开始播放调取该接口
export const startWatchRecord = pipeThen(apisSearch.startWatchHistory);
// 结束播放调取该接口
export const endWatchRecord = pipeThen(apisSearch.endWatchHistory);
// 点击搜索结果调取该接口
export const ksearchRecord = pipeThen(apisSearch.searchHistory);

// 支付宝创建订单
export const aliPayment = pipeThen(
  getResultDataFirst,
  getResultData,
  tokenExpired,
  errorMessageNotice,
  apisSearch.payment,
);

// 校验支付宝订单
export const verifyAliPay = pipeThen(
  getResultDataFirst,
  getResultData,
  apisSearch.queryTradeResult,
);

// 支付宝创建订单
export const aliWapPayment = pipeThen(
  getResultDataFirst,
  getResultData,
  tokenExpired,
  errorMessageNotice,
  apisSearch.wapPayment,
);

// 分享功能
const getUrl = ({ url } = {}) => {
  return Promise.resolve(url);
};
export const userShare = pipeThen(
  getUrl,
  getResultDataFirst,
  getResultData,
  apisSearch.share,
);
