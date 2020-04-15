import React, { Component } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import clsx from "clsx";
import theme from "../../layout/theme";
import "./About.scss";

const useStyles = makeStyles(theme => ({
  font: {
    color: theme.status.danger
  }
}));

const AboutTemplate = () => {
  const classes = useStyles();
  const handleClick = (values: string): void => {
    return alert(values);
  };
  return (
    <div className={clsx(classes.font)}>
      <h1 onClick={(e): void => handleClick("about")}>
        Edit About component or pages/about.jsx to include your information.
      </h1>
    </div>
  );
};

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <AboutTemplate />
      </ThemeProvider>
    );
  }
}

export default About;
