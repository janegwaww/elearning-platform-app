import React from "react";
import PropTypes from "prop-types";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import "./ChannelBar.sass";

function ChannelBar({ cates, index }) {
  return (
    <Box className="channel-bar-paper">
      <Box style={{ paddingTop: 24, paddingBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {cates.map((o) => {
            const cn = index && index === o.index ? "slice-action" : "";
            const href = o.index === "000" ? "/" : `/channel/?ch=${o.index}`;
            return (
              <Link
                key={o.index}
                href={href}
                state={{ index: o.index }}
                underline="none"
                color="textPrimary"
              >
                <Box className={`item ${cn}`}>
                  <div>
                    <img
                      src={`${o.iconImage}`}
                      alt={o.name}
                      width="48"
                      height="48"
                    />
                  </div>
                  <div>
                    <img
                      src={`${o.actionIconImage}`}
                      alt={o.name}
                      width="48"
                      height="48"
                    />
                  </div>
                  <Typography noWrap align="center">
                    {o.name}
                  </Typography>
                </Box>
              </Link>
            );
          })}
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
      name: "热门",
      index: "000",
      iconImage: "../icons/slices/slice1.svg",
      actionIconImage: "../icons/slices/slice1_action.svg",
    },
    {
      name: "数学",
      index: "maths",
      iconImage: "../icons/slices/slice2.svg",
      actionIconImage: "../icons/slices/slice2_action.svg",
    },

    {
      name: "人工智能",
      index: "AI",
      iconImage: "../icons/slices/slice3.svg",
      actionIconImage: "../icons/slices/slice3_action.svg",
    },
    {
      name: "物理",
      index: "physics",
      iconImage: "../icons/slices/slice4.svg",
      actionIconImage: "../icons/slices/slice4_action.svg",
    },
    {
      name: "历史",
      index: "history",
      iconImage: "../icons/slices/slice5.svg",
      actionIconImage: "../icons/slices/slice5_action.svg",
    },
    {
      name: "心理学",
      index: "psychology",
      iconImage: "../icons/slices/slice6.svg",
      actionIconImage: "../icons/slices/slice6_action.svg",
    },
    {
      name: "金融",
      index: "finance-economics",
      iconImage: "../icons/slices/slice7.svg",
      actionIconImage: "../icons/slices/slice7_action.svg",
    },
    {
      name: "软件工程",
      index: "SE",
      iconImage: "../icons/slices/slice8.svg",
      actionIconImage: "../icons/slices/slice8_action.svg",
    },
    {
      name: "哲学",
      index: "philosophy",
      iconImage: "../icons/slices/slice9.svg",
      actionIconImage: "../icons/slices/slice9_action.svg",
    },
    {
      name: "经济",
      index: "economics",
      iconImage: "../icons/slices/slice10.svg",
      actionIconImage: "../icons/slices/slice10_action.svg",
    },
    {
      name: "艺术",
      index: "art",
      iconImage: "../icons/slices/slice11.svg",
      actionIconImage: "../icons/slices/slice11_action.svg",
    },
    {
      name: "管理",
      index: "management",
      iconImage: "../icons/slices/slice12.svg",
      actionIconImage: "../icons/slices/slice12_action.svg",
    },
    {
      name: "自动化",
      index: "automation",
      iconImage: "../icons/slices/slice13.svg",
      actionIconImage: "../icons/slices/slice13_action.svg",
    },
    {
      name: "机械工业",
      index: "mechanical_industry",
      iconImage: "../icons/slices/slice14.svg",
      actionIconImage: "../icons/slices/slice14_action.svg",
    },
  ],
};

ChannelBar.propTypes = {
  cates: PropTypes.arrayOf(PropTypes.object),
};

export default ChannelBar;
