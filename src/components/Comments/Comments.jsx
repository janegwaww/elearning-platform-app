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
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0
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

  const setCommentsMethod = ({ page = 1 }) => {
    getComments({
      video_id: vid,
      parent_id: "",
      max_size: 10,
      page
    }).then(data => setComments(data));
  };

  const handlePage = (event, page) => {
    event.preventDefault();
    setCommentsMethod({ page });
  };

  useEffect(() => {
    setCommentsMethod({});
  }, [vid]);

  return (
    <Fragment>
      <div className={classes.root}>
        <Typography>{`${comments.length}条评论`}</Typography>
        <br />
        <CommentInput />
        <List classes={{ root: classes.list }}>
          {comments.map(o => (
            <CommentListItem listItem={o} key={o.user_id} />
          ))}
        </List>
      </div>
      <div style={{ marginTop: 8 }}>
        <Pagination
          count={Math.ceil(comments.length / 10)}
          variant="outlined"
          shape="rounded"
          classes={{ ul: classes.pagination }}
          onChange={handlePage}
        />
      </div>
    </Fragment>
  );
}
