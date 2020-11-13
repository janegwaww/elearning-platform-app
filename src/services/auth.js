import service from "./api";
import { pipeThen } from "./utils";
import { observer } from "./observable";

const apis = service.user;
const isBrowser = () => typeof window !== "undefined";

// 获取用户
export const getUser = () =>
  isBrowser() && window.localStorage.getItem("haetekUser")
    ? JSON.parse(window.localStorage.getItem("haetekUser"))
    : {};

// 存储用户
const setUser = user =>
  window.localStorage.setItem("haetekUser", JSON.stringify(user));

// 退出登录
export const logout = (callback = () => {}) => {
  setUser({});
  callback();
};

// ------------------------------------------------
// 以下使用的设计模式是函数组合
// 用pipe函数来组合方法处理数组
// 例如:
//     const pipe = (...fns) => x => fns.reduce((v,f) => f(v),x);
//     const add1 = n => n+1;
//     const double = n => n*2;
//     const add1ThenDouble = pipe(add1, double);
//     add1ThenDouble(2); //6
// ((2+1=3)*2=6)

// 获取后端接口返回的结果字段方法
// {
//     "count": "len(result_data)",
//     "err": "0",
//     "err_msg": "200",
//     "result_data": [{}]  // 返回这一个字段
// }
const getResultData = ({ data = {} } = {}) =>
  Promise.resolve(data.result_data || []);

// 错误信息提示
const errorMessageNotice = (odata = {}) => {
  const { data = {} } = odata;
  if (![0, "0"].includes(data.err)) {
    observer(data);
  }
  return Promise.resolve(odata);
};

// 获取后端接口返回的结果字段中的第一个数组
// {
//     "count": "len(result_data)",
//     "err": "0",
//     "err_msg": "200",
//     "result_data": [
//           {}   // 返回第一组
//     ]
// }
const getArrayData = ([arr] = []) => Promise.resolve(arr || {});

// 获取数据,headers
// 因为登录有headers,因此需要同时处理返回的数据和headers
const getLoginData = ({ data = {}, headers = {} } = {}) =>
  Promise.resolve({
    resultData: data.result_data ? data.result_data[0] : {},
    authorization: headers.authorization,
  });

// 存入用户数据和headers
// 这一步是从上一步获取的用户数据流存入游览器
const setLoginUser = ({ resultData = {}, authorization = "" } = {}) => {
  setUser({
    name: `${resultData.name}`,
    headshot: `${resultData.headshot}`,
    token: `${authorization}`,
  });
  return Promise.resolve(!!authorization);
};

// ----------------------------
// 获取验证码专门方法
const sendSMSCode = ({ code = "" } = {}) => Promise.resolve(!!code);

// 导出用于发送验证码的方法
export const generateSMSCode = pipeThen(
  sendSMSCode,
  getArrayData,
  getResultData,
  errorMessageNotice,
  apis.generateCode,
);

// -------------------------
// 手机号验证码登录
export const handleLogin = pipeThen(
  setLoginUser,
  getLoginData,
  errorMessageNotice,
  apis.codeLogin,
);

// -----------------------
// 获取返回给前端的二维码专门处理方法
const getQrcode = ({ qrcode = "" } = {}) => Promise.resolve(qrcode);

// 导出获取二维码的方法
export const generateQRCode = pipeThen(
  getQrcode,
  getArrayData,
  getResultData,
  errorMessageNotice,
  apis.generateQrcode,
);

// ------------------------
// 二维码验证登录
export const enquiryQRCode = pipeThen(
  setLoginUser,
  getLoginData,
  apis.enquiryQrcode,
);

// ---------------------
// 获取后台返回数据中的url的方法
const getUrl = ({ url = "" } = {}) => Promise.resolve(url);

// 获取第三方跳转地址
export const generateThirdPartyUrl = pipeThen(
  getUrl,
  getArrayData,
  getResultData,
  errorMessageNotice,
  apis.generateThirdQrcode,
);

// -------------------------
// 设置三方登录数据并返回对应值
// 三方登录这里处理了三种情况：
//        1.第一次登录则获取用于绑定手机的access token
//        2.不是第一次登录就直接登录
//        3.登录失败
const setThirdLogin = ({ resultData = {}, authorization = "" } = {}) => {
  if (authorization) {
    setUser({
      name: resultData.name,
      headshot: resultData.headshot,
      token: authorization,
    });
    return Promise.resolve(true);
  }
  if (resultData.access_token) {
    return Promise.resolve({ accessToken: resultData.access_token });
  }
  return Promise.resolve(false);
};

// 第三方登录，第一次登录要执行绑定手机号操作，不是第一次登录就直接登录
export const handleThirdLogin = pipeThen(
  setThirdLogin,
  getLoginData,
  errorMessageNotice,
  apis.thirdLogin,
);

// --------------------
// 绑定手机并登录
export const bindingMobile = pipeThen(
  setLoginUser,
  getLoginData,
  errorMessageNotice,
  apis.thirdBindMobile,
);

// --------------------
// 获取错误代码
// 因为验证手机号是否登录是用错误码来判的
const getErrData = ({ data = {} } = {}) => Promise.resolve(data.err);

// 验证手机号
const verifyErrCode = err => Promise.resolve(err === 0);

// 导出手机号是否已经存在方法
export const userAlreadyExist = pipeThen(
  verifyErrCode,
  getErrData,
  errorMessageNotice,
  apis.checkMobile,
);

// 验证用户是否过期，过期则退出登录
const ifFalseThenOut = isLogin => {
  if (!isLogin) logout();
  return Promise.resolve(isLogin);
};

export const isLoggedIn = pipeThen(
  ifFalseThenOut,
  verifyErrCode,
  getErrData,
  apis.isLogin,
);
