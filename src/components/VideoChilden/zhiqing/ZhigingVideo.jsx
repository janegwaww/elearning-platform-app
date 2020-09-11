import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";

import ProgressBar from "../../../assets/template/ProgressBar";
import {
  Button,
  Toolbar,
  IconButton,
  Avatar,
  TextField,
  Snackbar,
  InputAdornment,
  Grid,
  Select,
  FormControl,
  Link
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import {
  ContactSupport,
  Add,
  Cancel,
  HighlightOff,
  ExpandMore,
  ExpandLess,
} from "@material-ui/icons";

import Zmage from "react-zmage";
import { Nav } from "../../Profile/components/ProfileNav";
import { get_data } from "../../../assets/js/request";

import { navigate } from "@reach/router";
import CuttingTemplate from "../../../assets/template/CuttingTemplate";
import loginimg from "../../../assets/img/logo.svg";
import { getUser, isLoggedIn } from "../../../services/auth";

const singsArr = require("../components/field.json");
export default function VideoIndex(props) {
  const [seeMore, setSeeMore] = useState(5);
  const [userinfo, setUserinfo] = React.useState(null);
  const [filedata, setFiledata] = React.useState(null);
  const [openSnackbar, setOpenSnackbar] = React.useState({
    open: false,
    type: "success",
    msg: "上传成功!",
  });
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [videoTitle, setVideoTitle] = React.useState(""); //视频标题
  const [videodescription, setVideodescription] = React.useState(""); //视频描述
  const [videoImg, setVideoImg] = React.useState(""); //视频图片路径
  const [currency, setCurrency] = React.useState(""); //视频系列
  const [addseries, setAddseries] = React.useState(false); //新建系列
  const [newseries, setNewseries] = React.useState(""); //新建系列标题
  const [seriesdescription, setSeriesdescription] = React.useState(""); //新系列描述
  const [seriesImg, setSeriesImg] = React.useState(null); //新系列图片路径
  const [adjunct, setAdjunct] = React.useState([]); //附件
  const [currencies, setCurrencies] = useState([]); //系列

  const [invitation, setInvitation] = React.useState(""); //邀请人id
  const [signs, setSigns] = useState(singsArr); //标签
  const [videosign, setVideosign] = React.useState(""); //视频标签
  const [fieldArr, setFieldArr] = React.useState([]);
  const [field, setField] = React.useState("");

  const snackbarClose = () => {
    //关闭提示
    setOpenSnackbar({ open: false });
  };

  useEffect(() => {
    let _data = JSON.parse(sessionStorage.getItem("file_data"));
    if (!isLoggedIn()) {
      alert("请先登录");
      navigate(`/users/login`);
      return;
    } else {
      setUserinfo(getUser());
    }
    if (!_data) {
      alert("请先添加视频文件才能发布哦，正在跳转添加视频页...");
      navigate(`/video`);
      return;
    } else {
      setFiledata(_data);
      setVideoImg(_data.image_path || "");
      setVideoTitle(_data.title || "");
      setVideodescription(_data.description || "");
    }
    setLoginStatus(true);
    get_data(
      {
        model_name: "series",
        model_action: "get_series",
        extra_data: {
          user_id: _data.user_id,
        },
      },
      "video"
    ).then((res) => {
      setLoginStatus(false);
      let _currencies_data = res.result_data;
      setCurrencies(_currencies_data);
      _currencies_data.forEach((o, inx) => {
        if (o._id == _data.series_id) {
          setCurrency(o.title);
          return;
        }
      });
    });
  }, []);
  return (
    <section
      style={{ height: "100vh" }}
      className={`ma-container is-vertical up-text`}
    >
      <ProgressBar loading={loginStatus} />

      <header className="ma-heiader fn-size-16 fn-color-21">
        <Container className="toolbar">
          <div className={`box box-between box-align-center  toolbar`}>
            <div className="box box-align-center" style={{ height: 64 }}>
              <img
                src={loginimg}
                alt="logo"
                className="login"
                onClick={() => {
                  navigate("/");
                }}
              />

              <Button
                className={`fn-r-16 btn`}
                onClick={() => {
                  navigate("/video");
                }}
              >
                我的制作中心
              </Button>
              <div>
                <Button disabled>使用教程</Button>
              </div>
            </div>
            <div>
              <Avatar
                src={userinfo && userinfo.headshot ? userinfo.headshot : ""}
                className="avatar"
                onClick={() => {
                  if (!userinfo) {
                    navigate("/users/login");
                    return;
                  }
                  sessionStorage.removeItem("now_page");
                  navigate("/users/profile");
                }}
              />
            </div>
          </div>
        </Container>
      </header>
      <main className={`ma-main bg-f9 main`}>
        <Container className={`bg-white all-heght main`}>
          <nav>
            <Nav _inx={0} list={["上传视频"]} props={this} />
          </nav>
          <main>
            <form id="updata_info" className="root">
              <Grid container spacing={4} className="item">
                <Grid item xs={4} sm={3} md={2} className="text-right">
                  <label>
                    <span className="fn-color-F86B6B">*</span> 标题
                  </label>
                </Grid>
                <Grid item xs={8} sm={9} md={10}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={videoTitle}
                    onChange={(event) => {
                      setVideoTitle(event.target.value);
                    }}
                  />
                  <span className="fn-color-F86B6B">
                    <ContactSupport />
                    <span>
                      一个引人注目的标题可以帮助您吸引观看者。在确定视频标
                      <br />
                      题时，最好加入观众在查找类似视频时可能会使用的关键
                      <br />
                      字。
                    </span>
                  </span>
                </Grid>
              </Grid>
              <Grid container spacing={4} className="item">
                <Grid item xs={4} sm={3} md={2} className="text-right">
                  <label>
                    <span className="fn-color-F86B6B">*</span> 描述
                  </label>
                </Grid>
                <Grid item xs={8} sm={9} md={10}>
                  <TextField
                    required
                    rows={3}
                    variant="outlined"
                    multiline
                    fullWidth
                    value={videodescription}
                    onChange={(event) => {
                      setVideodescription(event.target.value);
                    }}
                  />
                  <span className="fn-color-F86B6B">
                    <ContactSupport />
                    <span>
                      在说明中加入适当的关键字，可以帮助观看者通过搜索更轻
                      <br />
                      松地找到您的视频。您可以在说明中大致介绍视频的内容，
                      <br />
                      并将关键字放在说明的开头部
                    </span>
                  </span>
                </Grid>
              </Grid>

              <Grid container spacing={4} className="item">
                <Grid item xs={4} sm={3} md={2} className="text-right not-padding">
                  <label>视频封面</label>
                </Grid>
                <Grid item xs={8} sm={9} md={10}>
                  <section className="all-width">
                    <p>
                      选择或上传一张可展示您视频内容的图片。好的缩略图能脱颖而出，吸引观看者的眼球。
                    </p>
                    <div className="item box">
                      {videoImg ? (
                        <div
                          className="file bg-all text-center"
                          style={{
                            marginRight: 10,
                          }}
                        >
                          {videoImg && (
                            <Zmage
                              className="all-height"
                              style={{ width: "auto" }}
                              src={videoImg}
                            />
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                      <div>
                        <CuttingTemplate
                          id="coverfile"
                          formdata={(() => {
                            let _formData = new FormData();
                            _formData.append("model_action", "upload_file");
                            _formData.append("type", "video_image");
                            return _formData;
                          })()}
                          onEvent={(url) => {
                            setVideoImg(url);
                          }}
                        />
                      </div>
                    </div>
                  </section>
                </Grid>
              </Grid>

              <Grid container spacing={4} className="item">
                <Grid item xs={4} sm={3} md={2} className="text-right">
                  <label>
                    <span className="fn-color-F86B6B">*</span>领域：
                  </label>
                </Grid>
                <Grid item xs={8} sm={9} md={10}>
                  <div>
                    <FormControl variant="outlined">
                      <Select
                        native
                        value={videosign}
                        onChange={(ev) => {
                          let _value = ev.target.value;
                          if(videosign!=_value){
                            setVideosign(_value);
                            setField('');
                          }
                          
                          if (!_value) {
                            setField("");
                            setFieldArr([]);
                            return;
                          }
                          let _new_data = signs.filter((va) => va.id == _value);
                          let _project = _new_data[0].project;
                          setFieldArr(_project);
                          // if (_project.length == 1) {
                          //   setField(_project[0].id);
                          // }
                        }}
                      >
                        <option aria-label="None" value="">
                          --请选择--
                        </option>
                        {signs.map((va) => (
                          <option key={va.id} value={va.id}>
                            {va.title}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {videosign && (
                      <FormControl variant="outlined">
                        <Select
                          native
                          value={field}
                          onChange={(ev) => {
                            let _value = ev.target.value;
                            setField(_value);
                          }}
                        >
                          <option aria-label="None" value="">
                            --请选择--
                          </option>
                          {fieldArr.map((va) => (
                            <option key={va.id} value={va.id}>
                              {va.title}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={4} className=" item">
                <Grid item xs={4} sm={3} md={2} className="text-right">
                  <label>邀请ID：</label>
                </Grid>
                <Grid item xs={8} sm={9} md={10}>
                  <TextField
                    type="number"
                    placeholder="邀请人ID"
                    variant="outlined"
                    value={invitation}
                    onChange={(ev) => {
                      setInvitation(ev.target.value);
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={4} className=" item">
                <Grid item xs={4} sm={3} md={2} className="text-right not-padding">
                  <label>上传附件：</label>
                </Grid>
                <Grid item xs={8} sm={9} md={10}>
                  <div>
                   

                    {adjunct && adjunct.length > 0
                      ? adjunct.map((option, inx) => (
                          <p key={option.file_name}>
                            {option.file_name}{" "}
                            <span
                              className="del"
                              data-inx={inx}
                              onClick={(event) => {
                                let _data = event.target.dataset;
                                if (JSON.stringify(_data) == "{}") {
                                  _data = event.target.parentNode.dataset;
                                  if (JSON.stringify(_data) == "{}") {
                                    _data =
                                      event.target.parentNode.parentNode
                                        .dataset;
                                  }
                                }
                                let _old_adjunct = JSON.parse(
                                  JSON.stringify(adjunct)
                                );
                                _old_adjunct.splice(_data.inx, 1);
                                setAdjunct(_old_adjunct);
                              }}
                            >
                              <HighlightOff />
                            </span>
                          </p>
                        ))
                      : ""}

                    <div className="text-doc">
                      <span
                        className="fn-color-007CFF"
                        onClick={() => {
                          document.getElementById("text-doc").click();
                        }}
                      >
                        <Add />
                        点击上传课件(文档文件不能大于15M哦)
                      </span>
                      <input
                        type="file"
                        id="text-doc"
                        style={{ width: 0, height: 0 }}
                        onChange={(event) => {
                          let _file = event.target.files[0];
                          let _data = new FormData();

                          if (_file.size > 15 * 1024 * 1024) {
                            alert("文档文件不能大于15M哦!");
                            return;
                          }

                          _data.append("model_name", "file");
                          _data.append("model_action", "upload_document");
                          _data.append("type", "document");
                          _data.append("file", _file);
                          get_data(_data).then((res) => {
                            if (res.err === 0 ) {
                              let _adjunct = JSON.parse(
                                JSON.stringify(adjunct)
                              );
                              _adjunct.push(res.result_data);

                              setAdjunct(_adjunct);
                            } else {
                              setOpenSnackbar({
                                open: true,
                                type: "error",
                                msg:
                                  "上传失败!请检查文件是否为合法文档类文件哦",
                              });
                            }
                          });
                          return false;
                        }}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
              <div className="item" style={{ height: 1 }}></div>
              <Grid container spacing={4} className='item'>
                        <Grid item xs={12} className='text-center fn-color-007CFF'>
                          <input type='checkbox' className='notcss' />
                          <Link href='/protocol/statement' color="inherit">
                          免责声明</Link>
                        </Grid>
                  </Grid>
              <div className="item"></div>
              <div className=" box box-center">
                <Button
                  className="btn btn1"
                  onClick={() => {
                    window.history.back();
                    return false;
                  }}
                >
                  返回
                </Button>
                <Button
                  className="btn"
                  color="primary"
                  disabled={
                    addseries || !videoTitle || !videodescription||(!field&&!videosign) ? true : false
                  }
                  onClick={() => {
                    if (!videoTitle) {
                      setOpenSnackbar({
                        open: true,
                        type: "error",
                        msg: "视频标题不能为空！",
                      });
                      return;
                    }
                    if (!videodescription) {
                      setOpenSnackbar({
                        open: true,
                        type: "error",
                        msg: "视频描述不能为空！",
                      });
                      return;
                    }
                    if(!field&&!videosign){
                        setOpenSnackbar({
                            open: true,
                            type: "error",
                            msg: "请选择领域！",
                          });
                          return;
                    }
                    let _data = {
                      task_id: JSON.parse(sessionStorage.getItem("file_data"))
                        .video_id,
                      title: videoTitle,
                      description: videodescription,
                      category: [!field&&videosign?videosign+'99':field],
                      invite: invitation,
                    };
                    if (videoImg) {
                      _data.image_path = videoImg;
                    }
                    // if (currency) {
                    //   let isNew = currencies.some((option) => {
                    //     if (option.title == currency) {
                    //       return option.type == "new";
                    //     }
                    //   });
                    //   if (isNew) {
                    //     if (seriesdescription) {
                    //       _data.series_description = seriesdescription;
                    //     }
                    //     if (seriesImg) {
                    //       _data.series_image_path = seriesImg;
                    //     }
                    //   }
                    //   _data.series_title = currency;
                    // }

                    if (JSON.stringify(adjunct) != "[]") {
                      _data.document = adjunct;
                    }

                    get_data(
                      {
                        model_name: "video",
                        model_action: "check",
                        extra_data: _data,
                      },
                      "video"
                    ).then((res) => {
                      if (res.err == 0 && res.errmsg == "OK") {
                        setOpenSnackbar({
                          open: true,
                          type: "success",
                          msg: "上传成功,正在为你跳转个人中心作品管理页...",
                        });

                        sessionStorage.removeItem("file_data");
                        setTimeout(() => {
                          navigate("/users/profile/workscenter/draft");
                        }, 4000);
                      } else {
                        setOpenSnackbar({
                          open: true,
                          type: "error",
                          msg: res.errmsg,
                        });
                      }
                    });

                    return false;
                  }}
                >
                  提交
                </Button>
                <Button
                  className="btn btn1"
                  onClick={() => {
                    setVideoTitle("");
                    setVideodescription("");
                    // setVideosign([]);
                    // setVideoImg("");
                    setField(''),
                    setCurrency("");
                    setNewseries("");
                    setSeriesdescription("");
                    setSeriesImg("");
                    setAdjunct([]);
                    return false;
                  }}
                >
                  重置
                </Button>
              </div>
            </form>
          </main>
        </Container>
      </main>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openSnackbar.open}
        autoHideDuration={3000}
        onClose={snackbarClose}
      >
        <Alert onClose={snackbarClose} severity={openSnackbar.type}>
          {openSnackbar.msg}
        </Alert>
      </Snackbar>
    </section>
  );
}
