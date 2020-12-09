import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import { isLoggedInPromise, logout, getUser } from "../services/auth";
import paths from "./AvatarMenu.json";
import "./AvatarMenu.sass";

const LOGIN = "/users/login";
const PROFILE = "/users/profile/";
const SETTING = "/users/profile/setings";

const AvatarMenu = () => {
  const menuId = "primary-search-account-menu";
  const [isLogin, setIsLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { headshot, name } = getUser();
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    handleMenuClose();
    logout(() => {
      setIsLogin(false);
      navigate("/");
    });
  };

  const handleSet = () => {
    handleMenuClose();
    navigate(SETTING);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await isLoggedInPromise();
      setIsLogin(res);
    }
    fetchData();
  }, []);

  return (
    <div className="layout-navbar-avatar-menu">
      {isLogin ? (
        <IconButton
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
          className="iconButton"
        >
          <Avatar src={headshot} alt={name} className="avatar" />
        </IconButton>
      ) : (
        <Link href={LOGIN} underline="none" variant="body1">
          <Typography noWrap className="link">
            登录/注册
          </Typography>
        </Link>
      )}

      <Popover
        id={menuId}
        anchorEl={anchorEl}
        anchorReference="anchorEl"
        open={isMenuOpen}
        onClose={handleMenuClose}
        className="layout-navbar-avatar-menu-popover"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <div style={{ position: "relative" }}>
          <div className="popMenu">
            <Link
              href={PROFILE}
              color="inherit"
              underline="none"
              onClick={handleMenuClose}
            >
              <div className="popAvatar">
                <Avatar
                  src={headshot}
                  alt={name}
                  style={{ width: 30, height: 30, marginRight: 10 }}
                />
                <Typography noWrap component="div">
                  {name}
                </Typography>
              </div>
            </Link>
            <Divider />
            <div className="person">
              {paths.map((o) => (
                <Link
                  href={o.href}
                  color="inherit"
                  onClick={handleMenuClose}
                  key={o.name}
                >
                  <img src={o.src} alt={o.name} />
                  <Typography variant="caption">{o.name}</Typography>
                </Link>
              ))}
            </div>
          </div>

          <Button
            fullWidth
            variant="contained"
            className="logout"
            onClick={handleLogout}
          >
            退出
          </Button>
          <IconButton className="setIcon" size="small" onClick={handleSet}>
            <SettingsIcon fontSize="inherit" />
          </IconButton>
        </div>
      </Popover>
    </div>
  );
};

export default AvatarMenu;
