import React from "react";
import { navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Portal from "@material-ui/core/Portal";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import { isLoggedIn, logout } from "../../services/auth";

const useStyles = makeStyles({
  listTextRoot: {
    textAlign: "center",
  },
  login: {
    textAlign: "center",
    color: "#007cff",
  },
});

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
};

const MenuMobile = ({ open = false, container, handleClose }) => {
  const classes = useStyles();
  const isLogin = isLoggedIn();
  const list = [
    { name: "首页", href: "/" },
    { name: "知擎杯", href: "activity" },
  ];

  const handleLogin = () => {
    isLogin
      ? logout(() => {
          handleClose();
        })
      : navigate("/users/login/");
  };

  return open ? (
    <Portal container={container.current}>
      <Divider />
      <List component="nav">
        {list.map((o) => (
          <ListItemLink
            href={o.href}
            classes={{ root: classes.listTextRoot }}
            key={o.name}
          >
            <ListItemText primary={o.name} />
          </ListItemLink>
        ))}
        <ListItemLink classes={{ root: classes.login }} onClick={handleLogin}>
          <ListItemText primary={`${isLogin ? "退出登录" : "登录/注册"}`} />
        </ListItemLink>
      </List>
    </Portal>
  ) : null;
};

export default MenuMobile;
