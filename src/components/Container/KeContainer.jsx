import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  keContainer: {
    maxWidth: 1420,
  },
  container: {
    "@media (min-width:1120px) and (max-width:1550px)": {
      maxWidth: 1120,
    },
  },
}));

const KeContainer = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Container
      fixed
      classes={{ maxWidthXl: classes.keContainer }}
      className={classes.container}
      {...props}
    >
      {children}
    </Container>
  );
};

export default KeContainer;
