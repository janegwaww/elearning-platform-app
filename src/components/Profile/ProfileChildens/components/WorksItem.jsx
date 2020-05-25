import React from "react";
import { Grade, MoreHorizOutlined ,Delete} from "@material-ui/icons";
import img from "../../../../assets/img/img1.png";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
export function WorksItem (props){

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="zero-edges">
      <div className="all-width view-overflow">
        <img src={img} className="all-width" tyle={{ height: "164px" }} />
        <p className='fn-color-white fn-size-12 profile-time'>01:20:30</p>
        <span style={{position:'absolute',top:0,left:10,display:'inline-block',padding:'2px 5px',borderRadius:'0px 0px 4px 4px'}} className='bg-007CFF fn-color-white fn-size-12'>系列</span>
      </div>
      <p className="fn-color-2C2C3B textview-overflow two">全球高考系列</p>
      <div className="box box-align-center box-between ">
        <p className="text-overflow zero-edges">
          103万&nbsp;观看●2400回应●1314点赞
        </p>
        <div>
          <div>
          <Delete />
            <Grade />
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
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};
;
