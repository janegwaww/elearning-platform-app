import React from "react";
import { Grade, MoreHorizOutlined, Delete } from "@material-ui/icons";
import img from "../../../../assets/img/img1.png";
import { IconButton, Menu, MenuItem,Link } from "@material-ui/core";
import { get_date } from "../../../../assets/js/totls";
import { get_data } from "../../../../assets/js/request";
import { navigate } from "@reach/router";
const stop_run = (prevValue, nextValue) => {
  return prevValue.history === nextValue.history;
};
const WorksItem = (props) => {
  //inx,onEvent,info,parent,history

  return (
    <div
      className="zero-edges all-width view-overflow all-height"
    
    >
      <div
        className="all-width view-overflow bg-not"
        style={{
          height: 136,
          backgroundImage: props.info && "url(" + props.info.image_path + ")",
        }}
      >
        <Link className='all-width all-hieght'
        color="inherit"
        underline="none"
        href={`/${props.info.type=='series'?'series':'watch'}/?vid=${props.info.type=='series'?props.info.series_id:props.info.video_id}`}
        target="_blank"
        >
          <img src={props.info.image_path} className='all-width all-height' style={{height:136}} />  
        </Link>
        {props.history && (
          <p className="fn-color-white fn-size-12 profile-time">
            {props.info.video_time}
          </p>
        )}
        {!props.history && props.info.type == "video" && (
          <p className="fn-color-white fn-size-12 profile-time">
            {props.info.video_time}
          </p>
        )}
        {!props.history && props.info.type == "series" && (
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
        <p className="fn-color-2C2C3B zero-edges textview-overflow two">
          {props.info && props.info.title}
        </p>
        {!props.history && (
          <div
            className="box box-align-center box-between "
            style={{ paddingTop: 10 }}
          >
            <p className="text-overflow zero-edges fn-color-878791 fn-size-12">
              {/**
          {props.info&&props.info.view_counts||0}&nbsp;观看●{props.info&&props.info.comment_counts||0}回应●{props.info&&props.info.like_counts||0}点赞
         */}
              收藏于05月28日
            </p>
            <div>
              <Grade className="fn-color-F86B6B" />
            </div>
          </div>
        )}
        {props.history && (
          <div
            className="box box-align-center box-between "
            style={{ paddingTop: 10 }}
          >
            <p className="text-overflow zero-edges fn-color-878791 fn-size-12">
              搜索<span>'设计'</span>知识点
              <br />
              观看至23.34
            </p>
            <div>
              <Delete />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default React.memo(WorksItem, stop_run);
