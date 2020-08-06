import React from "react";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

const VideoPlayerTitle = ({ title = "", ...props }) => {
  return (
    <div style={{ paddingTop: "0.35em" }}>
      <Tooltip title={title} placement="top-start">
        <Typography variant="h6" gutterBottom noWrap {...props}>
          {title && title}
        </Typography>
      </Tooltip>
    </div>
  );
};

export default VideoPlayerTitle;
