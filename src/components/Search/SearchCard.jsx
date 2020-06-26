import React from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import Bull from "./Bull";
import { secondsToDate, secondsToHMS, pipe } from "../../services/utils";

const styles = {
  container: {
    display: "grid",
    height: 148,
    margin: "20px 0",
    gridTemplateColumns: "246px auto",
    gridTemplateRows: "repeat(5,1fr)",
    gap: "10px 20px",
    gridAutoFlow: "row",
  },
  head: {
    gridColumn: 1,
    gridRow: "1 / 6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  docContainer: {
    gap: "10px 20px",
    padding: "15px 0",
    display: "grid",
    height: 160,
    borderTop: "1px solid #f2f2f5",
    borderBottom: "1px solid #f2f2f5",
    margin: "20px 0",
    gridTemplateColumns: "246px auto",
    gridTemplateRows: "repeat(5,1fr)",
  },
  docHead: {
    gridColumn: 1,
    gridRow: "1 / 6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  docAvatar: {
    gridColumn: 2,
    gridRow: 5,
    display: "flex",
    alignItems: "center",
  },
};

const imagePick = (path) =>
  path ? (
    <img
      src={`${path}`}
      style={{ height: "100%", width: "246px" }}
      alt={path}
    />
  ) : null;

const TitleItem = ({ pay, title, time, href }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {pay ? (
        <Chip
          size="small"
          label="付费"
          style={{ backgroundColor: "#fc5659", color: "#fff" }}
        />
      ) : null}
      {title ? (
        <Link
          href={href}
          color="textPrimary"
          style={{ flexGrow: 1 }}
          target="_blank"
          rel="noopener norefferer"
        >
          <Typography variant="subtitle1" noWrap>
            {title}
          </Typography>
        </Link>
      ) : null}
      {time ? (
        <Typography variant="caption" color="textSecondary">
          {`${secondsToDate(time)} 发布`}
        </Typography>
      ) : null}
    </div>
  );
};

const descriptionItem = (description) =>
  description ? (
    <Typography variant="body2" color="textSecondary">
      {description}
    </Typography>
  ) : null;

const authAvatar = (headshot) =>
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
      {view || comment || like ? (
        <div style={{ gridColumn: 2, gridRow: 4 }}>
          <Typography variant="caption" color="textSecondary">
            {view}观看
            <Bull />
            {comment}回应
            <Bull />
            {like}点赞
          </Typography>
        </div>
      ) : null}
    </div>
  ) : null;

const subtitle = ({ start_time, whole_str, matched_str, type, id }) => {
  const createMarkup = () => ({
    __html: `【${secondsToHMS(start_time)}】 "${whole_str.replace(
      matched_str,
      `<span style='color: #007cff'>${matched_str}</span>`
    )}"`,
  });
  return type === "subtitle" ? (
    <Link
      href={`/watch/?vid=${id}&&time=${start_time}`}
      target="_blank"
      rel="noopener norefferer"
    >
      <Typography
        variant="body2"
        color="textSecondary"
        dangerouslySetInnerHTML={createMarkup()}
      ></Typography>
    </Link>
  ) : null;
};

const fans = (vi, fa) =>
  fa || vi ? (
    <Typography>
      {`${vi}个视频`}
      <Bull />
      {`${fa}订阅`}
    </Typography>
  ) : null;

const videoContainer = ({ data = {}, match_frame }) => {
  const href = `/watch/?vid=${data.video_id}`;
  return (
    <div style={styles.container}>
      <div style={styles.head}>{imagePick(data.image_path)}</div>
      <div style={{ gridColumn: 2, gridRow: 1 }}>
        <TitleItem
          pay={data.is_pay}
          title={data.title}
          time={data.upload_time}
          href={href}
        />
      </div>
      <div style={{ gridColumn: 2, gridRow: "2 / 4" }}>
        {descriptionItem(data.description)}
      </div>
      <div style={{ gridColumn: 2, gridRow: 4 }}>
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
    <div style={styles.container}>
      <div style={styles.head}>authAvatar{data.headshot}</div>
      <div style={{ gridColumn: 2, gridRow: 1 }}>
        <TitleItem
          pay={data.is_pay}
          title={data.title}
          time={data.upload_time}
          href={href}
        />
      </div>
      <div style={{ gridColumn: 2, gridRow: "2 / 4" }}>
        {descriptionItem(data.description)}
      </div>
      <div style={{ gridColumn: 2, gridRow: 4 }}>
        {/* {subtitle({ ...match_frame, id })} */}
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

const seriesContainer = ({ data, match_frame }) => {
  const href = `/series/?sid=${data.series_id}`;
  return (
    <div style={styles.container}>
      <div style={styles.head}>{imagePick(data.image_path)}</div>
      <div style={{ gridColumn: 2, gridRow: 1 }}>
        <TitleItem
          pay={data.is_pay}
          title={data.title}
          time={data.upload_time}
          href={href}
        />
      </div>
      <div style={{ gridColumn: 2, gridRow: "2 / 4" }}>
        {descriptionItem(data.description)}
      </div>
      <div style={{ gridColumn: 2, gridRow: 4 }}>
        {/* {subtitle({ ...match_frame, id })} */}
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

const docContainer = ({ data, match_frame }) => {
  const href = `/document/?did=${data.file_id}`;
  return (
    <div style={styles.docContainer}>
      <div style={styles.docHead}>{imagePick(data.image_path)}</div>
      <div stye={{ gridColumn: 2, gridRow: 1 }}>
        <TitleItem
          title={data.title}
          pay={data.is_pay}
          time={data.upload_time}
          href={href}
        />
      </div>
      <div style={styles.docAvatar}>
        {userAvatar(data.user_name, data.headshot, data.user_id, data.download)}
        <Typography
          variant="caption"
          color="textSecondary"
        >{`${data.download}次 下载`}</Typography>
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

  return <div>{Card(card)}</div>;
}
