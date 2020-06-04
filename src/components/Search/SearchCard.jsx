import React, { Fragment } from "react";
import { navigate, Link } from "gatsby";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { secondsToDate } from "../../services/utils";

const imagePath = path => `http://api.haetek.com:9191/${path}`;

const bull = (
  <span
    style={{
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    }}
  >
    •
  </span>
);

const imagePick = path =>
  path ? (
    <img
      src={imagePath(path)}
      style={{ height: "100%", width: "246px" }}
      alt={path}
    />
  ) : null;

const isPay = pay =>
  pay ? (
    <Chip
      size="small"
      label="付费"
      style={{ backgroundColor: "#fc5659", color: "#fff" }}
    />
  ) : null;

const uploadTime = time =>
  time ? (
    <Typography variant="caption" color="textSecondary">
      {`${secondsToDate(time)} 发布`}
    </Typography>
  ) : null;

const titleItem = (pay, title, time, id) =>
  title ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      {isPay(pay)}
      <Link to={`/watch/?vid=${id}`} style={{ flexGrow: 1 }}>
        <Typography variant="h6">{title}</Typography>
      </Link>
      {uploadTime(time)}
    </div>
  ) : null;

const descriptionItem = description =>
  description ? (
    <Typography variant="body2" color="textSecondary">
      {description}
    </Typography>
  ) : null;

const userViews = (view, comment, like) => {
  return view || comment || like ? (
    <div style={{ gridColumn: 2, gridRow: 4 }}>
      <Typography variant="caption" color="textSecondary">
        {view}观看{bull}
        {comment}回应{bull}
        {like}点赞
      </Typography>
    </div>
  ) : null;
};

const authAvatar = headshot =>
  headshot ? (
    <Avatar src={headshot} alt={headshot} style={{ width: 130, height: 130 }} />
  ) : null;

const userAvatar = (name, headshot, id, view, comment, like) =>
  name ? (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Link to={`/excellentcreator/creator/?cid=${id}`}>
        <Avatar
          src={headshot}
          alt={name}
          style={{ height: 28, width: 28, marginRight: 5 }}
        />
      </Link>
      <Typography variant="caption">{name}</Typography>
      <div style={{ marginRight: 40 }} />
      {userViews(view, comment, like)}
    </div>
  ) : null;

const subtitle = sub => (
  <Typography variant="body2" color="textSecondary">
    {sub}
  </Typography>
);

const fans = (vi, fa) =>
  fa || vi ? (
    <Typography>
      {`${vi}个视频`}
      {bull}
      {`${fa}订阅`}
    </Typography>
  ) : null;

const videoContainer = (...fns) => ({
  path,
  pay,
  title,
  time,
  id,
  des,
  sub,
  name,
  headshot,
  uid,
  view,
  comment,
  like
}) => (
  <div
    style={{
      display: "grid",
      height: 148,
      margin: "20px 0",
      gridTemplateColumns: "246px auto",
      gridTemplateRows: "repeat(5,1fr)",
      gap: "10px 20px",
      gridAutoFlow: "row"
    }}
  >
    <div
      style={{
        gridColumn: 1,
        gridRow: "1 / 6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {fns[0](path)}
    </div>
    <div style={{ gridColumn: 2, gridRow: 1 }}>
      {fns[1](pay, title, time, id)}
    </div>
    <div style={{ gridColumn: 2, gridRow: "2 / 4" }}>{fns[2](des)}</div>
    <div style={{ gridColumn: 2, gridRow: 4 }}>{fns[3](sub)}</div>
    <div style={{ gridColumn: 2, gridRow: 5 }}>
      {fns[4](name, headshot, uid, view, comment, like)}
    </div>
  </div>
);

const docContainer = (...fns) => ({
  pay,
  title,
  time,
  id,
  uid,
  name,
  download
}) => (
  <div
    style={{
      display: "grid",
      height: 98,
      borderTop: "1px solid #f2f2f5",
      borderBottom: "1px solid #f2f2f5",
      margin: "20px 0",
      gridTemplateColumns: "auto",
      gridTemplateRows: "repeat(2,1fr)"
    }}
  >
    <div style={{ gridColumn: 1, gridRow: 1 }}>
      {fns[0](pay, title, time, id, name, download)}
    </div>
    <div
      style={{
        gridColumn: 1,
        gridRow: 2,
        display: "flex",
        alignItems: "center"
      }}
    >
      {fns[1](name, "", uid, download)}
      <Typography
        variant="caption"
        color="textSecondary"
      >{`${download}次 下载`}</Typography>
    </div>
  </div>
);

export default function SearchCard({ card = {} }) {
  const { data, match_frame, source } = card;
  const vtrans = (obj = {}) => ({
    path: obj.image_path,
    pay: obj.is_pay,
    title: obj.title,
    time: obj.upload_time,
    id: obj.video_id,
    des: obj.description,
    name: obj.user_name,
    headshot: obj.headshot,
    uid: obj.user_id,
    view: obj.view_counts,
    comment: obj.comment_counts,
    like: obj.like_counts
  });
  const atrans = (obj = {}) => ({
    path: obj.headshot,
    pay: obj.is_pay,
    title: obj.user_name,
    time: obj.upload_time,
    uid: obj.user_id,
    des: obj.introduction,
    videos: obj.video_counts,
    fans: obj.fans_counts
  });
  const dtrans = (obj = {}) => ({
    pay: obj.is_pay,
    title: obj.file_name,
    time: obj.time,
    id: obj.document_id,
    download: obj.download_counts
  });

  const handleVideoClick = id => {
    id && navigate(`/watch/?vid=${id}`, { state: { vid: id } });
  };

  const handleAuthClick = id => {
    id && navigate(`/creator/?cid=${id}`, { state: { cid: id } });
  };

  const handleDocumentClick = id => {
    id && navigate(`/document/?did=${id}`, { state: { did: id } });
  };

  const handleSeriesClick = id => {
    id && navigate(`/series/?sid=${id}`, { state: { sid: id } });
  };

  const videoCard = videoContainer(
    imagePick,
    titleItem,
    descriptionItem,
    subtitle,
    userAvatar
  )(vtrans(data));

  const authCard = videoContainer(
    authAvatar,
    titleItem,
    descriptionItem,
    subtitle,
    fans
  )(atrans(data));

  const seriesCard = videoContainer(
    imagePick,
    titleItem,
    descriptionItem,
    subtitle,
    userAvatar
  )(vtrans(data));

  const docCard = docContainer(titleItem, userAvatar)(dtrans(data));

  const chosenCard = sour =>
    ({
      video: videoCard,
      series: seriesCard,
      user: authCard,
      document: docCard
    }[sour]);
  return <Fragment>{chosenCard(source)}</Fragment>;
}
