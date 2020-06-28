import React from "react";
import {
  MoreHorizOutlined,
  Details,
  FavoriteBorder,
  ChatBubbleOutlineOutlined,
  Delete,
  Share,
} from "@material-ui/icons";

import { IconButton, Menu, MenuItem } from "@material-ui/core";
import Link from "@material-ui/core/Link";
// import MenuItem from '@material-ui/core/MenuItem';
import { get_date } from "../../../../assets/js/totls";
import { get_data } from "../../../../assets/js/request";
import { ModalDialog } from "./Modal";
import CustomModal from "../../../../assets/js/CustomModal";
import { navigate } from "@reach/router";
// 系列横向item

const stop_run = (prevValue, nextValue) => {
  // return prevValue.series===nextValue.series
};

const SeriesItem = (props) => {
  // inx,onEvent,info,parent,series
  console.log(props);
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
    <div className="box box-between box-align-center profile-top">
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
          <img
            src={props.info ? props.info.image_path : ""}
            className="all-height all-width"
          />

          <p className="profile-time fn-color-white fn-size-12">
            {!props.series && props.info
              ? props.info.video_time
              : props.info && props.info.video_data
              ? "共" + props.info.video_data.length + "集"
              : ""}
          </p>
        </div>
        <div
          style={{ width: "calc(100% - 280px)", flexDirection: "column" }}
          className="box box-between"
        >
          <div>
            <div className="fn-color-2C2C3B fn-size-16 zero-edges all-wdith text-overflow">
              {props.info
                ? props.info.title || props.info.series_title
                : "标题"}
            </div>
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
            >
              <MenuItem onClick={handleClose}>编辑系列</MenuItem>
              <MenuItem onClick={handleClose}>移动系列</MenuItem>
              <MenuItem onClick={handleClose}>分享</MenuItem>
              <MenuItem  onClick={handleClose}>
                <Link color="inherit"
                underline="none"
                href={`/video/?sid=${props.info.video_id}`}
                target="_blank"
                rel="noopener norefferer"> 编辑字幕</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  color="inherit"
                  underline="none"
                  href={`/watch/?vid=${props.info.video_id}`}
                  target="_blank"
                >
                  详情
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setModalMsg({
                    title: "温馨提示",
                    type: "del",
                    msg: "确定要删除么，删除后无法恢复哦",
                    open: true,
                  });
                  handleClose();
                }}
              >
                删除
              </MenuItem>
            </Menu>
          </div>
        )}
        {props.series == "series" && (
          <div className="text-right">
            <Link
              color="inherit"
              underline="none"
              href={`/series/?sid=${props.info.series_id}`}
              target="_blank"
            >
              详情
            </Link>
            <span>
              <Share />
            </span>
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
              <Delete
                onClick={() => {
                  let _data = {
                    model_name: "video",
                    model_action: "delete_video",
                    extra_data: {
                      video_id: [props.info.video_id],
                    },
                  };
                  console.log(props)
                  
                  get_data("api/v1/gateway", _data).then((res) => {
                    //请求
                    // console.log(res);
                    if (res.err === 0&&res.errmsg=="OK") {
                      props.parent.update_data&&props.parent.update_data(props.series)
                      new CustomModal().alert("删除成功", "success", 3000);
                    }
                  
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
            get_data("api/v1/gateway", {
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
        }}
      ></ModalDialog>
    </div>
  );
};
export default React.memo(SeriesItem, stop_run);
