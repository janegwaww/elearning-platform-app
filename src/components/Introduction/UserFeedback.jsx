import React, { useState, useEffect } from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SharePopover from "./SharePopover";
import { likeTheVideo, collectTheVideo } from "../../services/video";
import LightTooltip from "./LightTooltip";
import UserLikeHeart from "./UserLikeHeart";

export default function UserFeedback({ backData = {} }) {
  const [like, setLike] = useState(0);
  const [collect, setCollect] = useState(0);
  const [lCounts, setLCounts] = useState(0);
  const [id, setId] = useState("");

  const oppositeValue = (val) => (val === 1 ? 0 : 1);

  const actionEvent = (setData, actApi, value, callback = () => ({})) => {
    const val = oppositeValue(value);
    /* setData(val); */
    actApi({
      relation_id: [id],
      value: val,
      type: "video",
    }).then((data) => {
      if (data) {
        setData(val);
        callback(val);
      }
    });
  };

  const handleLikeClick = (event) => {
    event.preventDefault();
    actionEvent(setLike, likeTheVideo, like, (val) =>
      val
        ? setLCounts((prev) => prev + 1)
        : setLCounts((prev) => {
            if (prev >= 1) {
              return prev - 1;
            }
            return prev;
          })
    );
  };

  const handleStarClick = () =>
    actionEvent(setCollect, collectTheVideo, collect);

  const StarOrNot = (star) =>
    star === 1 ? (
      <StarIcon style={{ fontSize: 18, margin: "8px" }} />
    ) : (
      <StarBorderIcon style={{ fontSize: 18, margin: "8px" }} />
    );

  useEffect(() => {
    setLike(backData.is_like);
    setCollect(backData.is_collect);
    setLCounts(backData.like_counts);
    setId(backData.video_id);
  }, [backData.is_like, backData.is_collect]);

  return (
    <div className="user-feedback">
      <IconButton size="small" className="user-play-count">
        <PlayCircleOutlineIcon style={{ fontSize: 16, margin: "8px" }} />
        <LightTooltip title="播放" placement="bottom">
          <Typography>{backData.view_counts}</Typography>
        </LightTooltip>
      </IconButton>

      <UserLikeHeart
        like={like}
        likeCounts={lCounts}
        handleClick={handleLikeClick}
      />

      <SharePopover>
        {(handleShare) => (
          <IconButton
            size="small"
            onClick={handleShare}
            className="user-play-count"
          >
            <LightTooltip title="分享">
              <ShareIcon style={{ fontSize: 16, margin: "8px" }} />
            </LightTooltip>
          </IconButton>
        )}
      </SharePopover>

      <IconButton
        size="small"
        onClick={handleStarClick}
        className="user-collection"
      >
        <LightTooltip title="收藏" placement="bottom">
          {StarOrNot(collect)}
        </LightTooltip>
      </IconButton>
    </div>
  );
}
