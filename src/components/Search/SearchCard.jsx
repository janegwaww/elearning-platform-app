import React from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
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
          <img src={`${path}`} width="auto" alt={path} height="100%" />
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
            variant="subtitle1"
            noWrap
            dangerouslySetInnerHTML={createMarkup}
          />
        </Link>
      )}
      <div style={{ width: 10 }} />
      {time && (
        <Typography variant="caption" color="textSecondary" noWrap>
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
        style={{ lineHeight: 1.7 }}
      />
    )
  );
};

const authAvatar = (headshot, href = "/") =>
  headshot && (
    <Link href={href}>
      <Avatar
        src={headshot}
        alt={headshot}
        style={{ width: 130, height: 130 }}
      />
    </Link>
  );

const userAvatar = (name, headshot, id, view = 0, comment = 0, like = 0) => (
  <div style={{ display: "flex", alignItems: "center" }}>
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
          noWrap
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

const videoContainer = ({ data = {}, match_frame = {} }) => {
  const { start_time } = match_frame;
  const href = start_time
    ? `/watch/?vid=${data.video_id}&time=${start_time}`
    : `/watch/?vid=${data.video_id}`;
  return (
    <Grid container className="container" spacing={2}>
      <Grid item xs={6} md={3}>
        <div className="head">{imagePick(data.image_path, href)}</div>
      </Grid>
      <Grid item xs={6} md={9}>
        <div className="card-text-part">
          <div style={{ gridColumn: 2, gridRow: 1 }}>
            <TitleItem
              pay={data.is_pay}
              title={data.title}
              time={data.upload_time}
              href={href}
              match={match_frame}
            />
          </div>
          <div className="card-text-part-description">
            {descriptionItem(data.description, match_frame)}
          </div>
          <div style={{ gridColumn: 2, gridRow: 4, overflow: "hidden" }}>
            {subtitle({ ...match_frame, id: data.video_id })}
          </div>
          <div style={{ gridColumn: 2, gridRow: 5 }}>
            {userAvatar(
              data.user_name,
              data.headshot,
              data.user_id,
              data.view_counts,
              data.comment_counts,
              data.like_counts
            )}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

const authContainer = ({ data, match_frame }) => {
  const href = `/excellentcreator/creator/?cid=${data.user_id}`;
  return (
    <Grid container spacing={1} className="container">
      <Grid item xs={6} md={3}>
        <div className="head">{authAvatar(data.headshot, href)}</div>
      </Grid>
      <Grid item xs={6} md={9}>
        <div style={{ gridColumn: 2, gridRow: 1 }}>
          <TitleItem
            pay={data.is_pay}
            title={data.user_name}
            time={data.upload_time}
            href={href}
            match={match_frame}
          />
        </div>
        <div style={{ gridColumn: 2, gridRow: 2 }}>
          {fans(data.video_counts)}
        </div>
        <div style={{ gridColumn: 2, gridRow: "3/5" }}>
          {descriptionItem(data.introduction, match_frame)}
        </div>
      </Grid>
    </Grid>
  );
};

const seriesContainer = ({ data, match_frame }) => {
  const href = `/series/?sid=${data.series_id}`;
  return (
    <Grid container spacing={2} className="container">
      <Grid item xs={6} md={3}>
        <div className="head">{imagePick(data.image_path, href, "series")}</div>
      </Grid>
      <Grid item xs={6} md={9}>
        <div className="card-text-part">
          <div style={{ gridColumn: 2, gridRow: 1 }}>
            <TitleItem
              pay={data.is_pay}
              title={data.title}
              time={data.upload_time}
              href={href}
              match={match_frame}
            />
          </div>
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
              data.like_counts
            )}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

const docSeriesContainer = ({ data, match_frame }) => {
  const href = `/series/?dsid=${data.series_id}`;
  return (
    <Grid container spacing={2} className="container">
      <Grid item xs={6} md={3}>
        <div className="head">
          {imagePick(data.image_path, href, "documents")}
        </div>
      </Grid>
      <Grid item xs={6} md={9}>
        <div className="card-text-part">
          <div style={{ gridColumn: 2, gridRow: 1 }}>
            <TitleItem
              pay={data.is_pay}
              title={data.title}
              time={data.upload_time}
              href={href}
              match={match_frame}
            />
          </div>
          <div className="card-text-part-description">
            {descriptionItem(data.description, match_frame)}
          </div>
          <div style={{ gridColumn: 2, gridRow: 4 }} />
          <div style={{ gridColumn: 2, gridRow: 5 }} />
        </div>
      </Grid>
    </Grid>
  );
};

const docContainer = ({ data, match_frame }) => {
  const { file_path } = data;
  const href = !file_path ? `/document/?did=${data.file_id}` : `${file_path}`;

  return (
    <Grid container spacing={2} className="docContainer">
      <Grid item xs={6} md={3}>
        <div className="docHead">
          {imagePick(data.image_path, href, "document")}
        </div>
      </Grid>
      <Grid item xs={6} md={9}>
        <div className="card-text-part">
          <div style={{ gridColumn: 2, gridRow: 1 }}>
            <TitleItem
              title={data.file_name}
              pay={data.is_pay}
              time={data.time}
              href={href}
              match={match_frame}
            />
          </div>
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
      </Grid>
    </Grid>
  );
};

export default function SearchCard({ card = {} }) {
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
}
