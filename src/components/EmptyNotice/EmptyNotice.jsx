import React from "react";
import Typography from "@material-ui/core/Typography";

export default function EmptyNotice({ empty = true }) {
  return empty ? (
    <div
      style={{
        height: "30vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" align="center">
        已经没有更多数据了...
      </Typography>
    </div>
  ) : null;
}
