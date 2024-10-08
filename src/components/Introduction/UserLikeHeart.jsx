import React from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import LightTooltip from "./LightTooltip";

export default function UserLikeHeart({
  like = 0,
  likeCounts = 0,
  handleClick = () => ({}),
  ...props
}) {
  const HeartIcon = (heart) =>
    heart === 1 ? (
      <FavoriteIcon style={{ fontSize: 16, margin: 4 }} />
    ) : (
      <FavoriteBorderIcon style={{ fontSize: 16, margin: 4 }} />
    );

  return (
    <IconButton
      size="small"
      onClick={handleClick}
      className="user-like-heart"
      {...props}
    >
      <LightTooltip title="喜欢" placement="bottom">
        {HeartIcon(like)}
      </LightTooltip>
      <div style={{ fontSize: "0.875rem" }}>{likeCounts}</div>
    </IconButton>
  );
}
