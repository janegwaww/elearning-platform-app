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
  timeout: 1000
});
const fetchMethod = postMethod => async (url, params) => {
  try {
    const response = await [postMethod].post(url, params);
    return response;
  } catch (error) {
    return error;
  }
};

// 登录注册接口封装
export const authApis = (() => {
  const authFetch = fetchMethod(axiosInstance);
  return {
    login: ({ username, password }) => {
      return authFetch(AUTH_URL.login, { username, password });
    },
    signup: ({ username, password, email }) => {
      return authFetch(AUTH_URL.signup, { username, password, email });
    }
  };
})();

// 视频接口封装
export const videoApis = (() => {
  axiosInstance.headers = {
    Authorization: "JWT_TOKEN"
  };
  const videoFetch = fetchMethod(axiosInstance);

  const videoParamFactory = (apiName = "default") => {
    return {
      videoList: ({ modelAction, queryString, videoIds, type }) => ({
        model_action: modelAction || "search",
        query_string: queryString || "",
        video_ids: videoIds || [],
        type: type || "global"
      }),
      videoUpload: ({ file, taskId, chunk, chunks, videoType }) => ({
        file: file || "mp4",
        task_id: taskId || "",
        chunk: chunk || 0,
        chunks: chunks || 0,
        video_type: videoType || "mp4"
      }),
      videoVerify: ({ token }) => ({
        token: token || ""
      }),
      videoResumable: ({ taskId }) => ({
        task_id: taskId
      }),
      videoSubtitle: modelAction => ({ taskId, lang, subtitling }) => ({
        model_action: modelAction,
        extra_data: {
          task_id: taskId,
          lang: lang,
          subtitling
        }
      }),
      videoUpdate: ({
        file,
        taskId,
        subtitling,
        chunk,
        chunks,
        lang,
        videoType
      }) => ({
        file: file || "mp4", // mp4文件
        task_id: taskId || "", // 文件ID     # 文件MD5
        subtitling: subtitling || [],
        chunk: chunk || 0, // 文件序号    # 开始定为0
        chunks: chunks || 0, // 视频文件总份数
        lang: lang || "cn", // "cn"/"en"
        video_type: videoType || "mp4" // 视频格式
      }),
      videoCheck: ({ modelAction, taskId, videoData }) => ({
        model_action: modelAction || "submit",
        extra_data: {
          task_id: taskId || "",
          video_data: videoData || {}
        }
      }),
      default: ({ value = "" }) => ({ value })
    }[apiName];
  };

  return {
    videoList: ({ modelAction, queryString }) => {
      const params = videoParamFactory("videoList");
      return videoFetch(
        VIDEO_URL.videoList,
        params({ modelAction, queryString })
      );
    },
    videoUpload: ({ modelAction, queryString, videoIds, type }) => {
      const params = videoParamFactory("videoUpload");
      return videoFetch(
        VIDEO_URL.videoUpload,
        params({ modelAction, queryString, videoIds, type })
      );
    },
    videoVerify: ({ token }) => {
      const params = videoParamFactory("videoVerify");
      return videoFetch(VIDEO_URL.videoVerify, params({ token }));
    },
    videoResumable: ({ taskId }) => {
      const params = videoParamFactory("videoResumable");
      return videoFetch(VIDEO_URL.videoResumable, params({ taskId }));
    },
    videoSubtitle: ({ modelAction, taskId, lang, subtitling }) => {
      const params = videoParamFactory("videoSubtitle");
      return videoFetch(
        VIDEO_URL.videoSubtitle,
        params(modelAction)({ taskId, lang, subtitling })
      );
    },
    videoUpdate: ({
      file,
      taskId,
      subtitling,
      chunk,
      chunks,
      lang,
      videoType
    }) => {
      const params = videoParamFactory("videoUpdate");
      return videoFetch(
        VIDEO_URL.videoUpdate,
        params({ file, taskId, subtitling, chunk, chunks, lang, videoType })
      );
    },
    videoCheck: ({ modelAction, taskId, videoData }) => {
      const params = videoParamFactory("videoCheck");
      return videoFetch(
        VIDEO_URL.videoCheck,
        params({ modelAction, taskId, videoData })
      );
    }
  };
})();

const apis = (...objs) => {
  const concatObj = (target, source) => Object.assign(target, source);
  return objs.reduce(concatObj, {});
};

export default apis(authApis, videoApis);
