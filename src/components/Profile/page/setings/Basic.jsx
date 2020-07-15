import React from 'react';
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

const Basic = (props) => {
    const classes= useStyles();
    const [userInfo, setUserInfo] = React.useState({}); //保存用户信息
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
    <main className="profile-top fn-size-14 all-width">
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

                get_data(_formdata).then((res) => {
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
                      <p className="zero-edges profile-margin-10">添加图片</p>
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

                  get_data(_formdata).then((res) => {
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
          <Grid item xs={2} className="text-right box box-align-center box-end">
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
              <FormControlLabel value="保密" control={<Radio />} label="保密" />
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
              placeholder={(userInfo && userInfo.introduction) || "个人描述"}
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
    </main>
  );
};
export default Basic;
