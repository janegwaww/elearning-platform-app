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
            const cn = index && index === o.id ? "slice-action" : "";
            const href = o.id === "000" ? "/" : `/channel/?ch=${o.id}`;
            return (
              <Link
                key={o.index}
                href={href}
                state={{ index: o.id }}
                underline="none"
                color="textPrimary"
              >
                <Box className={`item ${cn}`}>
                  <div>
                    <img
                      src={`${o.web_icon}`}
                      alt={o.name}
                      width="48"
                      height="48"
                    />
                  </div>
                  <div>
                    <img
                      src={`${o.web_click_icon}`}
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
      id: "000",
      web_icon: "../icons/slices/slice1.svg",
      web_click_icon: "../icons/slices/slice1_action.svg",
    },
    {
      icon: "http://api.haetek.com:9191/static/icon/002.png",
      id: "maths",
      name: "数学",
      web_click_icon:
        "http://api.haetek.com:9191/static/web_click_icon/maths.svg",
      web_icon: "http://api.haetek.com:9191/static/web_icon/maths.svg",
    },
    {
      icon: "http://api.haetek.com:9191/static/icon/003.png",
      id: "AI",
      name: "人工智能",
      web_click_icon: "http://api.haetek.com:9191/static/web_click_icon/AI.svg",
      web_icon: "http://api.haetek.com:9191/static/web_icon/AI.svg",
    },
    {
      icon: "http://api.haetek.com:9191/static/icon/004.png",
      id: "physics",
      name: "物理",
      web_click_icon:
        "http://api.haetek.com:9191/static/web_click_icon/physics.svg",
      web_icon: "http://api.haetek.com:9191/static/web_icon/physics.svg",
    },
    {
      icon: "http://api.haetek.com:9191/static/icon/005.png",
      id: "history",
      name: "历史",
      web_click_icon:
        "http://api.haetek.com:9191/static/web_click_icon/history.svg",
      web_icon: "http://api.haetek.com:9191/static/web_icon/history.svg",
    },
    {
      icon: "http://api.haetek.com:9191/static/icon/006.png",
      id: "psychology",
      name: "心理学",
      web_click_icon:
        "http://api.haetek.com:9191/static/web_click_icon/psychology.svg",
      web_icon: "http://api.haetek.com:9191/static/web_icon/psychology.svg",
    },
    {
      icon: "http://api.haetek.com:9191/static/icon/007.png",
      id: "finance_economics",
      name: "金融经济",
      web_click_icon:
        "http://api.haetek.com:9191/static/web_click_icon/finance.svg",
      web_icon: "http://api.haetek.com:9191/static/web_icon/finance.svg",
    },
    {
      icon: "http://api.haetek.com:9191/static/icon/008.png",
      id: "SE",
      name: "软件工程",
      web_click_icon: "http://api.haetek.com:9191/static/web_click_icon/SE.svg",
      web_icon: "http://api.haetek.com:9191/static/web_icon/SE.svg",
    },
    {
      icon: "http://api.haetek.com:9191/static/icon/010.png",
      id: "computer_science",
      name: "计算机科学",
      web_click_icon: "http://api.haetek.com:9191/static/web_click_icon/SE.svg",
      web_icon: "http://api.haetek.com:9191/static/web_icon/SE.svg",
    },
    {
      icon: "http://api.haetek.com:9191/static/icon/012.png",
      id: "management",
      name: "管理",
      web_click_icon:
        "http://api.haetek.com:9191/static/web_click_icon/management.svg",
      web_icon: "http://api.haetek.com:9191/static/web_icon/management.svg",
    },
    {
      icon: "http://api.haetek.com:9191/static/icon/001.png",
      id: "mechanical_automation",
      name: "机械自动化",
      web_click_icon:
        "http://api.haetek.com:9191/static/web_click_icon/mechanical_industry.svg",
      web_icon:
        "http://api.haetek.com:9191/static/web_icon/mechanical_industry.svg",
    },
    {
      icon: "http://api.haetek.com:9191/static/icon/009.png",
      id: "others",
      name: "其他",
      web_click_icon:
        "http://api.haetek.com:9191/static/web_click_icon/mechanical_industry.svg",
      web_icon:
        "http://api.haetek.com:9191/static/web_icon/mechanical_industry.svg",
    },

    /* {
       *   name: "数学",
       *   index: "maths",
       *   iconImage: "../icons/slices/slice2.svg",
       *   actionIconImage: "../icons/slices/slice2_action.svg",
       * },

       * {
       *   name: "人工智能",
       *   index: "AI",
       *   iconImage: "../icons/slices/slice3.svg",
       *   actionIconImage: "../icons/slices/slice3_action.svg",
       * },
       * {
       *   name: "物理",
       *   index: "physics",
       *   iconImage: "../icons/slices/slice4.svg",
       *   actionIconImage: "../icons/slices/slice4_action.svg",
       * },
       * {
       *   name: "历史",
       *   index: "history",
       *   iconImage: "../icons/slices/slice5.svg",
       *   actionIconImage: "../icons/slices/slice5_action.svg",
       * },
       * {
       *   name: "心理学",
       *   index: "psychology",
       *   iconImage: "../icons/slices/slice6.svg",
       *   actionIconImage: "../icons/slices/slice6_action.svg",
       * },
       * {
       *   name: "金融",
       *   index: "finance-economics",
       *   iconImage: "../icons/slices/slice7.svg",
       *   actionIconImage: "../icons/slices/slice7_action.svg",
       * },
       * {
       *   name: "软件工程",
       *   index: "SE",
       *   iconImage: "../icons/slices/slice8.svg",
       *   actionIconImage: "../icons/slices/slice8_action.svg",
       * },
       * {
       *   name: "哲学",
       *   index: "philosophy",
       *   iconImage: "../icons/slices/slice9.svg",
       *   actionIconImage: "../icons/slices/slice9_action.svg",
       * },
       * {
       *   name: "经济",
       *   index: "economics",
       *   iconImage: "../icons/slices/slice10.svg",
       *   actionIconImage: "../icons/slices/slice10_action.svg",
       * },
       * {
       *   name: "艺术",
       *   index: "art",
       *   iconImage: "../icons/slices/slice11.svg",
       *   actionIconImage: "../icons/slices/slice11_action.svg",
       * },
       * {
       *   name: "管理",
       *   index: "management",
       *   iconImage: "../icons/slices/slice12.svg",
       *   actionIconImage: "../icons/slices/slice12_action.svg",
       * },
       * {
       *   name: "自动化",
       *   index: "automation",
       *   iconImage: "../icons/slices/slice13.svg",
       *   actionIconImage: "../icons/slices/slice13_action.svg",
       * },
       * {
       *   name: "机械工业",
       *   index: "mechanical_industry",
       *   iconImage: "../icons/slices/slice14.svg",
       *   actionIconImage: "../icons/slices/slice14_action.svg",
       * }, */
  ],
};

ChannelBar.propTypes = {
  cates: PropTypes.arrayOf(PropTypes.object),
};

export default ChannelBar;
