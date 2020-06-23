import React from "react";
import { ProNavbar, Navbar } from "./components/ProfileNav";
import { Button, Grid } from "@material-ui/core";
import {
  ExpandMore,
  CameraAltOutlined,
  AddCircleOutlined,
  BrokenImageOutlined,
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
import ProfileDialog from "./components/ProFileDialog";
import PublicDialog from "../../../assets/template/PublicDialog";
import { getObj } from "../../../assets/js/totls";
import { get_data } from "../../../assets/js/request";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import CustomModal from '../../../assets/js/CustomModal';

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
    value: "12345678921",
    button_v: "修改手机号",
    type: "iphone",
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

function getStepContent(step) {
 
  switch (step) {
    case 0:
      return (
        <Grid container spacing={3}>
          <Grid item xs={3}>
            原手机号
          </Grid>
          <Grid item xs={9}>
            <TextField  className= 'edit-phone' />
          </Grid>
          <Grid item xs={3}>
            验证码
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField  className= 'edit-phone'  />
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
      );
    case 1:
      return (
        <Grid container spacing={3}>
          <Grid item xs={3}>
            原手机号
          </Grid>
          <Grid item xs={9}>
            <TextField   className= 'edit-phone'/>
          </Grid>
          <Grid item xs={3}>
            验证码
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField  className= 'edit-phone' />
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
      );
    case 2:
      return <div>成功</div>;
    default:
      return "Unknown step";
  }
}

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
  const [userInfo,setUserInfo] = React.useState({});//保存用户信息
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
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setNavBarList(["基本设置", "安全中心", "帮助/反馈"]);
    setNavbarStatus(2);
    let _data = JSON.parse(JSON.stringify(props.parent.state.nowPage));
    _data.chilepage_id = 1;
    props.parent.setState({
      nowPage: _data,
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  React.useEffect (() => {
    if(sessionStorage.getItem('user_info')){
      setUserInfo(JSON.parse(sessionStorage.getItem('user_info')));
     
    }
   
  }, [])

  return (
    <section className="all-height view-scroll bg-white profile-padding ">
      {navbarStatus < 4 ? (
        <nav>
          <ProNavbar list={navBarList} parent={props} onEvent={onEvent} />
        </nav>
      ) : (
        <span></span>
      )}
      <main className="profile-top fn-size-14">
        {navbarStatus == 1 ? (
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={2} className="text-right">
                头像:
              </Grid>
              <Grid item xs={10}>
                <div
                  style={{ backgroundImage:newheaderurl? "url(" + newheaderurl + ")":'url('+userInfo.headshot+')' }}
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

                    get_data("api/v1/gateway", _formdata).then((res) => {
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
                    backgroundImage:newcoverurl? "url(" + newcoverurl + ")":'url('+userInfo.background+')',
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

                      get_data("api/v1/gateway", _formdata).then((res) => {
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
                  placeholder={userInfo&&userInfo.user_name}
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
                {userInfo&&userInfo.user_id}
              </Grid>

              <Grid item xs={2} className="text-right">
                性别:
              </Grid>
              <Grid item xs={10}>
        
                <RadioGroup
                  className={classes.radioRoot}
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
                  defaultValue='1965-20-23'
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
                  placeholder={userInfo&&userInfo.introduction||'个人描述'}
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
                        background: newcoverurl||userInfo.background,
                        headshot: newheaderurl||userInfo.headshot,
                        user_name: username||userInfo.user_name,
                        gender: sex||userInfo.gender,
                        birthday: birth||userInfo.birthday,
                        introduction: userdescribe||userInfo.introduction,
                      },
                      model_type: "",
                    };

                    get_data("api/v1/gateway", _data).then((res) => {
                      console.log(props)
                      if(res.err==0){
                        
                        new CustomModal().alert(res.errmsg,'success','5000');
                       
                      }else{
                        new CustomModal().alert('修改失败','error','3000')
                      }
                      // get_data("api/v1/gateway", 
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
        ) : (
          <div></div>
        )}
        {navbarStatus == 2 ? (
          <div>
            {table_data.map((option, inx) => (
              <Grid
                container
                spacing={10}
                key={option.label}
                className="fn-color-2C2C3B fn-size-14"
              >
                <Grid item xs={2} className="fn-color-878791">
                  {option.label}:
                </Grid>
                <Grid item xs={7}>
                  {option.value}
                </Grid>
                <Grid item xs={3} className="text-right">
                  <Button
                    className={
                      option.isunite && inx > 0
                        ? `${classes.btn1} ${classes.btn2}`
                        : classes.btn1
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
        ) : (
          <div></div>
        )}
        {navbarStatus == 3 ? (
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
                <Grid item xs={2} className="text-right">
                  问题描述(选填)：
                </Grid>
                <Grid itme xs={8}>
                  <TextField
                    placeholder="Placeholder"
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
                <Grid item xs={2} className="text-right">
                  联系方式：
                </Grid>
                <Grid itme xs={8}>
                  <TextField
                    placeholder="Placeholder"
                    className={classes.input}
                  />
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
        ) : (
          <div></div>
        )}

        {navbarStatus == 4 ? (
          <div>
            <nav>
              <ProNavbar list={navBarList} parent={props} onEvent={onEvent} />
            </nav>

            <div>
              <Stepper orientation="vertical" activeStep={activeStep}>
                {["身份验证", "绑定手机", "绑定成功"].map((label, inx) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <div>
                        {getStepContent(inx)}
                        <Grid container spacing={3}>
                          <Grid item xs={3}></Grid>
                          <Grid item xs={9}>
                            <Button onClick={handleNext}>下一步</Button>{" "}
                            <Button onClick={handleBack}>取消</Button>
                          </Grid>
                        </Grid>
                      </div>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
        ) : (
          <span></span>
        )}
      </main>
      <ProfileDialog parent={props} info={untieData} onEvent={untie_click} />
    </section>
  );
};
export default Setpage;
