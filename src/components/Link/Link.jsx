import React from "react";
import MuiLink from "@material-ui/core/Link";

export default function Link({ children, href = "/", ...props }) {
  return (
    <MuiLink
      href={href}
      color="textPrimary"
      target="_blank"
      rel="noopener norefferer"
      {...props}
    >
      {children}
    </MuiLink>
  );
}
