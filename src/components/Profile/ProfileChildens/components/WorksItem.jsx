import React from "react";
import { Grade, MoreHorizOutlined, Delete } from "@material-ui/icons";
import img from "../../../../assets/img/img1.png";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { get_date } from "../../../../assets/js/totls";
import {get_data} from '../../../../assets/js/request'; 


const stop_run=(prevValue,nextValue)=>{
  
  return prevValue.history===nextValue.history
}
 const WorksItem=(props)=> {
  //inx,onEvent,info,parent,history
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log(props);
  return (
    <div className="zero-edges">
      <div className="all-width view-overflow">
        <img
          src={props.info&&"http://api.haetek.com:9191/" + props.info.image_path}
          className="all-width"
          tyle={{ height: "164px" }}
        />
        {props.info&&props.info.type == "video" ? (
          <p className="fn-color-white fn-size-12 profile-time"> {props.info.video_time}</p>
        ) : (
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
      <p className="fn-color-2C2C3B textview-overflow two">{props.info&&props.info.title}</p>
      <div className="box box-align-center box-between ">
        <p className="text-overflow zero-edges">
          {props.info&&props.info.view_counts||0}&nbsp;观看●{props.info&&props.info.comment_counts||0}回应●{props.info&&props.info.like_counts||0}点赞
        </p>
        <div>
          <div>
          {props.history? <Delete />:<Grade className='fn-color-F86B6B'/>}
            
           
            {/** 
            <IconButton
              aria-label="more"
              aria-controls="works-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreHorizOutlined />
            </IconButton>
            <Menu
              open={open}
              anchorEl={anchorEl}
              keepMounted
              id="works-menu"
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>编辑描述</MenuItem>
              <MenuItem onClick={handleClose}>移动至系列</MenuItem>
              <MenuItem onClick={handleClose}>查看数据</MenuItem>
              <MenuItem onClick={handleClose}>下载</MenuItem>
              <MenuItem onClick={handleClose}>分享</MenuItem>
              <MenuItem onClick={handleClose}>删除作品</MenuItem>
            </Menu>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(WorksItem,stop_run);