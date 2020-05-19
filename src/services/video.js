import { videoApis, searchPartApis } from "./api";
import { pipeThen } from "./utils";
import { getUser } from "./auth";

const { token } = getUser();
const apisVideo = videoApis(token);
const apisSearch = searchPartApis(token);

// 获取后端结果字段
const getResultData = ({ data = {} }) => Promise.resolve(data.result_data);

// 获数组中的第一条数据
const getResultDataFirst = ([obj]) => Promise.resolve(obj || {});

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
  authName: data.user_name
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
const extraFrontIntro = (data = {}) => ({
  description: data.description,
  viewCounts: data.view_counts,
  likeCounts: data.like_counts,
  collectionCounts: data.collection_counts,
  category: data.category
});

export const getVideoIntro = pipeThen(
  extraFrontIntro,
  getResultDataFirst,
  getResultData,
  apisVideo.videoPlay
);
