import urlJoin from "url-join";
import axios from "axios";
import { pipe, wrapCamelName } from "./utils";
import { getUser } from "./auth";

// 接口路径
const PATH = "http://seeker.haetek.com:9191";
// 接口地址
const API_PATH = urlJoin(PATH, "/api/v1/gateway");
// 创建请求方法
const axiosInstance = axios.create({
  baseURL: PATH,
  timeout: 5000,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

// 生成传给接口参数的工厂函数
const paramFactory = ({
  modelName = "",
  modelAction = "",
  extraData = {},
  modelType = ""
}) => ({
  model_name: modelName,
  model_action: modelAction,
  extra_data: extraData,
  model_type: modelType
});

// 封装请求
const fetchMethod = postMethod => async (url, params) => {
  try {
    const response = await postMethod.post(url, params);
    return response;
  } catch (error) {
    return console.log(error);
  }
};

// 接口参数封装
const extraParam = (modelName = "") => (modelActions = []) =>
  modelActions.reduce(
    (acc, cur) => ({
      ...acc,
      ...{
        [wrapCamelName(cur)]: obj =>
          paramFactory({
            modelName,
            modelAction: cur,
            extraData: obj
          })
      }
    }),
    {}
  );

// 接口封装
const extraApis = (cusFetch, paramMethod) => (modelActions = []) =>
  modelActions.reduce(
    (acc, cur) =>
      Object.assign(acc, {
        [cur]: data => cusFetch(API_PATH, paramMethod[cur](data))
      }),
    {}
  );

// 合并接口
const apis = (...objs) => {
  const concatObj = (target, source) => Object.assign(target, source);
  return objs.reduce(concatObj, {});
};

// 登录注册接口封装
export const authApis = () => {
  const modelActions = [
    // 发送验证码
    "generate_code",
    // 登录
    "code_login",
    // 获取二维码
    "generate_qrcode",
    // 验证二维码
    "enquiry_qrcode",
    // 跳转第三方二维码
    "generate_third_qrcode",
    // 三方登录
    "third_login",
    // 三方绑定手机
    "third_bind_mobile",
    // 校验手机
    "check_mobile",
    // 视频收藏
    "video_collect"
  ];
  const authFetch = fetchMethod(axiosInstance);
  const getParam = pipe(extraParam("user"))(modelActions);
  const getApis = pipe(
    names => names.map(wrapCamelName),
    extraApis(authFetch, getParam)
  )(modelActions);

  return getApis;
};

// 视频接口封装
export const videoApis = () => {
  const modelActions = [
    // 视频验重
    "verify",
    // 上传视频
    "upload",
    // 续传视频
    "breakpoint",
    // 开启生成字募，查询生成字募，编辑字募
    "generate_subtitle",
    // 查询生成字幕
    "query_subtitle",
    // 纺辑字募
    "update_subtitle",
    // 编辑视频
    "update",
    // 审核
    "check",
    // 视频截图
    "generate_thumbnail",
    // 是否登录
    "is_login",
    // 全局搜索
    "global_search",
    // 获取视频播放地址
    "video_play",
    // 局部搜索
    "local_search",
    // 查看课件
    "view_file"
  ];
  const getToken = "";
  axiosInstance.headers = {
    Authorization: `Bearer ${getToken}`
  };
  const videoFetch = fetchMethod(axiosInstance);
  const getParam = pipe(extraParam("video"))(modelActions);
  const getApis = pipe(
    names => names.map(wrapCamelName),
    extraApis(videoFetch, getParam)
  )(modelActions);

  return getApis;
};

export default apis(authApis(), videoApis());
