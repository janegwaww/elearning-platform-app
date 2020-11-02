import React from "react";
import { navigate } from "gatsby";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import { isLoggedIn, logout, getUser } from "../services/auth";
import "./AvatarMenu.sass";

const list = [
  {
    href: "/users/profile/dynamic/",
    src: "/images/collect.svg",
    name: "我的收藏",
  },
  {
    href: "/users/profile/workscenter/",
    src: "/images/create.svg",
    name: "创作中心",
  },
  {
    href: "/users/profile/",
    src: "/images/person.svg",
    name: "个人中心",
  },
];

const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  const isLogin = isLoggedIn();
  const { headshot, name } = getUser();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
        <Link href="/users/login" underline="none" variant="body1">
          <Typography noWrap className="link">
            登录/注册
          </Typography>
        </Link>
      )}

      <Popover
        anchorEl={anchorEl}
        anchorReference="anchorEl"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        id={menuId}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        className="layout-navbar-avatar-menu-popover"
      >
        <div style={{ position: "relative" }}>
          <div className="popMenu">
            <Link
              href="/users/profile/"
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
              {list.map((o) => (
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
            onClick={(e) => {
              e.preventDefault();
              logout(() => navigate("/"));
              handleMenuClose();
            }}
          >
            退出
          </Button>
          <IconButton
            className="setIcon"
            size="small"
            onClick={() => {
              handleMenuClose();
              navigate("/users/profile/setings");
            }}
          >
            <SettingsIcon fontSize="inherit" />
          </IconButton>
        </div>
      </Popover>
    </div>
  );
};

export default AvatarMenu;
