import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Pagination from "@material-ui/lab/Pagination";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import TextCollapse from "./TextCollapse";
import { getComments } from "../../services/video";
import { getUser } from "../../services/auth";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2)
  },
  inline: {
    display: "inline"
  },
  pagination: {
    justifyContent: "center"
  },
  userLike: {
    display: "inline-flex",
    alignItems: "center",
    "& > *": {
      marginRight: theme.spacing(4)
    }
  },
  userLikeItem: {
    fontSize: 14
  },
  userLikeIcon: {
    display: "inline-flex",
    alignItems: "center"
  }
}));

export default function CommentList({ vid }) {
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState(false);

  const CommentInput = () => {
    const { name, headshot } = getUser();
    return (
      <div style={{ display: "flex" }}>
        <Avatar alt={name} src={`${headshot}`} />
        <TextField />
      </div>
    );
  };

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

  const UserLike = ({ likeNum = 0, comtNum = 0 }) => (
    <div className={classes.userLike}>
      <IconButton size="small">
        <FavoriteBorderIcon className={classes.userLikeItem} />
        {likeNum}
      </IconButton>
      <IconButton size="small">
        <InsertCommentIcon className={classes.userLikeItem} />
        {comtNum}
      </IconButton>
      <Link
        href="#"
        size="small"
        style={{ color: "#878791" }}
        onClick={e => {
          e.preventDefault();
          setReply(pre => !pre);
        }}
      >
        回复
      </Link>
    </div>
  );

  return (
    <Fragment>
      <div className={classes.root}>
        <Typography>{`${comments.length}条评论`}</Typography>
        <br />
        <CommentInput />
        <List>
          {comments.map(o => (
            <Fragment key={o.user_id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={o.user_name} src={o.headshot} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div>
                      <Typography>{o.user_name}</Typography>
                    </div>
                  }
                  secondary={
                    <Fragment>
                      <TextCollapse>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {o.content}
                        </Typography>
                      </TextCollapse>
                      <UserLike
                        likeNum={o.like_counts}
                        comtNum={o.comment_counts}
                        id={o._id}
                      />
                      {reply ? <CommentInput /> : null}
                    </Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
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
