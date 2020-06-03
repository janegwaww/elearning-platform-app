import React, { Fragment, useState, useEffect } from "react";
import { navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Avatar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextCollapse from "../Comments/TextCollapse";
import ChipArray from "../Introduction/ChipArray";
import { subscribeAuth } from "../../services/video";

const useStyles = makeStyles(theme => ({
  subscrib: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  subButton: {
    color: "#fc5659"
  },
  paper: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

const PersonAvatar = ({ auth = {} }) => {
  const classes = useStyles();
  const { user_id, user_name, headshot, is_subscribe } = auth;
  const [chips, setChips] = useState(["资深用户体验设计师"]);
  const [subButton, setSubButton] = useState(false);

  const handleSub = () => {
    setSubButton(prev => !prev);
    const val = subButton ? 0 : 1;
    subscribeAuth({ relation_id: user_id, value: val, type: "author" }).then(
      res => {
        if (res) {
          setSubButton(val);
        }
      }
    );
  };

  useEffect(() => {
    setSubButton(is_subscribe === 1);
  }, []);

  return (
    <Fragment>
      <Paper elevation={0} className={classes.paper}>
        <Avatar
          alt="avatar"
          src={headshot}
          style={{ marginRight: "8px" }}
          onClick={() =>
            navigate(`/excellentcreator/creator?cid=${user_id}`, {
              state: { cid: "" }
            })
          }
        />
        <div>
          <Typography>{user_name}</Typography>
          <div className={classes.subscrib}>
            <Typography variant="caption">212,103万 订阅</Typography>
            <Button
              size="small"
              className={classes.subButton}
              onClick={() => handleSub()}
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
