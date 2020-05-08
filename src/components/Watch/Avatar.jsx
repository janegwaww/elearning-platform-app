import React, { Component, Fragment } from "react";
import { Paper, Avatar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

class PersonAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Paper
          elevation={0}
          style={{
            height: "120px",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Avatar
            alt="avatar"
            src="../images/qq-icon.png"
            style={{ marginRight: "8px" }}
          />
          <div>
            <Typography>Eddie Lobanovskiy</Typography>
            <div>
              <Typography variant="caption">212,103万 订阅</Typography>
            </div>
            <Typography variant="caption">
              资深视觉设计/UI设计，淘宝天下网商特约访谈嘉宾，与小米、阿里、滴滴的资深设计...
            </Typography>
          </div>
        </Paper>
      </Fragment>
    );
  }
}

export default PersonAvatar;
