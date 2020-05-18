import { authApis } from "./api";
import { pipeThen } from "./utils";

const apis = authApis();

const isBrowser = () => typeof window !== "undefined";

// 获取用户
export const getUser = () =>
  isBrowser() && window.localStorage.getItem("haetekUser")
    ? JSON.parse(window.localStorage.getItem("haetekUser"))
    : {};

// 存储用户
const setUser = user =>
  window.localStorage.setItem("haetekUser", JSON.stringify(user));

// 获取返回结果
const getResultData = ({ data }) => Promise.resolve(data.result_data);

// 获取数组
const getArrayData = (arr = []) => Promise.resolve(arr[0] || {});

// 获取数据,headers
const getLoginData = ({ data, headers }) =>
  Promise.resolve({
    resultData: data.result_data[0] || {},
    authorization: headers.authorization
  });

// 是否登录
export const isLoggedIn = () => {
  const user = getUser();

  return !!user.token;
};

// 退出登录
export const logout = callback => {
  setUser({});
  callback();
};

// 获取验证码
const sendSMSCode = ({ code }) => Promise.resolve(!!code);

// 发送验证码
export const generateSMSCode = pipeThen(
  sendSMSCode,
  getArrayData,
  getResultData,
  apis.generateCode
);

// 存入用户
const setLoginUser = ({ resultData, authorization }) => {
  setUser({
    name: `${resultData.name}`,
    token: `${authorization}`
  });
  return Promise.resolve(!!authorization);
};

// 手机号验证码登录
export const handleLogin = pipeThen(setLoginUser, getLoginData, apis.codeLogin);

// 获取返回给前端的数据
const getQrcode = ({ qrcode }) => Promise.resolve(qrcode);

// 获取二维码
export const generateQRCode = pipeThen(
  getQrcode,
  getArrayData,
  getResultData,
  apis.generateQRCode
);

// 二维码验证登录
export const enquiryQRCode = pipeThen(
  setLoginUser,
  getLoginData,
  apis.enquiryQrCode
);

const getUrl = ({ url }) => Promise.resolve(url);

// 获取第三方跳转地址
export const generateThirdPartyUrl = pipeThen(
  getUrl,
  getArrayData,
  getResultData,
  apis.generateThirdQrcode
);

// 设置三方登录数据并返回对应值
const setThirdLogin = ({ resultData, authorization }) => {
  if (authorization) {
    setUser({
      name: resultData.name,
      token: authorization
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
  apis.thirdLogin
);

// 绑定手机并登录
export const bindingMobile = pipeThen(
  setLoginUser,
  getLoginData,
  apis.thirdBindMobile
);

const getErrData = ({ data }) => Promise.resolve(data.err);

const verifyMobile = err => {
  if (err === 0) {
    Promise.resolve(true);
  } else {
    Promise.resolve(false);
  }
};

// 手机号是否已经存在
export const userAlreadyExist = pipeThen(
  verifyMobile,
  getErrData,
  apis.checkMobile
);
