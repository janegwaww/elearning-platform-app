import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid transparent"
  },
  indicator: {
    backgroundColor: "#1890ff",
    "& > span": {
      maxWidth: 75,
      width: "100%"
    }
  }
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: "#40a9ff"
    }
  },
  selected: {}
}))(props => <Tab disableRipple {...props} />);

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  demo1: {
    backgroundColor: "transparent",
    minHeight: 300
  }
}));

export default function CustomizedTabs({ tabs = [] }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.demo1}>
      <AntTabs value={value} onChange={handleChange} aria-label="home tabs">
        {tabs.map(o => (
          <AntTab label={o.label} key={o.label} />
        ))}
      </AntTabs>
      {tabs.map((o, i) => (
        <TabPanel value={value} index={i} key={i}>
          <br />
          {o.tabContent()}
        </TabPanel>
      ))}
      <br />
    </div>
  );
}
