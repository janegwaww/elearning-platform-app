import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  Toolbar,
  IconButton,
  Avatar,
  TextField,
  Snackbar,
  InputAdornment,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  ContactSupport,
  Add,
  Cancel,
  HighlightOff,
  PhotoCameraOutlined,
} from "@material-ui/icons";
import "../../../assets/css/container.css";

import { NavTitle } from "../../Profile/components/ProfileNav";
import { get_data, get_alldata } from "../../../assets/js/request";

import { navigate } from "@reach/router";
import CuttingTemplate from "../../../assets/template/CuttingTemplate";
import loginimg from '../../../../static/logos/logo.svg';

const userStyles = makeStyles((them) => ({
  toolbar: {
    padding: 0,
  },
  btn: {
    color: "#fff",
    "border-radius": "16px",
    width: "140px",
    height: "32px",
    "line-height": 0,
    backgroundColor: "#007CFF",
    margin: "0 56px",
    "&:hover": {
      backgroundColor: "#007CFF",
    },
  },
  btn1: {
    backgroundColor: "#f2f2f5",
    color: "#878791",
    margin: 0,
    "&:hover": {
      backgroundColor: "#878791",
      color:'#fff'
    },
  },
  avatar: {
    width: 24,
    height: 24,
  },
  save: {
    width: 22,
    height: 22,
  },
  main: {
    padding: 40,
  },
  //   主体
  textDoc: {
    "& span:hover": {
      cursor: "pointer",
    },
  },
  snackbar: {
    top: "40%",
    transform: "translate(-50%,-50%)",
  },
  radiogroup: {
    flexDirection: "row",
  },
  root: {
    width: "100%",
    fontSize: "14px",
    "& span": {
      display: "inline-block",
    },
    "& button": {
      padding: 0,
    },
    "& b": {
      fontWeight: 400,
      display: "inline-block",
    },
    "& >div": {
      alignItems: "flex-start",
      "& .file": {
        width: "140px",
        height: "80px",
        position: "relative",
        border: "1px dashed #D5D5D5",
        overflow: "hidden",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "100%",
        display: "inline-block",
        "& input": {
          width: "100%",
          height: "100%",
        },
        // "& .delete": {
        //   position: "absolute",
        //   top: 0,
        //   right: 0,
        //   color: "green",
        //   "& :hover": {
        //     color: "#ccc",
        //   },
        // },
        // "& img": {
        //   width: "100%",
        //   height: "100%",
        //   display: "block",
        // },
        "& label": {
          display: "block",
          position: "absolute",
          left: 0,
          top: 0,
          backgroundColor: "white",
          color: "#999",
          paddingTop: 15,
          textAlign: "center ",
          margin: 0,
        },
      },
    },

    "& p": {
      margin: 0,
    },

    "& .sign": {
      backgroundColor: "#F2F2F5",
      padding: "12px",
      "& .item": {
        "& label:not(.not)": {
          marginRight: 22,
          width: 70,
        },
      },
      "& label": {
        // display: "inline-block",
        margin: "6px",
        minWidth: "auto",
        fontSize: "12px",
      },
    },
    "& label": {
      minWidth: "65px",
      transform: "translate(0, 1.5px) scale(1.1)",
    },
    "&  .item": {
      marginTop: 22,
      '& label':{
        marginRight:20,
      },
      "& .del": {
        color: "#878791",
        "&:hover": {
          color: "#F86B6B",
        },
      },

      "& span": {
        position: "relative",
        '&:hover span':{
          display:'block'
        },

        "& span": {
          display: "none",
          position: "absolute",
          right: "-10px",
          bottom: 0,
          width: "397px",
          boxShadow: "0px 0px 2px 0px rgba(118,131,144,1)",
          color: "#666",
          transform: "translateY(100%)",
          zIndex: 1000,
          padding: "16px",
          backgroundColor: "#fff",
        },
      },
    },
    "& svg": {
      verticalAlign: "middle",
    },
    "& .MuiFormControlLabel-root ": {
      minWidth: "auto",
      "& .MuiRadio-root": {
        padding: 0,
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "8px 6px",
      backgroundColor: "#fff",
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "1px",
    },
    "& .MuiInputAdornment-root": {
      fontSize: "20px",
      color: "#D5D5D5",
    },
  },
}));

export default function VideoIndex(props) {
  const classes = userStyles();
  const [userinfo, setUserinfo] = React.useState(null);
  const [filedata,setFiledata]= React.useState(null);
  const [openSnackbar, setOpenSnackbar] = React.useState({
    open: false,
    type: "success",
    msg: "上传成功!",
  });
  const [videoTitle, setVideoTitle] = React.useState(""); //视频标题
  const [videodescription, setVideodescription] = React.useState(""); //视频描述
  // const [videosign, setVideosign] = React.useState([]); //视频标签

  const [videoImg, setVideoImg] = React.useState(""); //视频图片路径
  const [currency, setCurrency] = React.useState(""); //视频系列

  const [addseries, setAddseries] = React.useState(false); //新建系列

  const [newseries, setNewseries] = React.useState(""); //新建系列标题
  const [seriesdescription, setSeriesdescription] = React.useState(""); //新系列描述
  const [seriesImg, setSeriesImg] = React.useState(null); //新系列图片路径
  const [adjunct, setAdjunct] = React.useState([]); //附件

  // const [signs, setSigns] = useState([]); //标签
  const [currencies, setCurrencies] = useState([]); //系列
  const snackbarClose = () => {
    //关闭提示
    setOpenSnackbar({ open: false });
  };
  useEffect(() => {
    if (localStorage.getItem("haetekUser")) {
      setUserinfo(JSON.parse(localStorage.getItem("haetekUser")));
    }
    let _data = JSON.parse(sessionStorage.getItem('file_data'));
    if(_data){
       setFiledata(_data);
        setVideoImg(_data.image_path||'');
        setVideoTitle(_data.title||'');
        setVideodescription(_data.description||'');
    }

    get_alldata("api/v1/gateway", [
      {
        model_name: "series",
        model_action: "get_series",
      },
      // {
      //   model_name: "category",
      //   model_action: "get_category",
      // },
    ]).then((res) => {
      let _currencies_data = res[0].result_data;
      console.log(_data)
      setCurrencies(_currencies_data);

      _currencies_data.forEach((o,inx)=>{
        if(o._id==_data.series_id){
          setCurrency(o.title)
          return;
        }
      })
      

      // if (
      //   (Array.isArray && Array.isArray(res[1].result_data[0])) ||
      //   Object.prototype.toString.call(res[1].result_data[0]) ==
      //     "[object Array]"
      // ) {
      //   setSigns(res[1].result_data[0]);
      // } else {
      //   setSigns(res[1].result_data);
      // }
    });
  }, []);
  return (
    <section style={{ height: "100vh" }} className="ma-container is-vertical">
      <header className="ma-heiader fn-size-16 fn-color-21">
        <section className={classes.toolbar}>
          <Toolbar
            className={`box-between box-align-center ${classes.toolbar}`}
          >
            <Toolbar>
              <IconButton
                onClick={() => {
                  navigate("/");
                }}
              >
                <img src={loginimg} alt='logo' />
              </IconButton>
              <Button
                className={classes.btn}
                onClick={() => {
                  navigate("/video");
                }}
              >
                我的制作中心
              </Button>
              <div>使用教程</div>
            </Toolbar>
            <Toolbar>
              <div>
                <Avatar
                  src={userinfo && userinfo.headshot ? userinfo.headshot : ""}
                  className={classes.avatar}
                  onClick={() => {
                    if (!userinfo) {
                      navigate("/users/login");
                      return;
                    }
                    sessionStorage.removeItem('now_page');
                    navigate("/users/profile");
                  }}
                />
              </div>
            </Toolbar>
          </Toolbar>
        </section>
      </header>
      <main className={`ma-main bg-f9 ${classes.main}`}>
        <Container
          className={`bg-white ${classes.main} `}
          style={{ height: "100%" }}
        >
          <nav>
            <NavTitle list={["上传视频"]} props={this} />
          </nav>
          <main>
            <form id="updata_info" className={classes.root}>
              <div className="item box">
                <label>
                  <span className="fn-color-F86B6B">*</span> 标题
                </label>
                <TextField
                  required
                  id="standard-required"
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
              </div>
              <div className="item box">
                <label>
                  <span className="fn-color-F86B6B">*</span> 描述
                </label>
                <TextField
                  required
                  id="standard-required"
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
              </div>

              {/*<div className="item box">
                <label>
                  <span className="fn-color-F86B6B">*</span>添加标签
                </label>
                <p className="sign all-width">
                  {signs.map((option, inx) => (
                    <label key={option.name}>
                      <input
                        type="checkbox"
                        name="videoSign"
                        value={option.id}
                        checked={
                          videosign.indexOf(option.id) > -1 ? "checked" : false
                        }
                        onChange={(event) => {
                          if (event.target.checked) {
                            if (videosign.length > 2) {
                              setOpenSnackbar({
                                open: true,
                                type: "error",
                                msg: "最多只能选择3个标签哦!",
                              });
                              return;
                            } else {
                              let v_arr = JSON.parse(JSON.stringify(videosign));
                              v_arr.push(event.target.value);
                              setVideosign(v_arr);
                            }
                          } else {
                            let v_arr = videosign.filter(
                              (value) => event.target.value != value
                            );
                            setVideosign(v_arr);
                          }
                        }}
                      />
                      <b>{option.name}</b>
                    </label>
                  ))}
                </p>
                <span className="fn-color-F86B6B">
                  <ContactSupport />
                  <span>
                    添加适当的标签，可以帮助观看者通过搜索更轻松地找到您的视频。
                  </span>
                </span>
              </div>
                      */}
              <div className="box item">
                <label>视频封面</label>
                <section className="all-width">
                  <p>
                    选择或上传一张可展示您视频内容的图片。好的缩略图能脱颖而出，吸引观看者的眼球。
                  </p>
                  <div className="item box">
                    {videoImg ? (
                      <div
                        className="file"
                        style={{
                          backgroundImage:
                            "url(" + videoImg + ")",
                          marginRight: 10,
                        }}
                      ></div>
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
              </div>

              <div className="box item">
                <label>系列视频</label>
                <section style={{ width: "100%" }}>
                  <p>
                    将您的视频添加到一个或多个播放列表中。播放列表有助于观看者更快地发现您的内容。
                  </p>
                  <section className="item">
                    {!addseries ? (
                      <section className="sign">
                        <Button
                          variant="contained"
                          style={{
                            margin: "0 0 12px 0",
                            backgroundColor: "#007CFF",
                            color: "white",
                            padding: "3px 12px",
                          }}
                          onClick={() => {
                            setAddseries(true);
                            setSeriesImg(videoImg);
                            return false;
                          }}
                        >
                          <Add />
                          新建系列
                        </Button>
                        <div className="line"></div>
                        <section >
                          {currencies.map((option,inx) => (
                            <p key={option.title} >
                              <input
                                type="radio"
                                name="gender1"
                                checked={option.title == currency}
                                value={option.title}
                                id={option._id+'_'+inx}
                                onClick={(ev)=>{
                                  
                                if(ev.target.checked){
                                  ev.target.checked=false;
                                  setCurrency('');
                                }
                                }}
                                onChange={(event) => {
                                
                                  setCurrency(event.target.value);
                                }}
                              />
                             
                              <label htmlFor={option._id+'_'+inx} > {option.title}</label>
                            </p>
                          ))}
                        </section>
                      </section>
                    ) : (
                      <section className="all-width sign">
                        <div className="box all-width item">
                          <label>
                            <span className="fn-color-F86B6B">*</span>系列标题
                          </label>
                          <div className="all-width">
                            <TextField
                              fullWidth
                              type="text"
                              variant="outlined"
                              value={newseries}
                              onChange={(e) => {
                                setNewseries(e.target.value);
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Cancel
                                      onClick={() => {
                                        setNewseries("");
                                      }}
                                    />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </div>
                        <div className="box all-width item">
                          <label>系列描述</label>
                          <div className="all-width">
                            <TextField
                              rows={2}
                              variant="outlined"
                              multiline
                              fullWidth
                              value={seriesdescription}
                              onChange={(event) => {
                                setSeriesdescription(event.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="box item">
                          <label>系列封面</label>
                          <div>
                            <p>
                              将您的视频添加到一个或多个播放列表中。播放列表有助于观看者更快地发现您的内容。
                            </p>
                            <div className='box item'>
                              {seriesImg ? (
                                <div
                                  className="file"
                                  style={{
                                    backgroundImage:
                                      "url(" +
                                      seriesImg +
                                      ")",
                                    marginRight: 10,
                                  }}
                                ></div>
                              ) : (
                                ""
                              )}
                             
                                <CuttingTemplate
                                  id="seriesfile"
                                  onEvent={(url) => {
                                    setSeriesImg(url);
                                  }}
                                />
                              
                            </div>
                          </div>
                        </div>

                        <div className="box box-end">
                          <Button
                            variant="contained"
                            onClick={() => {
                              setAddseries(false);
                              setSeriesImg('')
                              return false;
                            }}
                            className={ `${classes.btn} ${classes.btn1}`}
                          >
                            取消
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                          className={ `${classes.btn} `}
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              let _data = currencies;

                              if (!newseries) {
                                setOpenSnackbar({
                                  open: true,
                                  type: "error",
                                  msg: "新建系列失败，新建的标题不能为空!",
                                });
                                return;
                              }

                              if (
                                _data.some(
                                  (option) => newseries == option.title
                                )
                              ) {
                                setOpenSnackbar({
                                  open: true,
                                  type: "error",
                                  msg: "新建系列失败，您所新建的系列已存在!",
                                });
                                return;
                              }
                              // if (!seriesdescription) {
                              //   setOpenSnackbar({
                              //     open: true,
                              //     type: "error",
                              //     msg:
                              //       "亲，新建了系列，系列描述不要忘记填写哦!",
                              //   });
                              //   return;
                              // }
                              if(_data.length===0||!_data[_data.length-1].type){

                                _data.push({
                                  title: newseries,
                                  label: newseries,
                                  type: "new",
                                });

                              }else{
                                _data[_data.length - 1] = {
                                  title: newseries,
                                  label: newseries,
                                  type: "new",
                                };
                              }

                              setCurrencies(_data);
                              setAddseries(false);
                              setCurrency(newseries);
                              return false;
                            }}
                          >
                            确认
                          </Button>
                        </div>
                      </section>
                    )}
                  </section>
                </section>
              </div>
              <div className="box item">
                <label>上传附件：</label>
                <div>
                  {/*<p style={{ marginBottom: 20 }}>
                    视频相对应的的课件（以.pdf结尾的文件）
                          </p>*/}

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
                                    event.target.parentNode.parentNode.dataset;
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

                  <div className={classes.textDoc}>
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
                        console.log(_file)
                        if(_file.size>15*1024*1024){
                          alert('文档文件不能大于15M哦!');
                          return
                        }
                        
                        _data.append("model_name", "file");
                        _data.append("model_action", "upload_document");
                        _data.append("type", "document");
                        _data.append("file", _file);
                        get_data( _data).then((res) => {
                          if (res.err == 0 && res.errmsg == "OK") {
                            let _adjunct = JSON.parse(JSON.stringify(adjunct));
                            _adjunct.push(res.result_data);

                            setAdjunct(_adjunct);
                          } else {
                            setOpenSnackbar({
                              open: true,
                              type: "error",
                              msg: "上传失败!请检查文件是否为合法文档类文件哦",
                            });
                          }
                        });
                        return false;
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className= " box box-center">
                <Button
                  className={`${classes.btn} ${classes.btn1}`}
                  onClick={() => {
                    window.history.back();
                    return false;
                  }}
                >
                  返回
                </Button>
                <Button
                  className={classes.btn}
                  color="primary"
                  disabled={addseries||!videoTitle||!videodescription ?true:false}
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
                    // if (JSON.stringify(videosign) == "[]") {
                    //   setOpenSnackbar({
                    //     open: true,
                    //     type: "error",
                    //     msg: "请选择4个以下的标签！",
                    //   });
                    //   return;
                    // }

                    let _data = {
                      task_id: JSON.parse(sessionStorage.getItem("file_data"))
                        .video_id,
                      title: videoTitle,
                      description: videodescription,
                      // category: videosign,
                    };
                    if (videoImg) {
                      _data.image_path = videoImg;
                    }
                    if (currency) {
                      let isNew = currencies.some((option) => {
                        if (option.title == currency) {
                          return option.type == "new";
                        }
                      });
                      if (isNew) {
                        if (seriesdescription) {
                          _data.series_description = seriesdescription;
                        }
                        if (seriesImg) {
                          _data.series_image_path = seriesImg;
                        }
                      }
                      _data.series_title = currency;
                    }

                    if (JSON.stringify(adjunct) != "[]") {
                      _data.document = adjunct;
                    }
                    
                    get_data( {
                      model_name: "video",
                      model_action: "check",
                      extra_data: _data,
                    }).then((res) => {
                      if (res.err == 0 && res.errmsg == "OK") {
                        setOpenSnackbar({
                          open: true,
                          type: "success",
                          msg: "上传成功,正在为你跳转个人中心作品管理页...",
                        });
                        sessionStorage.setItem('now_page',JSON.stringify({
                          parent: "CreateCenter",
                          parent_id: 3,
                          childPage: "作品管理",
                          childpage_id: 0,
                        }))
                        sessionStorage.removeItem('file_data');
                        setTimeout(() => {
                          navigate("/users/profile");
                        }, 4000);
                      }else{
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
                  className={`${classes.btn} ${classes.btn1}`}
                  onClick={() => {
                    setVideoTitle("");
                    setVideodescription("");
                    // setVideosign([]);
                    // setVideoImg("");
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
