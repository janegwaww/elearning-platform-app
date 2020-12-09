import React, { useState, useEffect } from "react";
import { globalHistory, navigate } from "@reach/router";
import urlParse from "url-parse";
import prevHref from "../../services/prevHref";
import {
  generateThirdPartyUrl,
  handleThirdLogin,
  bindingMobile,
} from "../../services/auth";

const withThirdLogin = (WrapComponent) => {
  return function () {
    const locationHref = globalHistory.location.href;
    const [binding, setBinding] = useState(false);
    const [acToken, setAcToken] = useState("");
    const [returnUrl, setReturnUrl] = useState("/");

    const handleNavigate = (href) => {
      if (!href) {
        navigate("/");
      } else {
        navigate(href || returnUrl);
      }
    };

    // 第一步：获取跳转链接
    const handleLoginClick = (method) => {
      const backUrl = `${prevHref.get()}`;
      generateThirdPartyUrl({ type: method, back_url: backUrl }).then((res) => {
        if (res) {
          window.location.href = `${res}`;
        }
      });
    };

    const loginMethod = (value) => value || "microblog";
    const track = (msg) => (data) => console.log(`${msg}: `, data);
    // 第二步：拿到code进行登录操作
    const handleLogin = ({ code = "", state = "", type = "microblog" }) => {
      const param = { code, type };
      track("href")(locationHref);
      handleThirdLogin(param).then((response) => {
        const { accessToken } = response;
        if (accessToken) {
          /* 执行绑定手机号操作 */
          setBinding(true);
          setAcToken(accessToken);
          track("bind")(accessToken);
          return;
        }
        if (response && !accessToken) {
          handleNavigate(state);
          track("login")(response);
          return;
        }
        track("else")(response);
      });
    };

    // 第三步：绑定手机号
    const handleBindMobile = ({ mobile, smscode }) => {
      const param = { mobile, code: smscode, access_token: acToken };
      bindingMobile(param).then((response) => {
        if (response) {
          setBinding(false);
          handleNavigate();
        }
      });
    };

    const getThirdParams = (href) => urlParse(href, true).query || {};

    useEffect(() => {
      const { code, state, type } = getThirdParams(locationHref);
      if (code) {
        setReturnUrl(state);
        handleLogin({
          code,
          state,
          type: loginMethod(type),
        });
      }
    }, [locationHref]);

    return (
      <WrapComponent
        handleLoginClick={handleLoginClick}
        handleBindMobile={handleBindMobile}
        binding={binding}
      />
    );
  };
};

export default withThirdLogin;
