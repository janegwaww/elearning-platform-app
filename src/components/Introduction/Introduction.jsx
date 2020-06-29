import React, { useEffect, useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
/* import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
 * import ExpandLessIcon from "@material-ui/icons/ExpandLess"; */
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
  MenuItem,
} from "@material-ui/core";
import FileViewButton from "./FileViewButton";
import { getVideoIntro } from "../../services/video";
import UserFeedback from "./UserFeedback";
/* import ChipArray from "./ChipArray"; */

export default function Introduction({ vid = "" }) {
  /* const [checked, setChecked] = useState(false); */
  const [intro, setIntro] = useState({
    likeCounts: 0,
    viewCounts: 0,
    collectionCounts: 0,
    description: "",
    category: [""],
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const fetchIntroduction = () => {
    getVideoIntro({ video_id: vid }).then((data) => {
      setIntro(data);
    });
  };

  /* const handleChange = () => {
   *   setChecked(prev => !prev);
   * }; */

  useEffect(() => {
    if (vid) {
      fetchIntroduction();
    }
  }, [vid]);

  /* const ExpandIcon = () =>
   *   checked ? (
   *     <ExpandLessIcon fontSize="small" />
   *   ) : (
   *     <ExpandMoreIcon fontSize="small" />
   *   ); */

  const handleMenuOpen = (event) => {
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
        onClick={(e) => {
          e.preventDefault();
          handleMenuClose();
        }}
      >
        投拆
      </MenuItem>
    </Menu>
  );

  return (
    <Card style={{ boxShadow: "none" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "2 0 auto", display: "flex" }}>
          <UserFeedback backData={intro} />
        </div>
        <div style={{ flex: "0.1 0 auto", display: "flex" }}>
          <FileViewButton vid={vid} />
        </div>
        <div style={{ display: "flex" }}>
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
      {/* <Divider /> */}
      {/* <CardContent>
          <Collapse in={checked} collapsedHeight={60}>
          <Paper elevation={4} style={{ boxShadow: "none" }}>
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
          </CardActions> */}
    </Card>
  );
}
