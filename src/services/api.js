import urlJoin from "url-join";
import axios from "axios";

const PATH = "http://seeker.haetek.com:9191";
const PATH_V1 = urlJoin(PATH, "/api/v1/gateway");

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
  // 登录
  login: urlJoin(PATH, "code/login"),
  // 发送验证码
  smscode: urlJoin(PATH, "code/generate"),
  // 获取二维码
  qrcode: urlJoin(PATH, "qrcode/generate"),
  // 验证二维码
  enquiry: urlJoin(PATH, "qrcode/enquiry"),
  // 跳转第三方二维码
  thirdQRCode: urlJoin(PATH, "third/generate"),
  // 三方登录
  thirdLogin: urlJoin(PATH, "third/login"),
  // 三方绑定手机
  thirdMobile: urlJoin(PATH, "third/mobile"),
  // 手机号验重
  mobileCheck: urlJoin(PATH, "mobile/check")
};

const axiosInstance = axios.create({
  baseURL: PATH,
  timeout: 5000,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

const fetchMethod = postMethod => async (url, params) => {
  try {
    const response = await postMethod.post(url, params);
    return response;
  } catch (error) {
    return error;
  }
};

// 登录注册接口封装
export const authApis = (() => {
  const authFetch = fetchMethod(axiosInstance);
  const params = ({ action, param, modelType }) => {
    return !modelType
      ? {
          model_action: action || "generate",
          extra_data: param || {}
        }
      : {
          model_action: action || "generate",
          model_type: modelType || "qq",
          extra_data: param || {}
        };
  };

  return {
    login: ({ mobile, code }) => {
      const param = { mobile, code };
      return authFetch(AUTH_URL.login, params({ action: "login", param }));
    },
    smscode: ({ mobile }) => {
      const param = { mobile };
      return authFetch(AUTH_URL.smscode, params({ param }));
    },
    qrcode: () => {
      return authFetch(AUTH_URL.qrcode, params({}));
    },
    enquiry: ({ qrcode }) => {
      const param = { qrcode };
      return authFetch(AUTH_URL.enquiry, params({ action: "enquiry", param }));
    },
    thirdQRCode: ({ modelType }) => {
      return authFetch(AUTH_URL.thirdQRCode, params({ modelType }));
    },
    thirdLogin: ({ code, modelType }) => {
      const param = { code };
      return authFetch(
        AUTH_URL.thirdLogin,
        params({ action: "login", modelType, param })
      );
    },
    thirdMobile: ({ mobile, code, accessToken }) => {
      const param = { mobile, code, access_token: accessToken };
      return authFetch(
        AUTH_URL.thirdMobile,
        params({ action: "mobile", param })
      );
    },
    mobileCheck: ({ mobile }) => {
      const param = { mobile };
      return authFetch(
        AUTH_URL.mobileCheck,
        params({ action: "check", param })
      );
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
