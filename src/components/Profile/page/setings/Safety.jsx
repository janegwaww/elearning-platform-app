import React from "react";

import { Button, Grid } from "@material-ui/core";

import { get_data,get_info } from "../../../../assets/js/request";
import "cropperjs/dist/cropper.css";
import { navigate } from "@reach/router";

import ProfileDialog from "../../components/ProFileDialog";
import CustomModal from "../../../../assets/js/CustomModal";
const Safety = (props) => {
 
  const [userInfo, setUserInfo] = React.useState(null); //保存用户信息
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
          
          new CustomModal().alert('解除绑定成功','success');
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
       
        get_data({
          model_name: "user",
          model_action: "generate_third_qrcode",
          extra_data: {
            type: _ev_data.type, //# QQ/微信/微博
            back_url:'http://kengine.haetek.com/users/profile/settings/safety'
          },
          model_type: "",
        }).then(res=>{
          
          if(res.err==0){
            
            window.open(`${res.result_data[0].url}`);
          }else{
            alert('绑定失败')
          }
        })
      }
    }
  };
  React.useEffect(() => {

    get_info().then(res=>{
        setUserInfo(res)
    })
   
  }, []);

  return (
    <main className='settings'>
    <div className="all-width root">
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
            className={`btn1 all-width`}
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
          {userInfo&&userInfo.binding_webchat === 1
            ? " 已绑定微信"
            : "未绑定微信帐号，绑定后可使用微信直接登录"}
        </Grid>
        <Grid item xs={3}>
          <Button
            data-type="wechat"
            data-typeid={userInfo&&userInfo.binding_webchat}
            className={
              userInfo&&userInfo.binding_webchat === 1
                ? `btn1 btn2 all-width`
                : `btn1 all-width`
            }
            variant="outlined"
            color="secondary"
            onClick={bind_btn}
          >
            {userInfo&&userInfo.binding_webchat === 1 ? "解除绑定" : "绑定微信"}
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
          {userInfo&&userInfo.binding_qq === 1
            ? " 已绑定QQ"
            : "未绑定QQ账号, 绑定后可使用QQ直接登录"}
        </Grid>
        <Grid item xs={3}>
          <Button
            data-type="qq"
            data-typeid={userInfo&&userInfo.binding_qq}
            className={
              userInfo&&userInfo.binding_qq === 1
                ? `btn1 btn2 all-width`
                : `btn1 all-width`
            }
            variant="outlined"
            color="secondary"
            onClick={bind_btn}
          >
            {userInfo&&userInfo.binding_qq === 1 ? "解除绑定" : "绑定QQ"}
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
          {userInfo&&userInfo.binding_microblog === 1
            ? "已绑定微博"
            : "未绑定新浪微博账号, 绑定后可使用微博直接登录"}
        </Grid>
        <Grid item xs={3}>
          <Button
            data-type="microblog"
            data-typeid={userInfo&&userInfo.binding_microblog}
            className={
              userInfo&&userInfo.binding_microblog === 1
                ? `btn1 btn2 all-width`
                : `btn1 all-width`
            }
            variant="outlined"
            color="secondary"
            onClick={bind_btn}
          >
            {userInfo&&userInfo.binding_microblog === 1 ? "解除绑定" : "绑定微博"}
          </Button>
        </Grid>
      </Grid>

      <ProfileDialog parent={props} info={untieData} onEvent={untie_click} />
    </div>
    </main>
  );
};
export default Safety;
