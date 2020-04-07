import urlJoin from "url-join";
import axios from "axios";

const PATH = "http://seeker.haetek.com:9191";
export const VIDEO_URL = {
  // 视频验重
  videoVerify: urlJoin(PATH, "video", "verify"),
  // 获取视频列表
  videoList: urlJoin(PATH, "videos"),
  // 上传视频
  videoUploads: urlJoin(PATH, "video", "upload"),
  // 续传视频
  videoResumable: urlJoin(PATH, "video", "breakpoint"),
  // 开启生成字募，查询生成字募，编辑字募
  videoSubtitle: urlJoin(PATH, "video", "subtitle"),
  // 编辑视频
  videoUpdate: urlJoin(PATH, "video", "update"),
  // 视频审核
  videoCheck: urlJoin(PATH, "video", "check")
};
export const AUTH_URL = {
  login: urlJoin(PATH, "login"),
  signup: urlJoin(PATH, "signup")
};

const axiosInstance = axios.create({
  baseURL: PATH,
  timeout: 1000,
  headers: {
    Authorization: "JWT_TOKEN"
  }
});

const fetchMethod = async (url, params) => {
  try {
    const response = await axiosInstance.post(url, params);
    return response;
  } catch (error) {
    return error;
  }
};

const videoParamFactory = ({ modelAction, queryString, videoIds, type }) => {
  return {
    model_action: modelAction || "search",
    query_string: queryString || "",
    video_ids: videoIds || [],
    type: type || "global"
  };
};

const api = {
  videoList: ({ modelAction, queryString }) => {
    const params = videoParamFactory({ modelAction, queryString });
    return fetchMethod(VIDEO_URL.videoList, params);
  },
  videoUpload: ({ modelAction, queryString, videoIds, type }) => {
    const params = videoParamFactory({
      modelAction,
      queryString,
      videoIds,
      type
    });
    return fetchMethod(VIDEO_URL.videoUpload, params);
  },
  videoVerify: () => {
    return fetchMethod(VIDEO_URL.videoVerify, {});
  },
  videoResumable: () => {
    return fetchMethod(VIDEO_URL.videoResumable, {});
  },
  videoSubtitle: () => {
    return fetchMethod(VIDEO_URL.videoSubtitle, {});
  },
  videoUpdate: () => {
    return fetchMethod(VIDEO_URL.videoUpdate, {});
  },
  videoCheck: () => {
    return fetchMethod(VIDEO_URL.videoCheck, {});
  }
};

export default api;
