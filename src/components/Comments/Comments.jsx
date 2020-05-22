import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { Avatar, List, TextField, Typography } from "@material-ui/core";
import CommentListItem from "./CommentListItem";
import { getComments } from "../../services/video";
import { getUser } from "../../services/auth";
import "./Comments.sass";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2)
  },
  pagination: {
    justifyContent: "center"
  }
}));

const CommentInput = () => {
  const { name, headshot } = getUser();
  return (
    <div style={{ display: "flex" }}>
      <Avatar alt={name} src={`${headshot}`} />
      <TextField />
    </div>
  );
};

export default function CommentList({ vid }) {
  const classes = useStyles();
  const [comments, setComments] = useState([]);

  const setCommentsMethod = () => {
    getComments({
      video_id: vid,
      parent_id: "",
      max_size: 10,
      page: 1
    }).then(data => setComments(data));
  };

  useEffect(() => {
    setCommentsMethod();
  }, [vid]);

  return (
    <Fragment>
      <div className={classes.root}>
        <Typography>{`${comments.length}条评论`}</Typography>
        <br />
        <CommentInput />
        <List>
          {comments.map(o => (
            <CommentListItem listItem={o} key={o.user_id} />
          ))}
        </List>
      </div>
      <div style={{ marginTop: 8 }}>
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          classes={{ ul: classes.pagination }}
        />
      </div>
    </Fragment>
  );
}
