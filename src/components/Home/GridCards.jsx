import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";

function GridCards({ items = [], loading = false, itemCount = 0 }) {
  const imagePath = path => `http://api.haetek.com:9191/${path}`;

  return (
    <Grid container wrap="wrap" spacing={2}>
      {(loading ? Array.from(new Array(itemCount)) : items).map(
        (item, index) => (
          <Grid item xs={3}>
            <Box
              key={index}
              width="100%"
              style={{
                border: "1px solid rgba(242,242,245,1)",
                borderRadius: "12px",
                overflow: "hidden"
              }}
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
                    <Avatar
                      alt={item.user_name}
                      src={item.head_shot}
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
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="caption" color="textSecondary">
                      {`来自频道@${item.category && item.category.toString()}`}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(item.time).toISOString().slice(0, 10)}
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
