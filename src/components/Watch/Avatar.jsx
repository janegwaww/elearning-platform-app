import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Avatar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextCollapse from "../Comments/TextCollapse";
import ChipArray from "../Introduction/ChipArray";

const useStyles = makeStyles(theme => ({
  subscrib: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  subButton: {
    color: "#fc5659"
  }
}));

const PersonAvatar = () => {
  const classes = useStyles();
  const [chips, setChips] = useState(["资深用户体验设计师"]);
  const [subButton, setSubButton] = useState(false);

  return (
    <Fragment>
      <Paper
        elevation={0}
        style={{
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
          <div className={classes.subscrib}>
            <Typography variant="caption">212,103万 订阅</Typography>
            <Button
              size="small"
              className={classes.subButton}
              onClick={() => setSubButton(prev => !prev)}
            >
              {subButton ? "已订阅" : "+订阅"}
            </Button>
          </div>
          <TextCollapse>
            <div>
              <Typography variant="caption">
                资深视觉设计/UI设计，淘宝天下网商特约访谈嘉宾，与小米、阿里、滴滴的资深设计...
              </Typography>
              <ChipArray chips={chips} />
            </div>
          </TextCollapse>
        </div>
      </Paper>
    </Fragment>
  );
};

export default PersonAvatar;
