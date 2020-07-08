import React from "react";
import { navigate } from "gatsby";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
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
  InputAdornment,
  Link,
  ButtonBase,
  Box,
} from "@material-ui/core";
import AvatarMenu from "../../layout/AvatarMenu";
import Container from "../Container/KeContainer";
import logo from "../../../static/logos/logo.svg";
import useStyles from "./NavBarStyles";

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearchClick = () => {
    const { value } = document.getElementById("navbar-search-input");
    if (value) {
      navigate("/search/", { state: { searchValue: value } });
    }
  };

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
        <ButtonBase color="inherit" onClick={() => navigate("/")}>
          <Typography>首页</Typography>
        </ButtonBase>
      </MenuItem>
      <MenuItem>
        <ButtonBase color="inherit" onClick={() => navigate("/joinscholar/")}>
          <Typography>加盟学者</Typography>
        </ButtonBase>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <Box display="flex" justifyContent="center" width="100%">
          <AvatarMenu />
        </Box>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Container>
          <Toolbar className={classes.toolbar}>
            <Link href="/" className={classes.logoLink}>
              <img src={logo} alt="logo" />
            </Link>
            <div className={classes.menus}>
              <Link
                href="/"
                color="inherit"
                underline="none"
                style={{ padding: "6px 8px" }}
              >
                <Typography>首页</Typography>
              </Link>
              <Link
                color="inherit"
                href="/joinedscholar/"
                underline="none"
                style={{ padding: "6px 8px" }}
              >
                <Typography>加盟学者</Typography>
              </Link>
            </div>
            <div className={classes.search}>
              <InputBase
                placeholder="搜索..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                id="navbar-search-input"
                endAdornment={
                  <InputAdornment>
                    <Button
                      className={classes.searchButton}
                      startIcon={<SearchIcon />}
                      onClick={handleSearchClick}
                    >
                      搜索
                    </Button>
                  </InputAdornment>
                }
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                style={{ marginRight: 20 }}
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <AvatarMenu />
              <div style={{ marginRight: 30 }} />
            </div>
            <div>
              <Button
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
    </div>
  );
}
