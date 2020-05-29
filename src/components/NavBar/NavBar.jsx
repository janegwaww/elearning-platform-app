import React from "react";
import { navigate } from "@reach/router";
import { fade, makeStyles } from "@material-ui/core/styles";
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
  Button
} from "@material-ui/core";
import { isLoggedIn, logout } from "../../services/auth";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    backgroundColor: "#f2f2f5",
    borderRadius: "50px 0 0 50px",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  },
  searchButton: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "0px 50px 50px 0",
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main
    }
  },
  createButton: {
    borderRadius: "20px",
    marginLeft: "20px"
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

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
    >
      {isLoggedIn() ? (
        <>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem
            onClick={e => {
              e.preventDefault();
              logout(() => navigate(`/users/login`));
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

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Container fixed>
          <Toolbar id="back-to-top-anchor">
            <IconButton onClick={() => navigate("/")}>
              <img src="../logos/Logo.png" />
            </IconButton>
            <div>
              <Button color="inherit" onClick={() => navigate("/")}>
                <Typography>首页</Typography>
              </Button>
              <Button color="inherit" onClick={() => navigate("/channel/")}>
                <Typography>频道</Typography>
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("/mysubscription/")}
              >
                <Typography>我的订阅</Typography>
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("/excellentcreator/")}
              >
                <Typography>优秀创作者</Typography>
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
                <AccountCircle />
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
