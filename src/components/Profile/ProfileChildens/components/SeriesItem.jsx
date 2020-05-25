import React from "react";
import {
  MoreHorizOutlined,
  Details,
  FavoriteBorder,
  ChatBubbleOutlineOutlined,
  Delete
} from "@material-ui/icons";
import img3 from "../../../../assets/img/img3.png";
import { IconButton,Menu, MenuItem } from "@material-ui/core";

// 系列横向item
const SeriesItem = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      className="box all-height box-between box-align-center profile-top"
      
    >
      <div className="box all-height fn-size-12" style={{ maxWidth: "832px" }}>
        <div style={{ width: "257px", marginRight: 20,position:'relative' }}>
          <img src={img3} className="all-height all-width" />
          <p className='profile-time fn-color-white fn-size-12'>01:02:30</p>
        </div>
        <div>
          <p className="fn-color-2C2C3B fn-size-16">
            全球MotionAward评委、MOMENTOR创始人曾潇霖整创始人曾潇霖…
          </p>
          <p className="fn-color-878791 ">上传于 2020.03.04 09.01</p>
          <p className="fn-color-878791 ">已通过</p>
          <div className="fn-color-565663 profile-point">
            {" "}
            <span>
              <Details />
              1565
            </span>{" "}
            <span>
              <FavoriteBorder />
              1.6万
            </span>
            <span>
              <ChatBubbleOutlineOutlined />
              1565万
            </span>
          </div>

          <p className="fn-color-007CFF"> 审校中</p>
        </div>
      </div>
      <div >
        <Delete />
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
        </Menu>
      </div>
    </div>
  );
};
export default SeriesItem;
