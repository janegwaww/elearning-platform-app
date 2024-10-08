import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import MoreIcon from "@material-ui/icons/MoreVert";
import UserLikeHeart from "../Introduction/UserLikeHeart";
import "./DSAppBar.sass";

const DocumentSearchAppBar = ({
  info = {},
  page = 1,
  show = true,
  handleClick,
  handleDownload,
  handleScale,
  handleLikeClick,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(anchorEl);
  const handleMobileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setAnchorEl(null);
  };

  const mobileMenuId = "document-search-functional-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={anchorEl}
      id={mobileMenuId}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <MenuItem>
        <IconButton onClick={handleDownload} size="small">
          <GetAppIcon style={{ color: "#232325" }} />
        </IconButton>
        <span>下载</span>
      </MenuItem>
      <MenuItem>
        <UserLikeHeart
          likeCounts={info.like_counts}
          like={info.is_like}
          handleClick={handleLikeClick}
          style={{ color: "#232325" }}
        />
      </MenuItem>
    </Menu>
  );

  return (
    <div className="doc-search-app-bar-container">
      <Slide appear={false} direction="down" in={show}>
        <AppBar className="doc-search-app-bar">
          <Toolbar>
            <Container maxWidth="lg" disableGutters>
              <Grid container alignItems="center">
                <Grid item xs={6} sm={5}>
                  <Typography noWrap color="primary">
                    {info.file_name}
                  </Typography>
                </Grid>

                <Grid item sm={2} align="center">
                  <Typography noWrap color="primary" className="desk">
                    {info.image_list && `${page} / ${info.image_list.length}`}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={5} align="right">
                  <div className="functionButton">
                    {info.file_type && info.file_type === "pdf" && (
                      <Button
                        variant="contained"
                        color="default"
                        startIcon={<SearchIcon />}
                        onClick={handleClick}
                        className="searchButton"
                      >
                        <Typography noWrap component="div">
                          语义搜索
                        </Typography>
                      </Button>
                    )}
                    <div className="desk">
                      <IconButton onClick={() => handleScale(true)}>
                        <AddIcon style={{ color: "#fff" }} />
                      </IconButton>
                      <IconButton onClick={() => handleScale(false)}>
                        <RemoveIcon style={{ color: "#fff" }} />
                      </IconButton>
                      <IconButton onClick={handleDownload}>
                        <GetAppIcon style={{ color: "#fff" }} />
                      </IconButton>
                      <UserLikeHeart
                        likeCounts={info.like_counts}
                        like={info.is_like}
                        handleClick={handleLikeClick}
                        style={{ color: "#fff" }}
                      />
                    </div>
                    <div className="mobile">
                      <IconButton onClick={handleMobileMenuOpen} size="small">
                        <MoreIcon color="primary" />
                      </IconButton>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </Toolbar>
        </AppBar>
      </Slide>
      <Slide appear={false} derection="down" in={show}>
        <Toolbar className={`${show ? "" : "toolbar"}`} />
      </Slide>
      {renderMobileMenu}
    </div>
  );
};

export default DocumentSearchAppBar;
