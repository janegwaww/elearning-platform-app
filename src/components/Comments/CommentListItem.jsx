import React, { useState, useEffect, Fragment } from "react";
import clsx from "clsx";
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
import UserLikeHeart from "../Introduction/UserLikeHeart";
import { likeTheVideo, getComments } from "../../services/video";

const UserLike = ({
  isLike = 0,
  likeNum = 0,
  comtNum,
  id = "",
  handleLike,
  handleShows,
  handleReply
}) => (
  <div className="user-like">
    <UserLikeHeart
      like={isLike}
      likeCounts={likeNum}
      handleClick={() => handleLike(id)}
    />
    {comtNum >= 0 && (
      <IconButton size="small" onClick={() => handleShows(id)}>
        <InsertCommentIcon className="user-like-item" />
        <Typography>{comtNum}</Typography>
      </IconButton>
    )}
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

export default function CommentListItem({ listItem = {} }) {
  const [isLike, setIsLike] = useState(0);
  const [childComments, setChildComments] = useState([]);
  const [commentCounts, setCommentCounts] = useState(0);
  const [child, setChild] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const isChild = () => listItem.parent_id !== "0";

  const handleLike = id => {
    const val = isLike === 1 ? 0 : 1;
    setIsLike(val);
    likeTheVideo({ relation_id: id, value: val, type: "comment" }).then(
      data => {
        if (data) {
          setIsLike(val);
        }
      }
    );
  };

  const handleShows = id => {
    if (commentCounts >= 0) {
      setShowReply(prev => !prev);
      getComments({
        video_id: listItem.video_id,
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
    setIsLike(listItem.is_like);
    setCommentCounts(listItem.comment_counts);
    setChild(isChild);
  }, []);

  return (
    <Fragment>
      <div className="list-body">
        <div className="list-avatar">
          <Avatar
            alt={listItem.user_name}
            src={listItem.headshot}
            className={clsx(child && "child-avatar")}
          />
        </div>

        <div className="list-head">
          <Typography>{listItem.user_name}</Typography>
          <LocalAtmIcon fontSize="small" className="local-atm-icon" />
          <div className="list-time">
            <Typography style={{ fontSize: "12px" }}>
              {new Date(listItem.time).toISOString().slice(0, 10)}
            </Typography>
          </div>
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
            comtNum={commentCounts}
            isLike={isLike}
            id={listItem._id}
            handleLike={handleLike}
            handleShows={handleShows}
            handleReply={handleReply}
          />
        </div>
        {!child && (
          <div className="list-children">
            {showReply && (
              <div>
                {childComments.map(o => (
                  <CommentListItem listItem={o} key={o.user_id} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {!child && <Divider variant="inset" component="li" />}
    </Fragment>
  );
}
