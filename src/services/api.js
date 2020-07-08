import urlJoin from "url-join";
import axios from "axios";
import { pipe, wrapCamelName } from "./utils";

// 接口路径
export const PATH = "http://api.haetek.com:9191";
// 接口地址
const API_PATH = urlJoin(PATH, "/api/v1/gateway");
// 获取用户
const isBrowser = () => typeof window !== "undefined";
const getUser = () =>
  isBrowser() && window.localStorage.getItem("haetekUser")
    ? JSON.parse(window.localStorage.getItem("haetekUser"))
    : {};
let wConfirm = () => window.confirm;

// 创建请求方法
const axiosInstance = (token = "") =>
  axios.create({
    baseURL: PATH,
    timeout: 50000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${getUser().token}`
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
const fetchMethod = async (url, params) => {
  try {
    const response = await axiosInstance().post(url, params);
    return response;
  } catch (error) {
    if (wConfirm && wConfirm()(error.message)) {
      wConfirm = null;
    }
    console.log(error);
    return Promise.resolve({});
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
const combineObj = (...objs) => {
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
  const getParam = pipe(extraParam("user"))(modelActions);
  const getApis = pipe(
    names => names.map(wrapCamelName),
    extraApis(fetchMethod, getParam)
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
    "get_related_video",
    // 热门视频
    "hot_video",
    // 热门作者
    "hot_author",
    // 频道
    "category_information"
  ];
  const getParam = pipe(extraParam("video"))(modelActions);
  const getApis = pipe(
    names => names.map(wrapCamelName),
    extraApis(fetchMethod, getParam)
  )(modelActions);

  return getApis;
};

export const searchPartApis = () => {
  const modelActionsArr = [
    ["post_comment", "get_comment"],
    ["add_collection"],
    ["give_like"],
    ["view_file", "view_advanced", "view_advanced_info", "download_file"],
    ["add_subscription", "latest_subscription"],
    ["get_author_information", "share"],
    ["get_series_details"],
    ["get_category"],
    ["start_watch_history", "end_watch_history", "search_history"],
    ["payment", "query_trade_result"]
  ];
  const getParam = [
    "comment",
    "collection",
    "like",
    "document",
    "subscription",
    "user",
    "series",
    "category",
    "video_history",
    "pay"
  ].reduce(
    (acc, cur, idx) =>
      Object.assign(acc, pipe(extraParam(cur))(modelActionsArr[idx])),
    {}
  );
  const getApis = pipe(
    names => names.map(wrapCamelName),
    extraApis(fetchMethod, getParam)
  )([].concat.apply([], modelActionsArr));

  return getApis;
};

export default combineObj(authApis(), videoApis());
