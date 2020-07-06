import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Bull from "../Search/Bull";
import Link from "../Link/Link";
import { secondsToMouth } from "../../services/utils";
import "./GridCardsStyles.sass";

function GridCards({ items = [], loading = false, itemCount = 0 }) {
  const [list, setList] = useState([]);

  const cutItemsToCount = (arr = [], num = 0) => arr.slice(0, num);

  // 点击标题跳转事件
  const handleLink = ({ video_id, series_id }) => {
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
    return { to: "/", state: {} };
  };

  const isSeries = ({ video_id, series_id }) =>
    series_id && (
      <div className="series-tag">
        <Typography color="primary" variant="caption">
          系列
        </Typography>
      </div>
    );

  const duration = ({ video_time }) =>
    video_time && (
      <Box className="video-time-tag">
        <Typography variant="caption" color="primary">
          {video_time}
        </Typography>
      </Box>
    );

  const seriesCounts = ({ video_counts }) =>
    video_counts && (
      <Box className="video-time-tag">
        <Typography variant="caption" color="primary">
          {`共${video_counts}课`}
        </Typography>
      </Box>
    );

  useEffect(() => {
    setList(cutItemsToCount(items, itemCount));
  }, [loading, items]);

  return (
    <Grid container wrap="wrap" spacing={2} className="grid-cards-container">
      {(loading ? Array.from(new Array(itemCount)) : [...list]).map(
        (item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
            <Box width="100%" className="grid-item">
              {item ? (
                <Link href={handleLink(item).to}>
                  <div className="grid-card-image-head">
                    <img alt={item.image_path} src={`${item.image_path}`} />
                  </div>
                  {isSeries(item)}
                  {duration(item)}
                  {seriesCounts(item)}
                </Link>
              ) : (
                <Skeleton variant="rect" width="100%" height={166} />
              )}

              {item ? (
                <Box style={{ padding: 16 }}>
                  <Link href={handleLink(item).to} color="textPrimary">
                    <Tooltip placement="top-start" title={item.title}>
                      <Typography
                        gutterBottom
                        variant="body2"
                        noWrap
                        align="left"
                      >
                        {item.title}
                      </Typography>
                    </Tooltip>
                  </Link>

                  {item.headshot ? (
                    <Link
                      href={`/excellentcreator/creator/?cid=${item.user_id}`}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          alt={item.user_name}
                          src={`${item.headshot}`}
                          style={{ width: 28, height: 28, margin: 8 }}
                        />
                        <Typography
                          display="block"
                          variant="caption"
                          color="textSecondary"
                        >
                          {item.user_name}
                        </Typography>
                      </div>
                    </Link>
                  ) : null}

                  <div>
                    {(item.view_counts ||
                      item.like_counts ||
                      item.time ||
                      item.upload_time) && (
                      <Typography variant="caption" color="textSecondary">
                        {item.view_counts} 观看
                        <Bull />
                        {item.like_counts} 点赞
                        <Bull />
                        {secondsToMouth(item.upload_time)} 发布
                      </Typography>
                    )}
                  </div>
                </Box>
              ) : (
                <Box pt={1}>
                  <Skeleton />
                  <Skeleton width="60%" />
                  <Skeleton />
                </Box>
              )}
            </Box>
          </Grid>
        )
      )}
    </Grid>
  );
}

GridCards.propTypes = {
  loading: PropTypes.bool,
  items: PropTypes.array,
  itemCount: PropTypes.number,
};

export default GridCards;
