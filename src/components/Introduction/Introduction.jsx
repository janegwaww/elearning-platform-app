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
  Paper,
  Collapse,
  Menu,
  MenuItem
} from "@material-ui/core";
import FileViewButton from "./FileViewButton";
import { getVideoIntro } from "../../services/video";
import UserFeedback from "./UserFeedback";
import ChipArray from "./ChipArray";

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "none"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
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
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [intro, setIntro] = useState({
    likeCounts: 0,
    viewCounts: 0,
    collectionCounts: 0,
    description: "",
    category: [""]
  });
  const [anchorEl, setAnchorEl] = useState(null);

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

  const ExpandIcon = () =>
    checked ? (
      <ExpandLessIcon fontSize="small" />
    ) : (
      <ExpandMoreIcon fontSize="small" />
    );

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      id="user-feedback-complaint-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MenuItem
        onClick={e => {
          e.preventDefault();
          handleMenuClose();
        }}
      >
        投拆
      </MenuItem>
    </Menu>
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
          <IconButton
            aria-label="settings"
            aria-controls="user-feedback-complaint-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <MoreVertIcon fontSize="default" />
          </IconButton>
          {renderMenu}
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
          <Typography variant="body2">
            {checked ? "收起" : "查看更多"}
          </Typography>
          <ExpandIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
