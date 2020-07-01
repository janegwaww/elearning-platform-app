import React from "react";
import Container from "@material-ui/core/Container";
import "./KeContainerStyles.sass";

export default function KeContainer({ children, ...props }) {
  return (
    <Container className="ke-container" fixed>
      {children}
    </Container>
  );
}
