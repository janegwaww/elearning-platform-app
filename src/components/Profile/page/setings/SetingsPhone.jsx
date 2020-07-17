import React from "react";
import { Nav } from "../../components/ProfileNav";
import { Button, Grid } from "@material-ui/core";
import { Check, CheckCircleOutline } from "@material-ui/icons";

import TextField from "@material-ui/core/TextField";
import { get_data } from "../../../../assets/js/request";
import "cropperjs/dist/cropper.css";
import CustomModal from "../../../../assets/js/CustomModal";
import useStyles from "./settingsStyle";

const SetingsPhone = (props) => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = React.useState({}); //保存用户信息
  const [activeStep, setActiveStep] = React.useState(1);
  const [bindPhone, setBindPhone] = React.useState(""); //旧手机号/新手机号
  const [bindCode, setBindCode] = React.useState(""); //验证码
  const [token, setToken] = React.useState("");
  const [countdown, setCountdown] = React.useState(0); //保存倒计时
  const timeRef = React.useRef();
  const handleBack = () => {
    window.history.back(-1);
  };
  const handleNext = () => {
    let _phone = bindPhone;
    let _code = bindCode;
    let _data = null;

    if (activeStep === 1 && !_phone) {
      _phone = userInfo.mobile;
    }
    if (!_phone || _phone.length != 11) {
      new CustomModal().alert("输入合法的手机号", "error", 3000);
      return;
    }
    if (!_code || _code.length != 4) {
      new CustomModal().alert("输入合法的验证码", "error", 3000);
      return;
    }
    if (activeStep === 1) {
      _data = {
        model_name: "user",
        model_action: "verify_mobile",
        extra_data: {
          mobile: _phone,
          code: _code,
        },
      };
    }
    if (activeStep === 2) {
      _data = {
        model_name: "user",
        model_action: "change_mobile",
        extra_data: {
          new_mobile: _phone,
          code: _code,
          token: token,
        },
      };
    }

    get_data(_data).then((res) => {
      if (res.err === 0) {
        timeRef.current && clearTimeout(timeRef.current);
        if (activeStep === 1) {
          setToken(res.result_data[0].token);
          setCountdown(0);
          new CustomModal().alert("身份验证成功", "success", 3000);
        }
        if (activeStep === 2) {
          new CustomModal().alert("绑定手机成功", "success", 3000);
          userInfo.mobile = bindPhone;
          sessionStorage.setItem("user_info", JSON.stringify(userInfo));
          setCountdown(0);
        }

        setTimeout(() => {
          let _new_step = 0;
          setActiveStep((prevActiveStep) => {
            _new_step = prevActiveStep + 1;
            return prevActiveStep + 1;
          });
          setBindPhone("");
          setBindCode("");
          if (_new_step === 3) {
            setCountdown(10);
            setTimeout(time_remaining, 1000); //1秒后启用倒计时，
            setTimeout(handleBack, 11000); //12稍后跳转（大于倒计时+启用倒计时时间）
          }
        }, 2000);
      } else {
        new CustomModal().alert(res.errmsg, "error", 3000);
      }
    });
  };
  const time_remaining = () => {
    timeRef.current && clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      let _num = 0;
      setCountdown((countdown) => {
        _num = countdown;
        return countdown - 1;
      });
      if (_num <= 0) {
        timeRef.current = setCountdown(0);
        return;
      }
      time_remaining();
    }, 1000);
  };
  const get_code = (_type) => {
    let _phone = bindPhone;
    if (activeStep === 1) {
      if (!_phone) {
        _phone = userInfo.mobile;
      }
      if (_phone != userInfo.mobile) {
        new CustomModal().alert(
          "输入的手机号与原来的手机号不一至，请重新输入",
          "error",
          3000
        );
        return;
      }
    }
    if (!_phone || _phone.length != 11) {
      new CustomModal().alert("输入合法的手机号", "error", 3000);
      return;
    }

    get_data({
      model_name: "user",
      model_action: "generate_code",
      extra_data: {
        mobile: _phone, // # 手机号码
        type: _type, ///"bind" # 登陆/更改/绑定
      },
    }).then((res) => {
      if (res.err === 0) {
        new CustomModal().alert(
          "请留意手机，验证码60秒内有效",
          "success",
          3000
        );
        setCountdown(60);
        timeRef.current = setTimeout(() => {
          time_remaining();
        }, 1000);
      } else {
        new CustomModal().alert(res.errmsg || "获取验证码失败", "error", 3000);
      }
    });
  };
  React.useEffect(() => {
    if (sessionStorage.getItem("user_info")) {
      let _data = JSON.parse(sessionStorage.getItem("user_info"));
      setUserInfo(_data);
    }
    return () => {
      timeRef.current && clearTimeout(timeRef.current);
    };
  }, []);
  return (
    <div className="profile-padding ">
      <div>
        <Nav list={["设置手机"]} parent={props} _inx={0} />
      </div>
      <div className=" all-height profile-top">
        <div className="box " style={{ paddingLeft: 72 }}>
          <div
            className="box box-between profile-setting-phone"
            style={{
              flexDirection: "column",
              minWidth: 100,
              minHeight: 176,
            }}
          >
            <div className="profile-step">
              <span className={activeStep < 1 ? "active" : ""}>1</span>
              身份验证 {activeStep > 1 && <Check />}
            </div>
            <div className="profile-step">
              <span className={activeStep < 2 ? "active" : ""}>2</span>
              绑定手机{activeStep > 2 && <Check />}
            </div>
            <div className="profile-step">
              <span className={activeStep < 3 ? "active" : ""}>3</span>
              绑定成功{activeStep >= 3 && <Check />}
            </div>
          </div>
          <div className="all-height">
            {activeStep == 1 && (
              <div className="all-width">
                <Grid container spacing={1} className="all-width">
                  <Grid item xs={3}>
                    原手机号:
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className="edit-phone all-width"
                      placeholder={userInfo.mobile}
                      onChange={(evt) => {
                        setBindPhone(evt.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  className="all-width"
                  style={{ paddingTop: 20 }}
                >
                  <Grid item xs={3}>
                    验证码:
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className="edit-phone all-width"
                      placeholder="验证码"
                      onChange={(evt) => {
                        setBindCode(evt.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    {countdown > 0 ? (
                      <span className="fn-color-9E9EA6">
                        ({countdown}s)后重新获取
                      </span>
                    ) : (
                      <span
                        className="fn-color-007CFF p"
                        onClick={() => {
                          get_code("update");
                        }}
                      >
                        获取验证码
                      </span>
                    )}
                  </Grid>
                </Grid>
                <Grid container spacing={3} className="all-width">
                  <Grid item xs={3}></Grid>
                  <Grid item xs={9}>
                    注册过程中会用到短信, 请注意您的手机提示,
                    我们将保护您个人手机号信息
                  </Grid>
                </Grid>
              </div>
            )}
            {activeStep == 2 && (
              <div className="all-width">
                <Grid container spacing={1} className="all-width">
                  <Grid item xs={3}>
                    新手机号:
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className="edit-phone all-width"
                      placeholder="新手机号"
                      value={bindPhone}
                      onChange={(evt) => {
                        setBindPhone(evt.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  className="all-width"
                  style={{ paddingTop: 20 }}
                >
                  <Grid item xs={3}>
                    验证码:
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className="edit-phone all-width"
                      placeholder="验证码"
                      value={bindCode}
                      onChange={(evt) => {
                        setBindCode(evt.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    {countdown > 0 ? (
                      <span className="fn-color-9E9EA6">
                        ({countdown}s)后重新获取
                      </span>
                    ) : (
                      <span
                        className="fn-color-007CFF p"
                        onClick={() => {
                          get_code("bind");
                        }}
                      >
                        获取验证码
                      </span>
                    )}
                  </Grid>
                </Grid>
                <Grid container spacing={3} className="all-width">
                  <Grid item xs={3}></Grid>
                  <Grid item xs={9}>
                    注册过程中会用到短信, 请注意您的手机提示,
                    我们将保护您个人手机号信息
                  </Grid>
                </Grid>
              </div>
            )}
            {activeStep >= 3 && (
              <div
                className="all-width all-height box box-align-center"
                style={{ minHeight: "calc(176px - 56px)" }}
              >
                <div className=" all-height fn-color-007CFF text-center">
                  <div>
                    <CheckCircleOutline style={{ width: 50, height: 50 }} />
                  </div>
                  <div style={{ margin: "20px 0" }}>绑定成功</div>
                  <div className="fn-color-9E9EA6">
                    {countdown}s后自动返回上一页
                  </div>
                </div>
              </div>
            )}
            {activeStep < 3 && (
              <Grid
                container
                spacing={3}
                className="all-width"
                style={{ paddingTop: 20 }}
              >
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  下一步
                </Button>
                &nbsp;&nbsp;
                <Button
                  className={`${classes.btn} ${classes.btn4}`}
                  variant="contained"
                  onClick={handleBack}
                >
                  取消
                </Button>
              </Grid>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SetingsPhone;
