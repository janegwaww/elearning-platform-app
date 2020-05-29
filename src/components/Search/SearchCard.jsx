import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    height: 148,
    margin: "10px 0",
    borderBottom: "1px solid #f2f2f5",
    gridTemplateColumns: "246px auto",
    gridTemplateRows: "24px auto auto 30px",
    gap: "10px",
    gridAutoFlow: "row"
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
    gridRow: " 2 / 4"
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
  }
}));

export default function SearchCard({ card = {} }) {
  const classes = useStyles();

  const imagePath = path => `http://api.haetek.com:9191/${path}`;

  return (
    <div className={classes.root}>
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
      </div>
    </div>
  );
}
