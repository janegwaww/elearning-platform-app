import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Bull from "./Bull";
import Link from "../Link/Link";
import CardTag from "../GridCards/CardTag";
import {
  secondsToDate,
  secondsToHMS,
  pipe,
  decoratedStr,
} from "../../services/utils";
import "./SearchCardStyles.sass";

const imagePick = (path, href = "/", type) =>
  !!path && (
    <CardTag type={type}>
      <div className="image-pick">
        <Link href={href}>
          <CardMedia component="img" alt={path} src={`${path}`} />
        </Link>
      </div>
    </CardTag>
  );

const TitleItem = ({ pay, title, time, href, match = {} }) => {
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

const descriptionItem = (description, match = {}) => {
  const createMarkup = {
    __html: ["description", "content"].includes(match.type)
      ? decoratedStr(match.whole_str, match.subtitle_dist)
      : description,
  };
  return (
    !!createMarkup.__html && (
      <Typography
        variant="body2"
        color="textSecondary"
        dangerouslySetInnerHTML={createMarkup}
      />
    )
  );
};

const authAvatar = (headshot, href = "/") =>
  headshot && (
    <div className="auth-head">
      <Link href={href}>
        <Avatar src={headshot} alt={headshot} className="auth-card-avatar" />
      </Link>
    </div>
  );

const userAvatar = (name, headshot, id, view = 0, comment = 0, like = 0) => (
  <div className="card-avatar">
    <div className="card-avatar-img">
      {headshot && (
        <Link href={`/excellentcreator/creator/?cid=${id}`}>
          <Avatar
            src={headshot}
            alt={name}
            style={{ height: 28, width: 28, marginRight: 5 }}
          />
        </Link>
      )}
      {name && (
        <Typography variant="caption" noWrap>
          {name}
        </Typography>
      )}
      {name && headshot && <div style={{ marginRight: 40 }} />}
    </div>
    {!!(view || comment || like) && (
      <div style={{ gridColumn: 2, gridRow: 4 }}>
        <Typography variant="caption" color="textSecondary" noWrap>
          {`${view}观看`}
          {/* <Bull />
                        {`${comment}回应`} */}
          <Bull />
          {`${like}点赞`}
        </Typography>
      </div>
    )}
  </div>
);

const subtitle = ({ start_time, whole_str, subtitle_dist, type, id }) => {
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

const fans = (vi) =>
  !!vi && (
    <Typography variant="body2" color="textSecondary">
      {`${vi}个视频`}
    </Typography>
  );

const Container = ({ leftComponent, rightComponent }) => {
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

const videoContainer = ({ data = {}, match_frame = {} }) => {
  const match = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { start_time, type } = match_frame;
  const href = start_time
    ? `/watch/?vid=${data.video_id}&time=${start_time}`
    : `/watch/?vid=${data.video_id}`;
  return (
    <Container
      leftComponent={imagePick(data.image_path, href)}
      rightComponent={
        <div className="card-text-part">
          <TitleItem
            pay={data.is_pay}
            title={data.title}
            time={data.upload_time}
            href={href}
            match={match_frame}
          />
          <div
            className={`card-text-part-description ${
              type === "subtitle" && match && "subtitle"
            }`}
          >
            {descriptionItem(data.description, match_frame)}
          </div>
          <div className="card-subtitle">
            {subtitle({ ...match_frame, id: data.video_id })}
          </div>
          {userAvatar(
            data.user_name,
            data.headshot,
            data.user_id,
            data.view_counts,
            data.comment_counts,
            data.like_counts,
          )}
        </div>
      }
    />
  );
};

const authContainer = ({ data, match_frame }) => {
  const href = `/excellentcreator/creator/?cid=${data.user_id}`;
  return (
    <Container
      leftComponent={authAvatar(data.headshot, href)}
      rightComponent={
        <div>
          <TitleItem
            pay={data.is_pay}
            title={data.user_name}
            time={data.upload_time}
            href={href}
            match={match_frame}
          />
          <div style={{ gridColumn: 2, gridRow: 2 }}>
            {fans(data.video_counts)}
          </div>
          <div style={{ gridColumn: 2, gridRow: "3/5" }}>
            {descriptionItem(data.introduction, match_frame)}
          </div>
        </div>
      }
    />
  );
};

const seriesContainer = ({ data, match_frame }) => {
  const href = `/series/?sid=${data.series_id}`;
  return (
    <Container
      leftComponent={imagePick(data.image_path, href, "series")}
      rightComponent={
        <div className="card-text-part">
          <TitleItem
            pay={data.is_pay}
            title={data.title}
            time={data.upload_time}
            href={href}
            match={match_frame}
          />
          <div className="card-text-part-description">
            {descriptionItem(data.description, match_frame)}
          </div>
          <div style={{ gridColumn: 2, gridRow: 4 }} />
          <div style={{ gridColumn: 2, gridRow: 5 }}>
            {userAvatar(
              data.user_name,
              data.headshot,
              data.user_id,
              data.view_counts,
              data.comment_counts,
              data.like_counts,
            )}
          </div>
        </div>
      }
    />
  );
};

const docSeriesContainer = ({ data, match_frame }) => {
  const href = `/series/?dsid=${data.series_id}`;
  return (
    <Container
      leftComponent={imagePick(data.image_path, href, "documents")}
      rightComponent={
        <div className="card-text-part">
          <TitleItem
            pay={data.is_pay}
            title={data.title}
            time={data.upload_time}
            href={href}
            match={match_frame}
          />
          <div className="card-text-part-description">
            {descriptionItem(data.description, match_frame)}
          </div>
          <div style={{ gridColumn: 2, gridRow: 4 }} />
          <div style={{ gridColumn: 2, gridRow: 5 }} />
        </div>
      }
    />
  );
};

const docContainer = ({ data, match_frame }) => {
  const { file_path } = data;
  const href = !file_path ? `/document/?did=${data.file_id}` : `${file_path}`;

  return (
    <Container
      leftComponent={imagePick(data.image_path, href, "document")}
      rightComponent={
        <div className="card-text-part">
          <TitleItem
            title={data.file_name}
            pay={data.is_pay}
            time={data.time}
            href={href}
            match={match_frame}
          />
          <div className="card-text-part-description">
            {descriptionItem(data.description, match_frame)}
          </div>
          <div className="docAvatar">
            {userAvatar(data.user_name, data.headshot, data.user_id)}
            <Typography variant="caption" color="textSecondary">
              {`${data.download_counts}次 下载`}
            </Typography>
          </div>
        </div>
      }
    />
  );
};

const SearchCard = ({ card = {} }) => {
  const chosenCard = ({ source, data, match_frame }) =>
    ({
      video: videoContainer({ data, match_frame }),
      series: seriesContainer({ data, match_frame }),
      user: authContainer({ data, match_frame }),
      document: docContainer({ data, match_frame }),
      documents: docSeriesContainer({ data, match_frame }),
    }[source]);
  const Card = pipe(chosenCard);
  return <div className="global-search-card">{Card(card)}</div>;
};

export default SearchCard;
