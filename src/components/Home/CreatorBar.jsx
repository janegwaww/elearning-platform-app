import React, { useState } from "react";
import { navigate } from "gatsby";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ButtonBase from "@material-ui/core/ButtonBase";
import GridCards from "../Home/GridCards";

const SubButton = withStyles({
  root: {
    color: "#fff",
    backgroundColor: "#fc5659",
    borderRadius: 4,
    padding: "2px 4px",
    "&:hover": {
      backgroundColor: "#fc5659"
    }
  }
})(ButtonBase);

export default function CreatorBar({ info, ...props }) {
  const [subscript, setSubscript] = useState(false);

  return (
    <div style={{ display: "flex", marginBottom: "10px" }}>
      <div style={{ width: 380, display: "flex" }}>
        <Avatar
          alt={info.user_name}
          src={info.headshot}
          style={{ width: 50, height: 50, cursor: "pointer" }}
          onClick={() =>
            navigate(`/excellentcreator/creator?cid=${info.author_id}`, {
              state: { cid: info.author_id }
            })
          }
        />
        <div style={{ padding: "0 10px", width: "100%" }}>
          <div>
            <Typography variant="body2">{info.user_name}</Typography>
          </div>
          <br />
          <div style={{ minHeight: 80 }}>
            <Typography variant="body2">{info.introduction}</Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "4px 0"
            }}
          >
            <SubButton onClick={() => setSubscript(prev => !prev)}>
              <Typography variant="caption">
                {subscript ? "已订阅" : "+订阅"}
              </Typography>
            </SubButton>
            <Typography
              variant="caption"
              color="textSecondary"
            >{`${info.fans_counts} 订阅`}</Typography>
          </div>
        </div>
      </div>
      <GridCards itemCount={4} {...props} items={info.video_data} />
    </div>
  );
}
