import React from "react";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Bull from "./Bull";
import CardTag from "../GridCards/CardTag";
import Link from "../Link/Link";
import AuthTag from "../GridCards/AuthTag";
import {
  secondsToDate,
  secondsToHMS,
  decoratedStr,
} from "../../services/utils";

export const imagePick = (path, href = "/", type) =>
  Boolean(path) && (
    <CardTag type={type}>
      <div className="image-pick">
        <Link href={href}>
          <CardMedia component="img" alt={path} src={`${path}`} />
        </Link>
      </div>
    </CardTag>
  );

export const TitleItem = ({ pay, title, time, href, match = {} }) => {
  const createMarkup = {
    __html: ["title", "name"].includes(match.type)
      ? decoratedStr(match.whole_str, match.subtitle_dist)
      : title,
  };
  return (
    <div className="title-item">
      {pay && <Chip size="small" label="付费" className="is-pay" />}
      {title && (
        <Link href={href}>
          <Typography
            dangerouslySetInnerHTML={createMarkup}
            className="title-item-name"
          />
        </Link>
      )}
      <div style={{ width: 10 }} />
      {time && (
        <Typography
          variant="caption"
          color="textSecondary"
          className="upload-time-title"
          noWrap
        >
          {`${secondsToDate(time)} 发布`}
        </Typography>
      )}
    </div>
  );
};

export const descriptionItem = (description, match = {}) => {
  const createMarkup = {
    __html: ["description", "content"].includes(match.type)
      ? decoratedStr(match.whole_str, match.subtitle_dist)
      : description,
  };
  return (
    Boolean(createMarkup.__html) && (
      <Typography
        variant="body2"
        color="textSecondary"
        dangerouslySetInnerHTML={createMarkup}
      />
    )
  );
};

export const authAvatar = (headshot, href = "/") =>
  headshot && (
    <div className="auth-head">
      <Link href={href}>
        <Avatar src={headshot} alt={headshot} className="auth-card-avatar" />
      </Link>
    </div>
  );

export const userAvatar = (data) => (
  <div className="card-avatar">
    <div className="card-avatar-img">
      {data.headshot && (
        <Link href={`/excellentcreator/creator/?cid=${data.user_id}`}>
          <Avatar
            src={data.headshot}
            alt={data.user_name}
            style={{ height: 28, width: 28, marginRight: 5 }}
          />
          {data.user_name && (
            <Typography variant="caption" noWrap component="span">
              {data.user_name}
            </Typography>
          )}
        </Link>
      )}
      <AuthTag authority={data.authority} />
      {data.user_name && data.headshot && <div style={{ marginRight: 40 }} />}
    </div>
    {!!(data.view_counts || data.comment_counts || data.like_counts) && (
      <div style={{ gridColumn: 2, gridRow: 4 }}>
        <Typography variant="caption" color="textSecondary" noWrap>
          {`${data.view_counts}观看`}
          <Bull />
          {`${data.like_counts}点赞`}
        </Typography>
      </div>
    )}
  </div>
);

export const subtitle = ({
  start_time,
  whole_str,
  subtitle_dist,
  type,
  id,
}) => {
  const createMarkup = () => ({
    __html: `【${secondsToHMS(start_time)}】 ${decoratedStr(
      whole_str,
      subtitle_dist,
    )}`,
  });
  return (
    type === "subtitle" && (
      <Link href={`/watch/?vid=${id}&time=${start_time}`}>
        <Typography
          variant="body2"
          color="textSecondary"
          dangerouslySetInnerHTML={createMarkup()}
        />
      </Link>
    )
  );
};

export const fans = (vi) =>
  !!vi && (
    <Typography variant="body2" color="textSecondary">
      {`${vi}个视频`}
    </Typography>
  );

export const Container = ({ leftComponent, rightComponent }) => {
  const match = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <Grid container className="container" spacing={match ? 1 : 2}>
      <Grid item xs={4} md={3}>
        {leftComponent}
      </Grid>
      <Grid item xs={8} md={9}>
        {rightComponent}
      </Grid>
    </Grid>
  );
};
