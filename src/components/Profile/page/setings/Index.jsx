import React from "react";
import { Router,navigate } from "@reach/router";
import { ProNavbar, Navbar } from "../../components/ProfileNav";


const Setings = (props) => {
  console.log(props)
  const {children} = props;
  return (
    <div className='all-height view-scroll bg-white profile-padding'>
      <nav>
        <ProNavbar
          list={["基本设置", "安全中心", "帮助/反馈"]}
          parent={props}
          onEvent={(num)=>{
            if(num==1){
              navigate(`/users/profile/setings`);
            }else if(num==2){
              navigate(`/users/profile/setings/safety`);

            }else{
              navigate(`/users/profile/setings/help`)
            }
            
          }}
        />
      </nav>
      <div className='profile-top'>
     
          {children}
        
        </div>
    </div>
  );
};
export default Setings;
{
  /** 
import { ProNavbar, Navbar } from "../../components/ProfileNav";
import { Button, Grid } from "@material-ui/core";
import {
  ExpandMore,
  CameraAltOutlined,
  AddCircleOutlined,
  BrokenImageOutlined,
  Check,
  CheckCircleOutline,
} from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ProfileDialog from "../../components/ProFileDialog";
import PublicDialog from "../../../../assets/template/PublicDialog";
import { getObj } from "../../../../assets/js/totls";
import { get_data } from "../../../../assets/js/request";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import CustomModal from "../../../../assets/js/CustomModal";
import wechatQrcode from "../../../../../static/images/wechat-qrcode.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      "& .MuiInput-underline": {
        "&:before": { border: "none" },
        "&:after": {
          border: "none",
        },
      },
      "& .MuiInputBase-input": {
        // padding: 0,
        "&:focus": {
          border: "1px solid #007cff",
        },
      },
      "& .MuiOutlinedInput-multiline": {
        padding: 2,
      },
    },
  },

  input: {
    "& .MuiInputBase-input": {
      border: "1px solid rgba(231,233,238,1)",
      borderRadius: "10px",
      padding: 10,
    },
  },
  btn1: {
    width: 148,
    height: 32,
    borderRadius: 16,
    border: "1px solid #007CFF",
    color: "#007CFF",
    fontSize: 14,
  },
  btn2: {
    color: "#FC5659",
    border: "1px solid #FC5659",
  },
  btn: {
    backgroundColor: "#007CFF",
    color: "white",
    fontSize: 16,
    width: 180,
    height: 40,
    borderRadius: 20,
  },
  btn4: {
    backgroundColor: "#F2F2F5",
    color: "#878791",
  },

  radioRoot: {
    flexDirection: "row",
    "& .MuiRadio-root": {
      padding: "0 9px",
    },
  },
  usersimg: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    backgroundColor: "#F3F3F3",
  },
}));
const table_data = [
  {
    label: "手机号",
    value: "",
    button_v: "修改手机号",
    type: "phone",
    isunite: true,
  },
  {
    label: "绑定微信",
    value: "已邦定微信",
    button_v: "解除绑定",
    type: "weChat",
    isunite: true,
  },
  {
    label: "绑定QQ",
    value: "未绑定QQ账号, 绑定后可使用QQ直接登录",
    button_v: "绑定QQ",
    type: "QQ",
    isunite: false,
  },
  {
    label: "绑定微博:",
    value: "未绑定新浪微博账号, 绑定后可使用微博直接登录",
    button_v: "绑定微博",
    type: "weibo",
    isunite: false,
  },
];



const Setpage = (props) => {
  const classes = useStyles();
  const [navbarStatus, setNavbarStatus] = React.useState(1);
  const [navBarList, setNavBarList] = React.useState([
    "基本设置",
    "安全中心",
    "帮助/反馈",
  ]);
  const [untieData, setUntieData] = React.useState({
    type: "WeChat", //weibo//QQ
    isOpen: false,
    isUntie: false,
    dialogtitle: "解除绑定",
    dialogmsg: "确定解除绑定吗?",
  });
  const [userInfo, setUserInfo] = React.useState({}); //保存用户信息
  // 基本设置
  const [uphead, setUphead] = React.useState(false); //打开上传头像弹窗
  const [headerfiles, setHeaderfiles] = React.useState(null); //文件
  const [headerUrl, setHeaderUrl] = React.useState(null); //临时路径
  const [minheaderurl, setMinheaderurl] = React.useState(null); //裁切路径
  const [newheaderurl, setNewheaderurl] = React.useState(""); //上传后路径
  let heraderRef = React.useRef(null);
  const [upcover, setUpcover] = React.useState(false); //打开上传封面
  const [coverurl, setCoverurl] = React.useState(null); //临时本地路径
  const [coverfile, setCoverfile] = React.useState(null); //将要上传的文件
  const [newcoverurl, setNewcoverurl] = React.useState(""); //上传后的路径
  const [username, setUsername] = React.useState(""); //用户名
  const [sex, setSex] = React.useState(""); //性别
  const [birth, setBirth] = React.useState(""); //出生年月
  const [userdescribe, setUserdescribe] = React.useState(""); //用户描述
  const onEvent = function(value) {
    //设置nav
    setNavbarStatus(value);
  };
  const untie_click = (data) => {
    //关闭弹窗
    setUntieData({
      isOpen: false,
    });
  };
  // 安全中心
  const [activeStep, setActiveStep] = React.useState(1);
  const [bindPhone, setBindPhone] = React.useState(""); //旧手机号/新手机号
  const [bindCode, setBindCode] = React.useState(""); //验证码
  const [token, setToken] = React.useState("");
  const [countdown, setCountdown] = React.useState(0); //保存倒计时

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
          if(_new_step===3){
            setCountdown(10);
            setTimeout(time_remaining, 1000);//1秒后启用倒计时，
            setTimeout(handleBack,12000);//12稍后跳转（大于倒计时+启用倒计时时间）
          }
          // time_remaining();
        }, 2000);
      } else {
        new CustomModal().alert(res.errmsg, "error", 3000);
      }
    });
  };
  const time_remaining = () => {
    setTimeout(() => {
      let _num = 0;
      setCountdown((countdown) => {
        _num = countdown;
        return countdown - 1;
      });
      if (_num <= 0) {
        setCountdown(0);
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
    }
    if (!_phone || _phone.length != 11) {
      new CustomModal().alert("输入合法的手机号", "error", 3000);
      return;
    }

    get_data( {
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
        setTimeout(() => {
          time_remaining();
        }, 1000);
      } else {
        new CustomModal().alert(res.errmsg || "获取验证码失败", "error", 3000);
      }
    });
  };
  const handleBack = () => {
    setNavBarList(["基本设置", "安全中心", "帮助/反馈"]);
    setNavbarStatus(2);
    let _data = JSON.parse(JSON.stringify(props.parent.state.nowPage));
    _data.chilepage_id = 1;
    props.parent.setState({
      nowPage: _data,
    });
    setActiveStep(1);
    setBindCode("");
    setBindPhone("");
    setCountdown(0);
  };

  const handleReset = () => {
    setActiveStep(1);
  };
  React.useEffect(() => {
    if (sessionStorage.getItem("user_info")) {
      let _data = JSON.parse(sessionStorage.getItem("user_info"));
      setUserInfo(_data);

      setSex(_data.gender);
      setBirth(_data.birthday);
      table_data[0].value = _data.mobile;
    }
  }, []);

  return (
    <section className="all-height view-scroll bg-white profile-padding ">
      {navbarStatus < 4 ? (
        <nav>
          <ProNavbar list={navBarList} parent={props} onEvent={onEvent} />
        </nav>
      ) : (
        <span></span>
      )}
      <main className="profile-top fn-size-14 all-width">
        {navbarStatus == 1 && (
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={2} className="text-right">
                头像:
              </Grid>
              <Grid item xs={10}>
                <div
                  style={{
                    backgroundImage: newheaderurl
                      ? "url(" + newheaderurl + ")"
                      : "url(" + userInfo.headshot + ")",
                  }}
                  className={`text-center bg-not fn-color-white box box-center ${classes.usersimg}`}
                  onClick={() => {
                    setUphead(true);
                  }}
                >
                  <CameraAltOutlined />
                </div>
                <PublicDialog
                  parent={props}
                  title="上传头像"
                  id="headerimg"
                  open={uphead}
                  onChange={(file, url) => {
                    setHeaderfiles(file);
                    setHeaderUrl(url);
                    setMinheaderurl(url);
                  }}
                  onEvent={(data) => {
                    if (data.cancel) {
                      setHeaderfiles(null);
                      setHeaderUrl(null);
                      setMinheaderurl(null);
                      setUphead(false);
                      return;
                    }

                    let _cropper = heraderRef.getCroppedCanvas().toDataURL();
                    let parts = _cropper.split(";base64,");
                    let contentType = parts[0].split(":")[1];
                    let raw = window.atob(parts[1]);
                    let rawLength = raw.length;
                    let uInt8Array = new Uint8Array(rawLength);
                    for (let i = 0; i < rawLength; ++i) {
                      uInt8Array[i] = raw.charCodeAt(i);
                    }
                    let newfile = new window.Blob([uInt8Array], {
                      type: contentType,
                      name: "newfilename",
                    });

                    let _formdata = new FormData();
                    _formdata.append("model_action", "upload_file");
                    _formdata.append("type", "headshot");
                    _formdata.append("model_name", "file");
                    _formdata.append("file", newfile);

                    get_data( _formdata).then((res) => {
                      setHeaderfiles(null);
                      setHeaderUrl(null);
                      setMinheaderurl(null);
                      setNewheaderurl(res.result_data[0]);

                      setUphead(false);
                    });

                    // setUphead(false);
                  }}
                >
                  <div className="box box-align-start text-center">
                    {headerUrl ? (
                      <Cropper
                        className="profile-right"
                        ref={(cropper) => {
                          heraderRef = cropper;
                        }}
                        src={headerUrl} // 文件
                        style={{ height: 370, width: 370 }} // 自定义样式
                        aspectRatio={65 / 82} // 设置图片长宽比
                        guides={false} // 是否显示九宫格
                        preview=".cropper-preview" // 设置预览的dom
                      />
                    ) : (
                      <div
                        className="bg-f3  box box-center fn-color-9E9EA6 profile-right"
                        style={{ width: 370, height: 370 }}
                        data-type="headerimg"
                        onClick={() => {
                          getObj("headerimg").click();
                        }}
                      >
                        <div>
                          <AddCircleOutlined />
                          <p className="zero-edges profile-margin-10">
                            添加图片
                          </p>
                          <p className="zero-edges profile-margin-10">
                            只支持JPG/PNG,大小不超过5M
                          </p>
                          <p className="zero-edges profile-margin-10">
                            推荐尺寸240x240
                          </p>
                        </div>
                      </div>
                    )}
                    <div>
                      <div
                        className="bg-f3 bg-not cropper-preview view-overflow"
                        style={{
                          minWidth: 220,
                          height: 220,
                          borderRadius: "50%",
                        }}
                      ></div>
                      <p className="fn-color-9E9EA6">头像预览</p>
                    </div>
                  </div>
                </PublicDialog>
              </Grid>
              <Grid item xs={2} className="text-right">
                个人封面:
              </Grid>
              <Grid item xs={10}>
                <div
                  className="bg-f3 box box-center text-center fn-color-white bg-not "
                  style={{
                    width: 640,
                    height: 140,
                    backgroundImage: newcoverurl
                      ? "url(" + newcoverurl + ")"
                      : "url(" + userInfo.background + ")",
                  }}
                  onClick={() => {
                    setUpcover(true);
                  }}
                >
                  <div>
                    <BrokenImageOutlined />
                    <p>上传封面</p>
                  </div>
                </div>
                <PublicDialog
                  title="人物封面"
                  id="background"
                  parent={props}
                  open={upcover}
                  onEvent={(res) => {
                    if (res.cancel) {
                      setUpcover(false);
                      setCoverurl(null);
                      setCoverfile(null);
                      return;
                    }
                    if (res.confirm) {
                      let _formdata = new FormData();
                      _formdata.append("model_action", "upload_file");
                      _formdata.append("type", "background");
                      _formdata.append("model_name", "file");
                      _formdata.append("file", coverfile);

                      get_data( _formdata).then((res) => {
                        setUpcover(false);
                        setCoverurl(null);
                        setCoverfile(null);
                        setNewcoverurl(res.result_data[0]);
                      });
                    }
                  }}
                  onChange={(file, url) => {
                    setCoverurl(url);
                    setCoverfile(file);
                  }}
                >
                  <div
                    className="box box-center text-center bg-f3 bg-not"
                    style={{
                      width: 620,
                      height: 200,
                      backgroundImage: "url(" + coverurl + ")",
                    }}
                    data-type="background"
                    onClick={() => {
                      getObj("background").click();
                    }}
                  >
                    {!coverurl && (
                      <div>
                        <AddCircleOutlined />
                        <p className="zero-edges profile-margin-10">添加图片</p>
                        <p className="zero-edges profile-margin-10">
                          只支持JPG/PNG,大小不超过5M
                        </p>
                        <p className="zero-edges profile-margin-10">
                          推荐尺寸240x240
                        </p>
                      </div>
                    )}
                  </div>
                </PublicDialog>
              </Grid>
              <Grid
                item
                xs={2}
                className="text-right box box-align-center box-end"
              >
                用户名:
              </Grid>
              <Grid item xs={10}>
                <TextField
                  placeholder={userInfo && userInfo.user_name}
                  className={classes.input}
                  onChange={(ev, value) => {
                    setUsername(ev.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={2} className="text-right">
                ID号:
              </Grid>
              <Grid item xs={10}>
                {userInfo && userInfo.user_id}
              </Grid>

              <Grid item xs={2} className="text-right">
                性别:
              </Grid>
              <Grid item xs={10}>
                <RadioGroup
                  className={classes.radioRoot}
                  value={sex}
                  onChange={(ev) => {
                    setSex(ev.target.value);
                  }}
                >
                  <FormControlLabel value="男" control={<Radio />} label="男" />
                  <FormControlLabel value="女" control={<Radio />} label="女" />
                  <FormControlLabel
                    value="保密"
                    control={<Radio />}
                    label="保密"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={2} className="text-right">
                出生日期:
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type="date"
                  value={birth}
                  className={classes.input}
                  onChange={(ev, value) => {
                    setBirth(ev.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={2} className="text-right">
                我的简介:
              </Grid>
              <Grid item xs={10}>
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  multiline
                  placeholder={
                    (userInfo && userInfo.introduction) || "个人描述"
                  }
                  rows={5}
                  variant="outlined"
                  className={classes.input}
                  onChange={(ev) => {
                    setUserdescribe(ev.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} className="text-center">
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    ev.preventDefault();
                    let _data = {
                      model_name: "user",
                      model_action: "change_information",
                      extra_data: {
                        app_background: userInfo.app_background,
                        background: newcoverurl || userInfo.background,
                        headshot: newheaderurl || userInfo.headshot,
                        user_name: username || userInfo.user_name,
                        gender: sex || userInfo.gender,
                        birthday: birth || userInfo.birthday,
                        introduction: userdescribe || userInfo.introduction,
                      },
                      model_type: "",
                    };

                    get_data(_data).then((res) => {
                      console.log(props);
                      if (res.err == 0) {
                        new CustomModal().alert(res.errmsg, "success", "5000");
                      } else {
                        new CustomModal().alert("修改失败", "error", "3000");
                      }
                      // get_data(
                      // { model_name: "user", model_action: "get_information" }).then(res=>{
                      //   props.parent.setState({
                      //     userinfo:res.result_data[0]
                      //   })
                      //   sessionStorage.setItem('user_info',JSON.stringify(res.result_data[0]))

                      // })
                    });
                  }}
                >
                  提交
                </Button>
              </Grid>
            </Grid>
          </div>
        )}
        {navbarStatus == 2 && (
          <div className="all-width">
            {table_data.map((option, inx) => (
              <Grid
                container
                key={option.label}
                className="fn-color-2C2C3B fn-size-14"
                style={{ margin: "40px 0" }}
              >
                <Grid item xs={3} className="fn-color-878791">
                  {option.label}:
                </Grid>
                <Grid item xs={6}>
                  {option.type == "phone" ? userInfo.mobile : option.value}
                </Grid>
                <Grid item xs={3}>
                  <Button
                    className={
                      option.isunite && inx > 0
                        ? `${classes.btn1} ${classes.btn2} all-width`
                        : `${classes.btn1} all-width`
                    }
                    variant="outlined"
                    color="secondary"
                    data-inx={inx}
                    data-type={option.type}
                    onClick={(event) => {
                      let _ev_data = event.target.dataset;
                      if (JSON.stringify(_ev_data) == "{}") {
                        _ev_data = event.target.parentNode.dataset;
                      }
                      if (_ev_data.inx === "0") {
                        let _data = JSON.parse(
                          JSON.stringify(props.parent.state.nowPage)
                        );
                        _data.chilepage_id = 0;
                        onEvent(4);
                        props.parent.setState({
                          nowPage: _data,
                        });
                        setNavBarList(["设置手机"]);
                      } else {
                        let _option = table_data[_ev_data.inx];
                        // console.log(_option)
                        if (_option.isunite) {
                          //已绑定
                          // {
                          //   type:'WeChat',//weibo//QQ
                          //   isOpen:false,
                          //   isUntie:false,
                          //   dialogtitle:'解除绑定',
                          //   dialogmsg:'确定解除绑定吗?',
                          // }

                          setUntieData({
                            type: _option.type,
                            isOpen: true,
                            isUntie: true,
                            dialogtitle: "解除绑定",
                            dialogmsg: "确定解除绑定吗?",
                          });
                        }
                      }
                    }}
                  >
                    {option.button_v}
                  </Button>
                </Grid>
              </Grid>
            ))}
          </div>
        )}
        {navbarStatus == 3 && (
          <div>
            <nav>
              <Navbar
                lists={["热门问题", "会员问题", "账号问题", "其他问题"]}
                parent={props}
              />
            </nav>
            <div className="line profile-top profile-bottom"></div>
            <div
              className="bg-F2F2F5 fn-size-14 fn-color-2C2C3B"
              style={{ padding: 20 }}
            >
              <p>
                <input type="radio" value="无法购买会员" />
                无法购买会员
              </p>
              <p>
                <input type="radio" value="会员购买成功，VIP服务未生效" />{" "}
                会员购买成功，VIP服务未生效
              </p>
              <p>
                <input type="radio" value="会员未到期提示过期" />
                会员未到期提示过期
              </p>
              <p>
                <input type="radio" value="取消连续包月" />
                取消连续包月
              </p>
              <p>
                <input
                  type="radio"
                  value="请协助填写提示信息和问题描述, 将有助于我们更快的发现和解决问题~"
                />
                请协助填写提示信息和问题描述, 将有助于我们更快的发现和解决问题~
              </p>
              <p className="fn-color-007CFF fn-size-12">
                查看更多
                <ExpandMore style={{ verticalAlign: "middle" }} />
              </p>
            </div>

            <div className={`profile-top ${classes.root}`}>
              <Grid container>
                <Grid item xs={2} className="text-right fn-color-878791">
                  问题描述(选填)：
                </Grid>
                <Grid itme xs={8}>
                  <TextField
                    placeholder="请协助填写提示信息和问题描述, 将有助于我们更快的发现和解决问题~"
                    variant="outlined"
                    rows={3}
                    multiline
                    fullWidth
                    className={classes.input}
                  />
                </Grid>
              </Grid>
            </div>
            <div className={`profile-top ${classes.root}`}>
              <Grid container>
                <Grid item xs={2} className="text-right fn-color-878791">
                  <span className="fn-color-FC3535">*</span>联系方式：
                </Grid>
                <Grid itme xs={8}>
                  <TextField
                    placeholder="请输入您的手机号"
                    className={classes.input}
                  />
                </Grid>
              </Grid>
            </div>
            <div className={`profile-top ${classes.root}`}>
              <Grid container>
                <Grid item xs={2} className="text-right fn-color-878791">
                  官方微信公众号：
                </Grid>
                <Grid itme xs={8}>
                  <div>关注官方微信公众号，消息第一时间通知您</div>
                  <div style={{ paddingTop: 20 }}>
                    <img src={wechatQrcode} />
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="text-center profile-top">
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
              >
                提交
              </Button>
            </div>
          </div>
        )}

        {navbarStatus == 4 && (
          <div>
            <nav>
              <ProNavbar list={navBarList} parent={props} onEvent={onEvent} />
            </nav>
            <div className="profile-top">
              <div className="box " style={{ transform: "translateX(72px)" }}>
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
                    绑定成功{activeStep > 3 && <Check />}
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
                              className="fn-color-007CFF"
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
                              className="fn-color-007CFF"
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
                          {" "}
                          <CheckCircleOutline
                            style={{ width: 50, height: 50 }}
                          />{" "}
                        </div>
                        <div style={{ margin: "20px 0" }}>绑定成功</div>
                        <div className="fn-color-9E9EA6">
                          {countdown}s后自动跳转到当前页面
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

              {/** 
              <Stepper orientation="vertical" activeStep={activeStep}>
                {["身份验证", "绑定手机", "绑定成功"].map((label, inx) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <div>
                        {activeStep == 0 && (
                          <Grid container spacing={3}>
                            <Grid item xs={3}>
                              原手机号
                            </Grid>
                            <Grid item xs={9}>
                              <TextField
                                className="edit-phone"
                                placeholder={userInfo.mobile}
                                onChange={(evt) => {
                                  _phone = evt.target.value;
                                }}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              验证码
                            </Grid>
                            <Grid item xs={9}>
                              <Grid container spacing={3}>
                                <Grid item xs={6}>
                                  <TextField
                                    className="edit-phone"
                                    onChange={(evt) => {
                                      _phone_code = evt.target.value;
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <span
                                    onClick={() => {
                                      if (!_phone || phone.length != 11) {
                                        new CustomModal().alert(
                                          "手机号不正确！输入正确的手机号！"
                                        );
                                        return;
                                      }

                                      // get_data( {
                                      //   model_name: "user",
                                      //   model_action: "generate_code",
                                      //   extra_data: {
                                      //     mobile: phone,
                                      //     type: "bind",
                                      //   },
                                      // }).then(res=>{
                                      //   console.log(res)
                                      // })
                                    }}
                                  >
                                    获取验证码
                                  </span>
                                </Grid>

                                <Grid item xs={12}>
                                  验证过程中会用到短信, 请注意您的手机提示,
                                  我们将保护您个人手机号信息
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}

                        {activeStep == 1 && (
                          <Grid container spacing={3}>
                            <Grid item xs={3}>
                              原手机号
                            </Grid>
                            <Grid item xs={9}>
                              <TextField className="edit-phone" />
                            </Grid>
                            <Grid item xs={3}>
                              验证码
                            </Grid>
                            <Grid item xs={9}>
                              <Grid container spacing={3}>
                                <Grid item xs={6}>
                                  <TextField className="edit-phone" />
                                </Grid>
                                <Grid item xs={6}>
                                  获取验证码
                                </Grid>

                                <Grid item xs={12}>
                                  验证过程中会用到短信, 请注意您的手机提示,
                                  我们将保护您个人手机号信息
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                        {activeStep == 2 && (
                          <Grid container spacing={3}>
                            <Grid item xs={3}> </Grid>
                            <Grid item xs={9}>
                              成功
                            </Grid>
                           
                          </Grid>
                        )}

                        <Grid container spacing={3}>
                          <Grid item xs={3}></Grid>
                          <Grid item xs={9}>
                          {activeStep>=2?(<Button variant="contained" color="primary" onClick={handleBack}>完成</Button>):(<Button variant="contained" color="primary" onClick={handleNext}>下一步</Button>)}
                            &nbsp;&nbsp;
                            <Button variant="contained" onClick={handleBack}>取消</Button>
                          </Grid>
                        </Grid>
                      </div>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>*
            </div>
          </div>
        )}
      </main>
      <ProfileDialog parent={props} info={untieData} onEvent={untie_click} />
    </section>
  );
};
export default Setpage;
*/
}
