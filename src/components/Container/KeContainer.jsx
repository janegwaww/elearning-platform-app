import React from "react";
import Container from "@material-ui/core/Container";
import "./KeContainerStyles.sass";

export default function KeContainer({ children }) {
  return (
    <Container className="ke-container" maxWidth="xl">
      {children}
    </Container>
  );
}
