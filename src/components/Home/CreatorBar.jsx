import React from "react";
import Typography from "@material-ui/core/Typography";
import GridCards from "../Home/GridCards";

export default function CreatorBar({ info }) {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 380 }}>
        <Typography>{info.user_name}</Typography>
      </div>
      <GridCards itemCount={4} loading={true} />
    </div>
  );
}
