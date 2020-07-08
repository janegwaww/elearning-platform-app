import React from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Bull from "./Bull";
import Link from "../Link/Link";
import {
  secondsToDate,
  secondsToHMS,
  pipe,
  decoratedStr,
} from "../../services/utils";
import "./SearchCardStyles.sass";

const imagePick = (path, href = "/", type) =>
  !!path && (
    <div className="image-pick">
      <Link href={href}>
        <img src={`${path}`} width="246px" alt={path} height="100%" />
      </Link>
      {type === "series" && (
        <div className="series-tag">
          <Typography color="primary" variant="caption">
            系列
          </Typography>
        </div>
      )}
      {type === "doc" && (
        <div className="doc-tag">
          <Typography color="primary" variant="caption">
            课件
          </Typography>
        </div>
      )}
    </div>
  );

const TitleItem = ({ pay, title, time, href, match = {} }) => {
  const createMarkup = {
    __html:
      match.type === "title" ? decoratedStr(title, match.subtitle_dist) : title,
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
      {time && (
        <Typography variant="caption" color="textSecondary">
          {`${secondsToDate(time)} 发布`}
        </Typography>
      )}
    </div>
  );
};

const descriptionItem = (description, match = {}) => {
  const createMarkup = {
    __html:
      match.type === "description"
        ? decoratedStr(description, match.subtitle_dist)
        : description,
  };
  return (
    description && (
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
    {name && <Typography variant="caption">{name}</Typography>}
    {name && headshot && <div style={{ marginRight: 40 }} />}
    {!!(view || comment || like) && (
      <div style={{ gridColumn: 2, gridRow: 4 }}>
        <Typography variant="caption" color="textSecondary">
          {`${view}观看`}
          <Bull />
          {`${comment}回应`}
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
      subtitle_dist
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

const videoContainer = ({ data = {}, match_frame }) => {
  const href = `/watch/?vid=${data.video_id}`;
  return (
    <div className="container">
      <div className="head">{imagePick(data.image_path, href)}</div>
      <div style={{ gridColumn: 2, gridRow: 1 }}>
        <TitleItem
          pay={data.is_pay}
          title={data.title}
          time={data.upload_time}
          href={href}
          match={match_frame}
        />
      </div>
      <div style={{ gridColumn: 2, gridRow: "2 / 4", overflow: "hidden" }}>
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
  );
};

const authContainer = ({ data, match_frame }) => {
  const href = `/excellentcreator/creator/?cid=${data.user_id}`;
  return (
    <div className="container">
      <div className="head">{authAvatar(data.headshot, href)}</div>
      <div style={{ gridColumn: 2, gridRow: 1 }}>
        <TitleItem
          pay={data.is_pay}
          title={data.user_name}
          time={data.upload_time}
          href={href}
          match={match_frame}
        />
      </div>
      <div style={{ gridColumn: 2, gridRow: 2 }}>{fans(data.video_counts)}</div>
      <div style={{ gridColumn: 2, gridRow: "3/5" }}>
        {descriptionItem(data.introduction, match_frame)}
      </div>
    </div>
  );
};

const seriesContainer = ({ data, match_frame }) => {
  const href = `/series/?sid=${data.series_id}`;
  return (
    <div className="container">
      <div className="head">{imagePick(data.image_path, href, "series")}</div>
      <div style={{ gridColumn: 2, gridRow: 1 }}>
        <TitleItem
          pay={data.is_pay}
          title={data.title}
          time={data.upload_time}
          href={href}
          match={match_frame}
        />
      </div>
      <div style={{ gridColumn: 2, gridRow: "2 / 4", overflow: "hidden" }}>
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
  );
};

const docContainer = ({ data, match_frame }) => {
  const href = `/document/?did=${data.file_id}`;
  return (
    <div className="docContainer">
      <div className="docHead">{imagePick(data.image_path, href, "doc")}</div>
      <div stye={{ gridColumn: 2, gridRow: 1 }}>
        <TitleItem
          title={data.file_name}
          pay={data.is_pay}
          time={data.time}
          href={href}
          mathc={match_frame}
        />
      </div>
      <div className="docAvatar">
        {userAvatar(data.user_name, data.headshot, data.user_id)}
        <Typography variant="caption" color="textSecondary">
          {`${data.download_counts}次 下载`}
        </Typography>
      </div>
    </div>
  );
};

export default function SearchCard({ card = {} }) {
  const chosenCard = ({ source, data, match_frame }) =>
    ({
      video: videoContainer({ data, match_frame }),
      series: seriesContainer({ data, match_frame }),
      user: authContainer({ data, match_frame }),
      document: docContainer({ data, match_frame }),
    }[source]);
  const Card = pipe(chosenCard);
  return <div className="global-search-card">{Card(card)}</div>;
}
