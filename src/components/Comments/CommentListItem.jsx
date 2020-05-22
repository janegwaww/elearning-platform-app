import React, { useState, useEffect, Fragment } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import {
  Avatar,
  Typography,
  IconButton,
  Link,
  Divider,
  List
} from "@material-ui/core";
import TextCollapse from "./TextCollapse";
import { likeTheVideo, getComments } from "../../services/video";

const UserLike = ({
  likeNum = 0,
  comtNum = 0,
  id = "",
  handleLike,
  handleShows,
  handleReply
}) => (
  <div className="user-like">
    <IconButton size="small" onClick={() => handleLike(id)}>
      <FavoriteBorderIcon className="user-like-item" />
      <Typography>{likeNum}</Typography>
    </IconButton>
    <IconButton size="small" onClick={() => handleShows(id)}>
      <InsertCommentIcon className="user-like-item" />
      <Typography>{comtNum}</Typography>
    </IconButton>
    <Link
      href="#"
      size="small"
      style={{ color: "#878791" }}
      onClick={e => {
        e.preventDefault();
        handleReply(id);
      }}
    >
      回复
    </Link>
  </div>
);

export default function CommentListItem({ children, listItem = {} }) {
  const { is_like, comment_counts, video_id } = listItem;
  const [isLike, setIsLike] = useState(is_like);
  const [childComments, setChildComments] = useState([]);

  const handleLike = id => {
    const val = isLike === 1 ? 0 : 1;
    likeTheVideo({ relation_id: id, value: val, type: "comment" }).then(
      data => {
        if (data) {
          setIsLike(val);
        }
      }
    );
  };

  const handleShows = id => {
    if (comment_counts >= 0) {
      getComments({
        video_id: video_id,
        parent_id: id,
        max_size: 10,
        page: 1
      }).then(data => {
        setChildComments(data);
      });
    }
  };

  const handleReply = id => {};

  useEffect(() => {
    setIsLike(is_like);
  }, []);

  return (
    <Fragment>
      <div className="list-body">
        <div className="list-avatar">
          <Avatar alt={listItem.user_name} src={listItem.headshot} />
        </div>

        <div className="list-head">
          <Typography>{listItem.user_name}</Typography>
          <LocalAtmIcon fontSize="small" className="local-atm-icon" />
        </div>

        <div className="list-time">
          <Typography style={{ fontSize: "12px" }}>
            {new Date(listItem.time).toISOString().slice(0, 10)}
          </Typography>
        </div>

        <div className="list-content">
          <TextCollapse>
            <Typography
              component="span"
              variant="body2"
              className="comment-item-content"
              color="textPrimary"
            >
              {listItem.content}
            </Typography>
          </TextCollapse>
        </div>

        <div className="list-user-active">
          <UserLike
            likeNum={listItem.like_counts}
            comtNum={listItem.comment_counts}
            isLike={isLike}
            id={listItem._id}
            handleLike={handleLike}
            handleShows={handleShows}
            handleReply={handleReply}
          />
        </div>
        <div className="list-children">
          <List>
            {childComments.map(o => (
              <CommentListItem listItem={o} key={o.user_id} />
            ))}
          </List>
        </div>
      </div>
      <Divider variant="inset" component="li" />
    </Fragment>
  );
}
