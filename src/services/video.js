import { videoApis } from "./api";
import { pipeThen } from "./utils";
import { getUser } from "./auth";

const { token } = getUser();
const apis = videoApis(token);

const getSubtitleFrontParam = (arr = []) =>
  arr.map(i => ({
    matchedStr: i.matched_str,
    startTime: i.start_time,
    wholeStr: i.whole_str
  }));

const extraVideoInfo = (data = {}) => {
  return {
    videoPath: data.video_path,
    assPath: data.ass_path,
    title: data.title,
    authName: data.user_name
  };
};

const subtitleSearch = ({ data = {} }) => Promise.resolve(data.result_data);

const subtitleFront = (result = []) =>
  Promise.resolve(getSubtitleFrontParam(result));

const getVideoInfo = ({ data = {} }) => Promise.resolve(data.result_data);

const videoInfoFront = (result = {}) =>
  Promise.resolve({
    videoPath:
      "http://videos.haetek.com/sv/41a45e0c-171aa124b85/41a45e0c-171aa124b85.mp4",
    assPath: "",
    title: "C4D修神记：零基础到三维封神。行业名师帮你打基础，拒绝纸上谈兵",
    authName: "@三维设计"
  });

export const subtitles = pipeThen(
  subtitleFront,
  subtitleSearch,
  apis.localSearch
);

export const videoPath = pipeThen(videoInfoFront, getVideoInfo, apis.videoPlay);
