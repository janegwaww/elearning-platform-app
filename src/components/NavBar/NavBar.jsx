import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Container from "@material-ui/core/Container";
import {
  Toolbar,
  Menu,
  MenuItem,
  Badge,
  InputBase,
  Typography,
  IconButton,
  AppBar,
  Button,
  Avatar
} from "@material-ui/core";
import ChannelPopover from "./ChannelPopover";
import { isLoggedIn, logout, getUser } from "../../services/auth";
import useStyles from "./NavBarStyles";

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isLogin = isLoggedIn();
  const { headshot, name } = getUser();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearchClick = () => {
    const { value } = document.getElementById("navbar-search-input");
    navigate("/search/", { state: { searchValue: value } });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      classes={{ list: classes.list }}
    >
      {isLogin ? (
        <>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem
            onClick={e => {
              e.preventDefault();
              logout(() => ({}));
              handleMenuClose();
            }}
          >
            Logout
          </MenuItem>
        </>
      ) : (
        <MenuItem
          onClick={e => {
            e.preventDefault();
            navigate(`/users/login`);
          }}
        >
          LogIn
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      classes={{ list: classes.list }}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={() => navigate("/profile/")}
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  useEffect(() => {}, [isLogin]);

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Container fixed>
          <Toolbar id="back-to-top-anchor">
            <IconButton onClick={() => navigate("/")}>
              <img src="../logos/Logo.png" />
            </IconButton>
            <div style={{ display: "flex" }}>
              <Button color="inherit" onClick={() => navigate("/")}>
                <Typography>首页</Typography>
              </Button>
              <ChannelPopover />
              {/* <Button color="inherit">
                  <Typography>频道</Typography>
                  </Button> */}
              <Button
                color="inherit"
                onClick={() => navigate("/mysubscription/")}
              >
                <Typography>订阅</Typography>
              </Button>
              <Button color="inherit">
                <Typography>下载APP</Typography>
              </Button>
            </div>
            <div className={classes.search}>
              <InputBase
                placeholder="搜索..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
                id="navbar-search-input"
              />
              <Button
                className={classes.searchButton}
                startIcon={<SearchIcon />}
                onClick={handleSearchClick}
              >
                搜索
              </Button>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {isLogin ? (
                  <Avatar src={headshot} alt={name} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              <Button
                color="secondary"
                variant="contained"
                className={classes.createButton}
                onClick={() => navigate("/video/")}
              >
                <Typography>投稿</Typography>
              </Button>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
