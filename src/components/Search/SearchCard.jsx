import React, { Fragment } from "react";
import { navigate } from "gatsby";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import Bull from "./Bull";
import { secondsToDate } from "../../services/utils";

const imagePick = path =>
  path ? (
    <img
      src={`${path}`}
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
      <Link
        href={`/watch/?vid=${id}`}
        color="textPrimary"
        style={{ flexGrow: 1 }}
        target="_blank"
        rel="noopener norefferer"
      >
        <Typography variant="subtitle1" noWrap>
          {title}
        </Typography>
      </Link>
      {uploadTime(time)}
    </div>
  ) : null;

// 暂时的处理（重复代码）
const authTitleItem = (pay, title, time, id, uid) =>
  title ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      {isPay(pay)}
      <Link
        href={`/excellentcreator/creator/?cid=${uid}`}
        style={{ flexGrow: 1 }}
        target="_blank"
        rel="noopener norefferer"
      >
        <Typography variant="h6">{title}</Typography>
      </Link>
      {uploadTime(time)}
    </div>
  ) : null;
// 暂时处理
const seriesTitleItem = (pay, title, time, id) =>
  title ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      {isPay(pay)}
      <Link
        href={`/series/?sid=${id}`}
        style={{ flexGrow: 1 }}
        target="_blank"
        rel="noopener norefferer"
      >
        <Typography variant="h6">{title}</Typography>
      </Link>
      {uploadTime(time)}
    </div>
  ) : null;
// 暂时处理
const docTitleItem = (pay, title, time, id) =>
  title ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      {isPay(pay)}
      <Link
        href={`/document/?did=${id}`}
        style={{ flexGrow: 1 }}
        color="textPrimary"
        target="_blank"
        rel="noopener norefferer"
      >
        <Typography variant="subtitle1" noWrap>
          {title}
        </Typography>
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
        {view}观看
        <Bull />
        {comment}回应
        <Bull />
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
      <Link
        href={`/excellentcreator/creator/?cid=${id}`}
        target="_blank"
        rel="noopener norefferer"
      >
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
      <Bull />
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
      {fns[1](pay, title, time, id, uid)}
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
  download,
  path
}) => (
  <div
    style={{
      gap: "10px 20px",
      padding: "15px 0",
      display: "grid",
      height: 160,
      borderTop: "1px solid #f2f2f5",
      borderBottom: "1px solid #f2f2f5",
      margin: "20px 0",
      gridTemplateColumns: "246px auto",
      gridTemplateRows: "repeat(5,1fr)"
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
    <div stye={{ gridColumn: 2, gridRow: 1 }}>
      {fns[1](pay, title, time, id, name, download)}
    </div>
    <div
      style={{
        gridColumn: 2,
        gridRow: 5,
        display: "flex",
        alignItems: "center"
      }}
    >
      {fns[2](name, "", uid, download)}
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
    path: obj.image_path,
    pay: obj.is_pay,
    title: obj.file_name,
    time: obj.time,
    id: obj.file_id,
    download: obj.download_counts
  });

  const videoCard = videoContainer(
    imagePick,
    titleItem,
    descriptionItem,
    subtitle,
    userAvatar
  )(vtrans(data));

  const authCard = videoContainer(
    authAvatar,
    authTitleItem,
    descriptionItem,
    subtitle,
    fans
  )(atrans(data));

  const seriesCard = videoContainer(
    imagePick,
    seriesTitleItem,
    descriptionItem,
    subtitle,
    userAvatar
  )(vtrans(data));

  const docCard = docContainer(
    imagePick,
    docTitleItem,
    userAvatar
  )(dtrans(data));

  const chosenCard = sour =>
    ({
      video: videoCard,
      series: seriesCard,
      user: authCard,
      document: docCard
    }[sour]);
  return <Fragment>{chosenCard(source)}</Fragment>;
}
