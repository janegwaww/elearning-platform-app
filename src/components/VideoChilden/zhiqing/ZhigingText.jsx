import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import ProgressBar from "../../../assets/template/ProgressBar";
import {
  Button,
  TextField,
  Snackbar,
  InputAdornment,
  Grid,
  Select,
  FormControl,
  Link,
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import { ContactSupport, Add, Cancel, HighlightOff } from "@material-ui/icons";
import { Nav } from "../../Profile/components/ProfileNav";
import { get_data, updata_img } from "../../../assets/js/request";
import CustomModal from "../../../assets/js/CustomModal";
import { navigate } from "@reach/router";
import CuttingTemplate from "../../../assets/template/CuttingTemplate";
import { getUser, isLoggedIn } from "../../../services/auth";
import MainLayout from "../../Profile/layout/index";
import Zmage from "react-zmage";
import LoginModal from "../../../assets/template/LoginModal";
import PdfTemplate from "../../../assets/templatepdf/template.pdf";

const singsArr = require("../components/field.json");

export default function VideoIndex(props) {
  const [userinfo, setUserinfo] = React.useState(null);
  const [filedata, setFiledata] = React.useState(null);
  const [isLogin, setIsLogin] = React.useState(false);
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
  const [adjunct, setAdjunct] = React.useState(null); //附件
  const [invitation, setInvitation] = React.useState(""); //邀请人id
  const [signs, setSigns] = useState(singsArr); //标签
  const [videosign, setVideosign] = React.useState(""); //视频标签
  const [fieldArr, setFieldArr] = React.useState([]);
  const [field, setField] = React.useState("");
  const [currencies, setCurrencies] = useState([]); //系列
  const [authorArr, setAuthorArr] = useState([
    { name: "登录帐号", author_description: "", key: new Date().getTime() },
  ]);
  const [authorvalueArr, setAuthorvalueArr] = useState([]);
  const [price, setPrice] = useState("0.00");
  const [statement, setStatement] = useState(false);
  const snackbarClose = () => {
    //关闭提示
    setOpenSnackbar({ open: false });
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      alert("请先登录");
      navigate(`/users/login`);
      return;
      // setIsLogin(true)
    } else {
      setUserinfo(getUser());
    }

    setLoginStatus(true);
    get_data({
      model_name: "document",
      model_action: "get_series",
      extra_data: {},
      model_type: "",
    }).then((res) => {
      setLoginStatus(false);
      let _currencies_data = res.result_data;
      setCurrencies(_currencies_data);
    });
  }, []);
  return (
    <MainLayout>
      <LoginModal
        open={isLogin}
        onEvent={(msg) => {
          setIsLogin(false);
        }}
      >
        <section
          style={{ maxWidth: 1280, margin: " auto " }}
          className="up-text"
        >
          <ProgressBar loading={loginStatus} />

          <main
            className={` bg-f9 view-overflow `}
            style={{ padding: "0 40px" }}
          >
            <Container className={`bg-white all-width main `}>
              <nav>
                <Nav _inx={0} list={["上传文本文件/工程文件"]} props={this} />
              </nav>
              <main>
                <form id="updata_text" className="root">
                  <Grid container spacing={4} className="item">
                    <Grid
                      item
                      xs={4}
                      sm={3}
                      md={2}
                      className="text-right not-padding"
                    >
                      <label>
                        <span className="fn-color-F86B6B">*</span>上传文件：
                      </label>
                    </Grid>
                    <Grid item xs={8} sm={9} md={10}>
                      <div
                        className="box box-align-center box-between"
                        style={{ width: "80%" }}
                      >
                        {adjunct ? (
                          <p className="text-overflow">
                            {adjunct.file_name}&nbsp;&nbsp;&nbsp;&nbsp;
                            <span
                              className="del"
                              title="删除课件"
                              onClick={(event) => {
                                get_data({
                                  model_name: "document",
                                  model_action: "delete",
                                  extra_data: {
                                    file_id: adjunct.file_id,
                                  },
                                  model_type: "",
                                }).then((res) => {
                                  if (res.err == 0 && res.errmsg == "OK") {
                                    setVideoImg("");
                                    setSeriesImg("");
                                    new CustomModal().alert(
                                      "删除成功",
                                      "success",
                                      2000
                                    );
                                  }
                                });
                                setAdjunct(null);
                              }}
                            >
                              <HighlightOff />
                            </span>
                          </p>
                        ) : (
                          <div className="text-doc">
                            <label
                              htmlFor="text-doc"
                              className="fn-color-007CFF "
                            >
                              <Add />
                              点击上传文件/文档(建议文件是pdf文档)
                            </label>

                            <input
                              type="file"
                              id="text-doc"
                              style={{ width: 0, height: 0, display: "none" }}
                              onChange={(event) => {
                                let _file = event.target.files[0];
                                let _data = new FormData();

                                // if (_file.size > 15 * 1024 * 1024) {
                                //   alert("文档文件不能大于15M哦!");
                                //   return;
                                // }
                                _data.append("model_name", "file");
                                _data.append("model_action", "upload_document");
                                _data.append("type", "document");
                                _data.append("file", _file);
                                get_data(_data).then((res) => {
                                  if (res.err == 0) {
                                    setVideoImg(res.result_data.image_path);
                                    setSeriesImg(res.result_data.image_path);
                                    setAdjunct(res.result_data);
                                    new CustomModal().alert(
                                      "上传成功！",
                                      "success",
                                      2000
                                    );
                                  } else if (res.err == 4003) {
                                    setOpenSnackbar({
                                      open: true,
                                      type: "error",
                                      msg: res.errmsg,
                                    });
                                  } else if (res.err == 4007) {
                                    setVideoImg(res.result_data.image_path);
                                    setSeriesImg(res.result_data.image_path);
                                    setAdjunct(res.result_data);
                                    setOpenSnackbar({
                                      open: true,
                                      type: "error",
                                      msg: res.errmsg,
                                    });
                                  } else if (res.err == 4006) {
                                    setOpenSnackbar({
                                      open: true,
                                      type: "error",
                                      msg: res.errmsg,
                                    });
                                  } else if (res.err == 4008) {
                                    setOpenSnackbar({
                                      open: true,
                                      type: "error",
                                      msg: res.errmsg,
                                    });
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
                        )}
                        <div className="download-text">
                          {/*download={PdfTemplate}*/}
                          <a href={PdfTemplate} target="_blank">
                            查看示例
                          </a>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <div>
                    {authorArr.map((opt, inx) => (
                      <div key={opt.key}>
                        <Grid container spacing={4} className="item">
                          <Grid
                            item
                            xs={4}
                            sm={3}
                            md={2}
                            className="text-right"
                          >
                            <label>
                              <span className="fn-color-F86B6B">*</span> 作者：
                            </label>
                          </Grid>
                          <Grid item xs={8} sm={9} md={10}>
                            <TextField
                              required
                              disabled={adjunct ? false : true}
                              variant="outlined"
                              data-inx={inx}
                              onChange={(event) => {
                                let _data =
                                  event.target.parentNode.parentNode.dataset;
                                setAuthorvalueArr((old) => {
                                  let _value = old[_data.inx] || {};
                                  _value.name = event.target.value;
                                  old[_data.inx] = _value;
                                  return old;
                                });
                              }}
                            />
                            &nbsp;&nbsp;
                            {inx > 0 && (
                              <span
                                className="del"
                                data-inx={inx}
                                title="要删除此作者么？"
                                onClick={(event) => {
                                  let _data = event.target.dataset;
                                  if (JSON.stringify(_data) == "{}") {
                                    _data = event.target.parentNode.dataset;
                                  }
                                  setAuthorArr((old) => {
                                    let _new = JSON.parse(JSON.stringify(old));
                                    _new.splice(_data.inx, 1);
                                    return _new;
                                  });
                                }}
                              >
                                <HighlightOff />
                              </span>
                            )}
                          </Grid>
                        </Grid>
                        <Grid container spacing={4} className="item ">
                          <Grid
                            item
                            xs={4}
                            sm={3}
                            md={2}
                            className="text-right"
                          >
                            <label>作者简介：</label>
                          </Grid>
                          <Grid item xs={8} sm={9} md={10}>
                            <TextField
                              disabled={adjunct ? false : true}
                              data-inx={inx}
                              rows={3}
                              variant="outlined"
                              multiline
                              fullWidth
                              onChange={(event) => {
                                let _data =
                                  event.target.parentNode.parentNode.dataset;
                                setAuthorvalueArr((old) => {
                                  let _value = old[_data.inx] || {};
                                  _value.introduction = event.target.value;
                                  old[_data.inx] = _value;
                                  return old;
                                });
                              }}
                            />
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                    <Grid container spacing={4}>
                      <Grid item xs={4} sm={3} md={2}></Grid>
                      <Grid item xs={8} sm={9} md={10}>
                        <div className="text-doc">
                          <span
                            className="fn-color-007CFF"
                            onClick={() => {
                              if (!adjunct) {
                                new CustomModal().alert(
                                  "请先添加文件后再添加作者",
                                  "error",
                                  2000
                                );
                                return;
                              }
                              setAuthorArr((old) => {
                                let _old = JSON.parse(JSON.stringify(old));
                                _old.push({
                                  name: "登录帐号",
                                  author_description: "",
                                  key: new Date().getTime(),
                                });
                                return _old;
                              });
                            }}
                          >
                            <Add />
                            点击添加作者
                          </span>
                        </div>
                      </Grid>
                    </Grid>
                  </div>

                  <Grid container spacing={4} className="item">
                    <Grid item xs={4} sm={3} md={2} className="text-right">
                      <label>
                        <span className="fn-color-F86B6B">*</span> 标题：
                      </label>
                    </Grid>
                    <Grid item xs={8} sm={9} md={10}>
                      <TextField
                        disabled={adjunct ? false : true}
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
                          一个引人注目的标题可以帮助您吸引观看者。在确定文件标
                          <br />
                          题时，最好加入观众在查找类似文件时可能会使用的关键
                          <br />
                          字。
                        </span>
                      </span>
                    </Grid>
                  </Grid>
                  <Grid container spacing={4} className="item ">
                    <Grid item xs={4} sm={3} md={2} className="text-right">
                      <label>
                        <span className="fn-color-F86B6B">*</span>{" "}
                        文件内容描述：
                      </label>
                    </Grid>
                    <Grid item xs={8} sm={9} md={10}>
                      <TextField
                        disabled={adjunct ? false : true}
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
                          松地找到您的文件。您可以在说明中大致介绍文件的内容，
                          <br />
                          并将关键字放在说明的开头部
                        </span>
                      </span>
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
                            disabled={adjunct ? false : true}
                            native
                            value={videosign}
                            onChange={(ev) => {
                              let _value = ev.target.value;
                              if (_value != videosign) {
                                setVideosign(_value);
                                setField("");
                              }

                              if (!_value) {
                                setField("");
                                setFieldArr([]);
                                return;
                              }
                              let _new_data = signs.filter(
                                (va) => va.id == _value
                              );
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
                    <Grid
                      item
                      xs={4}
                      sm={3}
                      md={2}
                      className="text-right not-padding"
                    >
                      <label>文件封面：</label>
                    </Grid>
                    <Grid item xs={8} sm={9} md={10}>
                      <section className="all-width">
                        <p>
                          选择或上传一张可展示您文件内容的图片。好的缩略图能脱颖而出，吸引观看者的眼球。
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
                                  src={videoImg}
                                  alt=""
                                  className="all-height"
                                  style={{ width: "auto" }}
                                />
                              )}
                            </div>
                          ) : (
                            ""
                          )}
                          <div>
                            <CuttingTemplate
                              id="zhiqingfile"
                              isClick={!adjunct ? true : false}
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

                  <Grid container spacing={4} className=" item">
                    <Grid item xs={4} sm={3} md={2} className="text-right">
                      <label>邀请ID：</label>
                    </Grid>
                    <Grid item xs={8} sm={9} md={10}>
                      <TextField
                        disabled={adjunct ? false : true}
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
                  <div className="item"></div>
                  <Grid container spacing={4} className="item">
                    <Grid
                      item
                      xs={4}
                      sm={3}
                      md={2}
                      className="text-right"
                    ></Grid>
                    <Grid item xs={8} sm={9} md={10} className='fn-color-9E9EA6'>
                      
                      <input
                        type="checkbox"
                        className="notcss"
                        checked={statement ? true : false}
                        onChange={(ev) => {
                          setStatement(ev.target.checked);
                          console.log(ev.target.checked);
                        }}
                      />
                      已阅读并同意
                      <span className="fn-color-007CFF">
                        <Link
                          href="/protocol/statement"
                          color="inherit"
                          underline="always"
                          target='_brank'
                        >
                          免责声明
                        </Link>
                      </span>
                    </Grid>
                  </Grid>
                  <div className="item"></div>
                  <div className=" box box-center">
                    <Button
                      className="btn"
                      color="primary"
                      disabled={
                        !adjunct ||
                        addseries ||
                        !videoTitle ||
                        !videodescription ||
                        (!field && !videosign)
                          ? true
                          : false
                      }
                      onClick={() => {
                        if (!adjunct) {
                          setOpenSnackbar({
                            open: true,
                            type: "error",
                            msg: "课件不能为空！",
                          });
                          return;
                        }

                        if (authorvalueArr.length > 0) {
                          let _is_true = authorvalueArr.every(
                            (opt) => opt.name
                          );
                          if (!_is_true) {
                            setOpenSnackbar({
                              open: true,
                              type: "error",
                              msg: "一个作者或多个作者不能为空！",
                            });
                            return;
                          }
                        } else {
                          setOpenSnackbar({
                            open: true,
                            type: "error",
                            msg: "作者不能为空！",
                          });
                          return;
                        }
                        if (!field && !videosign) {
                          setOpenSnackbar({
                            open: true,
                            type: "error",
                            msg: "请选择领域！",
                          });
                          return;
                        }
                        if(!statement){
                          setOpenSnackbar({
                            open: true,
                            type: "error",
                            msg: "亲！请您认真阅读免责声明，并打上勾哦",
                          });
                          return;
                        }

                        let _data = {
                          file_name: videoTitle || adjunct.file_name,
                          description: videodescription,
                          file_path: adjunct.file_path,
                          image_path: videoImg || adjunct.image_path,
                          price: parseFloat(price) || 0,
                          statement:statement,
                          category: [
                            videosign && !field ? videosign + "99" : field,
                          ],
                          author: authorvalueArr,
                          invite: invitation,
                        };

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

                        if (adjunct) {
                          _data.document = adjunct;
                        }
                        setLoginStatus(true);

                        get_data({
                          model_name: "document",
                          model_action: "check",
                          extra_data: _data,
                        }).then((res) => {
                          setLoginStatus(false);
                          if (res.err == 0 && res.errmsg == "OK") {
                            setOpenSnackbar({
                              open: true,
                              type: "success",
                              msg: "上传成功,正在为你跳转个人中心作品管理页...",
                            });

                            setTimeout(() => {
                              navigate(`/users/profile/workscenter/draft`);
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
                      className={`btn btn1`}
                      type="reset"
                      onClick={() => {
                        setVideoTitle("");
                        setVideodescription("");
                        setVideosign("");
                        setField("");
                        setFieldArr([]);
                        setVideoImg("");
                        setCurrency("");
                        setNewseries("");
                        setSeriesdescription("");
                        setSeriesImg("");
                        setPrice("");
                        setAdjunct(null);
                        setAuthorvalueArr([]);
                        setInvitation("");
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
      </LoginModal>
    </MainLayout>
  );
}
