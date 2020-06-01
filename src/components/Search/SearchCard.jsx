import React from "react";
import { navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    height: 148,
    margin: "20px 0",
    gridTemplateColumns: "246px auto",
    gridTemplateRows: "24px auto auto 30px",
    gap: "10px",
    gridAutoFlow: "row",
    cursor: "pointer"
  },
  img: {
    height: "100%",
    width: 246,
    gridColumn: 1,
    gridRow: "1 / 5",
    "& > img": {
      height: "100%",
      width: "246px"
    }
  },
  title: {
    gridColumn: 2,
    gridRow: 1,
    alignItems: "center"
  },
  description: {
    gridColumn: 2,
    gridRow: "2 / 4"
  },
  auth: {
    gridColumn: 2,
    gridRow: 4,
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    height: 28,
    width: 28,
    marginRight: 5
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  }
}));

export default function SearchCard({ card = {} }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const imagePath = path => `http://api.haetek.com:9191/${path}`;

  const handleCardClick = id => {
    id && navigate(`/watch?vid=${id}`, { state: { vid: id } });
  };

  return (
    <div
      className={classes.root}
      onClick={() => handleCardClick(card.video_id)}
    >
      <div className={classes.img}>
        <img src={imagePath(card.image_path)} alt={card.title} />
      </div>
      <div className={classes.title}>
        <Typography>{card.title}</Typography>
      </div>
      <div className={classes.description}>
        <Typography variant="body2" color="textSecondary">
          {card.description}
        </Typography>
      </div>
      <div className={classes.auth}>
        <Avatar
          src={card.headshot}
          alt={card.user_name}
          className={classes.avatar}
        />
        <Typography variant="caption">{card.user_name}</Typography>
        <div style={{ marginRight: 40 }} />
        <Typography variant="caption" color="textSecondary">
          {card.view_counts}观看{bull}
          {card.comment_counts}回应{bull}
          {card.like_counts}点赞
        </Typography>
      </div>
    </div>
  );
}
