import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import LightTooltip from "./LightTooltip";

const useStyles = makeStyles(theme => ({
  item: {
    fontSize: 14,
    margin: theme.spacing(0.5)
  },
  likeButton: {
    "&:hover": {
      color: "#fc5659",
      backgroundColor: "transparent"
    }
  }
}));

export default function UserLikeHeart({
  like = 0,
  likeCounts = 0,
  handleClick = () => ({})
}) {
  const classes = useStyles();

  const HeartIcon = heart =>
    heart === 1 ? (
      <FavoriteIcon className={classes.item} />
    ) : (
      <FavoriteBorderIcon className={classes.item} />
    );

  return (
    <IconButton
      size="small"
      onClick={handleClick}
      className={classes.likeButton}
    >
      {HeartIcon(like)}
      <LightTooltip title="喜欢" placement="bottom">
        <Typography>{likeCounts}</Typography>
      </LightTooltip>
    </IconButton>
  );
}
