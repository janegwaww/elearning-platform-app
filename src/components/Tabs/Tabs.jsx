import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: "1px solid #f2f2f5",
  },
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 60,
      width: "100%",
      backgroundColor: "#007cff",
    },
  },
}));

const TTab = withStyles((theme) => ({
  root: {
    minWidth: 60,
    padding: "6px 0px",
    color: "#42415a",
    marginRight: 60,
    opacity: 1,
    borderRadius: 20,
    "&$selected": {
      color: "#007cff",
    },
  },
  selected: {
    color: "#007cff",
  },
}))((props) => <Tab disableRipple {...props} />);

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
      <TTab label="全部模态" />
      <TTab label="视频模态" />
      <TTab label="文本模态" />
      <TTab
        label="更多模态..."
        disabled
        component={() => (
          <Tooltip title="敬请期待..." placement="top-start">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="textSecondary">
                更多模态...
              </Typography>
            </div>
          </Tooltip>
        )}
      />
    </Tabs>
  );
};

export default TypeTabs;
