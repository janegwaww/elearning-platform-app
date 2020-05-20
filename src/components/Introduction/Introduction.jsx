import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
  IconButton,
  Chip,
  Paper,
  Collapse
} from "@material-ui/core";
import FileViewButton from "./FileViewButton";
import { getVideoIntro } from "../../services/video";
import UserFeedback from "./UserFeedback";

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "none"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  chips: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    boxShadow: "none"
  },
  chip: {
    margin: theme.spacing(0.5),
    backgroundColor: "rgba(242,242,245,1)",
    color: "rgba(135,135,145,1)"
  },
  headerItem: {
    display: "flex"
  },
  headerItem1: {
    flex: "2 0 auto"
  },
  headerItem2: {
    flex: "0.1 0 auto"
  },
  paper: {
    boxShadow: "none"
  }
}));

export default function Introduction({ vid = "" }) {
  const [checked, setChecked] = useState(false);
  const [intro, setIntro] = useState({
    likeCounts: 0,
    viewCounts: 0,
    collectionCounts: 0,
    description: "",
    category: [""]
  });
  const classes = useStyles();

  const fetchIntroduction = () => {
    getVideoIntro({ video_id: vid }).then(data => {
      setIntro(data);
    });
  };

  const handleChange = () => {
    setChecked(prev => !prev);
  };

  useEffect(() => {
    fetchIntroduction();
  }, [vid]);

  const ChipArray = ({ chips = [] }) => (
    <Paper component="ul" className={classes.chips}>
      {chips.map(o => (
        <li key={o}>
          <Chip label={o} size="small" className={classes.chip} />
        </li>
      ))}
    </Paper>
  );

  return (
    <Card className={classes.root}>
      <div className={classes.header}>
        <div className={clsx(classes.headerItem, classes.headerItem1)}>
          <UserFeedback backData={intro} />
        </div>
        <div className={clsx(classes.headerItem, classes.headerItem2)}>
          <FileViewButton />
        </div>
        <div className={classes.headerItem}>
          <IconButton aria-label="settings">
            <MoreVertIcon fontSize="medium" />
          </IconButton>
        </div>
      </div>
      <Divider />
      <CardContent>
        <Collapse in={checked} collapsedHeight={60}>
          <Paper elevation={4} className={classes.paper}>
            <Typography variant="body2" component="p">
              {intro.description}
            </Typography>
          </Paper>
        </Collapse>
      </CardContent>
      <ChipArray chips={intro.category} />
      <CardActions>
        <Button size="small" color="secondary" onClick={handleChange}>
          {checked ? "收起" : "查看更多"}
          {checked ? (
            <ExpandLessIcon fontSize="small" />
          ) : (
            <ExpandMoreIcon fontSize="small" />
          )}
        </Button>
      </CardActions>
    </Card>
  );
}
