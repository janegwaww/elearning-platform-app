import React from "react";

import { Button, Grid } from "@material-ui/core";
import useStyles from "./settingsStyle";
import { get_data } from "../../../../assets/js/request";
import "cropperjs/dist/cropper.css";
import CustomModal from "../../../../assets/js/CustomModal";

import { navigate } from "@reach/router";
import {
  generateThirdPartyUrl,
  handleThirdLogin,
  bindingMobile,
} from "../../../../services/auth";
import ProfileDialog from "../../components/ProFileDialog";

const Safety = (props) => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = React.useState({}); //保存用户信息
  const [untieData, setUntieData] = React.useState({
    type: "", //weibo//QQ
    isOpen: false,
    isUntie: false,
    dialogtitle: "解除绑定",
    dialogmsg: "确定解除绑定吗?",
  });
  const untie_click = (data) => {
    //关闭弹窗

    if (data.login) {
      setUntieData({
        isOpen: false,
      });
      localStorage.removeItem('haetekUser');
      navigate(`/users/login`);
      return;
    }
    if (data.confirm) {
      get_data({
        model_name: "user",
        model_action: "remove_binding",
        extra_data: {
          type: untieData.type,
        },
        model_type: "",
      }).then((res) => {
        if (res.err === 0) {
          alert("解除绑定成功");
          setUserInfo((old) => {
            if (untieData.type == "wechat") {
              old.binding_webchat = 0;
            } else if (untieData.type == "qq") {
              old.binding_qq = 0;
            } else if (untieData.type == "microblog") {
              old.binding_microblog = 0;
            }
            sessionStorage.setItem("user_info", JSON.stringify(old));
            return old;
          });

          setUntieData({
            isOpen: false,
          });
        } else {
          alert("解除绑定失败");
        }
      });
    }
    if (data.cancel) {
      setUntieData({
        isOpen: false,
      });
    }
  };
  const bind_btn = (event) => {
    let _ev_data = event.target.dataset;
    if (JSON.stringify(_ev_data) == "{}") {
      _ev_data = event.target.parentNode.dataset;
    }
    if (_ev_data.type === "phone") {
      navigate(`/users/profile/setingsphone`);
    } else {
      // generateThirdPartyUrl({ type: method }).then((res) => {
      //   if (res) {
      //     window.location.href = `${res}`;
      //   }
      // });
      if (_ev_data.typeid == 1) {
        setUntieData({
          type: _ev_data.type,
          isOpen: true,
          isUntie: true,
          dialogtitle: "解除绑定",
          dialogmsg: "确定解除绑定吗?",
        });
      } else {
        // setUntieData({
        //   type: _ev_data.type,
        //   isOpen: true,
        //   isUntie: true,
        //   dialogtitle: "绑定第三方帐号",
        //   dialogmsg:
        //     "亲！ 在登录页选择第三方账号登录就可以绑定了，现在去登录么",
        //   login: true,
        // });
        get_data({
          model_name: "user",
          model_action: "generate_third_qrcode",
          extra_data: {
            type: _ev_data.type, //# QQ/微信/微博
            back_url:'http://kengine.haetek.com/users/profile/setings/safety'
          },
          model_type: "",
        }).then(res=>{
          console.log(res)
          if(res.err==0){
            // window.location.href = `${res.result_data[0].url}`
            window.open(`${res.result_data[0].url}`);
          }else{
            alert('绑定失败')
          }
        })
      }
    }
  };
  React.useEffect(() => {
    if (sessionStorage.getItem("user_info")) {
      let _data = JSON.parse(sessionStorage.getItem("user_info"));
      
      setUserInfo(_data);
    }
  }, []);

  return (
    <div className="all-width">
      <Grid
        container
        className="fn-color-2C2C3B fn-size-14"
        style={{ margin: "40px 0" }}
      >
        <Grid item xs={2} className="fn-color-878791">
          手机号:
        </Grid>
        <Grid item xs={7}>
          {userInfo && userInfo.mobile}
        </Grid>
        <Grid item xs={3}>
          <Button
            data-type="phone"
            className={`${classes.btn1} all-width`}
            variant="outlined"
            color="secondary"
            onClick={bind_btn}
          >
            修改手机号
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        className="fn-color-2C2C3B fn-size-14"
        style={{ margin: "40px 0" }}
      >
        <Grid item xs={2} className="fn-color-878791">
          绑定微信
        </Grid>
        <Grid item xs={7}>
          {userInfo.binding_webchat === 1
            ? " 已绑定微信"
            : "未绑定微信帐号，绑定后可使用微信直接登录"}
        </Grid>
        <Grid item xs={3}>
          <Button
            data-type="wechat"
            data-typeid={userInfo.binding_webchat}
            className={
              userInfo.binding_webchat === 1
                ? `${classes.btn1} ${classes.btn2} all-width`
                : `${classes.btn1}  all-width`
            }
            variant="outlined"
            color="secondary"
            onClick={bind_btn}
          >
            {userInfo.binding_webchat === 1 ? "解除绑定" : "绑定微信"}
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        className="fn-color-2C2C3B fn-size-14"
        style={{ margin: "40px 0" }}
      >
        <Grid item xs={2} className="fn-color-878791">
          绑定QQ:
        </Grid>
        <Grid item xs={7}>
          {userInfo.binding_qq === 1
            ? " 已绑定QQ"
            : "未绑定QQ账号, 绑定后可使用QQ直接登录"}
        </Grid>
        <Grid item xs={3}>
          <Button
            data-type="qq"
            data-typeid={userInfo.binding_qq}
            className={
              userInfo.binding_qq === 1
                ? `${classes.btn1} ${classes.btn2} all-width`
                : `${classes.btn1} all-width`
            }
            variant="outlined"
            color="secondary"
            onClick={bind_btn}
          >
            {userInfo.binding_qq === 1 ? "解除绑定" : "绑定QQ"}
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        className="fn-color-2C2C3B fn-size-14"
        style={{ margin: "40px 0" }}
      >
        <Grid item xs={2} className="fn-color-878791">
          绑定微博:
        </Grid>
        <Grid item xs={7}>
          {userInfo.binding_microblog === 1
            ? "已绑定微博"
            : "未绑定新浪微博账号, 绑定后可使用微博直接登录"}
        </Grid>
        <Grid item xs={3}>
          <Button
            data-type="microblog"
            data-typeid={userInfo.binding_microblog}
            className={
              userInfo.binding_microblog === 1
                ? `${classes.btn1} ${classes.btn2} all-width`
                : `${classes.btn1} all-width`
            }
            variant="outlined"
            color="secondary"
            onClick={bind_btn}
          >
            {userInfo.binding_microblog === 1 ? "解除绑定" : "绑定微博"}
          </Button>
        </Grid>
      </Grid>

      <ProfileDialog parent={props} info={untieData} onEvent={untie_click} />
    </div>
  );
};
export default Safety;
