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
import { withStyles, makeStyles } from "@material-ui/core/styles";
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
import del from "../../../../assets/img/del.png";
import bianmiao from "../../../../assets/img/bianmiao.png";
import fenxiang from "../../../../assets/img/fenxiang.png";
import yixi from "../../../../assets/img/yixi.png";
import restbian from "../../../../assets/img/restbian.png";
import download from "../../../../assets/img/download.png";

import { ShareDialog, SericesMenu, VideoMenu } from "./shareDialog";

// 系列横向item

const stop_run = (prevValue, nextValue) => {
  // return prevValue.series===nextValue.series
  return false;
};

const return_html = (info, type) => {
  const classes = userStyles();
  let _html = null;
  if (type == "video") {
    _html = (
      <div className='profile-item' >
        <Link
          color="inherit"
          underline="none"
          href={`/watch/?vid=${info.video_id}`}
          target="_blank"
        >
          <div className="box  fn-size-12">
            <div
             className="profile-item-img-box"
              
            >
              <img
                src={info && info.image_path}
                className="all-height all-width"
              />

              <p className="profile-time fn-color-white fn-size-12 p">
              {info.video_time}
              </p>
            </div>
            <div
              style={{ width: "calc(100% - 280px)", flexDirection: "column" }}
              className="box box-between"
            >
              <div>
                <Tooltip
                  title={info.title || info.series_title}
                  classes={{ tooltip: classes.noMaxWidth }}
                  placement="top-start"
                  
                >
                  <Typography
                    className="text-overflow p"
                    style={{ fontSize: 16 }}
                  >
                    {info.document_counts > 0 && (
                      <span
                        className="fn-color-white fn-size-12 profile-sign"
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

                    {info.title || info.series_title}
                  </Typography>
                </Tooltip>

                <p className="fn-color-878791 all-width p">
                  {info
                    ? "发布于  " +
                      get_date(info.update_time || info.upload_time, ".", 9)
                    : ""}
                </p>
                <div className="all-width textview-overflow two ">
                  {info ? info.description : ""}
                </div>
              </div>
              <div className="alll-width">
                <div className="alll-width">
                  {info && info.state == -1 && (
                    <div>
                      <p className="fn-color-878791 p">未通过</p>
                    </div>
                  )}

                  {info && info.state == 1 && (
                    <div>
                      <p className="fn-color-007CFF p">审核中</p>
                    </div>
                  )}
                  {info && info.state >= 2 && (
                    <div>
                      <p className="fn-color-878791 p">已通过</p>
                    </div>
                  )}
                </div>
                  <div className="fn-color-565663 profile-point all-width">
                    <span>
                      <Details />
                      &nbsp;&nbsp;
                      {info ? info.view_counts || 0 : 0}
                    </span>
                    <span>
                      <FavoriteBorder />
                      &nbsp;&nbsp;
                      {(info && info.like_counts) || 0}
                    </span>
                    {/*<span>
                <ChatBubbleOutlineOutlined />
                &nbsp;&nbsp;
                {(props.info && props.info.comment_counts) || 0}
              </span>*/}
                  </div>
               
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  } else {
    _html = (
      <div className={`profile-item box fn-size-12 ${type=='series'?'series':''}`}>
        <div
          className="profile-item-img-box" >
          <img src={info && info.image_path} className="all-height all-width" />

          <p className={`profile-time fn-color-white fn-size-12 ${type=='series'?'p':''}`}>
            {type=='draft'? info.video_time: info.video_data?"共" + info.video_data.length + "集":''}
          </p>
        </div>
        <div
          style={{ width: "calc(100% - 280px)", flexDirection: "column" }}
          className="box box-between"
        >
          <div>
            <Tooltip
              title={info.title || info.series_title}
              classes={{ tooltip: classes.noMaxWidth }}
              placement="top-start"
            >
              <Typography className={`text-overflow ${type=='series'?'p':''}`} style={{ fontSize: 16 }}>
                {info.document_counts > 0 && (
                  <span
                   
                    className="fn-color-white fn-size-12 profile-sign"
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

                {info.title || info.series_title}
              </Typography>
            </Tooltip>

            <p className={`fn-color-878791 all-width ${type=='series'?'p':''}`}>
              {info
                ? "发布于  " +
                  get_date(info.update_time || info.upload_time, ".", 9)
                : ""}
            </p>
            <p className={`all-width textview-overflow two ${type=='series'?'p':''}`}>
              {info ? info.description : ""}
            </p>
          </div>
          <div className="alll-width">
            <div className="alll-width">
              {info && info.state == -1 && (
                <div>
                  <p className="fn-color-878791 ">未通过</p>
                </div>
              )}

              {info && info.state == 1 && (
                <div>
                  <p className="fn-color-007CFF">审核中</p>
                </div>
              )}
              {info && info.state >= 2 && (
                <div>
                  <p className="fn-color-878791">已通过</p>
                </div>
              )}
            </div>

            {type != "draft" && (
              <div className="fn-color-565663 profile-point all-width">
                <span>
                  <Details />
                  &nbsp;&nbsp;
                  {info ? info.view_counts || 0 : 0}
                </span>
                <span>
                  <FavoriteBorder />
                  &nbsp;&nbsp;
                  {(info && info.like_counts) || 0}
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
    );
  }
  return _html;
};

const SeriesItem = (props) => {
  // inx,onEvent,info,parent,series
  // 编辑描述
  // const [newimgurl, setNewimgurl] = React.useState("");
  // const [newTitle, setNewTitle] = React.useState("");
  // const [newdescription, setNewdescription] = React.useState("");
  // //移至系列
  // const [seriesArr, setSeriesArr] = React.useState([]);
  // const [seriesvalue, setSeriesvalue] = React.useState("");

  const classes = userStyles();

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  const [modalMsg, setModalMsg] = React.useState({
    open: false,
    type: 1,
    msg: "",
    title: "",
  });
  const [isShare, setIsShare] = React.useState(false); //分享
  // const handleClick = (evt) => {
  //   evt.stopPropagation();
  //   evt.preventDefault();
  //   setAnchorEl(evt.currentTarget);
  // };

  // const handleClose = (evt) => {
  //   // evt.stopPropagation();
  //   // evt.preventDefault();
  //   setAnchorEl(null);
  // };

  return (
    <div
      className="box box-between box-align-center profile-top"
      onClick={(event) => {
        if (props.series != "video") {
          event.stopPropagation();
          // event.preventDefault();
          if (props.series == "series") {
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
          } else {
            return false;
          }
        }
      }}
    >
      {return_html(props.info, props.series)}
   

      <div>
        {props.series == "video" && (
          <VideoMenu parent={props.parent} info={props.info} _type={props.series} onEvent={(msg) => {}} />
        )}
        

        {(props.series == "series" || props.series=='series_detail') && (
          <SericesMenu
            parent={props.parent}
            info={props.info}
            _type={props.series}
            onEven={(msg) => {
              console.log(msg);
            }}
          />
        )}
        {props.series == "draft" && (
          <div className="text-center box box-between " style={{height:160,flexDirection:'column'}}>
            <div>
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
            )}</div>
            <div>
            <span>
              <img
                src={del}
                style={{ width: 16, height: 16,cursor:'pointer'}}
                onClick={() => {
                  if (props.info.state === 1) {
                    new CustomModal().alert(
                      "审核中的作品暂不支持删除",
                      "error",
                      3000
                    );
                    return;
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
            <div></div>
          </div>
        )}
      </div>

      <ShareDialog
        isShare={isShare}
        parent={props}
        info={props.info}
        onEvent={() => {
          setIsShare(false);
        }}
      />

      <ModalDialog
        info={modalMsg}
        parent={props}
        onEvent={(msg) => {
          if (msg.cancel) {
            setModalMsg({ open: false });
          }
          if (msg.confirm) {
            get_data({
              model_name: "video",
              model_action: "delete_video",
              extra_data: {
                video_id: [props.info.video_id],
              },
            }).then((res) => {
              if (res.err === 0) {
                new CustomModal().alert("删除成功", "success", 5000);
                props.parent.update_data('draft');
                console.log(props.parent);
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
