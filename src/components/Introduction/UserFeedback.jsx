import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import SharePopover from "./SharePopover";
import { likeTheVideo, collectTheVideo } from "../../services/video";

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

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "rgba(242,242,245,1)",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

export default function UserFeedback({
  backData: { viewCounts, likeCounts, collectionCounts, id, isLike, isCollect }
}) {
  const classes = useStyles();
  const [like, setLike] = useState(isLike);
  const [collect, setCollect] = useState(isCollect);

  const oppositeValue = val => (val === 1 ? 0 : 1);

  const actionEvent = (setData, actApi, value) => {
    const val = oppositeValue(value);
    setData(val);
    actApi({
      relation_id: id,
      value: val,
      type: "video"
    }).then(data => {
      if (data) {
        setData(val);
      }
    });
  };

  const likeAction = () => {
    actionEvent(setLike, likeTheVideo, like);
  };

  const collectAction = () => {
    actionEvent(setCollect, collectTheVideo, collect);
  };

  const handleClick = act => {
    switch (act) {
      case "like":
        likeAction();
        break;
      case "collect":
        collectAction();
        break;
      default:
        console.log("no action");
    }
  };

  const HeartIcon = () =>
    like === 0 ? (
      <FavoriteIcon className={classes.item} />
    ) : (
      <FavoriteBorderIcon className={classes.item} />
    );

  const StarOrNot = () =>
    collect ? (
      <StarIcon className={classes.item} />
    ) : (
      <StarBorderIcon className={classes.item} />
    );

  return (
    <div className={classes.root}>
      <IconButton size="small" className={classes.viewButton}>
        <PlayCircleOutlineIcon className={classes.item} />
        <LightTooltip title="播放" placement="bottom">
          <Typography>{viewCounts}</Typography>
        </LightTooltip>
      </IconButton>

      <IconButton
        size="small"
        onClick={() => handleClick("like")}
        className={classes.likeButton}
      >
        <HeartIcon />
        <LightTooltip title="喜欢" placement="bottom">
          <Typography>{likeCounts}</Typography>
        </LightTooltip>
      </IconButton>

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
        onClick={() => handleClick("collect")}
        className={classes.collectButton}
      >
        <StarOrNot />
        <LightTooltip title="收藏" placement="bottom">
          <Typography>{collectionCounts}</Typography>
        </LightTooltip>
      </IconButton>
    </div>
  );
}
