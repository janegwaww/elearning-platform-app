import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: "1px solid #f2f2f5",
  },
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 30,
      width: "100%",
      backgroundColor: "#007cff",
    },
  },
}));

const TTab = withStyles((theme) => ({
  root: {
    minWidth: 30,
    padding: "6px 10px",
    color: "#42415a",
    marginRight: 50,
    opacity: 1,
    borderRadius: 20,
    "&$selected": {
      color: "#007cff",
    },
  },
  selected: {
    color: "#007cff",
  },
}))(Tab);

const TypeTabs = ({ handleTab = () => ({}) }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const type = ["all", "video", "document", "allNewModel"];

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    handleTab(type[newValue]);
  };

  return (
    <Tabs
      onChange={handleTabChange}
      value={value}
      TabIndicatorProps={{ children: <span /> }}
      classes={{ root: classes.root, indicator: classes.indicator }}
    >
      <TTab label="全部" />
      <TTab label="视频" />
      <TTab label="文本" />
      <TTab label="全新模态" disabled />
    </Tabs>
  );
};

export default TypeTabs;
