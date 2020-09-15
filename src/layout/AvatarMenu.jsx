import React from "react";
import { navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import { isLoggedIn, logout, getUser } from "../services/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
  iconButton: {
    padding: 0,
  },
  popOver: {
    top: "50px !important",
    borderRadius: 12,
  },
  setIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  person: {
    display: "flex",
    marginTop: 20,
    "&>a": {
      display: "flex",
      flexDirection: "column",
      "&:not(:last-child)": {
        marginRight: 20,
      },
      "&>img": {
        marginBottom: 10,
      },
    },
  },
  logout: {
    borderRadius: 0,
  },
  link: {
    color: "#007cff",
    cursor: "pointer",
  },
  popMenu: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  avatar: {
    width: 30,
    height: 30,
    [theme.breakpoints.down("md")]: {
      width: 24,
      height: 24,
    },
  },
  popAvatar: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
}));

const AvatarMenu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  const isLogin = isLoggedIn();
  const { headshot, name } = getUser();
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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      {isLogin ? (
        <IconButton
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
          className={classes.iconButton}
        >
          <Avatar src={headshot} alt={name} className={classes.avatar} />
        </IconButton>
      ) : (
        <Link href="/users/login" underline="none" variant="body1">
          <Typography noWrap className={classes.link}>
            登录/注册
          </Typography>
        </Link>
      )}

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        classes={{ paper: classes.popOver }}
      >
        <div style={{ position: "relative" }}>
          <div className={classes.popMenu}>
            <Link
              href="/users/profile/"
              color="inherit"
              underline="none"
              onClick={handleMenuClose}
            >
              <div className={classes.popAvatar}>
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
            <div className={classes.person}>
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
            className={classes.logout}
            onClick={(e) => {
              e.preventDefault();
              logout(() => ({}));
              handleMenuClose();
            }}
          >
            退出
          </Button>
          <IconButton
            className={classes.setIcon}
            size="small"
            onClick={() => {
              handleMenuClose();
              navigate("/users/profile/settings");
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
