import React from "react";
import {
  Grade,
  MoreHorizOutlined,
  DeleteOutline,
  AddCircle,
} from "@material-ui/icons";

import {
  IconButton,
  Menu,
  MenuItem,
  Link,
  Tooltip,
  Typography,
  Grid,
} from "@material-ui/core";
import { get_date, get_time } from "../../../../assets/js/totls";
import { get_data } from "../../../../assets/js/request";
import CustomModal from "../../../../assets/js/CustomModal";
import { navigate } from "@reach/router";
import userStyles from "./profileStyle";
import EditDialog from "./EditDialog";
import { ModalDialog } from "./Modal";
import del from "../../../../assets/img/del.png";
import bianmiao from "../../../../assets/img/bianmiao.png";
import fenxiang from "../../../../assets/img/fenxiang.png";
import yixi from "../../../../assets/img/yixi.png";
import restbian from "../../../../assets/img/restbian.png";
import download from "../../../../assets/img/download.png";

const stop_run = (prevValue, nextValue) => {
  //  if(prevValue.history!=nextValue.history){
  //    return false
  //  }
  //  if(prevValue._h!=nextValue._h){
  //   return false
  // }
  // return true
};
const WorksItem = (props) => {
  const classes = userStyles();

  const [newimgurl, setNewimgurl] = React.useState("");
  const [newTitle, setNewTitle] = React.useState("");
  const [newdescription, setNewdescription] = React.useState("");
  //移至系列
  const [seriesArr, setSeriesArr] = React.useState([]);
  const [seriesvalue, setSeriesvalue] = React.useState("");
  //inx,onEvent,info,parent,history
  //history 1收藏 2历史，3系列详情
  const [modalMsg, setModalMsg] = React.useState({
    open: false,
    type: 1,
    msg: "",
    title: "",
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    setAnchorEl(evt.currentTarget);
  };

  const handleClose = (evt) => {
    // evt.stopPropagation();
    // evt.preventDefault();
    setAnchorEl(null);
  };

  return (
    <div
      className="zero-edges all-width view-overflow all-height"
      onClick={(evt) => {
        if (props.info.type == "series") {
          event.stopPropagation();
          event.preventDefault();
          props.parent.props.parent.pageRoute(event, {
            page: "CreateCenter",
            id: 3,
            defaultpage: "作品管理",
            inx: 3,
            series_id: props.info.series_id,
          });
        }
      }}
    >
      <div
        className="all-width view-overflow bg-not"
        style={{
          height: props._h || 136,
          backgroundImage: props.info && "url(" + props.info.image_path + ")",
        }}
      >
        <Link
          className="all-width all-height"
          color="inherit"
          underline="none"
          href={`/watch/?vid=${props.info.video_id}`}
          target="_blank"
        >
          <span></span>
        </Link>
        {props.history == 2 && (
          <p className="fn-color-white fn-size-12 profile-time">
            {props.info.video_time}
          </p>
        )}
        {props.history == 1 && props.info.type == "video" && (
          <p className="fn-color-white fn-size-12 profile-time">
            {props.info.video_time}
          </p>
        )}
        {props.history == 1 && props.info.type == "series" && (
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 10,
              display: "inline-block",
              padding: "2px 5px",
              borderRadius: "0px 0px 4px 4px",
            }}
            className="bg-007CFF fn-color-white fn-size-12"
          >
            系列
          </span>
        )}
      </div>
      <div
        style={{
          padding: 16,
          height: "calc(100% - 136px)",
          flexDirection: "column",
        }}
        className="box box-between"
      >
        <Tooltip
          title={(props.info && props.info.title) || props.info.video_title}
          placement="top-start"
        >
          <Link
            className="all-width all-hieght"
            color="inherit"
            underline="none"
            href={`/watch/?vid=${props.info.video_id}`}
            target="_blank"
          >
            <Typography className="textview-overflow two">
              {(props.info && props.info.title) || props.info.video_title}
            </Typography>
          </Link>
        </Tooltip>

        {props.history == 1 && (
          <div
            className="box box-align-center box-between "
            style={{ paddingTop: 10 }}
          >
            <p className="text-overflow zero-edges fn-color-878791 fn-size-12">
              {/**
          {props.info&&props.info.view_counts||0}&nbsp;观看●{props.info&&props.info.comment_counts||0}回应●{props.info&&props.info.like_counts||0}点赞
         */}
              收藏于
              {get_date(props.info.collection_time, "/", 8)}
            </p>
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                get_data({
                  model_name: "collection",
                  model_action: "add_collection",
                  extra_data: {
                    relation_id: [props.info.video_id || props.info.series_id],
                    value: 0,
                    type: props.info.type,
                  },
                }).then((res) => {
                  if (res.err == 0 && res.errmsg == "OK") {
                    new CustomModal().alert("取消收藏成功", "success", 3000);
                    if (props.parent.state.userCollection) {
                      get_data({
                        model_name: "collection",
                        model_action: "get_collection",
                      }).then((res) => {
                        //个人中心页
                        props.parent.setState({
                          userCollection: res.result_data,
                        });
                      });
                    } else {
                      //动态页
                      props.parent.update_data({
                        model_name: "collection",
                        model_action: "get_collection",
                      });
                    }
                  }
                });
              }}
            >
              <Grade className="fn-color-F86B6B" />
            </div>
          </div>
        )}
        {props.history == 2 && (
          <div
            className="box box-align-center box-between fn-color-878791"
            style={{ paddingTop: 10 }}
          >
            <p className="text-overflow zero-edges fn-size-12">
              {props.info.record.action == "search" && (
                <Link
                  color="inherit"
                  underline="none"
                  href={`/watch/?vid=${props.info.video_id}&&time=${get_time(
                    props.info.record.end_time || props.info.record.matched_time
                  )}`}
                  target="_blank"
                >
                  搜索<span className="fn-color-007CFF">'设计'</span>知识点
                </Link>
              )}
              {props.info.record.action == "end_watch" && (
                <Link
                  color="inherit"
                  underline="none"
                  href={`/watch/?vid=${props.info.video_id}&&time=${get_time(
                    props.info.record.end_time
                  )}`}
                  target="_blank"
                >
                  观看至{props.info.record.end_time}
                </Link>
              )}
            </p>
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                setModalMsg({
                  title: "温馨提示",
                  type: "del",
                  role: "history",
                  msg: "历史被被删除,将不可恢恢复,确定删除?",
                  open: true,
                });
              }}
            >
              <img src={del} style={{ width: 16, height: 16 }} />
            </div>
          </div>
        )}
        {props.history == 3 && (
          <div
            className="box box-align-center box-between "
            style={{ paddingTop: 10 }}
          >
            <p className="text-overflow zero-edges fn-color-878791 fn-size-12">
              102观看●05月29日 发布
            </p>
            <div>
              <div className="text-right">
                <IconButton
                  aria-label="more"
                  aria-controls="series-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreHorizOutlined />
                </IconButton>

                <Menu
                  open={open}
                  anchorEl={anchorEl}
                  keepMounted
                  id="series-menu"
                  onClose={handleClose}
                  className={classes.menulist}
                >
                  <MenuItem onClick={handleClose} data-id="1">
                    <EditDialog
                      icon_img={bianmiao}
                      title="编辑描述"
                      info={props.info}
                      onChange={(res) => {
                        if (res.url) {
                          setNewimgurl(res.url);
                        }
                      }}
                      onEvent={(res) => {
                        if (!newimgurl && !newTitle && !newdescription) {
                          return;
                        }
                        if (res.cancel) {
                          return;
                        }
                        if (res.confirm) {
                          let _data = {
                            model_name: "video",
                            model_action: "change_information",
                            extra_data: {
                              video_id: props.info.video_id,
                              image_path: newimgurl || props.info.image_path,
                              title: newTitle || props.info.title,
                              description:
                                newdescription || props.info.description,
                            },
                          };
                          get_data(_data).then((res) => {
                            console.log(res);
                          });
                        }
                      }}
                    >
                      <div>
                        <div className="box">
                          <div>
                            <div
                              style={{
                                width: 295,
                                height: 190,
                                marginRight: 20,
                                borderRadius: 12,
                                backgroundImage:
                                  "url(" +
                                  (newimgurl || props.info.image_path) +
                                  ")",
                                position: "relative",
                              }}
                              className="view-overflow bg-not text-center"
                            >
                              <div
                                style={{
                                  backgroundColor: "rgba(0,0,0,0.7)",
                                  flexDirection: "column",
                                }}
                                className="all-width all-height box box-center "
                              >
                                <span
                                  style={{
                                    width: 35,
                                    height: 35,
                                    backgroundColor: "#fff",
                                    display: "inline-block",
                                    borderRadius: "50%",
                                  }}
                                >
                                  <AddCircle
                                    style={{
                                      width: 35,
                                      height: 35,
                                      transform: "scale(1.2)",
                                    }}
                                    className="fn-color-007CFF"
                                    onClick={() => {
                                      document
                                        .getElementById("file-img")
                                        .click();
                                    }}
                                  />
                                </span>
                                <p className="fn-color-878791">
                                  建议尺寸为295x190
                                </p>
                              </div>
                            </div>
                            <p className="text-center">添加作品封面</p>
                          </div>
                          <div>
                            <div
                              style={{
                                width: 295,
                                height: 190,
                                borderRadius: 12,
                                backgroundImage:
                                  "url(" +
                                  (newimgurl || props.info.image_path) +
                                  ")",
                              }}
                              className="view-overflow text-center bg-not"
                            ></div>
                            <p className="text-center">作品封面预览</p>
                          </div>
                        </div>
                        <Grid container spacing={1}>
                          <Grid item xs={2}>
                            视频名称
                          </Grid>
                          <Grid item xs={9}>
                            <input
                              type="text"
                              className={`all-width ${classes.textfield}`}
                              placeholder={props.info.title}
                              onChange={(ev) => {
                                setNewTitle(ev.target.value);
                              }}
                            />
                          </Grid>
                          <Grid item xs={1}></Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item xs={2}>
                            视频描述
                          </Grid>
                          <Grid item xs={9}>
                            <textarea
                              className={`all-width ${classes.textfield}`}
                              rows={5}
                              defaultValue={
                                props.info.description || "填写新的描述"
                              }
                              onChange={(ev) => {
                                setNewdescription(ev.target.value);
                              }}
                            ></textarea>
                          </Grid>
                          <Grid item xs={1}></Grid>
                        </Grid>
                      </div>
                    </EditDialog>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      get_data({
                        model_name: "series",
                        model_action: "get_series",
                        extra_data: {},
                      }).then((res) => {
                        if (res.err == 0) {
                          setSeriesArr(res.result_data);
                        }
                      });
                      handleClose();
                    }}
                    data-id="2"
                  >
                    <EditDialog
                      icon_img={yixi}
                      title="移动至系列"
                      info={props.info}
                      onChange={() => {}}
                      onEvent={(res) => {
                        if (res.confirm) {
                          get_data({
                            model_name: "video",
                            model_action: "movie_video",
                            extra_data: {
                              video_id: [props.info.video_id],
                              series_id: seriesvalue,
                            },
                          }).then((res) => {
                            if (res.err == 0 && res.errmsg == "OK") {
                              new CustomModal().alert(
                                "移动成功",
                                "success",
                                3000
                              );
                              props.parent.update_data("video");
                            }
                          });
                        }
                        if (res.cancel) {
                          setSeriesvalue("");
                        }
                      }}
                    >
                      <div style={{ padding: "0 10px" }}>
                        {seriesArr &&
                          seriesArr.map((option, inx) => (
                            <div
                              key={option._id}
                              className={`box box-between ${
                                seriesvalue == option._id ? "bg-F2F2F5" : ""
                              }`}
                              style={{ padding: "10px 20px" }}
                            >
                              <div>
                                <input
                                  type="radio"
                                  value={option._id}
                                  id={"series_" + option._id}
                                  onClick={(ev) => {
                                    ev.stopPropagation();
                                  }}
                                  onChange={(ev) => {
                                    setSeriesvalue(ev.target.value);
                                  }}
                                />
                                <label
                                  htmlFor={"series_" + option._id}
                                  onClick={(ev) => {
                                    ev.stopPropagation();
                                  }}
                                >
                                  {option.title}
                                </label>
                              </div>
                              <div>共{option.video_counts}集</div>
                            </div>
                          ))}
                      </div>
                    </EditDialog>
                  </MenuItem>

                  <MenuItem onClick={handleClose} data-id="6">
                    <Link
                      color="inherit"
                      underline="none"
                      href={`/video/?sid=${props.info.video_id}`}
                      target="_blank"
                      rel="noopener norefferer"
                    >
                      <div className="text-center">
                        <img src={restbian} />
                      </div>
                      <div>重新编辑</div>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} data-id="4">
                    <div>
                      <img src={download} />
                    </div>
                    <div>下载</div>
                  </MenuItem>
                  <MenuItem onClick={handleClose} data-id="5">
                    <div>
                      <img src={fenxiang} />
                    </div>
                    <div> 分享</div>
                  </MenuItem>
                  <MenuItem
                    data-id="7"
                    onClick={() => {
                      setModalMsg({
                        title: "温馨提示",
                        type: "del",
                        role: "video",
                        msg: "上传作品不容易, 确定真的要删除该作品?",
                        open: true,
                      });
                      handleClose();
                    }}
                  >
                    <div>
                      <img src={del} />
                    </div>
                    <div>删除</div>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        )}
      </div>
      <ModalDialog
        info={modalMsg}
        parent={props}
        onEvent={(msg) => {
          console.log(msg);
          if (msg.cancel) {
            setModalMsg({ open: false });
          }
          if (msg.confirm) {
            if (msg.role = "history") {//删除历史记录
              get_data({
                model_name: "video_history",
                model_action: "delete_history",
                extra_data: {
                  video_id: [props.info.video_id],
                },
              }).then((res) => {
               
                if (res.err == 0 && res.errmsg == "OK") {
                  new CustomModal().alert('删除历史成功','srccess',5000);
                  if (props.parent.state.userCollection) {
                    get_data({
                      model_name: "video_history",
                      model_action: "get_history",
                      extra_data: {},
                    }).then((data) => {
                      console.log(props);
                      props.parent.setState({
                        userCollection: data.result_data,
                      });
                    });
                  } else {
                    props.parent.update_data({
                      model_name: "video_history",
                      model_action: "get_history",
                      extra_data: {},
                    });
                  }
                }
              });
            }

            if (msg.role == "video") {//删除
              get_data({
                model_name: "video",
                model_action: "delete_video",
                extra_data: {
                  video_id: [props.info.video_id],
                },
              }).then((res) => {
                if (res.err === 0) {
                  new CustomModal().alert("删除成功", "success", 5000);
                  setModalMsg({
                    open: false,
                  });
                }
              });
            }
          }
        }}
      ></ModalDialog>
    </div>
  );
};
export default React.memo(WorksItem, stop_run);
