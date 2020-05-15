import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

export default function CommentList() {
  const classes = useStyles();

  const CommentInput = () => {
    return (
      <div style={{ display: "flex" }}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <TextField />
      </div>
    );
  };

  return (
    <div>
      <Typography>739条评论</Typography>
      <CommentInput />
      <List className={classes.root}>
        {Array.from({ length: 10 }).map((o, i) => (
          <Fragment key={i}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        ))}
      </List>
      <Pagination count={10} variant="outlined" shape="rounded" />
    </div>
  );
}
