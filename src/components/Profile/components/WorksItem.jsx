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
import { get_date, get_time } from "../../../assets/js/totls";
import { get_data } from "../../../assets/js/request";
import CustomModal from "../../../assets/js/CustomModal";
import { navigate } from "@reach/router";
import userStyles from "./profileStyle";
import EditDialog from "./EditDialog";
import { ModalDialog } from "./Modal";
import del from "../../../assets/img/del.png";
// import bianmiao from "../../../../assets/img/bianmiao.png";
// import fenxiang from "../../../../assets/img/fenxiang.png";
// import yixi from "../../../../assets/img/yixi.png";
// import restbian from "../../../../assets/img/restbian.png";
// import download from "../../../../assets/img/download.png";
import { ShareDialog, VideoMenu } from "./shareDialog";

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
  // const input_class = input_use();
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
  const [isShare, setIsShare] = React.useState(false); //分享
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
        {(props.history == 2 ||props.history==3) &&(
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
          height: "calc(100% - "+props._h+"px)",
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
            <Typography
              className="textview-overflow two p"
              style={{ fontSize: 14 }}
            >
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
              <Grade className="fn-color-F86B6B p" />
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
              className='p'
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
              {props.info.view_counts}观看●
              {get_date(props.info.upload_time, "/", 8)} &nbsp;发布
            </p>
            <div>
              <VideoMenu
                parent={props.parent}
                info={props.info}
                _type='series_detail'
                _id = {props._id}
                onEvent={(msg) => {}}
              />
            </div>
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
            if ((msg.role = "history")) {
              //删除历史记录
              get_data({
                model_name: "video_history",
                model_action: "delete_history",
                extra_data: {
                  video_id: [props.info.video_id],
                },
              }).then((res) => {
                if (res.err == 0 && res.errmsg == "OK") {
                  new CustomModal().alert("删除历史成功", "srccess", 5000);
                  props.parent.update_data();
                  
                }
              });
            }

            if (msg.role == "video") {
              //删除
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
