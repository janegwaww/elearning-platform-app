import { authApis } from "./api";

export const isBrowser = () => typeof window !== "undefined";

// 获取用户
export const getUser = () =>
  isBrowser() && window.localStorage.getItem("haetekUser")
    ? JSON.parse(window.localStorage.getItem("haetekUser"))
    : {};

// 存储用户
const setUser = user =>
  window.localStorage.setItem("haetekUser", JSON.stringify(user));

// 手机号验证码登录
export const handleLogin = ({ mobile, smscode }, callback) => {
  authApis.login({ mobile, code: smscode }).then(response => {
    const {
      data: { err, err_msg, result_data },
      headers
    } = response;
    if (err === 0) {
      setUser({
        name: `${result_data[0].name}`,
        token: `${headers.authorization}`
      });
      return callback(true);
    }
    alert(err_msg);
    callback(false);
  });
};

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

// 发送验证码
export const generateSMSCode = mobile => {
  authApis.smscode({ mobile });
};

// 获取二维码
export const generateQRCode = () => {
  return new Promise(res => {
    authApis.qrcode().then(response => {
      const { data } = response;
      if (data && data.err === 0) {
        res(response.data.result_data[0].qrcode);
      }
    });
  });
};

// 二维码验证登录
export const enquiryQRCode = qrcode => {
  return new Promise(res => {
    authApis.enquiry({ qrcode }).then(response => {
      const { data, headers } = response;
      if (data.err === 0) {
        setUser({
          name: data.result_data[0].name,
          token: headers.authorization
        });
        res(true);
      }
      res(false);
    });
  });
};

// 获取第三方跳转地址
export const generateThirdPartyUrl = modelType => {
  return new Promise(res => {
    authApis.thirdQRCode({ modelType }).then(response => {
      const { data } = response;
      if (data.err === 0) {
        res(data.result_data[0].url);
      }
      res(false);
    });
  });
};

// 第三方登录，第一次登录要执行绑定手机号操作，不是第一次登录就直接登录
export const handleThirdLogin = ({ code, modelType }) => {
  return new Promise(res => {
    authApis.thirdLogin({ code, modelType }).then(response => {
      const { data, headers } = response;
      if (headers && headers.authorization) {
        setUser({
          name: data.result_data[0].name,
          token: headers.authorization
        });
        return res(true);
      }
      if (data && data.err === 0) {
        return res({ accessToken: data.result_data[0].access_token });
      }
      return res(false);
    });
  });
};

// 绑定手机并登录
export const bindingMobile = ({ mobile, code, accessToken }) => {
  return new Promise(res => {
    authApis.thirdMobile({ mobile, code, accessToken }).then(response => {
      const {
        data: { err, result_data },
        headers
      } = response;
      if (err === 0) {
        setUser({
          name: result_data[0].name,
          token: headers.authorization
        });
        return res(true);
      }
      return res(false);
    });
  });
};

// 手机号是否已经存在
export const userAlreadyExist = mobile => {
  return new Promise(res => {
    authApis.mobileCheck({ mobile }).then(response => {
      const {
        data: { err }
      } = response;
      if (err === 0) {
        res(false);
      }
      res(true);
    });
  });
};
