import { videoApis, searchPartApis } from "./api";
import { pipeThen } from "./utils";
import { getUser } from "./auth";

const { token } = getUser();
const apisVideo = videoApis(token);
const apisSearch = searchPartApis(token);

// 获取后端结果字段
const getResultData = ({ data = {} }) =>
  Promise.resolve(data.result_data || []);

// 获取后端错误代码
const getErrData = ({ data = {} }) => Promise.resolve(data.err || "0");

// 获数组中的第一条数据
const getResultDataFirst = arr => Promise.resolve((arr && arr[0]) || {});

// ----------字募搜索-------------
// 截取前端需要的字募字段
const getSubtitleFrontParam = (arr = []) =>
  arr.map(i => ({
    matchedStr: i.matched_str,
    startTime: i.start_time,
    wholeStr: i.whole_str
  }));

const subtitleFront = ({ match_frame = [] }) =>
  Promise.resolve(getSubtitleFrontParam(match_frame));

export const subtitles = pipeThen(
  subtitleFront,
  getResultDataFirst,
  getResultData,
  apisVideo.localSearch
);

// -----视频播放-----------
// 截取前端需要的字段
const extraVideoInfo = (data = {}) => ({
  videoPath: data.video_path,
  assPath: data.ass_path,
  title: data.title,
  authName: data.user_name,
  imagePath: data.image_path,
  data
});

const videoInfoFront = (result = {}) => Promise.resolve(extraVideoInfo(result));

export const videoPath = pipeThen(
  videoInfoFront,
  getResultDataFirst,
  getResultData,
  apisVideo.videoPlay
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
    isSubscribe: data.is_subscribe
  });

export const getVideoIntro = pipeThen(
  extraFrontIntro,
  getResultDataFirst,
  getResultData,
  apisVideo.videoPlay
);

// ---------视频收藏-----------
const boolErrData = err => Promise.resolve(err === "0");

export const collectTheVideo = pipeThen(
  boolErrData,
  getErrData,
  apisSearch.addCollection
);

// --------视频点赞-----------
export const likeTheVideo = pipeThen(
  boolErrData,
  getErrData,
  apisSearch.giveLike
);

// -------获取相关视频---------
const seriesVideoData = data => Promise.resolve(data.video_data || []);
export const getRelativeVideos = pipeThen(
  seriesVideoData,
  getResultDataFirst,
  getResultData,
  apisVideo.getRelatedVideo
);

// ----------获取推荐视频----------
export const getRecommendVideos = pipeThen(
  getResultData,
  apisVideo.getRelatedVideo
);

// ------订阅作者---------
export const subscribeAuth = pipeThen(
  boolErrData,
  getErrData,
  apisSearch.addSubscription
);
