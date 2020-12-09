import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import Bull from "../Search/Bull";
import CardTag from "./CardTag";
import AuthTag from "./AuthTag";
import Link from "../Link/Link";

const CREATOR_URL = "/excellentcreator/creator/?cid=";

export const CardHeader = ({ item = {} } = {}) => (
  <CardTag type={item.type}>
    <CardMedia
      component="img"
      alt={item.image_path}
      src={`${item.image_path}`}
      className="grid-card-image-head"
    />
  </CardTag>
);

export const duration = (item) => {
  const time = moment(item.video_time, "HH:mm:ss");
  return (
    item.video_time && (
      <div className="video-time-tag">
        <Typography variant="caption" color="inherit">
          {time.hour() ? time.format("H:mm:ss") : time.format("mm:ss")}
        </Typography>
      </div>
    )
  );
};

export const seriesCounts = (item) =>
  !!item.video_counts && (
    <div className="video-time-tag">
      <Typography variant="caption" color="primary">
        {`共${item.video_counts}课`}
      </Typography>
    </div>
  );

export const CardTitle = ({ item = {} } = {}) => (
  <Tooltip
    placement="top-start"
    title={item.title || item.video_title || item.file_name}
  >
    <Typography gutterBottom variant="body2" noWrap>
      {item.title}
      {item.video_title}
      {item.file_name}
    </Typography>
  </Tooltip>
);

export const UserName = ({ item = {} } = {}) => (
  <div className="grid-avatar">
    <Avatar alt={item.user_name} src={`${item.headshot}`} className="avatar" />
    <Typography variant="caption" className="user-name" noWrap>
      {item.user_name}
    </Typography>
    <AuthTag authority={item.authority} />
  </div>
);

export const headshot = (item) =>
  item.headshot && (
    <Link href={CREATOR_URL + item.user_id} underline="none">
      <UserName item={item} />
    </Link>
  );

export const viewCounts = (item) =>
  item.view_counts ? (
    <>
      {`${item.view_counts} 观看`}
      <Bull />
    </>
  ) : null;

export const likeCounts = (item) =>
  item.like_counts && item.match ? (
    <>
      {`${item.like_counts} 点赞`}
      <Bull />
    </>
  ) : null;

export const payCounts = (item) =>
  item.pay_counts ? (
    <>
      {`${item.pay_counts} 购买`}
      <Bull />
    </>
  ) : null;

// 点击标题跳转事件
export const handleLink = ({ lang, ...other }) => {
  const WATCH = "/watch/?vid=";
  const SERIES = "/series/?sid=";
  const DOCUMENT_S = "/documentsearch/?dsid=";
  const DOCUMENT_D = "/document/?did=";

  if (other.video_id) {
    return {
      to: WATCH + other.video_id,
    };
  } else if (other.series_id) {
    return {
      to: SERIES + other.series_id,
    };
  } else if (other.file_id && other.file_path && lang === "cn") {
    return {
      to: DOCUMENT_S + other.file_id,
    };
  } else if (other.file_id && other.file_path) {
    return {
      to: other.file_path,
    };
  } else if (other.file_id) {
    return {
      to: DOCUMENT_D + other.file_id,
    };
  }
  return { to: "/" };
};
