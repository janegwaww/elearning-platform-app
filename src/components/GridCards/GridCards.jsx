import React from "react";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import CardMedia from "@material-ui/core/CardMedia";
import { slice, flow, map } from "lodash/fp";
import moment from "moment";
import Bull from "../Search/Bull";
import Link from "../Link/Link";
import CardTag from "./CardTag";
import AuthTag from "./AuthTag";
import Moment from "../Moment";
import "./GridCardsStyles.sass";

const GridCards = ({ items = [], loading = false, itemCount = 0 }) => {
  const match = useMediaQuery("(min-width: 600px)");

  // 点击标题跳转事件
  const handleLink = ({ lang, ...other }) => {
    if (other.video_id) {
      return {
        to: `/watch/?vid=${other.video_id}`,
      };
    } else if (other.series_id) {
      return {
        to: `/series/?sid=${other.series_id}`,
      };
    } else if (other.file_id && other.file_path && lang === "cn") {
      return {
        to: `/documentsearch/?dsid=${other.file_id}`,
      };
    } else if (other.file_id && other.file_path) {
      return {
        to: `${other.file_path}`,
      };
    } else if (other.file_id) {
      return {
        to: `/document/?did=${other.file_id}`,
      };
    }
    return { to: "/" };
  };

  const duration = (item) => {
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

  const seriesCounts = (item) =>
    !!item.video_counts && (
      <div className="video-time-tag">
        <Typography variant="caption" color="primary">
          {`共${item.video_counts}课`}
        </Typography>
      </div>
    );

  return (
    <Grid container wrap="wrap" spacing={2} className="grid-cards-container">
      {flow(
        slice(0, itemCount),
        map.convert({ cap: false })((item, index) => (
          <Grid item xs={6} sm={6} md={4} lg={3} xl={3} key={index}>
            <div className="grid-item">
              {item ? (
                <>
                  <Link href={handleLink(item).to}>
                    <CardTag type={item.type}>
                      <CardMedia
                        component="img"
                        alt={item.image_path}
                        src={`${item.image_path}`}
                        className="grid-card-image-head"
                      />
                    </CardTag>
                    {duration(item)}
                    {seriesCounts(item)}
                  </Link>

                  <div className="grid-context-box">
                    <Link href={handleLink(item).to} underline="none">
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
                    </Link>

                    {item.headshot && (
                      <Link
                        href={`/excellentcreator/creator/?cid=${item.user_id}`}
                        underline="none"
                      >
                        <div className="grid-avatar">
                          <Avatar
                            alt={item.user_name}
                            src={`${item.headshot}`}
                            className="avatar"
                          />
                          <Typography
                            variant="caption"
                            className="user-name"
                            noWrap
                          >
                            {item.user_name}
                          </Typography>
                          <AuthTag authority={item.authority} />
                        </div>
                      </Link>
                    )}

                    <div className="grid-card-feedback">
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        noWrap
                      >
                        {item.view_counts ? (
                          <>
                            {`${item.view_counts} 观看`}
                            <Bull />
                          </>
                        ) : null}
                        {item.like_counts && match ? (
                          <>
                            {`${item.like_counts} 点赞`}
                            <Bull />
                          </>
                        ) : null}
                        {item.pay_counts ? `${item.pay_counts} 购买` : null}
                        <Moment
                          date={
                            item.upload_time || item.time || item.update_time
                          }
                        />
                      </Typography>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Skeleton variant="rect" className="grid-img-skeleton" />
                  <div style={{ paddingTop: 10 }}>
                    <Skeleton />
                    <Skeleton width="60%" />
                    <Skeleton />
                  </div>
                </>
              )}
            </div>
          </Grid>
        )),
      )(loading ? Array.from({ length: itemCount }) : items)}
    </Grid>
  );
};

export default GridCards;
