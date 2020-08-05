import React from "react";
import Typography from "@material-ui/core/Typography";

const VideoPlayerTitle = ({ title = "", ...props }) => {
  return (
    <div style={{ paddingTop: "0.35em" }}>
      <Typography variant="h6" gutterBottom noWrap {...props}>
        {title && title}
      </Typography>
    </div>
  );
};

export default VideoPlayerTitle;
