import { authApis } from "./api";

export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("haetekUser")
    ? JSON.parse(window.localStorage.getItem("haetekUser"))
    : {};

const setUser = user =>
  window.localStorage.setItem("haetekUser", JSON.stringify(user));

export const handleLogin = ({ mobile, smscode }, callback) => {
  authApis.login({ mobile, code: smscode }).then(data => {
    const res = data.data;
    if (res.err === 0) {
      setUser({
        name: `${res.result_data[0]["name"]}`,
        token: `${data.headers.authorization}`
      });
      return callback(true);
    }
    alert(res.err_msg);
    callback(false);
  });
};

export const isLoggedIn = () => {
  const user = getUser();

  return !!user.token;
};

export const logout = callback => {
  setUser({});
  callback();
};

export const generateSMSCode = mobile => {
  authApis.smscode({ mobile });
};

export const generateQRCode = () => {
  return new Promise(res => {
    authApis.qrcode().then(response => {
      if (response.data.err === 0) {
        res(response.data.result_data[0].qrcode);
      }
    });
  });
};

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
