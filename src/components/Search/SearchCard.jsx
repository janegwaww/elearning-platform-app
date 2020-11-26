import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import flow from "lodash/fp/flow";
import {
  Container,
  imagePick,
  TitleItem,
  descriptionItem,
  subtitle,
  userAvatar,
  authAvatar,
  fans,
} from "./SearchCardElements";
import "./SearchCardStyles.sass";

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
          {userAvatar(data)}
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
          <div style={{ gridColumn: 2, gridRow: 5 }}>{userAvatar(data)}</div>
        </div>
      }
    />
  );
};

const docSeriesContainer = ({ data, match_frame }) => {
  const href = `/series/?dserid=${data.series_id}`;
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
  const href = !data.file_path
    ? `/document/?did=${data.file_id}`
    : data.lang === "cn"
    ? `/documentsearch/?dsid=${data.file_id}`
    : `${data.file_path}`;
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
            {userAvatar(data)}
            <Typography variant="caption" color="textSecondary">
              {`${data.download_counts}次 下载`}
            </Typography>
          </div>
        </div>
      }
    />
  );
};

const SearchCard = ({ card = {} } = {}) => {
  const chosenCard = ({ source, data, match_frame } = {}) =>
    ({
      video: videoContainer({ data, match_frame }),
      series: seriesContainer({ data, match_frame }),
      user: authContainer({ data, match_frame }),
      document: docContainer({ data, match_frame }),
      documents: docSeriesContainer({ data, match_frame }),
    }[source]);
  return <div className="global-search-card">{flow(chosenCard)(card)}</div>;
};

export default SearchCard;
