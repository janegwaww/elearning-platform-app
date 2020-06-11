import React from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import "./ChannelBar.sass";

function ChannelBar({ cates }) {
  const handleClick = obj => {
    navigate(`/channel/?ch=${obj.index}`, {
      state: {
        index: obj.index
      }
    });
  };

  return (
    <Box className="channel-bar-paper">
      <Box pt={3} pb={3}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {cates.map(o => (
            <Box key={o.index} onClick={() => handleClick(o)} className="item">
              <div>
                <img
                  src={`${o.iconImage}`}
                  alt={o.name}
                  width="60"
                  height="60"
                />
              </div>
              <div>
                <img src={`${o.actionIconImage}`} alt={o.name} />
              </div>
              <Typography noWrap align="center">
                {o.name}
              </Typography>
            </Box>
          ))}
        </div>
      </Box>
      <Divider />
      <br />
    </Box>
  );
}

ChannelBar.defaultProps = {
  cates: [
    {
      name: "金融",
      index: "001",
      iconImage: "../icons/slices/slice1.png",
      actionIconImage: "../icons/slices/slice1_action.svg"
    },
    {
      name: "管理",
      index: "002",
      iconImage: "../icons/slices/slice2.png",
      actionIconImage: "../icons/slices/slice2_action.svg"
    },
    {
      name: "人工智能",
      index: "003",
      iconImage: "../icons/slices/slice3.png",
      actionIconImage: "../icons/slices/slice3_action.svg"
    },
    {
      name: "数学",
      index: "004",
      iconImage: "../icons/slices/slice4.png",
      actionIconImage: "../icons/slices/slice4_action.svg"
    },
    {
      name: "物理",
      index: "005",
      iconImage: "../icons/slices/slice5.png",
      actionIconImage: "../icons/slices/slice5_action.svg"
    },
    {
      name: "电子工程",
      index: "006",
      iconImage: "../icons/slices/slice6.png",
      actionIconImage: "../icons/slices/slice6_action.svg"
    },
    {
      name: "机械工程",
      index: "007",
      iconImage: "../icons/slices/slice7.png",
      actionIconImage: "../icons/slices/slice7_action.svg"
    },
    {
      name: "游戏开发",
      index: "008",
      iconImage: "../icons/slices/slice8.png",
      actionIconImage: "../icons/slices/slice8_action.svg"
    },
    {
      name: "python",
      index: "009",
      iconImage: "../icons/slices/slice9.png",
      actionIconImage: "../icons/slices/slice9_action.svg"
    },
    {
      name: "前端",
      index: "010",
      iconImage: "../icons/slices/slice10.png",
      actionIconImage: "../icons/slices/slice10_action.svg"
    },
    {
      name: "后台",
      index: "011",
      iconImage: "../icons/slices/slice11.png",
      actionIconImage: "../icons/slices/slice11_action.svg"
    },
    {
      name: "计算机系统",
      index: "012",
      iconImage: "../icons/slices/slice12.png",
      actionIconImage: "../icons/slices/slice12_action.svg"
    },
    {
      name: "设计",
      index: "013",
      iconImage: "../icons/slices/slice13.png",
      actionIconImage: "../icons/slices/slice13_action.svg"
    }
  ]
};

ChannelBar.propTypes = {
  cates: PropTypes.arrayOf(PropTypes.object)
};

export default ChannelBar;
