import React from "react";
import {
  MoreHorizOutlined,
  Details,
  FavoriteBorder,
  ChatBubbleOutlineOutlined,
  Delete,
  Share,
  AddCircle,
  Description,
} from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Menu,
  MenuItem,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Link from "@material-ui/core/Link";

import { get_date } from "../../../../assets/js/totls";
import { get_data } from "../../../../assets/js/request";
import { ModalDialog } from "./Modal";

import CustomModal from "../../../../assets/js/CustomModal";
import { navigate } from "@reach/router";
import EditDialog from "./EditDialog";
import userStyles from "./profileStyle";
import del from '../../../../assets/img/del.png';
import bianmiao from '../../../../assets/img/bianmiao.png';
import fenxiang from '../../../../assets/img/fenxiang.png';
import yixi from '../../../../assets/img/yixi.png';
import restbian from '../../../../assets/img/restbian.png';
import download from '../../../../assets/img/download.png';
// 系列横向item

const stop_run = (prevValue, nextValue) => {
  // return prevValue.series===nextValue.series
};
const NewTextField = withStyles((theme) => ({
  root: {
    borderRadius: 4,
    "& .MuiOutlinedInput-notchedOutline": {
      top: -3,
    },
  },
}))(TextField);

const SeriesItem = (props) => {
  // inx,onEvent,info,parent,series
  // 编辑描述
  const [newimgurl, setNewimgurl] = React.useState("");
  const [newTitle, setNewTitle] = React.useState("");
  const [newdescription, setNewdescription] = React.useState("");
  //移至系列
  const [seriesArr, setSeriesArr] = React.useState([]);
  const [seriesvalue, setSeriesvalue] = React.useState("");

  const classes = userStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [modalMsg, setModalMsg] = React.useState({
    open: false,
    type: 1,
    msg: "",
    title: "",
  });
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
      className="box box-between box-align-center profile-top"
      onClick={(event) => {
        if (props.series == "series") {
          event.stopPropagation();
          event.preventDefault();
          if (props.onEvent) {
            props.onEvent(props.info.series_id);
          } else {
            props.parent.props.parent.pageRoute(event, {
              page: "CreateCenter",
              id: 3,
              defaultpage: "作品管理",
              inx: 3,
              series_id: props.info.series_id,
            });
          }
        }
      }}
    >
      <div
        className="box  fn-size-12"
        style={{
          marginRight: 20,
          width: "calc(100% - 50px)",
          maxWidth: "calc(100% - 50px)",
        }}
      >
        <div
          style={{
            minWidth: 260,
            width: 260,
            height: 160,
            marginRight: 20,
            position: "relative",
          }}
        >
          <Link
            color="inherit"
            underline="none"
            href={
              props.series == "video"
                ? `/watch/?vid=${props.info.video_id}`
                : undefined
            }
            target={props.series == "video" ? "_blank" : "_self"}
          >
            <img
              src={props.info ? props.info.image_path : ""}
              className="all-height all-width"
            />

            <p className="profile-time fn-color-white fn-size-12">
              {props.series == "video" || props.series == "draft"
                ? props.info.video_time
                : props.info && props.info.video_data
                ? "共" + props.info.video_data.length + "集"
                : ""}
            </p>
          </Link>
        </div>

        <div
          style={{ width: "calc(100% - 280px)", flexDirection: "column" }}
          className="box box-between"
        >
          <div>
            <Link
              color="inherit"
              underline="none"
              href={
                props.series == "video"
                  ? `/watch/?vid=${props.info.video_id}`
                  : undefined
              }
              target={props.series == "video" ? "_blank" : "_self"}
            >
              <Tooltip
                title={props.info.title || props.info.series_title}
                classes={{ tooltip: classes.noMaxWidth }}
                placement="top-start"
              >
                <Typography className="text-overflow">
                  {props.info.document_counts > 0 && (
                    <span
                      style={{
                        backgroundColor: "#7B7FFF",
                        display: "inline-block",
                        marginRight: 10,
                        borderRadius: 10,
                        padding: "3px 8px",
                      }}
                      className="fn-color-white fn-size-12"
                    >
                      <Description
                        style={{
                          width: 16,
                          height: 16,
                          transform: "translateY(-1px)",
                          verticalAlign: "middle",
                        }}
                      />
                      含课件
                    </span>
                  )}

                  {props.info.title || props.info.series_title}
                </Typography>
              </Tooltip>

              <p className="fn-color-878791 all-width ">
                {props.info
                  ? "发布于  " +
                    get_date(
                      props.info.update_time || props.info.upload_time,
                      ".",
                      9
                    )
                  : ""}
              </p>
              <div className="all-width textview-overflow two">
                {props.info ? props.info.description : ""}
              </div>
            </Link>
          </div>
          <div className="alll-width">
            <div className="alll-width">
              {props.info && props.info.state == -1 && (
                <div>
                  <p className="fn-color-878791 ">未通过</p>
                </div>
              )}

              {props.info && props.info.state == 1 && (
                <div>
                  <p className="fn-color-007CFF">审核中</p>
                </div>
              )}
              {props.info && props.info.state >= 2 && (
                <div>
                  <p className="fn-color-878791">已通过</p>
                </div>
              )}
            </div>

            {props.series != "draft" && (
              <div className="fn-color-565663 profile-point all-width">
                <span>
                  <Details />
                  &nbsp;&nbsp;
                  {props.info ? props.info.view_counts : 0}
                </span>
                <span>
                  <FavoriteBorder />
                  &nbsp;&nbsp;
                  {(props.info && props.info.like_counts) || 0}
                </span>
                {/*<span>
                <ChatBubbleOutlineOutlined />
                &nbsp;&nbsp;
                {(props.info && props.info.comment_counts) || 0}
              </span>*/}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {props.series == "video" && (
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
                  title="编辑描述"
                  info={props.info}
                  icon_img={bianmiao}
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
                          description: newdescription || props.info.description,
                        },
                      };
                      get_data( _data).then((res) => {
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
                                  document.getElementById("file-img").click();
                                }}
                              />
                            </span>
                            <p className="fn-color-878791">建议尺寸为295x190</p>
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
                  get_data( {
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
                  title="移动至系列"
                  icon_img={yixi}
                  info={props.info}
                  onChange={() => {}}
                  onEvent={(res) => {
                    if (res.confirm) {
                      get_data( {
                        model_name: "video",
                        model_action: "movie_video",
                        extra_data: {
                          video_id: [props.info.video_id],
                          series_id: seriesvalue,
                        },
                      }).then((res) => {
                        if(res.err==0&&res.errmsg== "OK"){
                          new CustomModal().alert('移动成功','success',3000);
                          props.parent.update_data('video')
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
                <div className='text-center'><img src={restbian} /></div>
                  <div>重新编辑</div>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose} data-id="4">
              <div> <img src={download }/></div>
              <div>下载</div>
            </MenuItem>
            <MenuItem onClick={handleClose} data-id="5">
               <div><img src={fenxiang} /></div>   
              <div>分享</div>
            </MenuItem> 
              <MenuItem
                data-id="7"
                onClick={() => {
                  setModalMsg({
                    title: "温馨提示",
                    type: "del",
                    msg: "上传作品不容易, 确定真的要删除该作品?",
                    open: true,
                    role:'video'
                  });
                  handleClose();
                }}
              > 
              <div><img src={del}  /></div>
              
               <div> 删除作品</div>
              </MenuItem>
            </Menu>
          </div>
        )}
        {props.series == "series" && (
          <div className="text-right">
            <img src={fenxiang} style={{width:16,height:16}} />
          </div>
        )}
        {props.series == "draft" && (
          <div className="text-right">
            {props.info.state !== 1 && (
              <Link
                color="inherit"
                underline="none"
                href={`/video/?sid=${props.info.video_id}`}
                target="_blank"
                rel="noopener norefferer"
              >
                编辑
              </Link>
            )}
            <span>
              <img  src={del} style={{width:16,height:16}}
                onClick={() => {
                  if(props.info.state===1){
                    new CustomModal().alert('审核中的作品暂不支持删除','error',3000);
                    return
                  }

                  setModalMsg({
                    title: "温馨提示",
                    type: "del",
                    msg: "上传作品不容易, 确定真的要删除该作品?",
                    open: true,
                  });

                }}
              />
            </span>
          </div>
        )}
      </div>

      <ModalDialog
        info={modalMsg}
        parent={props}
        onEvent={(msg) => {
          if (msg.cancel) {
            setModalMsg({ open: false });
          }
          if (msg.confirm) {
            get_data( {
              model_name: "video",
              model_action: "delete_video",
              extra_data: {
                video_id: [props.info.video_id],
              },
            }).then((res) => {
              if (res.err === 0) {
                new CustomModal().alert("删除成功", "success", 5000);

                console.log(props.parent)
                setModalMsg({
                  open: false,
                });
              }
            });
          }
        }}
      ></ModalDialog>
    </div>
  );
};
export default React.memo(SeriesItem, stop_run);
