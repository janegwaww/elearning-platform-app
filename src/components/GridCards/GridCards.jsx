import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import CardMedia from "@material-ui/core/CardMedia";
import { slice, flow, map } from "lodash/fp";
import Bull from "../Search/Bull";
import Link from "../Link/Link";
import CardTag from "./CardTag";
import AuthTag from "./AuthTag";
import Moment from "../Moment";
import "./GridCardsStyles.sass";

const GridCards = ({ items = [], loading = false, itemCount = 0 }) => {
  const [list, setList] = useState([]);
  const match = useMediaQuery("(min-width: 600px)");

  // 点击标题跳转事件
  const handleLink = ({ video_id, series_id, file_id, file_path, lang }) => {
    if (video_id) {
      return {
        to: `/watch/?vid=${video_id}`,
        state: { vid: video_id },
      };
    }
    if (series_id) {
      return {
        to: `/series/?sid=${series_id}`,
        state: { sid: series_id },
      };
    }
    if (file_id && file_path && lang === "cn") {
      return {
        to: `/documentsearch/?dsid=${file_id}`,
      };
    }
    if (file_id && file_path) {
      return {
        to: `${file_path}`,
      };
    }
    if (file_id) {
      return {
        to: `/document/?did=${file_id}`,
        state: { did: file_id },
      };
    }
    return { to: "/", state: {} };
  };

  const duration = ({ video_time }) =>
    video_time && (
      <div className="video-time-tag">
        <Typography variant="caption" color="inherit">
          {video_time}
        </Typography>
      </div>
    );

  const seriesCounts = ({ video_counts }) =>
    video_counts && (
      <div className="video-time-tag">
        <Typography variant="caption" color="primary">
          {`共${video_counts}课`}
        </Typography>
      </div>
    );

  const gridCard = (item, index) => (
    <Grid item xs={6} sm={6} md={4} lg={3} xl={3} key={index}>
      <div className="grid-item">
        {item ? (
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
        ) : (
          <Skeleton variant="rect" className="grid-img-skeleton" />
        )}

        {item ? (
          <div className="grid-context-box">
            <Link href={handleLink(item).to} color="textPrimary">
              {(!!item.title || !!item.video_title) && (
                <Tooltip placement="top-start" title={item.title}>
                  <Typography gutterBottom variant="body2" noWrap align="left">
                    {item.title}
                    {item.video_title}
                  </Typography>
                </Tooltip>
              )}
              {!!item.file_name && (
                <Tooltip placement="top-start" title={item.file_name}>
                  <Typography gutterBottom variant="body2" noWrap align="left">
                    {item.file_name}
                  </Typography>
                </Tooltip>
              )}
            </Link>
            {item.introduction && (
              <Typography
                variant="caption"
                color="textSecondary"
                noWrap
                gutterBottom
              >
                {item.introduction}
              </Typography>
            )}

            {!!item.headshot && (
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
                    color="textSecondary"
                    component="div"
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
              <Typography variant="caption" color="textSecondary" noWrap>
                {!!item.view_counts && `${item.view_counts} 观看`}
                {!!item.view_counts && <Bull />}
                {!!item.like_counts && match && `${item.like_counts} 点赞`}
                {!!item.like_counts && match && <Bull />}
                <Moment
                  date={item.upload_time || item.time || item.update_time}
                />
                {!!item.pay_counts && `${item.pay_counts} 购买`}
              </Typography>
            </div>
          </div>
        ) : (
          <div style={{ paddingTop: 10 }}>
            <Skeleton />
            <Skeleton width="60%" />
            <Skeleton />
          </div>
        )}
      </div>
    </Grid>
  );

  useEffect(() => {
    setList(items);
  }, [items]);

  return (
    <Grid container wrap="wrap" spacing={2} className="grid-cards-container">
      {flow(
        slice(0, itemCount),
        map.convert({ cap: false })(gridCard),
      )(loading ? Array.from({ length: itemCount }) : list)}
    </Grid>
  );
};

export default GridCards;
