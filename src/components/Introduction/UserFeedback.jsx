import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles(theme => ({
  root: {
    display: "inline-flex",
    alignItems: "center",
    "& > button": {
      margin: "0 16px"
    }
  },
  item: {
    fontSize: 18,
    margin: theme.spacing(0.5)
  },
  viewButton: {
    "&:hover": {
      color: theme.palette.secondary.main,
      backgroundColor: "transparent"
    }
  },
  likeButton: {
    "&:hover": {
      color: "#fc5659",
      backgroundColor: "transparent"
    }
  },
  shareButton: {
    "&:hover": {
      color: theme.palette.secondary.main,
      backgroundColor: "transparent"
    }
  },
  collectButton: {
    "&:hover": {
      color: "#fdc44f",
      backgroundColor: "transparent"
    }
  }
}));

export default function UserFeedback({
  backData: { viewCounts, likeCounts, id, isLike, isCollect }
}) {
  const classes = useStyles();
  const [like, setLike] = useState(0);
  const [collect, setCollect] = useState(0);
  const [lCounts, setLCounts] = useState(0);

  const oppositeValue = val => (val === 1 ? 0 : 1);

  const actionEvent = (setData, actApi, value, callback) => {
    const val = oppositeValue(value);
    /* setData(val); */
    actApi({
      relation_id: id,
      value: val,
      type: "video"
    }).then(data => {
      if (data) {
        setData(val);
        typeof callback === "function" && callback(val);
      }
    });
  };

  const handleLikeClick = event => {
    event.preventDefault();
    actionEvent(setLike, likeTheVideo, like, val =>
      val
        ? setLCounts(prev => prev + 1)
        : setLCounts(prev => {
            if (prev >= 1) {
              return prev - 1;
            }
            return prev;
          })
    );
  };

  const handleStarClick = () =>
    actionEvent(setCollect, collectTheVideo, collect);

  const StarOrNot = star =>
    star === 1 ? (
      <StarIcon className={classes.item} />
    ) : (
      <StarBorderIcon className={classes.item} />
    );

  useEffect(() => {
    setLike(isLike);
    setCollect(isCollect);
    setLCounts(likeCounts);
  }, [isLike, isCollect]);

  return (
    <div className={classes.root}>
      <IconButton size="small" className={classes.viewButton}>
        <PlayCircleOutlineIcon className={classes.item} />
        <LightTooltip title="播放" placement="bottom">
          <Typography>{viewCounts}</Typography>
        </LightTooltip>
      </IconButton>

      <UserLikeHeart
        like={like}
        likeCounts={lCounts}
        handleClick={handleLikeClick}
      />

      <SharePopover>
        {handleShare => (
          <IconButton
            aria-describedby={id}
            size="small"
            onClick={handleShare}
            className={classes.shareButton}
          >
            <LightTooltip title="分享">
              <ShareIcon className={classes.item} />
            </LightTooltip>
          </IconButton>
        )}
      </SharePopover>

      <IconButton
        size="small"
        onClick={handleStarClick}
        className={classes.collectButton}
      >
        <LightTooltip title="收藏" placement="bottom">
          {StarOrNot(collect)}
        </LightTooltip>
      </IconButton>
    </div>
  );
}
