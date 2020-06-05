import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";

function GridCards({ items = [], loading = false, itemCount = 0 }) {
  const imagePath = path => `http://api.haetek.com:9191/${path}`;
  const [list, setList] = useState([]);

  const cutItemsToCount = (arr = [], num = 0) => arr.slice(0, num);

  const handleClick = ({ video_id, series_id }) => {
    !!video_id &&
      navigate(`/watch/?vid=${video_id}`, { state: { vid: video_id } });
    !!series_id &&
      navigate(`/series/?sid=${series_id}`, { state: { sid: series_id } });
  };

  useEffect(() => {
    setList(cutItemsToCount(items, itemCount));
  }, [, loading]);

  return (
    <Grid container wrap="wrap" spacing={2}>
      {(loading ? Array.from(new Array(itemCount)) : list).map(
        (item, index) => (
          <Grid item xs={3} key={index}>
            <Box
              width="100%"
              style={{
                border: "1px solid rgba(242,242,245,1)",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#fff",
                cursor: "pointer"
              }}
              onClick={() => handleClick(item)}
            >
              {item ? (
                <img
                  style={{ width: "100%", height: 160 }}
                  alt={item.title}
                  src={imagePath(item.image_path)}
                />
              ) : (
                <Skeleton variant="rect" width="100%" height={160} />
              )}

              {item ? (
                <Box p={2}>
                  <Typography gutterBottom variant="body2">
                    {item.title}
                  </Typography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {item.head_shot && (
                      <Avatar
                        alt={item.user_name}
                        src={item.head_shot}
                        style={{ width: 28, height: 28, margin: 8 }}
                      />
                    )}
                    <Typography
                      display="block"
                      variant="caption"
                      color="textSecondary"
                    >
                      {item.user_name}
                    </Typography>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="caption" color="textSecondary">
                      {item.category &&
                        `来自频道@${item.category && item.category.toString()}`}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {item.time &&
                        new Date(item.time * 1000).toISOString().slice(0, 10)}
                    </Typography>
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
  itemCount: PropTypes.number
};

export default GridCards;
