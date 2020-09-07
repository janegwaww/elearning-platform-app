import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Portal from "@material-ui/core/Portal";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import AvatarMenu from "../../layout/AvatarMenu";

const useStyles = makeStyles({
  listTextRoot: {
    textAlign: "center",
  },
});

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
};

const MenuMobile = ({ open = false, container }) => {
  const classes = useStyles();
  const list = [
    { name: "首页", href: "/" },
    { name: "知擎杯", href: "activity" },
  ];

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
        <ListItem>
          <AvatarMenu />
        </ListItem>
      </List>
    </Portal>
  ) : null;
};

export default MenuMobile;
