import React from "react";

import { Button, Grid } from "@material-ui/core";
import {
  CameraAltOutlined,
  AddCircleOutlined,
  BrokenImageOutlined,
} from "@material-ui/icons";

import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import PublicDialog from "../../../../assets/template/PublicDialog";
import { getObj } from "../../../../assets/js/totls";
import { get_data, get_info } from "../../../../assets/js/request";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import CustomModal from "../../../../assets/js/CustomModal";
import { navigate } from "@reach/router";


const Basic = (props) => {
  // const classes = useStyles();
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
    get_info().then((res) => {
      let _data = res;
      setUserInfo(_data);
      setSex(_data.gender);
      setBirth(_data.birthday);
      setUsername(_data.user_name);
      setUserdescribe(_data.introduction);
    });
  }, []);

  return (
    <main className="profile-top fn-size-14 all-width settings">
      <div className="root">
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
              className={`text-center bg-not fn-color-white box box-center view-overflow usersimg`}
              onClick={() => {
                setUphead(true);
              }}
            >
              <div className={`all-width all-height mask`}></div>
              <div className="masknext">
                <CameraAltOutlined />
              </div>
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
                    viewMode={1}
                    zoomable={false}
                    aspectRatio={1}
                    src={headerUrl} // 文件
                    style={{ height: 370, width: 370 }} // 自定义样式
                    guides={false} // 是否显示九宫格
                    preview=".header-preview" // 设置预览的dom
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
                    className="bg-f3 bg-not header-preview view-overflow"
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
              className="bg-f3 box box-center text-center fn-color-white bg-not view-overflow "
              style={{
                // width: 640,
                minHeight: 140,
                position: "relative",
                backgroundImage: newcoverurl
                  ? "url(" + newcoverurl + ")"
                  : "url(" + userInfo.background + ")",
                borderRadius: 12,
              }}
              onClick={() => {
                setUpcover(true);
              }}
            >
              <div className={`all-width all-height mask`}></div>
              <div className="masknext">
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
              className={`input `}
              value={username}
              variant="outlined"
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
              className="radio-root"
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
              variant="outlined"
              className="input"
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
              variant="outlined"
              multiline
              fullWidth
              placeholder={(userInfo && userInfo.introduction) || "个人描述"}
              rows={5}
              value={userdescribe}
              onChange={(ev) => {
                setUserdescribe(ev.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} className="text-center">
            <Button
              className="btn"
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
                  if (res.err == 0) {
                    let _head = JSON.parse(localStorage.getItem("haetekUser"));
                    _head.headshot = res.result_data[0].headshot;
                    _head.name = res.result_data[0].name;
                    localStorage.setItem("haetekUser", JSON.stringify(_head));
                    new CustomModal().alert(res.errmsg + "!", "success", 3000);
                    setTimeout(() => {
                      navigate(`/users?url=/users/profile/settings`);
                    }, 3000);
                  } else {
                    new CustomModal().alert("修改失败!", "error", 3000);
                  }
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
