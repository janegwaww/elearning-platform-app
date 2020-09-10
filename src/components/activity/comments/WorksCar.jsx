import React from "react";
import {
  FavoriteBorder,
  Details,
  AccessTimeOutlined,
} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";

import { is_phone } from "../../../assets/js/totls";
import { get_date } from "../../../assets/js/totls";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
const WordsCar = (props) => {
  const [isPhone, setIsPhone] = React.useState(false);
  React.useEffect(() => {
    setIsPhone((old) => is_phone());
  }, []);
  console.log(isPhone);
  return (
    <div className="activity-workscar grid-cards-container ">
      <Link
        color="inherit"
        target="_blank"
        underline="none"
        href={
          props.info.type == "document"
            ? "/documentsearch/?dsid=" + props.info.file_id
            : "/watch/?vid=" + props.info.video_id
        }
      >
        <div className="all-width contestcar">
          <div
            style={{
              height: "1.7em",
              minHeight: 80,
              background: "#D8D8D8",
              boxShadow: "0px 0px 8px 0px rgba(32, 32, 32, 0.1)",
              borderRadius: "0.12em ",
              margin: "0 auto",
              position: "relative",
            }}
            className="view-overflow"
          >
            {props.info.type == "video" && (
              <span
                style={{
                  display: "inline-block",
                  position: "absolute",
                  right: "0.75em",
                  bottom: "0.75em",
                  color: "white",
                  padding: "2px 5px",
                  fontSize: "0.12em",
                  borderRadius: "calc(0.12em + 4px)",
                  backgroundColor: "rgba(0,0,0,.48)",
                }}
              >
                {props.info.video_time}
              </span>
            )}
            <img
              style={{
                height: "100%",
                width: "auto",
                margin: "0 auto",
              }}
              src={props.info.image_path}
              alt=""
            />
          </div>
          <div className="grid-context-box" style={{ padding: "16px 12px" }}>
            <Tooltip
              placement="top-start"
              title={props.info.file_name || props.info.title}
              style={{ minHeight: 32 }}
              className="textview-overflow two"
            >
              <Typography gutterBottom variant="body2" noWrap align="left">
                {props.info.file_name || props.info.title}
              </Typography>
            </Tooltip>

            <div
              style={{
                margin: "0.5em 0",
                fontSize: 12,
                lineHeight: 1.5,
                color: "#878791",
              }}
             
            >
              {props.sort == "like" ? (
                <div  className="box box-align-center box-between">
                  <div className='box-flex'>
                    <Details
                      style={{ transform: "rotate(-90deg)", fontSize: 18 }}
                    />
                    &nbsp;{props.info.view_counts || 0}
                  </div>
                  
                  <div className='box-flex'>
                    <FavoriteBorder style={{ fontSize: 18 }} />
                    &nbsp;{props.info.like_counts || 0}
                  </div>
                </div>
              ) : (
                <div>
                  <AccessTimeOutlined style={{ fontSize: 18 }} />
                  &nbsp;{get_date(props.info.time, ".", 8)}
                </div>
              )}
            </div>
            <div className="grid-avatar">
              <Avatar alt="" src={props.info.headshot} className="avatar" />
              <Typography
                variant="caption"
                color="textSecondary"
                component="div"
                className="user-name text-overflow"
                noWrap
              >
                {props.info.user_name}
              </Typography>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default WordsCar;
