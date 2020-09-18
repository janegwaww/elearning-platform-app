import React from "react";
import Container from "@material-ui/core/Container";
import "./KeContainerStyles.sass";

const KeContainer = ({ children, ...props }) => {
  return (
    <Container fixed className="ke-container" {...props}>
      {children}
    </Container>
  );
};

export default KeContainer;
